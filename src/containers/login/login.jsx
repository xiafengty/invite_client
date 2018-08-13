import React,{Component} from "react";
import {
    NavBar,
    List,
    InputItem,
    WhiteSpace,
    WingBlank,
    Button
} from 'antd-mobile';
import Logo from "../logo/logo";
import {reqLogin} from "../../api";
class Login extends Component{
    state={
        username:"",
        password:""
    };
    handlerChange=(type,val)=>{
        this.setState({
            [type]:val
        })
    };
    inReqLogin=()=>{
        reqLogin(this.state)
            .then(res=>{
                console.log(res.data);
            })
    };
    render(){
        const {history}=this.props;
        return(
            <div>
                <div>
                    <NavBar>用户注册</NavBar>
                    <Logo/>
                    <WingBlank>
                        <List>
                            <WhiteSpace/>
                            <InputItem type="text" onChange={(val)=>this.handlerChange("username",val)} placeholder="请输入用户名">用户名：</InputItem>
                            <WhiteSpace/>
                            <InputItem type="password" onChange={(val)=>this.handlerChange("password",val)} placeholder="请输入密码">密码：</InputItem>
                            <WhiteSpace/>
                        </List>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.inReqLogin}>登录</Button>
                        <WhiteSpace />
                        <Button onClick={()=>history.replace("/register")}>注册账户</Button>
                    </WingBlank>
                </div>
            </div>
        )
    }
}
export default Login;