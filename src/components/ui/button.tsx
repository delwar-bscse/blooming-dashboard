import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        paginationButton: "bg-[#D9DAD4] hover:bg-[#828D97] text-white shadow-xs rounded-full cursor-pointer",
        paginationButtonActive: "bg-[#828D97] text-white shadow-xs rounded-full cursor-pointer",
        paginationGhostButton: "bg-transparent rounded-full hover:text-gray-500 hover:bg-transparent text-gray-700",
        paginationGhostButtonDisable: "bg-transparent rounded-full text-gray-500 hover:bg-transparent",
        outlineRed: "bg-transparent border-2 border-red-800 hover:border-red-600 rounded-md text-red-800 hover:text-red-500 transition-colors duration-300 cursor-pointer",
        btnGreen: "bg-green-800 hover:bg-green-700 rounded-md text-gray-50 hover:text-gray-100 transition-colors duration-300 cursor-pointer",
        customYellow: "bg-[#FFECAC] text-gray-700 hover:text-gray-600 shadow-xs hover:bg-[#FFECAC]/80 text-base cursor-pointer shadow-sm",
        customWhite: "bg-white text-gray-950 hover:text-gray-700 shadow-xs  text-base cursor-pointer shadow-sm",
        customOutline: "bg-transparent text-gray-50 hover:text-gray-200 text-base cursor-pointer",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        lgw: "h-10 rounded-md px-16 has-[>svg]:px-4",
        icon: "size-9",
        paginationIcon: "size-12",
        llg: "h-11 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-12 rounded-md px-10 has-[>svg]:px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
