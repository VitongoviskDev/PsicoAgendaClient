"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar, GetDisabledDate, type CalendarDateRules } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet
} from "@/components/ui/field"
import type { FC } from "react"


interface DateTimePickerInputProps {
    date: Date | undefined
    setDate: (date: Date | undefined) => void
    time: string
    setTime: (time: string) => void
    startMonth?: Date;
    endMonth?: Date;
    calendarRules?: CalendarDateRules;
}
const DateTimePickerInput: FC<DateTimePickerInputProps> = ({
    date,
    setDate,
    time,
    setTime,
    startMonth,
    endMonth = new Date(new Date().getFullYear() + 1, new Date().getMonth(), 1),
    calendarRules = {
        type: "any-date"
    }
}) => {
    const [open, setOpen] = React.useState(false)


    return (
        <FieldSet>
            <FieldGroup className="flex-row gap-2">
                <Field className="w-fit">
                    <FieldLabel htmlFor="date-picker" className="px-1">Date</FieldLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                id="date-picker"
                                className="w-32 justify-between font-normal"
                            >
                                {date ? date.toLocaleDateString() : "Select date"}
                                <ChevronDownIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                captionLayout="dropdown"
                                onSelect={(selectedDate) => {
                                    setDate(selectedDate)
                                    setOpen(false)
                                }}
                                startMonth={startMonth}
                                endMonth={endMonth}
                                disabled={(day) => GetDisabledDate(day, calendarRules)}
                            />
                        </PopoverContent>
                    </Popover>
                </Field>
                <Field className="w-fit">
                    <FieldLabel htmlFor="time-picker" className="px-1">Hora</FieldLabel>
                    <Input
                        type="time"
                        id="time-picker"
                        step="60"
                        value={time.slice(0, 5)}
                        onChange={(e) => {
                            // Normalize to HH:MM
                            const value = e.target.value.slice(0, 5);
                            setTime(value);
                        }}
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none text-sm w-fit"
                    />
                </Field>
            </FieldGroup>
        </FieldSet>
    )
}

export default DateTimePickerInput;