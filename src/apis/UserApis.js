import axios from 'axios';
import axiosInstance from './AxiosInstance';

// export const getUser = (id) => {
//   return fetch(`localhost:4000/users/${id}`)
// }
    
export const createUser = (userInfo) => {

const newUser = JSON.stringify({"user": {
    "username": `${userInfo.username}`,
    "firstname": `${userInfo.firstname}`,
    "lastname": `${userInfo.lastname}`,
    "email": `${userInfo.email}`,
    "password": `${userInfo.password}`
  }
})
console.log(newUser)
  const response = axiosInstance.post(`http://localhost:4000/signup`, newUser, {
      headers: {"Content-Type": "application/json"}})
      .then((response) => console.log(response))
      .catch((error) => console.log(`This is the error: ${error}`))

  // return response.data
}

export const createUserToken = (userInfo) => {
  
  const userDetails = JSON.stringify({"user": {
    "email": `${userInfo.email}`,
    "password": `${userInfo.password}`
  }})
  // console.log(userDetails)
    const response = axiosInstance.post(`http://localhost:4000/login`, userDetails, {
      headers: {"Content-Type": "application/json"}})
      .then((response) => console.log(response.data))
      .catch((error) => console.log(`This is the error: ${error}`))
    
    // return response.data
}