import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatedHours(date: Date) {

  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")

  return (`${hours}:${minutes}:${seconds}`)
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getInitials = (fullname: string): string => {

  const splited = fullname.split(" ").filter((splited) => splited.trim() !== "");

  if (splited.length <= 0)
    return ""
  else if (splited.length == 1)
    return splited[0][0].toLocaleUpperCase()
  else
    return `${splited[0][0]}${splited[splited.length - 1][0]}`.toUpperCase()

}