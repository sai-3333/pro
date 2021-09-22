import React, {Component} from 'react';

 import {TabMenu} from 'primereact/tabmenu'



class Navbar extends Component {

    constructor(props){
        console.log(props)
        super(props)
        this.state = {
            navbar: [
                {label:'Home',icon:'pi pi-fw pi-home',navpath:'/home'},
                {label:'About',icon:'pi pi-calendar-plus',navpath:'/about'},
                {label:'Contact',icon:'pi pi-envelope',navpath:'/contact'},
                {label:'Services',icon:'pi pi-sitemap',navpath:'/services'},
                {label:'Login',icon:'pi pi-user',navpath:'/login'},
            ],
            activeIndex:0
        }
    }

    tabChange = (obj)=> {

        window.location = obj.value.navpath
        
    }

    render(){
        return (
            <TabMenu model={this.state.navbar} activeIndex={this.state.activeIndex} 
            onTabChange={(e) => this.tabChange(e)}/>


        )
    }
}

export default Navbar