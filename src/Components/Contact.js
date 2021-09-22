import React, {Component} from 'react';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import {Button} from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';


class Contact extends Component {

    constructor(props){
        super(props);
        this.state = {
            showDelDialog:false,
            op: 'NEW',
            selectedRow:{},
            errmsg:'',
            userList:[],
            showSpinner:true,
            showAddDialog:false,
            userobj: {
                firstname:'',
                lastname:'',
                email:'',
                accid:'',
                accpwd:'',
                mblphone:''

            }
           
        }
    }

    componentDidMount(){
        console.log('this is componentDidMount');
        this.getData();
        
    }

    getData = () => {
        axios({
            method:'POST',
            url: 'https://sportnspark.com/appapi/index.php/listofusers',
            config:{ headers: {'Content-Type': 'application/json'}},
            data:{}

        }).then((res)=>{
            console.log(res.data);
            if(res.data.code == '999'){
                this.setState({userList:res.data.userlist,selectedRow:res.data.userlist[0]})
            }

        }).catch((err)=>{ 
            console.log(err)
        }).finally(()=>{
            this.setState({showSpinner:false})
        })
       
    }

    saveUser = () => {
        this.setState({errmsg:''})
        let userobj = this.state.userobj

        let errmsg = "";
        if(!userobj.firstname){
            errmsg += 'First Name, '
        }
        if(!userobj.lastname){
            errmsg += 'Last Name, '
        }
        if(!userobj.accid){
            errmsg += 'User Id, '
        }

        if(!userobj.accpwd){
            errmsg += 'User Password, '
        }
        if(!userobj.email){
            errmsg += 'User Email, '
        }
        if(!userobj.mblphone){
            errmsg += 'User Phone,'
        }

        
        
        if(errmsg){
            let commCount = 0;
        for(let i=0; i<errmsg.length; i++){
            if(errmsg[i] == ","){
                commCount +=1;
            }
            
            
        }
            
        errmsg = errmsg.trim();
            errmsg = errmsg.substr(0,errmsg.length-1)
            if(commCount > 1)
            errmsg += ' are missing, Please check';
            else 
            errmsg += ' is missing, Please check';

            this.setState({errmsg:errmsg})
            return;
        }
        
        
        // validations 
        
        if (this.state.op == 'NEW'){
        axios({
            method:'POST',
            url: 'https://sportnspark.com/appapi/index.php/insertuser',
            config:{ headers: {'Content-Type': 'application/json'}},
            data:this.state.userobj


        }). then((res)=>{

            this.setState({showAddDialog:false})
            let currRow=0;
            for(let i=0; i<this.state.userList.length; i++){
                if(this.state.userList[i].empid == this.state.selectedRow.empid){
                    currRow = i; break;
                }
            }
            console.log(currRow)
            this.state.userList.splice(currRow,0,res.data.data);
            this.setState({selectedRow:res.data.data})
            //this.getData();
            console.log(res.data.data);
        }).catch((err)=>{ 
            console.log(err)
        }).finally(()=>{
            this.setState({showSpinner:false})
        })
    } else {

        axios({
            method:'POST',
            url: 'https://sportnspark.com/appapi/index.php/updateuser',
            config:{ headers: {'Content-Type': 'application/json'}},
            data:this.state.userobj


        }). then((res)=>{
            this.setState({showAddDialog:false})

        }).catch((err)=>{ console.log(err)})
        .finally(()=>{})

    }
       
    }

    addDialogFooter = () => {
        return(
            <>
            <Button label="Cancel" onClick={()=>{this.setState({showAddDialog:false})}} style={{marginRight:8}}/>
            <Button label="Save"   onClick={()=>{this.saveUser()}} style={{marginRight:8}}/>
            </>
        )
    }

    showDialog = (op) => {
        if(op == 'EDIT'){

            this.state.userobj = this.state.selectedRow;
            console.log(this.state.userobj)
            this.setState({userobj:this.state.userobj,showAddDialog:true,op:op})
        }else {
            this.state.userobj = {
                firstname:'',
                lastname:'',
                email:'',
                accid:'',
                accpwd:'',
                mblphone:'',
                empid:''

            }

            this.setState({userobj:this.state.userobj,showAddDialog:true,op:op})

        } 

    }

