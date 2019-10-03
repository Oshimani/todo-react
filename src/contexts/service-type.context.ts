import React from 'react'

const ServiceTypeContext = React.createContext('')

export const ServiceTypeProvider = ServiceTypeContext.Provider
export const ServiceTypeConsumer = ServiceTypeContext.Consumer
export default ServiceTypeContext