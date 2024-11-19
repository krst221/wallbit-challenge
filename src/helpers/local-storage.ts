import { toast } from "sonner"

export const saveToLocalStorage = <T,>(data: { [key: string]: T }) => {
  try {
    const key = Object.keys(data)[0]
    const value = data[key]
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    if (error instanceof Error) toast.error('Error saving to localStorage:' + error)
    else toast.error('Error saving to localStorage')
  }
}