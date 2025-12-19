import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Spinner } from "@/components/ui/spinner";
import type { DialogKey } from "@/context/dialogContext";
import { useDialogContext } from "@/hooks/context/useDialogContext";
import { z } from "zod";

type SearchStatus = "idle" | "loading" | "found" | "not_found";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export const cpfSchema = z.object({
    cpf: z
        .string()
        .min(11, "CPF inválido")
});

export const createPatientSchema = cpfSchema.extend({
    name: z.string().min(3, "Informe o nome completo"),
    email: z.string().email("E-mail inválido"),
});

type CpfForm = z.infer<typeof cpfSchema>;
type CreatePatientForm = z.infer<typeof createPatientSchema>;

const DIALOG_KEY: DialogKey = "patients-create-patient";

const AddPatientDialog = () => {
    const [status, setStatus] = useState<SearchStatus>("idle");

    const { activeDialog, closeDialog } = useDialogContext();

    const {
        handleSubmit: handleSubmitCpf,
        formState: { errors: cpfErrors, isSubmitting: isCpfPending },
        getValues: getCpfValues,
        control: cpfControl,
        reset: resetCpf
    } = useForm<CpfForm>({
        resolver: zodResolver(cpfSchema),
    });

    const {
        handleSubmit: handleSubmitCreate,
        register: registerCreate,
        formState: { errors: createErrors, isSubmitting: isCreatePending },
        reset: resetCreate
    } = useForm<CreatePatientForm>({
        resolver: zodResolver(createPatientSchema),
    });

    const handleSearch = async (data: CpfForm) => {
        setStatus("loading");

        // 🔗 GET /patients/cpf/{cpf}
        setTimeout(() => {
            const exists = data.cpf.endsWith("7"); // mock
            setStatus(exists ? "found" : "not_found");
        }, 800);
    };

    const handleCreateAndInvite = async (data: CreatePatientForm) => {
        // POST /patients/invite
        console.log(data);
    };

    const handleDialogClose = () => {
        setStatus("idle");
        resetCpf()
        resetCreate()
    }

    return (
        <Dialog open={DIALOG_KEY === activeDialog} onOpenChange={() => closeDialog(handleDialogClose)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar paciente à agenda</DialogTitle>
                    <DialogDescription>
                        Busque o paciente pelo CPF para continuar.
                    </DialogDescription>
                </DialogHeader>

                {/* CPF SEARCH */}
                <form
                    onSubmit={handleSubmitCpf(handleSearch)}
                    className="space-y-4"
                >
                    <FieldGroup className="flex justify-center">
                        <Field className="w-fit mx-auto">
                            <FieldLabel>CPF</FieldLabel>
                            <Controller
                                control={cpfControl}
                                name="cpf"
                                render={({ field }) => (
                                    <InputOTP
                                        maxLength={11}
                                        value={field.value ?? ""}
                                        onChange={field.onChange}
                                        pattern={REGEXP_ONLY_DIGITS}
                                    >
                                        <InputOTPGroup>
                                            {Array.from({ length: 11 }).map((_, i) => (
                                                <InputOTPSlot key={i} index={i} />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                )}
                            />

                            <FieldError>{cpfErrors.cpf?.message}</FieldError>
                        </Field>

                        <Button type="submit" disabled={isCpfPending}>
                            {isCpfPending ? (
                                <span className="flex items-center gap-2">
                                    <Spinner /> Buscando...
                                </span>
                            ) : (
                                "Buscar paciente"
                            )}
                        </Button>
                    </FieldGroup>
                </form>

                {/* PATIENT FOUND */}
                {status === "found" && (
                    <>
                        <Separator />
                        <div className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                                Paciente já cadastrado no sistema.
                            </p>

                            <Button className="w-full">
                                Adicionar à agenda
                            </Button>
                        </div>
                    </>
                )}

                {/* PATIENT NOT FOUND */}
                {status === "not_found" && (
                    <>
                        <Separator />
                        <form
                            onSubmit={handleSubmitCreate(handleCreateAndInvite)}
                            className="space-y-4"
                        >
                            <p className="text-sm text-muted-foreground">
                                Paciente não encontrado. É necessário criar o cadastro.
                            </p>

                            <FieldGroup>
                                <Field>
                                    <FieldLabel>Nome completo:</FieldLabel>
                                    <Input {...registerCreate("name")} />
                                    {createErrors.name && <FieldError>{createErrors.name.message}</FieldError>}
                                </Field>

                                <Field>
                                    <FieldLabel>Email:</FieldLabel>
                                    <Input {...registerCreate("email")} />
                                    {createErrors.email && <FieldError>{createErrors.email.message}</FieldError>}
                                </Field>

                                {/* hidden cpf */}
                                <input
                                    type="hidden"
                                    value={getCpfValues("cpf")}
                                    {...registerCreate("cpf")}
                                />

                                <Button type="submit" className="w-full">
                                    Criar paciente e enviar convite
                                </Button>
                            </FieldGroup>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AddPatientDialog;
