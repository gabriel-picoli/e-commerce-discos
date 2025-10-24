import axios from 'axios'

const getCsrfCookie = async () => {
  await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
    withCredentials: true,
    withXSRFToken: true
  })
}

export default getCsrfCookie
