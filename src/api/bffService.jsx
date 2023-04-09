import axios from 'axios'

const apiProvider = () => {
  const baseURL = 'http://localhost:8080/'

  const request = async ({
    method,
    url,
    body = null,
    options = {},
    onSuccess = () => {},
    onFailure = () => {},
  }) => {
    try {
      const { data, status, statusText } = await axios({
        method,
        url: `${baseURL}${url}`,
        data: body,
        ...options,
      })
      return status === 200
        ? onSuccess(data)
        : onFailure({ status, statusText })
    } catch (error) {
      throw error.response.data
    }
  }

  const createEvent = async (eventData, onSuccess, onFailure) => {
    request({
      method: 'post',
      url: 'events',
      data: eventData,
      onSuccess,
      onFailure,
    })
  }

  const health = async () => {
    request({
      method: 'get',
      url: 'health',
      onSuccess: () => console.log('BFF CONECTION: OK'),
      onFailure: () => console.log('BFF CONECTION: FAIL'),
    })
  }

  return {
    health,
    createEvent,
  }
}

export default apiProvider
