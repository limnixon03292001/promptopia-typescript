"use client"

import { SessionProvider } from 'next-auth/react'

type Provider = {
  children?: React.ReactNode
  session?: any
}


export default function Provider({ children, session }: Provider) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}
