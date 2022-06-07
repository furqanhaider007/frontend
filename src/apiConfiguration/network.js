/* eslint-disable */

// import { showErrorMessage, showSuccessMessage } from '../components/Toast'
import { apiClient, config, multiPartConfig } from './env'

export default {
  any: async (api, params, data) => {
    const token = localStorage.getItem(process.env.REACT_APP_OLX_CLONE_TOKEN_KEY)
    if (token) {
      if (data instanceof FormData) {
        apiClient.setHeaders((await multiPartConfig()).headers)
      } else {
        apiClient.setHeaders((await config()).headers)
      }
    }
    const response = await apiClient.any({
      method: api.method,
      url: api.url,
      params: params,
      data: data
    })

    if (response.ok) {
      if (response.data?.message) console.log(response.data?.message)
      return response.data
    }

    if (response.data.errors) {
      const { errors } = response.data
      let error = Object.keys(errors)[0]
      console.log(errors[`${error}`][0])
      return -1
    }

    if (!response.ok && response.data.message) {
      console.log(response.data.message)
      return -1
    }
  }
}
