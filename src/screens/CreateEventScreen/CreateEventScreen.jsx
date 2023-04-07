import React from 'react'
import './CreateEventScreenStyles.css'
import { useForm } from '@mantine/form'
import { Button, Flex, Group, Select, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'

import Dropzone from 'react-dropzone'
import CustomRichTextEditor from '../../components/CustomRichTextEditor/CustomRichTextEditor'
import PlacesSearchBox from '../../components/PlacesSearchBox/PlacesSearchBox'
import CustomDropzone from '../../components/CustomDropzone/CustomDropzone'

const INPUT_SIZE = 'md'

const CreateEventScreen = () => {
  const form = useForm({
    initialValues: {
      title: '',
      type: '',
      date: '',
      description: '',
      capacity: '',
      location: {
        address: '',
        lat: '',
        long: '',
      },
      status: 'draft',
      images: [],
    },
  })

  // const [locationOptions, setlocationOptions] = useState([])
  // const [debounceValue, setDebounceValue] = useDebouncedState('', 500)

  // const handleSearch = (value) => {
  //   form.getInputProps('location').onChange(value)

  //   fetch(
  //     `https://api.tomtom.com/search/2/search/${value}.json?key=koArM98AtMrQE2IT7n4UqjyGIC2ZtOGF&countrySet=ARG&language=es-419`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Mapear los resultados de la API a un array de opciones para el componente Autocomplete
  //       const newOptions = data.results.map(({ type, address }) => ({
  //         value: address.freeformAddress,
  //         label: address.freeformAddress,
  //       }))
  //       console.log(newOptions)
  //       setlocationOptions(newOptions)
  //     })
  //     .catch((error) => console.log(error))
  // }

  return (
    <div className="container">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Título"
          placeholder="Ingrese el título del evento"
          {...form.getInputProps('title')}
          size={INPUT_SIZE}
        />

        <PlacesSearchBox
          label="Ubicación"
          withAsterisk
          placeholder="Seleccione la ubicación"
          {...form.getInputProps('location')}
          size={INPUT_SIZE}
        />

        <Select
          label="Tipo de evento"
          withAsterisk
          placeholder="Seleccione el tipo de evento"
          {...form.getInputProps('type')}
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
            {...form.getInputProps('date')}
          />

          <TextInput
            w="100%"
            withAsterisk
            label="Cantidad de entradas"
            type="number"
            placeholder="Ingrese una cantidad"
            {...form.getInputProps('capacity')}
            size={INPUT_SIZE}
          />
        </Flex>

        <CustomRichTextEditor
          label="Descripción"
          {...form.getInputProps('description')}
          size={INPUT_SIZE}
        />

        <CustomDropzone />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </div>
  )
}

export default CreateEventScreen
