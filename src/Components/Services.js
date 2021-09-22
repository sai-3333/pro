import React, {Component} from 'react';
import axios from 'axios';
import { DataTable  } from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import SubCategory from './SubCategory';

class Services extends Component { 

    constructor(props){
        super(props)
        this.state = {
            orgid:'XZ5B1FRN97',
            empid:'ABFDJKKAHD3622',
            objtype:'CAT',
            sessid:'A9ICZFTQPV16290846301629084630',
            tableFlds:[],
            data:[],
            selectedRow:{}
        }
    }

    componentDidMount(){
        let a = localStorage.getItem('sessdata');
        a = JSON.parse(a);
        this.setState({sessid:a.sessid,orgid:a.orgid,empid:a.empid},()=>{this.getObjFlds()})
        

    }

    

     getObjFlds = ()=>{

            axios.defaults.headers = 
                {
                "Content-Type": "application/x-www-form-urlencoded",
                'sessid':this.state.sessid,
                 
            }
        
            axios({
                url: "https://amruthmart.com/admin/appapi/index.php/getobjflds",
                method:"POST",
                
                data: `orgid=${this.state.orgid}&empid=${this.state.empid}&objtype=${this.state.objtype}`
                
                
                
            }).then((res)=>{
                this.setState({tableFlds:res.data.fldlist})
                console.log(res.data)
                this.getObjData()
            }).catch((err)=>{
                console.log(err)
            }).finally(()=>{})
        
     }

     getObjData = ()=> {
        axios.defaults.headers = 
        {
        "Content-Type": "application/x-www-form-urlencoded",
        'sessid':this.state.sessid,
         
        }
        axios ({
            
            url: "https://amruthmart.com/admin/appapi/index.php/getobjdata",
            method:"POST",
            
            data: `orgid=${this.state.orgid}&empid=${this.state.empid}&objtype=${this.state.objtype}`
        }).then((res)=>{
            console.log(res)
            for(let i=0;i<res.data.data.length;i++){
                res.data.data[i].image = 'https://picsum.photos/200';
            }
            this.setState({data:res.data.data,selectedRow:res.data.data[0]})

        }).catch((err)=>{

        }).finally(()=>{})

     }


    render(){
        return (
           
        <div>

            <Card style={{margin:'auto',width:'95%',marginTop:12,padding:12}}>
            <div style={{display:'flex'}}>
                <h4>Categories</h4>
                <div style={{flex:1}}></div>
                
                <div style={{marginRight:12}}>
                    <Button  onClick={()=>{this.showDialog('NEW')}}  icon="pi pi-plus" className="p-button-rounded p-button-secondary"  style={{marginRight:8}}/>
                    <Button icon="pi pi-user-edit" className="p-button-rounded p-button-success" style={{marginRight:8}} onClick={()=>{this.showDialog('EDIT')}}/>
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-info" style={{marginRight:8}} onClick={()=>{this.setState({showDelDialog:true})}}/>
                    

                </div>

            </div>
            <DataTable value={this.state.data} scrollable scrollHeight="400px"
            selectionMode="single" 
            selection={this.state.selectedRow} 
            onSelectionChange={e => this.setState({ selectedRow: e.value })}
            
            
            
            >
                 {this.state.tableFlds.map((it)=>{
                     if(it.tableshow){
                         if(it.type == 'img'){
                            return (<Column body={(rowdata)=>{return(<img src={rowdata.image} height="40" width="40"/>)}} header={it.tblheader}  style={it.style}/>)
                         }else{
                            return (<Column field={it.field} header={it.tblheader}  style={it.style}/>)
                         }

                     }
                     
                 })}
                 
            </DataTable>

            </Card>
             <SubCategory 
             selectedCat={this.state.selectedRow} 
             sessid={this.state.sessid}
             orgid={this.state.orgid}
             empid = {this.state.empid}
             />
             
             
        </div>
        )
    }
}
export default Services