import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Badge from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
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
import { Spinner } from "@/components/ui/spinner";
import type { DialogKey } from "@/context/dialogContext";
import { useAuthContext } from "@/hooks/context/useAuthContext";
import { useDialogContext } from "@/hooks/context/useDialogContext";
import { useCheckPatient } from "@/hooks/patient/useCheckPatient";
import { useRegisterPatient } from "@/hooks/patient/useRegisterPatient";
import { useDebounce } from "@/hooks/useDebounce";
import { createPatientSchema, type CreatePatientFormData } from "@/lib/types/patients/registerPatient";
import { getInitials, TypeFormatter } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const DIALOG_KEY: DialogKey = "patients-create-patient";

const RegisterPatientDialog = () => {
    const { activeDialog, closeDialog } = useDialogContext();
    const { user } = useAuthContext();

    const {
        handleSubmit,
        register,
        setValue,
        trigger,
        formState: { errors, isSubmitting: isFormSubmitting },
        watch,
        reset
    } = useForm<CreatePatientFormData>({
        resolver: zodResolver(createPatientSchema),
    });

    const registerPatientMutation = useRegisterPatient();
    const isPending = isFormSubmitting || registerPatientMutation.isPending;

    const watchedCpf = watch("cpf");
    const debouncedCpf = useDebounce(watchedCpf, 600);
    const { data: patientData, isFetching: cpfIsPending, isEnabled: cpfIsEnabled } = useCheckPatient({
        params: { cpf: TypeFormatter.fromCpf(debouncedCpf ?? "") }
    });

    // Sync user_id with form state to allow Zod refinement to pass
    useEffect(() => {
        if (patientData?.data?.user?.id) {
            setValue("user_id", patientData.data.user.id);
            trigger("cpf"); // Re-validate CPF to clear the "name/email required" error
        } else {
            setValue("user_id", null);
        }
    }, [patientData, setValue, trigger]);

    const handleCreateAndInvite = async (data: CreatePatientFormData) => {
        try {
            const response = await registerPatientMutation.mutateAsync({
                body: {
                    ...data,
                    cpf: TypeFormatter.clean(data.cpf ?? ""),
                    phone: TypeFormatter.clean(data.phone ?? ""),
                    birth_date: data.birth_date ? TypeFormatter.fromBirthDate(String(data.birth_date)) : undefined,
                    user_id: patientData?.data?.user?.id ?? null,
                }
            });
            toast.success(response.message);
            handleDialogClose();
        } catch (err: any) {
            toast.error(err.message || "Erro ao processar solicitação");
        }
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

                <form onSubmit={handleSubmit(handleCreateAndInvite)} className="space-y-4">
                    {/* CPF SEARCH */}
                    <FieldGroup>
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

                    {cpfIsPending ? (
                        <div className="flex items-center justify-center gap-2 py-4">
                            <Spinner />
                            <p className="text-sm text-zinc-600">Verificando paciente...</p>
                        </div>
                    ) : (!!cpfIsEnabled && !!patientData?.data?.user) ? (
                        <div className="space-y-4">
                            <Separator />
                            <p className="text-sm text-muted-foreground">Paciente encontrado.</p>

                            {patientData?.data?.isAlreadyPatientInClinic && (
                                <div className="px-4 py-2 bg-yellow-50 ring-1 ring-yellow-100 rounded-lg">
                                    <p className="text-sm text-yellow-600 font-medium text-center">
                                        Este CPF já pertence a um paciente da sua clínica.
                                    </p>
                                </div>
                            )}

                            <div className="flex items-center gap-2 rounded-xl ring-1 ring-gray-200 p-3 shadow-sm">
                                <Avatar className='size-10'>
                                    <AvatarFallback className="flex items-center bg-linear-to-r from-primary to-primary/40 text-white">
                                        {getInitials(patientData.data.user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className='flex-1'>
                                    <CardTitle className="font-medium">{patientData.data.user.name}</CardTitle>
                                    <p className="text-xs text-zinc-500">{patientData.data.user.email}</p>
                                </div>
                                <Badge color='green'>{patientData.data.user?.status?.toLocaleLowerCase()}</Badge>
                            </div>

                            {!patientData.data.isAlreadyPatientInClinic && (
                                <Button type="submit" className="w-full" disabled={isPending}>
                                    {isPending && <Spinner className="mr-2" />}
                                    Adicionar à agenda
                                </Button>
                            )}
                        </div>
                    ) : !!cpfIsEnabled && (
                        <div className="space-y-4">
                            <Separator />
                            <p className="text-sm text-muted-foreground">
                                Paciente não encontrado. Preencha os dados abaixo para registrar e convidar.
                            </p>

                            <FieldGroup>
                                <Field>
                                    <FieldTitle>Nome completo:</FieldTitle>
                                    <Input {...register("name")} placeholder="Digite o nome completo" />
                                    <FieldError>{errors.name?.message}</FieldError>
                                </Field>

                                <div className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldTitle>Telefone:</FieldTitle>
                                        <Input
                                            {...register("phone")}
                                            placeholder="(00) 00000-0000"
                                            onChange={(e) => {
                                                const formatted = TypeFormatter.toPhone(e.target.value);
                                                setValue("phone", formatted);
                                            }}
                                        />
                                        <FieldError>{errors.phone?.message}</FieldError>
                                    </Field>

                                    <Field>
                                        <FieldTitle>Nascimento:</FieldTitle>
                                        <Input
                                            {...register("birth_date")}
                                            placeholder="DD/MM/YYYY"
                                            onChange={(e) => {
                                                const formatted = TypeFormatter.toBirthDate(e.target.value);
                                                setValue("birth_date", formatted);
                                            }}
                                        />
                                        <FieldError>{errors.birth_date?.message}</FieldError>
                                    </Field>
                                </div>

                                <Field>
                                    <FieldTitle>Email:</FieldTitle>
                                    <FieldDescription>O paciente receberá um convite por email.</FieldDescription>
                                    <Input {...register("email")} placeholder="exemplo@email.com" />
                                    <FieldError>{errors.email?.message}</FieldError>
                                </Field>
                            </FieldGroup>

                            <Button type="submit" className="w-full mt-2" disabled={isPending}>
                                {isPending && <Spinner className="mr-2" />}
                                Registrar e Convidar
                            </Button>
                        </div>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default RegisterPatientDialog;