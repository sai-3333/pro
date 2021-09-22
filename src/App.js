
import React,{Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
 import Contact from './Components/Contact';
import Services from './Components/Services';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
 import 'primereact/resources/themes/saga-blue/theme.css';
 import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component{
  constructor(props){
  super(props)
 this.state = {
   currscreen:"Home"
 } 
}
render(){
  return  (
     <BrowserRouter> 
     <Navbar/> 
     <div>
       <Route exact path="/home" component={Home}/>
       <Route exact path="/about" component={About}/>
       <Route exact path="/contact" component={Contact}/>
       <Route exact path="/services" component={Services}/>
       <Route exact path="/login" component={Login}/>
     
     </div>
     
     </BrowserRouter>
)
}
  }