import React from 'react'
import { Flex, Select, TextInput, useMantineTheme } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import PlacesSearchBox from '../PlacesSearchBox/PlacesSearchBox'
import CustomRichTextEditor from '../CustomRichTextEditor/CustomRichTextEditor'
import CustomDropzone from '../CustomDropzone/CustomDropzone'

const INPUT_SIZE = 'sm'

const BasicEventForm = ({ formState }) => {
  const theme = useMantineTheme()

  return (
    <form id="createEventForm">
      <Flex
        direction="column"
        gap={16}
        className="formContainer"
        style={{ borderColor: theme.colors.gray[5] }}
      >
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
            { value: 'CONFERENCE', label: 'Conferencia' },
            { value: 'CONCERT', label: 'Concierto' },
            { value: 'DISCOTEC', label: 'Boliche' },
            { value: 'STAND_UP', label: 'Stand Up' },
          ]}
          size={INPUT_SIZE}
        />

        <Flex gap={16} justify="space-between">
          <DateTimePicker
            w="100%"
            label="Fecha de inicio del evento"
            withAsterisk
            placeholder="Seleccione una fecha"
            locale="es"
            labelProps={{ size: 14 }}
            size="xs"
            {...formState.getInputProps('dateTime')}
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

        <CustomDropzone {...formState.getInputProps('images')} />
      </Flex>
    </form>
  )
}

export default BasicEventForm
