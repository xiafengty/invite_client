import React,{Component} from "react";
import {Route,Switch} from  "react-router-dom";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import BossInfo from "../boss-info/bossinfo";
import DaZenInfo from "../dazen-info/dazeninfo";
import Boss from "../boss/boss";
import DaZen from "../dazen/dazen";
import Message from  "../message/message";
import Personal from "../personal/personal";
import NavFoot from "../../components/navfoot/navfoot";
import {autoLogin} from "../../redux/actions";
import {NavBar} from "antd-mobile";
import Cookies from 'js-cookie';
import getRedirctPath from "../../utils/getredirctpath";
class Main extends Component{
    componentDidMount(){
        const userid=Cookies.get("userid");
        const {user}=this.props;
        if(userid&&user){
            this.props.autoLogin();
        }
    }
    navList = [
        {
            path: '/boss', // 路由路径
            component: Boss,
            title: '老板列表',
            icon: 'boss',
            text: '老板',
        },
        {
            path: '/dazen', // 路由路径
            component: DaZen,
            title: '大神列表',
            icon: 'dazen',
            text: '大神',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ];
    render(){
        const userid=Cookies.get("userid");
        if(!userid){
            return <Redirect to="login" />
        }
        const user=this.props.users;
        console.log(user,this.props.users);
        if(!user){
            return <div>loading</div>
        }
        const {path}=this.props.location.pathname;
        if(path==="/login"){
            return <Redirect to={getRedirctPath(user.type,user.header)} />
        }
        const currentList=this.navList.find((item,index)=>item.path===path);
        return(
            <div>
                {
                    currentList?<NavBar>{currentList.title}</NavBar>:null
                }
                <Switch>
                    <Route path="/bossinfo"  component={BossInfo}/>
                    <Route path="/dazeninfo"  component={DaZenInfo}/>
                    <Route path="/boss"  component={Boss}/>
                    <Route path="/dazen"  component={DaZen}/>
                    <Route path='/message' component={Message}/>
                    <Route path='/personal' component={Personal}/>
                </Switch>
                {currentList?<NavFoot />:null}
            </div>

        )
    }
}
export default connect(
    state=>({users:state.users}),
    {autoLogin}
)(Main)