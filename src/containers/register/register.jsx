import React,{Component} from "react";
import {register} from "../../redux/actions";
import {Redirect} from 'react-router-dom'
import {connect} from "react-redux";
import {
    NavBar,
    List,
    InputItem,
    WhiteSpace,
    WingBlank,
    Radio,
    Button
} from 'antd-mobile';
import Logo from "../logo/logo";
import "./regcss.less";
class Register extends Component{
    state={
        username:"",
        password:"",
        surePassword:"",
        type:"daZen"
    };
    handlerChange=(type,val)=>{
        this.setState({
            [type]:val
        })
    };
    inRegister=()=>{
        this.props.register(this.state);
    };
    render(){
        const {history} =this.props;
        const {type}=this.state;
        const {msg,redirectTo}=this.props.users;
        if(redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return(
            <div>
                <NavBar>用户注册</NavBar>
                <Logo/>
                <WingBlank>

                    <List>
                        <p>{msg}</p>
                        <WhiteSpace/>
                        <InputItem type="text" onChange={(val)=>this.handlerChange("username",val)} placeholder="请输入用户名">用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem type="password" onChange={(val)=>this.handlerChange("password",val)} placeholder="请输入密码">密码：</InputItem>
                        <WhiteSpace/>
                        <InputItem type="password" onChange={(val)=>this.handlerChange("surePassword",val)} placeholder="请输入再次输入密码">确认密码：</InputItem>
                        <WhiteSpace/>
                    </List>
                    <List.Item>
                        <span>用户类型：</span>&nbsp;&nbsp;&nbsp;
                        <Radio checked={type==="boss"} onChange={()=>this.handlerChange("type","boss")}>老板</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Radio checked={type==="daZen"} onChange={()=>this.handlerChange("type","daZen")}>大神</Radio>
                    </List.Item>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.inRegister}>注册</Button>
                    <WhiteSpace />
                    <Button onClick={()=>history.replace("/login")}>已有账户</Button>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>({users:state.users}),
    {register}
)(Register)
