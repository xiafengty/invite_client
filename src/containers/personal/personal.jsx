import React,{Component} from "react";
import Cookies from 'js-cookie';
import {resetUser} from "../../redux/actions"
import {Result, List, WhiteSpace, Button,Modal} from 'antd-mobile';
import {connect} from "react-redux";
const Item = List.Item;
const Brief = Item.Brief;
class Personal extends Component{
    handleLogout = () => {
        Modal.alert('退出', '确认退出登录吗?', [
            {
                text: '取消',
                onPress: () => {}
            },
            {
                text: '确认',
                onPress: () => {
                    Cookies.remove('userid');
                    // 重置redux中的user状态
                    this.props.resetUser()
                }
            }
        ])
    };

    render(){
        const {username, header, post, info, salary, company}=this.props.user;
        const type=this.props.user.type.toLowerCase();
        if(!username){
            return <div>登录超时，请重新登录！</div>
        }
        return(
            <div>
                <Result
                    img={<img src={require("../../components/info-headers/images/"+header+".png")} alt={header} />}
                    title={username}
                    message={company}
                />
                    <List renderHeader={() => '相关信息'}>
                        <Item multipleLine>
                            <Brief>职位：{info}</Brief>
                            <Brief>简介：{post}</Brief>
                            {salary?<Brief>薪资：{salary}</Brief>:null}
                        </Item>
                    </List>
                <WhiteSpace/>
                <List>
                    <WhiteSpace/>
                    <Button style={{background:"#404040",color:"white"}} onClick={()=>this.props.history.replace("/"+type+"info")}>修改个人信息</Button>
                    <WhiteSpace/><WhiteSpace/>
                    <Button style={{background:"#202020",color:"white"}} type='warning' onClick={this.handleLogout}>退出登录</Button>
                </List>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {resetUser}
)(Personal)