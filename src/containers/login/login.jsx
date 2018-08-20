import React,{Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {
    NavBar,
    List,
    InputItem,
    WhiteSpace,
    WingBlank,
    Button
} from 'antd-mobile';
import Logo from "../logo/logo";
import {login} from "../../redux/actions";
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
        this.props.login(this.state);
    };
    render(){
        const {history}=this.props;
        const {msg,redirectTo}=this.props.user;
        if(redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return(
            <div>
                <div>
                    <NavBar>用户登录</NavBar>
                    <Logo/>
                    <WingBlank>
                        <List>
                            <p>{msg}</p>
                            <WhiteSpace/>
                            <InputItem type="text" onChange={(val)=>this.handlerChange("username",val)} placeholder="请输入用户名">用户名：</InputItem>
                            <WhiteSpace/>
                            <InputItem type="password" onChange={(val)=>this.handlerChange("password",val)} placeholder="请输入密码">密码：</InputItem>
                            <WhiteSpace/>
                        </List>
                        <WhiteSpace />
                        <Button style={{background:"#202020",color:"white"}} onClick={this.inReqLogin}>登录</Button>
                        <WhiteSpace />
                        <Button onClick={()=>history.replace("/register")}>注册账户</Button>
                    </WingBlank>
                </div>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {login}
)(Login);