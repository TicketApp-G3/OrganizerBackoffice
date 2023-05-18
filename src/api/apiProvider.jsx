import { notifications } from '@mantine/notifications'
import axios from 'axios'

const apiProvider = () => {
  const token = localStorage.getItem('token')

  const request = async ({
    method,
    url,
    body = null,
    options = {},
    onSuccess = () => {},
    onFailure = () => {},
  }) => {
    try {
      const { data } = await axios({
        method,
        url: `${import.meta.env.VITE_BFF_BASE_URL}${url}`,
        data: body,
        headers: { Authorization: token, 'ngrok-skip-browser-warning': true },
        ...options,
      })
      onSuccess(data)
    } catch (error) {
      const { status, statusText } = error.response
      if (status === 401) {
        notifications.show({
          title: 'Esta cuenta esta bloqueada',
          color: 'red',
        })
      }
      onFailure({ status, statusText })
      console.error('Error Code: ', status, ' Message: ', statusText)
    }
  }

  const createEvent = async ({ eventData, onSuccess, onFailure }) => {
    request({
      method: 'post',
      url: '/events',
      body: eventData,
      onSuccess,
      onFailure,
    })
  }

  const editEvent = async ({ eventId, eventData, onSuccess, onFailure }) => {
    request({
      method: 'patch',
      url: `/events/${eventId}`,
      body: eventData,
      onSuccess,
      onFailure,
    })
  }

  const login = async ({ userData, onSuccess, onFailure }) => {
    localStorage.setItem('token', `Bearer ${userData.userId}`)
    request({
      method: 'post',
      url: '/users',
      body: userData,
      onSuccess,
      onFailure,
    })
  }

  const getMyEvents = async ({ userId, onSuccess, onFailure }) => {
    request({
      method: 'get',
      url: `/events/own?ownerId=${userId}`,
      onSuccess,
      onFailure,
      options: {},
    })
  }

  const getEventById = async ({ eventId, onSuccess, onFailure }) => {
    request({
      method: 'get',
      url: `/events/${eventId}`,
      onSuccess,
      onFailure,
    })
  }

  const publishEvent = async ({ eventId, onSuccess, onFailure }) => {
    request({
      method: 'post',
      url: `/events/${eventId}/publish`,
      onSuccess,
      onFailure,
    })
  }

  const cancelEvent = async ({ eventId, onSuccess, onFailure }) => {
    request({
      method: 'post',
      url: `/events/${eventId}/cancel`,
      onSuccess,
      onFailure,
    })
  }

  const health = async () => {
    request({
      method: 'get',
      url: '/health',
      onSuccess: () => console.log('BFF CONECTION: OK'),
      onFailure: () => console.log('BFF CONECTION: FAIL'),
    })
  }

  return {
    health,
    createEvent,
    editEvent,
    getMyEvents,
    getEventById,
    publishEvent,
    cancelEvent,
    login,
  }
}

export default apiProvider
