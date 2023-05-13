import axios from 'axios'

const API_URL = '/api/users'

const register = async function(user) {
  const response = await axios.post(API_URL, user)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const login = async function(user) {
  const response = await axios.post('/api/auth', user)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  
  return response.data

}

const authService = {
  register,
  login
}

export default authService