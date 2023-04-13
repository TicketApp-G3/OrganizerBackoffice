import React from 'react'
import { Box, Flex, Select, TextInput, useMantineTheme } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import PlacesSearchBox from '../PlacesSearchBox/PlacesSearchBox'
import CustomRichTextEditor from '../CustomRichTextEditor/CustomRichTextEditor'
import CustomDropzone from '../CustomDropzone/CustomDropzone'

const INPUT_SIZE = 'sm'

const BasicEventForm = ({ formState, onSubmit }) => {
  const theme = useMantineTheme()

  return (
    <form
      id="createEventForm"
      onSubmit={formState.onSubmit(() => {}, onSubmit)}
    >
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
          size={INPUT_SIZE}
          {...formState.getInputProps('title')}
        />

        <PlacesSearchBox
          withAsterisk
          label="Ubicación"
          placeholder="Seleccione la ubicación"
          size={INPUT_SIZE}
          {...formState.getInputProps('location')}
        />

        <Select
          withAsterisk
          label="Tipo de evento"
          placeholder="Seleccione el tipo de evento"
          data={[
            { value: 'CONFERENCE', label: 'Conferencia' },
            { value: 'CONCERT', label: 'Concierto' },
            { value: 'DISCOTEC', label: 'Boliche' },
            { value: 'STAND_UP', label: 'Stand Up' },
          ]}
          size={INPUT_SIZE}
          {...formState.getInputProps('type')}
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
            size={INPUT_SIZE}
            {...formState.getInputProps('capacity')}
          />
        </Flex>

        <CustomRichTextEditor
          label="Descripción"
          size={INPUT_SIZE}
          {...formState.getInputProps('description')}
        />

        <CustomDropzone {...formState.getInputProps('images')} />
      </Flex>
    </form>
  )
}

export default BasicEventForm
