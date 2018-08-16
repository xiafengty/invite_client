import React,{Component} from "react";
import {Route,Switch} from  "react-router-dom";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {NavBar} from "antd-mobile";
import Cookies from 'js-cookie';

import BossInfo from "../boss-info/bossinfo";
import DaZenInfo from "../dazen-info/dazeninfo";
import Boss from "../boss/boss";
import DaZen from "../dazen/dazen";
import Message from  "../message/message";
import Personal from "../personal/personal";
import NavFoot from "../../components/navfoot/navfoot";

import {autoLogin} from "../../redux/actions";
import getRedirctPath from "../../utils/getredirctpath";
class Main extends Component{
    componentDidMount(){
        const userid=Cookies.get("userid");
        const {users}=this.props;
        if(userid&&users){
            this.props.autoLogin();
        }
    }
    navList = [
        {
            path: '/boss', // 路由路径
            component: Boss,
            title: '大神列表',
            icon: 'dazen',
            text: '大神',
        },
        {
            path: '/dazen', // 路由路径
            component: DaZen,
            title: '老板列表',
            icon: 'boss',
            text: '老板',
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
        if(!user){
            return <div>loading</div>
        }
        const path=this.props.location.pathname;
        if(path==="/"){
            return <Redirect to={getRedirctPath(user.type,user.header)} />
        }
        /*
        * 隐藏标识
        */
        if(user.type==="boss"){
            if(path==="/dazen"){
                return <Redirect to="/boss"/>
            }
            this.navList[1].hide=true;
        }else if(user.type==="daZen"){
            if(path==="/boss"){
                return <Redirect to="/dazen"/>
            }
            this.navList[0].hide=true;
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
                {currentList?<NavFoot navList={this.navList} />:null}
            </div>

        )
    }
}
export default connect(
    state=>({users:state.users}),
    {autoLogin}
)(Main)