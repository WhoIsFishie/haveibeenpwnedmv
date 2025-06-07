import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Affected, Severity } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function severityColor(severity: Severity) {
  switch (severity) {
    case Severity.LOW:
      return "green-500"
    case Severity.MEDIUM:
      return "yellow-500"
    case Severity.HIGH:
      return "orange-500"
    case Severity.CRITICAL:
      return "red-500"
    default:
      return "gray-500"
  }
}

export function isAlwaysChecked(affected?: Affected) {
  return affected === Affected.EVERYONE;
}