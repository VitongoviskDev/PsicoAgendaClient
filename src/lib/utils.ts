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
export function formatedDate(dateStr?: string | Date): string {

  const date = !dateStr ? new Date() : new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
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

export const hideEmail = (email: string): string => {
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 2) {
    return `${localPart[0]}***@${domain}`;
  }
  const visibleChars = Math.ceil(localPart.length / 3);
  const hiddenChars = localPart.length - visibleChars;
  const hiddenSection = "*".repeat(hiddenChars);
  return `${localPart.slice(0, visibleChars)}${hiddenSection}@${domain}`;
}


export interface DefaultInterface {
  className?: string
}

export const TypeFormatter = {
  toCpf(value: string) {
    return value
      .replace(/\D/g, '')
      .substring(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  },
  fromCpf(value: string) {
    return value
      .replaceAll(".", "")
      .replaceAll("-", "")
  },
  toPhone(value: string) {
    const numbers = value.replace(/\D/g, '').substring(0, 11);

    if (numbers.length <= 2) {
      return numbers;
    }

    if (numbers.length <= 6) {
      return numbers.replace(/(\d{2})(\d+)/, '($1) $2');
    }

    if (numbers.length <= 10) {
      return numbers.replace(
        /(\d{2})(\d{4})(\d+)/,
        '($1) $2-$3'
      );
    }

    return numbers.replace(
      /(\d{2})(\d{5})(\d{4})/,
      '($1) $2-$3'
    );
  },
  toCrp(value: string) {
    const numbers = value.replace(/\D/g, '').substring(0, 7);

    if (numbers.length <= 2) {
      return numbers;
    }

    return numbers.replace(
      /(\d{2})(\d+)/,
      '$1/$2'
    );
  }
}