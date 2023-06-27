import { PropsWithChildren, createContext, useContext, useState } from 'react'

type ShowFormContextType = {
  showForm: boolean
  titleButton: string
}

type ShowFormState = {
  showFormState: ShowFormContextType
  setShowFormState(showFormState: ShowFormContextType): void
}

const ShowFormContext = createContext<ShowFormState | null>(null)

const useShowFormContext = (): ShowFormState => {
  const context = useContext(ShowFormContext)

  if (!context) {
    throw new Error('Please use ThemeProvider in parent component')
  }

  return context
}

export const ShowFormProvider = ({ children }: PropsWithChildren) => {
  const [showFormState, setShowFormState] = useState<ShowFormContextType>({
    showForm: false,
    titleButton: 'Adicionar',
  })

  return (
    <ShowFormContext.Provider value={{ showFormState, setShowFormState }}>
      {children}
    </ShowFormContext.Provider>
  )
}

export default useShowFormContext
