import * as React from "react"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
}

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus:ring-gray-300 ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}

export function SelectTrigger({ className, children, ...props }: SelectProps) {
  return (
    <div
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus:ring-gray-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function SelectContent({ className, children, ...props }: SelectProps) {
  return (
    <div
      className={`relative mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-950 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function SelectItem({ className, children, ...props }: SelectProps) {
  return (
    <div
      className={`relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function SelectValue({ className, children, ...props }: SelectProps) {
  return (
    <span className={`block truncate ${className}`} {...props}>
      {children}
    </span>
  )
}
