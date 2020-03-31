import React from 'react'

const ModalPostFormProvider = React.createContext(false)
const ModalProjectFormProvider = React.createContext(false)
const ModalClientFormProvider = React.createContext(false)
const ModalTutorialFormProvider = React.createContext(false)
const ModalUserFormProvider = React.createContext(false)

// You can also import and use it like that

export { 
    ModalPostFormProvider,
    ModalProjectFormProvider,
    ModalClientFormProvider,
    ModalTutorialFormProvider,
    ModalUserFormProvider
}