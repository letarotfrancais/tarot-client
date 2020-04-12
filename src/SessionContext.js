import { createContext } from 'react'

const SessionContext = createContext()

export const SessionProvider = SessionContext.Provider
export const SessionConsumer = SessionContext.Consumer

export default SessionContext