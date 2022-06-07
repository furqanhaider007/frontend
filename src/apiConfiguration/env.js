/* eslint-disable */

import { create } from 'apisauce'

export const config = async () => {
  const token = await localStorage.getItem(process.env.REACT_APP_OLX_CLONE_TOKEN_KEY)
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  }
}

export const multiPartConfig = async () => {
  const token = await localStorage.getItem(process.env.REACT_APP_OLX_CLONE_TOKEN_KEY)
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'multipart/form-data/json'
    }
  }
}

export const apiClient = create({
  baseURL: process.env.REACT_APP_OLX_CLONE_API_KEY
})
