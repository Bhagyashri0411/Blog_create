const storeToken = (value) => {
  if (value) {
    // console.log("Store Token")
    const { access, refresh, name } = value
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
    localStorage.setItem('name', name)
    
  }
}

const getToken = () => {
  let access_token = localStorage.getItem('access_token')
  let name = localStorage.getItem('name')
  let refresh_token = localStorage.getItem('refresh_token')
  console.log(name);
  return { access_token, refresh_token, name }
}

const removeToken = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('name')
}

export { storeToken, getToken, removeToken }