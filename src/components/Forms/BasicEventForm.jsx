import React from 'react'
import { Flex, Select, TextInput, useMantineTheme } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import PlacesSearchBox from '../PlacesSearchBox/PlacesSearchBox'
import CustomRichTextEditor from '../CustomRichTextEditor/CustomRichTextEditor'
import CustomDropzone from '../CustomDropzone/CustomDropzone'

const INPUT_SIZE = 'sm'

const BasicEventForm = ({ formState, onSubmit, canEdit }) => {
  const theme = useMantineTheme()

  const handleSubmit = (errors, values) => {
    const hasErrors = Object.values(errors).some((error) => !!error)
    onSubmit(errors, values, hasErrors)
  }

  return (
    <form
      id="createEventForm"
      onSubmit={formState.onSubmit(() => {}, handleSubmit)}
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
          disabled={!canEdit}
          {...formState.getInputProps('title')}
        />

        <PlacesSearchBox
          withAsterisk
          label="Ubicación"
          placeholder="Seleccione la ubicación"
          size={INPUT_SIZE}
          {...formState.getInputProps('location')}
          value={formState.values.location.address}
        />

        <Flex
          gap={16}
          direction={{ 0: 'column', md: 'row' }}
          justify="space-between"
        >
          <Select
            withAsterisk
            label="Tipo de evento"
            w="100%"
            placeholder="Seleccione el tipo de evento"
            data={[
              { value: 'CONFERENCE', label: 'Conferencia' },
              { value: 'CONCERT', label: 'Concierto' },
              { value: 'DISCOTEC', label: 'Boliche' },
              { value: 'STAND_UP', label: 'Stand Up' },
            ]}
            size={INPUT_SIZE}
            disabled={!canEdit}
            {...formState.getInputProps('type')}
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

        <Flex
          gap={16}
          direction={{ 0: 'column', md: 'row' }}
          justify="space-between"
        >
          <DateTimePicker
            w="100%"
            label="Fecha de inicio del evento"
            withAsterisk
            placeholder="Seleccione una fecha"
            locale="es"
            hideOutsideDates
            minDate={new Date()}
            maxDate={formState.values.timeTo}
            labelProps={{ size: 14 }}
            size="xs"
            {...formState.getInputProps('timeFrom')}
          />

          <DateTimePicker
            w="100%"
            label="Fecha de finalización del evento"
            withAsterisk
            placeholder="Seleccione una fecha"
            locale="es"
            hideOutsideDates
            minDate={formState.values.timeFrom || new Date()}
            labelProps={{ size: 14 }}
            size="xs"
            {...formState.getInputProps('timeTo')}
          />
        </Flex>

        <CustomRichTextEditor
          label="Descripción"
          size={INPUT_SIZE}
          {...formState.getInputProps('description')}
        />

        <CustomDropzone
          initialImages={formState.values.images}
          {...formState.getInputProps('images')}
        />
      </Flex>
    </form>
  )
}

export default BasicEventForm
