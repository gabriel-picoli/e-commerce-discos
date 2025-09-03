import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api/'

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // referencia cookies httponly
  withXSRFToken: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.reponse) {
      const status = error.response.status

      switch (status) {
        case 400:
          console.error('Erro de requisição', error.response.data)

          break

        case 401:
          console.warn('Não autorizado. Redirecionando para o login')

          break

        case 403:
          console.error('Acesso negado')

          break

        case 404:
          console.error('Recurso não encontrado')

          break

        case 500:
          console.error('Erro interno do servidor')

          break

        default:
          console.error('Erro inesperado', error.response.data)
      }
    } else {
      console.error('Erro de rede ou servidor indisponível', error.response.data)
    }

    return Promise.reject(error) // react query captura
  }
)

export default api
