import React from 'react'
import { Flex, Select, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import PlacesSearchBox from '../PlacesSearchBox/PlacesSearchBox'
import CustomRichTextEditor from '../CustomRichTextEditor/CustomRichTextEditor'
import CustomDropzone from '../CustomDropzone/CustomDropzone'

const INPUT_SIZE = 'md'

const BasicEventForm = ({ formState }) => {
  return (
    <>
      <TextInput
        withAsterisk
        label="Título"
        placeholder="Ingrese el título del evento"
        {...formState.getInputProps('title')}
        size={INPUT_SIZE}
      />

      <PlacesSearchBox
        label="Ubicación"
        withAsterisk
        placeholder="Seleccione la ubicación"
        {...formState.getInputProps('location')}
        size={INPUT_SIZE}
      />

      <Select
        label="Tipo de evento"
        withAsterisk
        placeholder="Seleccione el tipo de evento"
        {...formState.getInputProps('type')}
        data={[
          { value: 'react', label: 'React' },
          { value: 'ng', label: 'Angular' },
          { value: 'svelte', label: 'Svelte' },
          { value: 'vue', label: 'Vue' },
        ]}
        size={INPUT_SIZE}
      />

      <Flex gap={16} justify="space-between">
        <DatePickerInput
          w="100%"
          label="Fecha de inicio del evento"
          withAsterisk
          placeholder="Seleccione una fecha"
          locale="es"
          labelProps={{ size: 16 }}
          {...formState.getInputProps('date')}
        />

        <TextInput
          w="100%"
          withAsterisk
          label="Cantidad de entradas"
          type="number"
          placeholder="Ingrese una cantidad"
          {...formState.getInputProps('capacity')}
          size={INPUT_SIZE}
        />
      </Flex>

      <CustomRichTextEditor
        label="Descripción"
        {...formState.getInputProps('description')}
        size={INPUT_SIZE}
      />

      <CustomDropzone />
    </>
  )
}

export default BasicEventForm
