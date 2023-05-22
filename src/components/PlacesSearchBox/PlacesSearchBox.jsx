import React, { useState } from 'react'
import { Loader, TextInput } from '@mantine/core'
import { useJsApiLoader, GoogleMap, MarkerF } from '@react-google-maps/api'

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
  const { latitude, longitude, address } = value
  const [location, setLocation] = useState({
    latLng: {
      lat: latitude || -34.603722,
      lng: longitude || -58.381592,
    },
    address,
  })

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
  })

  const handleSearch = ({ target }) => {
    const searchBox = new window.google.maps.places.SearchBox(target)

    searchBox.addListener('places_changed', () => {
      const place = searchBox.getPlaces()
      const lat = place[0].geometry.location.lat()
      const lng = place[0].geometry.location.lng()
      const formatAddress = `${place[0].name}, ${place[0].vicinity}`

      const latLng = new window.google.maps.LatLng(lat, lng)
      setLocation({ latLng, address: formatAddress })

      onChange({
        latitude: lat,
        longitude: lng,
        address: formatAddress,
      })
    })
  }

  return (
    <div>
      <TextInput
        withAsterisk={withAsterisk}
        label={label}
        disabled={disabled}
        defaultValue={location.address}
        placeholder={placeholder}
        onChange={handleSearch}
        size={size}
        error={error}
      />
      {!isLoaded ? (
        <Loader />
      ) : (
        <GoogleMap
          center={location.latLng}
          zoom={16}
          mapContainerStyle={{ margin: '20px 0', width: '100%', height: 250 }}
          options={{
            scrollwheel: true,
            streetViewControl: false,
            zoomControl: false,
            mapTypeControl: false,
            draggable: false,
          }}
        >
          <MarkerF position={location.latLng} />
        </GoogleMap>
      )}
    </div>
  )
}
export default PlacesSearchBox
