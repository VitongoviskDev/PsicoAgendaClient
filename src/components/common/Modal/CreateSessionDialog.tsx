import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet
} from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { useDialogContext } from '@/hooks/context/useDialogContext'
import { useAuthContext } from '@/hooks/context/useAuthContext'
import { useCreateSession } from '@/hooks/session/useCreateSession'
import { useListPatients } from '@/hooks/patient/useListPatients'
import { useListPsychologists } from '@/hooks/psychologist/useListPsychologists'
import { formatedHours } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState, type FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  LuCalendarPlus
} from 'react-icons/lu'
import DateTimePickerInput from '../Inputs/DateTimePicker'
import { toast } from 'sonner'
import { createSessionSchema, type CreateSessionFormData } from '@/lib/types/session'


interface CreateSessionModalProps {
  date?: Date;
}

const DIALOG_KEY = 'agenda-create-session'

const CreateSessionDialog: FC<CreateSessionModalProps> = ({ date }) => {
  const { user } = useAuthContext();
  const { activeDialog, closeDialog } = useDialogContext();
  const createSessionMutation = useCreateSession();
  const { data: patientsData, isLoading: isLoadingPatients } = useListPatients();
  const { data: psychologistsData, isLoading: isLoadingPsychologists } = useListPsychologists();

  const currentPsychologistId = user?.profiles?.psychologist?.id;

  const initialDate = new Date();
  initialDate.setHours(11, 0, 0, 0);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState(formatedHours(initialDate))

  const {
    handleSubmit,
    control,
    register,
    reset,
    setValue,
    formState: { isSubmitting: isPending, errors },
  } = useForm<CreateSessionFormData>({
    resolver: zodResolver(createSessionSchema),
    defaultValues: {
      duration: 60,
      price: 0,
      psychologistId: currentPsychologistId || "",
      date: initialDate,
    },
  })

  // Sync manual date/time states with form state
  useEffect(() => {
    if (selectedDate) {
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const combinedDate = new Date(selectedDate);
      combinedDate.setHours(hours, minutes, 0, 0);
      setValue('date', combinedDate, { shouldValidate: true });
    }
  }, [selectedDate, selectedTime, setValue]);

  // Sync with prop date
  useEffect(() => {
    if (activeDialog === DIALOG_KEY && date) {
      setSelectedDate(date);
    }
  }, [date, activeDialog])

  // Sync psychologistId when user loads
  useEffect(() => {
    if (currentPsychologistId) {
      setValue('psychologistId', currentPsychologistId);
    }
  }, [currentPsychologistId, setValue]);

  const closeModal = () => {
    closeDialog();
    reset();
  }

  const onSubmit = async (data: CreateSessionFormData) => {
    try {
      await createSessionMutation.mutateAsync({
        patientId: data.patientId,
        psychologistId: data.psychologistId,
        date: data.date.toISOString(),
        duration: data.duration,
        price: data.price * 100, // convert R$ to cents
      });

      toast.success("Sessão criada com sucesso!");
      closeModal();
    } catch (err: any) {
      toast.error(err.message || "Erro ao criar sessão");
    }
  }

  return (
    <Dialog open={activeDialog === DIALOG_KEY} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent>
        <DialogHeader className='flex justify-between'>
          <DialogTitle className='flex items-center gap-1'>
            <LuCalendarPlus className='text-lg' />Nova Sessão
          </DialogTitle>
          <DialogDescription>Preencha os campos abaixo para criar a nova sessão</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldGroup className="flex flex-col gap-4">
              <Field>
                <FieldLabel>Psicólogo</FieldLabel>
                <Controller
                  name="psychologistId"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder={isLoadingPsychologists ? "Carregando..." : "Selecione um psicólogo"} />
                      </SelectTrigger>
                      <SelectContent>
                        {psychologistsData?.data.psychologists.map((psychologist) => (
                          <SelectItem key={psychologist.id} value={psychologist.id}>
                            {psychologist.user.name} {psychologist.user.id === user?.id ? "(Você)" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.psychologistId && <span className="text-xs text-red-500">{errors.psychologistId.message}</span>}
              </Field>

              <Field>
                <FieldLabel>Paciente</FieldLabel>
                <Controller
                  name="patientId"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder={isLoadingPatients ? "Carregando..." : "Selecione um paciente"} />
                      </SelectTrigger>
                      <SelectContent>
                        {patientsData?.data.patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.patientId && <span className="text-xs text-red-500">{errors.patientId.message}</span>}
              </Field>

              <Field>
                <FieldLabel htmlFor='type'>Data e Horário</FieldLabel>
                <DateTimePickerInput
                  date={selectedDate}
                  setDate={setSelectedDate}
                  time={selectedTime}
                  setTime={setSelectedTime}
                  calendarRules={{
                    type: "today-future",
                  }}
                />
                {errors.date && <span className="text-xs text-red-500">{errors.date.message}</span>}
              </Field>

              <FieldGroup className="flex flex-row gap-4">
                <Field className="flex-1">
                  <FieldLabel>Duração (minutos)</FieldLabel>
                  <Input type="number" {...register("duration", { valueAsNumber: true })} />
                  {errors.duration && <span className="text-xs text-red-500">{errors.duration.message}</span>}
                </Field>

                <Field className="flex-1">
                  <FieldLabel>Preço (R$)</FieldLabel>
                  <Input type="number" step="0.01" {...register("price", { valueAsNumber: true })} />
                  {errors.price && <span className="text-xs text-red-500">{errors.price.message}</span>}
                </Field>
              </FieldGroup>
            </FieldGroup>
          </FieldSet>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={closeModal}>Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? <><Spinner /> Salvando...</> : 'Criar Sessão'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateSessionDialog
