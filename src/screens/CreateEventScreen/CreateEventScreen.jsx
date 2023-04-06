import React from 'react'
import './CreateEventScreenStyles.css'
import { useForm } from '@mantine/form'
import { Button, Group, Select, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'

import CustomRichTextEditor from '../../components/CustomRichTextEditor/CustomRichTextEditor'
import PlacesSearchBox from '../../components/PlacesSearchBox/PlacesSearchBox'

const CreateEventScreen = () => {
  const form = useForm({
    initialValues: {
      title: '',
      type: '',
      startDate: '',
      description: '',
      location: {
        address: '',
        latitude: '',
        longitude: '',
      },
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
        />

        <CustomRichTextEditor
          label="Descripción"
          {...form.getInputProps('description')}
        />

        <DatePickerInput
          label="Fecha de inicio del evento"
          withAsterisk
          placeholder="Seleccione una fecha"
          {...form.getInputProps('startDate')}
          locale="es"
        />

        <PlacesSearchBox {...form.getInputProps('location')} />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </div>
  )
}

export default CreateEventScreen
