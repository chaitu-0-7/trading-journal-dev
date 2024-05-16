"use cllient"

import {ThemeProvider} from "next-themes"

function Providers ({children}: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <ThemeProvider attribute="class">{children}</ThemeProvider>
  )
}

export default Providers