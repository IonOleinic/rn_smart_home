import axios from 'axios'

const serverURL = 'http://192.168.12.108'
// const serverURL = 'http://192.168.1.188'

const serverPort = '5000'

export default axios.create({
  baseURL: `${serverURL}:${serverPort}`,
  timeout: 3000,
  withCredentials: true,
})

export const axiosPrivate = axios.create({
  baseURL: `${serverURL}:${serverPort}`,
  timeout: 3000,
  withCredentials: true,
})

export { serverURL }
export { serverPort }
