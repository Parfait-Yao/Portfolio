"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // On utilise suppressHydrationWarning car next-themes injecte un script dans le head
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}
