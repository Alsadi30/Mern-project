import Axios from 'axios'
import * as Types from './types'
import jwtDecode from 'jwt-decode'
import setAuthToken from '../../utils/setAuthToken' 

export const register = (user,history) =>{
  return dispatch =>{
      Axios.post('/api/users/register',user)
       .then(res=>{
         dispatch({
           type:'USERS_ERROR', 
           payload:{
            error:{}
        }})
        console.log(res)
        history.push('/login')
       })
       .catch(error=>{
        console.log(error.response)
        console.log(Types.USERS_ERROR)
        dispatch({
          type:'USERS_ERROR',
          payload:{
                error:error.response.data
            }       
        })
       })
  }
} 


export const login = (user,history) => dispatch =>{
  Axios.post('/api/users/login',user)
      .then(res=>{

        let token = res.data.token
        localStorage.setItem('auth_token',token)
        setAuthToken(token)
        let decode  = jwtDecode(token)
           
        dispatch({
          type:'SET_USER',
          payload:{
            user:decode
          }
        })
        history.push('/')
      })
      .catch(e=>{
       
        dispatch({type:'USERS_ERROR',
        payload:{
          error:e.response.data.error
        }})
      })
}


export const  logout = history => {
  localStorage.removeItem('auth_token')
  history.push('/login')
  return{
    type:'SET_USER',
    payload:{
      user:{}
    }
  }

}

