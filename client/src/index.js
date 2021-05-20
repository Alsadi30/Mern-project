import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import jwtDecode from 'jwt-decode'
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './store'
import setAuthToken from './utils/setAuthToken';


const token = localStorage.getItem('auth_token')

if(token){
  let decode = jwtDecode(token)
  setAuthToken(token)
  store.dispatch({
    type:'SET_USER',
    payload:{
      user:decode
    }
  })
}


ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


reportWebVitals();
