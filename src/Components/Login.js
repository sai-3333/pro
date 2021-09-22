import React, {Component} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Password} from 'primereact/password';
import axios from 'axios';
import { Toast } from 'primereact/toast';


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'rajg',
            password:'',
            errorMsg:''
        }
    }

    userLogin = ()=>{
        let err = ''
        if(!this.state.email){
            err = 'Email'
        }
        if(!this.state.password){
            err += ' Password are missing'
        }
        if(err){
            this.setState({errorMsg:err});
            return;
        }

        axios({
            method:'POST',
            url:' https://amruthmart.com/admin/appapi/index.php/emplogin',
            data:`accid=${this.state.email}&accpwd=${this.state.password}`,
            
            
            config:{ headers: {'Content-Type': "application/x-www-form-urlencoded"}}
        }).then ((res)=>{
            console.log(res.data);
            window.localStorage.setItem('sessdata',JSON.stringify(res.data));
               
            if(res.data.code == '9991'){
                this.setState({errorMsg:res.data.message})
                this.toast.show({severity:'info', summary: 'Info Message', detail:'Message Content', life: 3000});
            }
        })

        .catch((err)=>{})
        .finally(()=>{})

        
         
        
    }

    
     

    render(){
        return (
            <div style={{width:300,height:300,margin:'auto',top:'10%',backgroundColor:'#999',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <Toast ref={this.toast} />
                <h4 style={{color:'#fff'}}>Login Here</h4>
                <p style={{color:'red'}}>{this.state.errorMsg}</p>
                <InputText placeholder="Enter User Id" name="userid" value={this.state.email} 
                onChange = {(e)=>{this.setState({email:e.target.value})}}/>
                <br/>
                <Password placeholder="Enter password" name="password" value={this.state.password} 
                onChange = {(e)=>{this.setState({password:e.target.value})}}/>
                <br/>
                <Button label="Login" onClick={()=>{this.userLogin()}} />

            </div>
        )
    }
}
export default Login