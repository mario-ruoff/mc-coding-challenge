import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getEnumKeys(enumObject: object) {
  return Object.keys(enumObject).filter(key => isNaN(Number(key)));
}

export function getTrueDict(list: string[]) {
  const enumDict: { [key: string]: boolean } = {};
  list.forEach((key) => {
    enumDict[key] = true
  })
  return enumDict
}