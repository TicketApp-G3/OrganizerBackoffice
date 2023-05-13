import React from 'react'
import { TextInput } from '@mantine/core'

const PlacesSearchBox = ({
  label,
  onChange,
  withAsterisk,
  placeholder,
  disabled,
  size,
  error,
  value,
}) => {
  const handleSearch = ({ target }) => {
    const searchBox = new window.google.maps.places.SearchBox(target)

    searchBox.addListener('places_changed', () => {
      const place = searchBox.getPlaces()

      onChange({
        address: place[0].formatted_address,
        latitude: place[0].geometry.location.lat(),
        longitude: place[0].geometry.location.lng(),
      })
    })
  }

  return (
    <div>
      <TextInput
        withAsterisk={withAsterisk}
        label={label}
        disabled={disabled}
        defaultValue={value}
        placeholder={placeholder}
        onChange={handleSearch}
        size={size}
        error={error}
      />
    </div>
  )
}
export default PlacesSearchBox
