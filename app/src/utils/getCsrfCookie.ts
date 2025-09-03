import axios from 'axios'

const getCsrfCookie = async () => {
  const response = await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
    withCredentials: true,
    withXSRFToken: true
  })

  console.log(response)
}

export default getCsrfCookie
