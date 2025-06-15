"use client"
import createApolloClient from "@/apollo/client"
import { ApolloProvider } from "@apollo/client"
import { SessionProvider } from "next-auth/react"
import { FC, ReactNode } from "react"

interface ProvidersProps {
  children: ReactNode
}

const client = createApolloClient();

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </ApolloProvider>
  )
}

export default Providers