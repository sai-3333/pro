import React,{Component} from 'react';
import axios from 'axios';

export default class SubCategory extends Component {
    constructor(props){
        super(props)
        this.state = {
            objtype: 'SUB_CAT',
            tableFlds:[],
            data:[]
        }
    } 

    componentDidMount(){
        console.log('componentDidMount')
        this.getObjFlds();
    }

    componentDidUpdate(prevProps){
        console.log('componentDidUpdate')
        if(this.props.selectedCat.pdlid != prevProps.selectedCat.pdlid)
        this.getObjData()
    }

    getObjFlds = ()=>{

        axios.defaults.headers = 
            {
            "Content-Type": "application/x-www-form-urlencoded",
            'sessid':this.props.sessid,
             
        }
    
        axios({
            url: "https://amruthmart.com/admin/appapi/index.php/getobjflds",
            method:"POST",
            
            data: `orgid=${this.props.orgid}&empid=${this.props.empid}&objtype=${this.state.objtype}`
            
            
            
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
    'sessid':this.props.sessid,
     
    }
    axios ({
        
        url: "https://amruthmart.com/admin/appapi/index.php/getobjdata",
        method:"POST",
        
        data: `orgid=${this.props.orgid}&empid=${this.props.empid}&objtype=${this.state.objtype}&parid=${this.props.selectedCat.pdlid}`
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
        return <div>Subcategory {this.props.selectedCat['pdlid']}</div>
    }
}