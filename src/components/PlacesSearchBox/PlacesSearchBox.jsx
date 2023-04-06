import React from 'react'
import { Input } from '@mantine/core'

const PlacesSearchBox = ({ onChange }) => {
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
      <Input onChange={handleSearch} />
    </div>
  )
}
export default PlacesSearchBox
