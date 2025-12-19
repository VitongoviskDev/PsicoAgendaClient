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
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import type { DialogKey } from '@/context/dialogContext'
import { useDialogContext } from '@/hooks/context/useDialogContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState, type FC } from 'react'
import { useForm } from 'react-hook-form'
import {
  LuCalendarPlus
} from 'react-icons/lu'
import { z } from 'zod'
import { DateTimePickerInput } from '../Inputs/DateTimePicker'
import { formatedHours } from '@/lib/utils'

const knowledgeBaseSchema = z.object({
  name: z.string().min(1, "Campo nome é obrigatório"),
  description: z.string(),
})
type CreateCategoryFormData = z.infer<typeof knowledgeBaseSchema>

interface CreateCategoryModalProps {
  dialogKey: DialogKey;
  date?: Date;
}

const CreateAppointmentDialog: FC<CreateCategoryModalProps> = ({ dialogKey, date }) => {

  const { activeDialog, closeDialog } = useDialogContext();

  const initialDate = new Date();
  initialDate.setHours(11, 0, 0, 0);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState(formatedHours(initialDate))

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isPending },
    setError,
    reset
  } = useForm<CreateCategoryFormData>({
    resolver: zodResolver(knowledgeBaseSchema),
    defaultValues: {
      name: "",
      description: ""
    },
  })

  const closeModal = () => {
    closeDialog();
    reset({
      name: "",
      description: ""
    });
  }

  useEffect(() => {
    setSelectedDate(date);
  }, [date])

  const CreateAppointment = async (data: CreateCategoryFormData) => {
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
      <Dialog open={activeDialog == dialogKey} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader className='flex justify-between'>
            <DialogTitle className='flex items-center gap-1'>
              <LuCalendarPlus className='text-lg' />Novo Agendamento
            </DialogTitle>
            <DialogDescription>Preencha os campos abaixo para agendar um paciente</DialogDescription>
          </DialogHeader>

          {/*  Body */}
          <FieldSet>
            <FieldGroup>
              <Field className='flex-1'>
                <FieldLabel>Nome</FieldLabel>
                <Input id="name" {...register("name")} placeholder='Name' />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor='type'>Horário</FieldLabel>
                <DateTimePickerInput
                  date={selectedDate}
                  setDate={setSelectedDate}
                  time={selectedTime}
                  setTime={setSelectedTime}
                />
              </Field>
              <Field className='flex-1'>
                <FieldLabel>Descrição</FieldLabel>
                <Textarea id="description" {...register("description")} placeholder='Write a description for this category' className='max-h-16' />
                {errors.description && <FieldError>{errors.description.message}</FieldError>}
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
