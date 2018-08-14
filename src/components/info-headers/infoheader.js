import React,{Component} from "react";
import {List, Grid} from "antd-mobile";
class InfoHeader extends Component{
    state={
        icon:null,
        text:null
    };
    /*setHeader=()=>{
        this.setState({icon:});
    };*/
    constructor(props){
        super(props);
        this.headerList=[];
        for(let i=1;i<21;i++){
            const text="头像"+i;
            const icon=require("./images/"+text+".png");
            this.headerList.push({icon,text});
        }
    }
    render(){
        const {icon,text}=this.state;
        const head=icon?<div>已选择头像：<img src={icon} alt={text}/></div>:<div>请选择头像</div>
        return(
            <div>
                <List renderHeader={() => head}>
                    <Grid data={this.headerList}
                          columnNum={5}
                    />
                </List>
            </div>
        )
    }
}
export default InfoHeader;