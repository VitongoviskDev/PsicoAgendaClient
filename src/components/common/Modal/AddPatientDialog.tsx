import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Badge from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import type { DialogKey } from "@/context/dialogContext";
import { useAuthContext } from "@/hooks/context/useAuthContext";
import { useDialogContext } from "@/hooks/context/useDialogContext";
import { useDebounce } from "@/hooks/useDebounce";
import { useUserByCpf } from "@/hooks/user/useUserByCpf";
import { getInitials, TypeFormatter } from "@/lib/utils";
import { z } from "zod";


const createPatientSchema = z.object({
    cpf: z.string("CPF inválido").min(14, "CPF inválido"),
    name: z.string("Nome é obrigatório").min(3, "Nome é obrigatório"),
    email: z.email("E-mail inválido").min(1, "E-mail é obrigatório"),
});
type CreatePatientFormData = z.infer<typeof createPatientSchema>;

const DIALOG_KEY: DialogKey = "patients-create-patient";

const AddPatientDialog = () => {

    const { activeDialog, closeDialog } = useDialogContext();
    const { user } = useAuthContext();

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors, isSubmitting: isPending },
        watch,
        reset
    } = useForm<CreatePatientFormData>({
        resolver: zodResolver(createPatientSchema),
    });


    const watchedCpf = watch("cpf");
    const debouncedCpf = useDebounce(watchedCpf, 600);
    const { data: cpfData, isFetching: cpfIsPending, isEnabled: cpfIsEnabled } = useUserByCpf({ routeParams: { cpf: TypeFormatter.fromCpf(debouncedCpf ?? "") } });

    const handleCreateAndInvite = async (data: CreatePatientFormData) => {
        // POST /patients/invite
        console.log(data);
    };

    const handleDialogClose = () => {
        reset();
        closeDialog();
    }

    return (
        <Dialog open={DIALOG_KEY === activeDialog} onOpenChange={handleDialogClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar paciente à agenda</DialogTitle>
                    <DialogDescription>
                        Busque o paciente pelo CPF para continuar.
                    </DialogDescription>
                </DialogHeader>

                {/* CPF SEARCH */}
                <form
                    onSubmit={handleSubmit(handleCreateAndInvite)}
                    className="space-y-4"
                >
                    <FieldGroup className="flex justify-center">
                        <Field className="w-full">
                            <FieldLabel>CPF</FieldLabel>
                            <Input
                                id="cpf"
                                type="text"
                                {...register("cpf", {
                                    onChange: (e) => {
                                        const formatted = TypeFormatter.toCpf(e.target.value);
                                        setValue("cpf", formatted, { shouldDirty: true });
                                    },
                                })}
                                placeholder="000.000.000-00"
                                maxLength={14}
                            />


                            <FieldError>{errors.cpf?.message}</FieldError>
                        </Field>

                    </FieldGroup>
                    {
                        cpfIsPending ? (
                            <div className="flex items-center justify-center gap-2">
                                <Spinner />
                                <p className="text-sm text-zinc-600">Estamos verificando se o paciente já existe</p>
                            </div>
                        ) : (!!cpfIsEnabled && !!cpfData?.data?.user) ? (
                            <>
                                <Separator />
                                {
                                    user?.id !== cpfData?.data?.user.id ? (
                                        <div className="space-y-3">
                                            <p className="text-sm text-muted-foreground">
                                                Paciente encontrado.
                                            </p>
                                            <div
                                                className={`flex items-center gap-2 rounded-xl ring-inset ring-1 ring-gray-200 p-2 shadow-sm`}
                                            >
                                                <Avatar className='size-10'>
                                                    <AvatarFallback className="flex items-center bg-linear-to-r from-primary to-primary/40 text-white">{getInitials(cpfData.data.user.name)}</AvatarFallback>
                                                </Avatar>
                                                <div className='flex-1'>
                                                    <CardTitle className="font-medium">{cpfData.data.user.name}</CardTitle>
                                                    <p className="text-xs text-zinc-500">{cpfData.data.user.email}</p>
                                                </div>
                                                <Badge color='green'>{cpfData.data.user?.status?.toLocaleLowerCase()}</Badge>
                                            </div>

                                            <Button className="w-full">
                                                Adicionar à agenda
                                            </Button>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            Não é possível adicionar o próprio usuário a uma agenda.
                                        </p>
                                    )
                                }
                            </>
                        ) : !!cpfIsEnabled && (
                            <>
                                <Separator />
                                <p className="text-sm text-muted-foreground">
                                    Paciente não encontrado. É necessário registrar e convidar.
                                </p>
                                <div>

                                </div>
                                <FieldGroup>
                                    <FieldSet>
                                        <Field>
                                            <FieldTitle>Nome completo:</FieldTitle>
                                            <Input {...register("name")} />
                                            {errors.name && <FieldError>{errors.name.message}</FieldError>}
                                        </Field>

                                        <Field>
                                            <FieldTitle>Email:</FieldTitle>
                                            <FieldDescription>O paciente receberá um convite para se registrar no endereço de email informado</FieldDescription>
                                            <Input {...register("email")} />
                                            {errors.email && <FieldError>{errors.email.message}</FieldError>}
                                        </Field>
                                    </FieldSet>


                                    <Button type="submit" className="w-full" disabled={isPending}>
                                        Registrar e Convidar
                                    </Button>
                                </FieldGroup>
                            </>
                        )
                    }
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddPatientDialog;
