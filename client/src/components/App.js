
import '../App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Home from '../pages/Home'
import Register from '../pages/register'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Navigation from './Navigation';



function App() {
  return (
   <BrowserRouter>
   <div className='App'>
     <Navigation/>
     <Switch>
       <Route path='/' exact component={Home} />
       <Route path='/login'  component={Login} />
       <Route path='/register'  component={Register} />
       <Route path='/dashboard'  component={Dashboard} />
     </Switch>
   </div>
  
   </BrowserRouter>
   
  );
}

export default App;
