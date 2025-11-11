import type { AxiosError } from 'axios'

import type { ApiError } from '../interfaces/ApiError'

import { showError } from './toast'

export const handleApiError = (error: unknown) => {
  // garante que eh um erro do axios
  const axiosError = error as AxiosError<ApiError>
  const response = axiosError.response

  if (!response) {
    showError('Network error. Please try again later.')
    return
  }

  const { data, status } = response

  let message = data?.message || 'Unexpected error.'

  // tratamento especial para validaçao (422)
  if (status === 422 && data?.errors) {
    message = Object.values(data.errors).flat().join('\n')
  }

  showError(message)
}
