import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {register} from '../store/actions/authActions'
class Register extends React.Component {
    
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: {}

    }
    
    static getDerivedStateFromProps(nextProps,prevState){
        console.log(nextProps)
        console.log(prevState)
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
        let {name,email,password,confirmPassword} = this.state
        this.props.register({name,email,password,confirmPassword},this.props.history)
    }
    render() {
        let {
            name,
            email,
            password,
            confirmPassword,
            error
        } = this.state
      
        console.log(this.state)
        
       
        return ( 
        < div className = "row" >
            <div className = 'col-md-6 offset-md-3' >
           
            <h1 className = 'text-center display-4' > Register Here </h1> 
           
            <form onSubmit={ this.submitHandler } className='form-control'>
           
            < div className ='form-group'  >
            <label htmlFor = "name" > Name:
            </label> < input type="text" name="name" id="name" className={error.name? 'form-control is-invalid':'form-control'}
            placeholder = "Enter Your Name"
            value = {
                name
            }
            onChange = {
                this.changeHandler
            }
            />
              <div className='invalid-feedback'>
                       {error.name}
                </div>

            </div>
          
            < div className='form-group'>
                
            <label htmlFor = "email" > email:
            
            </label> < input type="email" name="email" id="email" className={error.email? 'form-control is-invalid':'form-control'}
            placeholder = "Enter Your email"
            value={email} 
            
            onChange = {
                this.changeHandler
            }
            />
           {error.email && <div className='invalid-feedback'>
                       {error.email}
                </div>
    }


            </div> 

            


            < div className='from-group'>
                
            <label htmlFor = "password" > password:
            
            </label> < input type="password" name="password" id="password" className={error.password? 'form-control is-invalid':'form-control'}
               
   
            placeholder = "Enter Your password"
            value={password} 
            
            onChange = {                        
                this.changeHandler
            }
            />

<div className='invalid-feedback'>
                       {error.password}
                </div>

         
            </div> 
            
            <div className='form-group'>
                
                <label htmlFor = "confirmPassword" > confirmPassword:
                
                </label> < input type="password" name="confirmPassword" id="confirmPassword" className={error.confirmPassword? 'form-control is-invalid':'form-control'}
                placeholder = "Enter Your confirmPassword"
                value={confirmPassword} 
                
                onChange = {
                    this.changeHandler
                }
                />
                 <div className='invalid-feedback'>
                       {error.confirmPassword}
                </div>
    
                </div> 
               


              <button className='btn btn-primary my-3'>Register</button>
                  
              <Link className='d-block my-3' path="/login"> Have An Account?Login Here</Link>

            </form >


            </div> 
         </div > )
    }
}


const mapStateToProps = state =>({
    auth:state.auth,
    
})



export default connect(mapStateToProps,{register})(Register)