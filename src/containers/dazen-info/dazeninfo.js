import React,{Component} from "react";
import {connect} from "react-redux";
import {NavBar, List, WingBlank, InputItem, TextareaItem, Button } from "antd-mobile";
import InfoHeader from "../../components/info-headers/infoheader";
import {updateUser} from "../../redux/actions";
import {Redirect} from "react-router-dom";
class DaZenInfo extends Component{
    state={
        header:"",
        info:"",
        post:""
    };
    handlerChange=(type,val)=>{
        this.setState({
            [type]:val
        })
    };
    getHeader=(header)=>{
        this.setState({
            header
        })
    };
    save=()=>{
        this.props.updateUser(this.state);
    };
    render(){
        const {header} =this.props.users;
        if(header){
            return <Redirect to="dazen" />
        }
        return(
            <div>
                <NavBar>大神信息填写</NavBar>
                <InfoHeader getHeader={this.getHeader}/>
                <WingBlank>
                    <List>
                        <InputItem onChange={(val)=>this.handlerChange("info",val)}>求职岗位：</InputItem>
                        <TextareaItem title="个人介绍：" rows={2}
                                      onChange={(val)=>this.handlerChange("post",val)}
                        />
                        <Button type='primary' onClick={this.save}>保存</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>({users:state.users}),
    {updateUser}
)(DaZenInfo)