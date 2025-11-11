import type { AxiosError } from 'axios'

import type { ApiError } from '../interfaces/ApiError'

import { showError } from './toast'

export const handleApiError = (error: unknown) => {
  const axiosError = error as AxiosError<ApiError>
  const response = axiosError.response

  if (!response) {
    showError('Network error. Please try again later.')
    return
  }

  const { data, status } = response

  let message = (data as any)?.message || (data as any)?.error || 'Unexpected error.'

  if (status === 422) {
    if ((data as any)?.errors) {
      message = Object.values((data as any).errors)
        .flat()
        .join('\n')
    } else if ((data as any)?.detail) {
      const details = (data as any).detail

      if (Array.isArray(details)) {
        message = details.map((err: any) => err.msg).join('\n')
      } else if (typeof details === 'string') {
        message = details
      }
    }
  }

  showError(message)
}
