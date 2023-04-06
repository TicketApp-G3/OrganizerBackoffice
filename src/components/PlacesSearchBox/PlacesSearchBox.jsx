import React from 'react'
import { TextInput } from '@mantine/core'

const PlacesSearchBox = ({
  label,
  onChange,
  withAsterisk,
  placeholder,
  size,
}) => {
  const handleSearch = ({ target }) => {
    const searchBox = new window.google.maps.places.SearchBox(target)

    searchBox.addListener('places_changed', () => {
      const place = searchBox.getPlaces()

      onChange({
        address: place[0].formatted_address,
        lat: place[0].geometry.location.lat(),
        long: place[0].geometry.location.lng(),
      })
    })
  }

  return (
    <div>
      <TextInput
        withAsterisk={withAsterisk}
        label={label}
        placeholder={placeholder}
        onChange={handleSearch}
        size={size}
      />
    </div>
  )
}
export default PlacesSearchBox