    deleteUser = () => {

        axios({
            method:'POST',
            url:'https://sportnspark.com/appapi/index.php/deleteuser',
            data:this.state.selectedRow,
            config: {header:{'Content-Type':'application/json'}}
        }).then((res)=>{
            
            
            console.log(res);
            let currRow=0;
            for(let i=0; i<this.state.userList.length; i++){
                if(this.state.userList[i].empid == this.state.selectedRow.empid){
                    currRow = i; break;
                }
            }
            console.log(currRow)
            this.state.userList.splice(currRow,1);
            
            this.setState({showDelDialog:false,userList:this.state.userList,
                selectedRow:this.state.userList[currRow] ? this.state.userList[currRow]: this.state.userList[currRow-1] ? this.state.userList[currRow-1]:{firstname:''} })


        }).catch((err)=>{

        }).finally(()=>{})

    }

    delDialogFooter = ()=>{
        return(
            <>
            <Button label="No" onClick={()=>{this.setState({showDelDialog:false})}} style={{marginRight:8}}/>
            <Button label="Yes"   onClick={()=>{this.deleteUser()}} style={{marginRight:8}}/>
            </>
        )
    }

    render(){
        return (
            <>
            {this.state.showSpinner && <ProgressSpinner/>}
            <Card style={{width:'90%',margin:'auto',padding:12}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <h4>UserList</h4>
                <div style={{marginRight:12}}>
                    <Button  onClick={()=>{this.showDialog('NEW')}}  icon="pi pi-plus" className="p-button-rounded p-button-secondary"  style={{marginRight:8}}/>
                    <Button icon="pi pi-user-edit" className="p-button-rounded p-button-success" style={{marginRight:8}} onClick={()=>{this.showDialog('EDIT')}}/>
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-info" style={{marginRight:8}} onClick={()=>{this.setState({showDelDialog:true})}}/>
                    

                </div>
            </div>
            
            <DataTable value={this.state.userList} selectionMode="single" 
            selection={this.state.selectedRow}
            onSelectionChange={e => this.setState({ selectedRow: e.value })}
            
            >
                        <Column field="firstname" header="First Name"></Column>
                        <Column field="lastname" header="Last Name"></Column>
                        <Column field="accid" header="UserId"></Column>
                        <Column field="accpwd" header="Password"></Column>
                        <Column field="email" header="Email"></Column>
                        <Column field="mblphone" header="Mobile #"></Column>
            </DataTable>

            </Card>
            <Dialog header="Add User" footer={this.addDialogFooter} visible={this.state.showAddDialog} onHide={()=>{this.setState({showAddDialog:false})}} 
            breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '50vw'}}>
                <p style={{color:'red'}}>{this.state.errmsg}</p>
             <InputText 
               placeholder="firstname"
               value={this.state.userobj.firstname}
               onChange = {(e)=> {
                   this.state.userobj.firstname = e.target.value;
                   this.setState({userobj:this.state.userobj})
                }}
               />
               <InputText 
               placeholder="lastname"
               value={this.state.userobj.lastname}
               onChange = {(e)=> {
                this.state.userobj.lastname = e.target.value;
                this.setState({userobj:this.state.userobj})
                }}
               />
               <InputText 
               placeholder="User Id"
               value={this.state.userobj.accid}
               onChange = {(e)=> {
                this.state.userobj.accid = e.target.value;
                this.setState({userobj:this.state.userobj})
                
                }}
               />
               <InputText 
               placeholder="Password"
               value={this.state.userobj.accpwd}
               onChange = {(e)=> {
                this.state.userobj.accpwd = e.target.value;
                this.setState({userobj:this.state.userobj})
                }}
               />
               <InputText 
               placeholder="Email"
               value={this.state.userobj.email}
               onChange = {(e)=> {
                this.state.userobj.email = e.target.value;
                this.setState({userobj:this.state.userobj})
                }}
               />
               <InputText 
               placeholder="Mobile Number"
               value={this.state.userobj.mblphone}
               onChange = {(e)=> {
                this.state.userobj.mblphone = e.target.value;
                this.setState({userobj:this.state.userobj})
                }}
               />
            </Dialog>

            <Dialog visible={this.state.showDelDialog} header="Delete Record"
            style={{ width: '50vw' }}
            onHide={() => {this.setState({showDelDialog:false})}}
            footer = {this.delDialogFooter}
            
            
            >
                <h2>Do you really wanna delete Record of {this.state.selectedRow.firstname} ??</h2>

            </Dialog>
            
            </>
        
        
        
        )
    }
}

export default Contact