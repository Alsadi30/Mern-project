import React from 'react'
import {Link} from 'react-router-dom'
import {login} from '../store/actions/authActions'
import {connect} from 'react-redux'

class Login extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: {}

    }


    static getDerivedStateFromProps(nextProps,prevState){
        if(JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.error)){
            return {
                error:nextProps.auth.error
            }
        }
        return null
    }




    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    submitHandler = event => {
        event.preventDefault()

        this.props.login({
            email:this.state.email,
            password:this.state.password
        }, this.props.history)

    }

   
    render() {
        let {
           
            email,
            password,
            error
        } = this.state
 
      
      
        return ( 
        < div className = "row" >
            <div className = 'col-md-6 offset-md-3'>
           
            <h1 className = 'text-center display-4' > Login Here </h1> 
           
            <form onSubmit={ this.submitHandler }>
           
           
            < div className="form-group">
                
            <label htmlFor = "email" > email:
            
            </label> < input type="email" name="email" id="email" className={error.email?'form-control is-invalid':'form-control'}
            placeholder = "Enter Your email"
            value={email} 
            
            onChange = {
                this.changeHandler
            }
            />

<div className='invalid-feedback'>
                       {error.email}
                </div>

            </div> 

            < div className="form-group">
                
            <label htmlFor = "password" > password:
            
            </label> < input type="password" name="password" id="password" className={error.password?'form-control is-invalid':'form-control'}
            placeholder = "Enter Your password"
            value={password} 
            
            onChange = {
                this.changeHandler
            }
            />

           {error.password && <div className='invalid-feedback'>
                       {error.password}
                </div>
 }
            </div> 


         
    
              
              <button className='btn btn-primary my-3'>Login</button>

            <Link className='d-block my-3' path="/register">Dont Have An Account?Register Here</Link>

            </form >

            </div> 
         </div > )
    }
}

const mapStateToProps =(state)=>({
    auth:state.auth
})


export default connect(mapStateToProps,{login})(Login) 