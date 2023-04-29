import axios from 'axios'

const apiProvider = () => {
  const baseURL = 'http://localhost:8081'

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
        url: `${baseURL}${url}`,
        data: body,
        ...options,
      })
      onSuccess(data)
    } catch (error) {
      const { status, statusText } = error.response
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

  const getMyEvents = async ({ userId, onSuccess, onFailure }) => {
    request({
      method: 'get',
      url: `/events/own?ownerId=${userId}`,
      onSuccess,
      onFailure,
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
  }
}

export default apiProvider
