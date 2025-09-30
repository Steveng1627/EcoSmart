import * as React from "react"
import { X } from "lucide-react"
import { cn } from "../lib/utils"
import { Button } from "./button"

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

const Modal: React.FC<ModalProps> = ({ 
  open, 
  onOpenChange, 
  children, 
  className 
}) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className={cn(
        "relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 max-h-[90vh] overflow-auto",
        className
      )}>
        {children}
      </div>
    </div>
  )
}

interface ModalHeaderProps {
  children: React.ReactNode
  onClose?: () => void
  className?: string
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ 
  children, 
  onClose, 
  className 
}) => (
  <div className={cn("flex items-center justify-between p-6 border-b", className)}>
    <div className="flex-1">{children}</div>
    {onClose && (
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="ml-4"
      >
        <X className="h-4 w-4" />
      </Button>
    )}
  </div>
)

interface ModalContentProps {
  children: React.ReactNode
  className?: string
}

const ModalContent: React.FC<ModalContentProps> = ({ children, className }) => (
  <div className={cn("p-6", className)}>
    {children}
  </div>
)

interface ModalFooterProps {
  children: React.ReactNode
  className?: string
}

const ModalFooter: React.FC<ModalFooterProps> = ({ children, className }) => (
  <div className={cn("flex items-center justify-end gap-2 p-6 border-t", className)}>
    {children}
  </div>
)

export { Modal, ModalHeader, ModalContent, ModalFooter }
