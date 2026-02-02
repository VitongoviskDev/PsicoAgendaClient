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
import { Spinner } from '@/components/ui/spinner'
import { useDialogContext } from '@/hooks/context/useDialogContext'
import { formatedHours } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState, type FC } from 'react'
import { useForm } from 'react-hook-form'
import {
  LuCalendarPlus
} from 'react-icons/lu'
import { z } from 'zod'
import DateTimePickerInput from '../Inputs/DateTimePicker'
const createAppointmentSchema = z.object({
  date: z.date()
})
type CreateAppointmentFormData = z.infer<typeof createAppointmentSchema>

interface CreateCategoryModalProps {
  date?: Date;
}

const DIALOG_KEY = 'agenda-create-appointment'

const CreateAppointmentDialog: FC<CreateCategoryModalProps> = ({ date }) => {

  const { activeDialog, closeDialog } = useDialogContext();

  const initialDate = new Date();
  initialDate.setHours(11, 0, 0, 0);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState(formatedHours(initialDate))

  const {
    handleSubmit,
    formState: { isSubmitting: isPending },
  } = useForm<CreateAppointmentFormData>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      // description: ""
    },
  })

  const closeModal = () => {
    closeDialog();
    // reset({
    //   description: ""
    // });
  }

  useEffect(() => {
    setSelectedDate(date);
  }, [date])

  const CreateAppointment = async () => {
    // try {
    //   const payload: CreateCategoryPayload = {
    //     title: data.name,
    //     description: data.description ?? "",
    //     base_id: baseId ?? null,
    //     parent_id: categoryId ?? null
    //   }
    //   const createdCategory = await createCategoryMutation.mutateAsync(payload)
    //   navigate(`/knowledge-base/${selectedKnowledgeBase?.id}/category/${createdCategory.category.id}`)
    //   closeModal();
    // } catch (err) {
    //   const error = err as CreateCategoryCustomError
    //   if (error?.errors) {
    //     error.errors.forEach(e => {
    //       // garante que o field existe no form
    //       if (e.field === "name") {
    //         setError(e.field as keyof CreateCategoryFormData, { type: "manual", message: e.errors[0] })
    //       }
    //     })
    //   }
    // }
  }


  return (
    <form >
      <Dialog open={activeDialog === DIALOG_KEY} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader className='flex justify-between'>
            <DialogTitle className='flex items-center gap-1'>
              <LuCalendarPlus className='text-lg' />Novo Agendamento
            </DialogTitle>
            <DialogDescription>Preencha os campos abaixo para criar o novo agendamento</DialogDescription>
          </DialogHeader>

          {/*  Body */}
          <FieldSet>
            <FieldGroup>
              {/* <Field className='flex-1'>
                <FieldLabel>Nome</FieldLabel>
                <Input id="name" {...register("name")} placeholder='Name' />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </Field> */}
              <Field>
                <FieldLabel htmlFor='type'>Horário</FieldLabel>
                <DateTimePickerInput
                  date={selectedDate}
                  setDate={setSelectedDate}
                  time={selectedTime}
                  setTime={setSelectedTime}
                  calendarRules={{
                    type: "today-future",
                  }}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" onClick={closeModal} color='white'>Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending} onClick={handleSubmit(CreateAppointment)}>
              {isPending ? <><Spinner /> Saving</> : 'Create Category'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form >
  )
}

export default CreateAppointmentDialog
