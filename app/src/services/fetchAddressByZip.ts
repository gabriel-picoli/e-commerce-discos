import axios from 'axios'

export const fetchAddressByZip = async (zip: string) => {
  const cleanZip = zip.replace(/\D/g, '')

  const { data } = await axios.get(`https://viacep.com.br/ws/${cleanZip}/json/`)

  return data
}
