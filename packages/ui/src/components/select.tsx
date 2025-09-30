import * as React from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "../lib/utils"

export interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  placeholder?: string
  disabled?: boolean
  className?: string
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ value, onValueChange, children, placeholder, disabled, className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false)

    return (
      <div className="relative">
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          onClick={() => setOpen(!open)}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        >
          <span className={cn(!value && "text-muted-foreground")}>
            {value || placeholder}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
        {open && (
          <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-md">
            {children}
          </div>
        )}
      </div>
    )
  }
)
Select.displayName = "Select"

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-1", className)}
    {...props}
  >
    {children}
  </div>
))
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string
    onSelect?: (value: string) => void
  }
>(({ className, children, value, onSelect, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    onClick={() => onSelect?.(value)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <Check className="h-4 w-4" />
    </span>
    {children}
  </div>
))
SelectItem.displayName = "SelectItem"

export { Select, SelectContent, SelectItem }
