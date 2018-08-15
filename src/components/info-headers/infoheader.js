import React,{Component} from "react";
import {List, Grid} from "antd-mobile";
import PropTypes from 'prop-types'
class InfoHeader extends Component{
    static propTypes = {
        setHeader: PropTypes.func
    };
    state={
        icon:null,
    };
    setHeader=({icon,text})=>{
        this.setState({icon});
        this.props.getHeader(text);
    };
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
                          onClick={this.setHeader}
                    />
                </List>
            </div>
        )
    }
}
export default InfoHeader;