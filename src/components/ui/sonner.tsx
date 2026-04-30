"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon, Check } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-right"
      className="toaster group"
      icons={{
        success: (
          <Check className="size-4.5 text-emerald-500" />
        ),
        info: <InfoIcon className="size-4.5" />,
        warning: <TriangleAlertIcon className="size-4.5" />,
        error: <OctagonXIcon className="size-4.5" />,
        loading: <Loader2Icon className="size-4.5 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--gray-800)",
          "--normal-text": "#ffffff",
          "--normal-border": "transparent",
          "--border-radius": "0px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "!w-[400px] !min-h-[47px] !bg-[var(--gray-800)] !text-white !shadow-[0px_6px_13.1px_4px_rgba(0,0,0,0.1)] !rounded-none !p-4 !gap-[10px]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
