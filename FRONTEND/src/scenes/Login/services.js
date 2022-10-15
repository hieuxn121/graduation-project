import { hieuAxios } from '../../config/axios'
import axios from 'axios'
const loginApi = {}
loginApi.createNewUser = (input) => {
  fetch('http://localhost:3003/auth/signup', {
    method: "POST",
    body: JSON.stringify(
      {
        email: input.email,
        password: input.password,
        name: input.name,
      }
    ),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.json()
  })
    .then(json => console.log(json))
}
loginApi.getUsers = async () => {
  try {
    const users = await hieuAxios.get('https://fakestoreapi.com/users')
    return users;
  } catch (error) {
    return error
  }
}
loginApi.loginAcc = async (input) => {
  try {
      let result = []
          result = await axios({
              method: 'post',
              url: "http://localhost:3002/api/v1/login",
              headers: {}, 
              data: {
                  ...input
              }
          });
      return result;  
  } catch (error) {
      return error
  }
}
export default loginApi;