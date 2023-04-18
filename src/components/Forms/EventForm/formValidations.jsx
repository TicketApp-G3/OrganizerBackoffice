export const requiredField = (field) =>
  !field ? 'Este campo es requerido' : ''

export const capacityValidation = (capacity) =>
  capacity <= 0 ? 'La cantidad de entradas tiene que ser positivo' : ''

export const locationValidation = ({ latitude }) =>
  !latitude ? 'Este campo es requerido' : ''
