import React,{Component} from "react";
import {connect} from "react-redux";
import {} from "../../redux/action-types";
import {NavBar, List, WingBlank, InputItem, TextareaItem,Button } from "antd-mobile";
import InfoHeader from "../../components/info-headers/infoheader";
import {updateUser} from "../../redux/actions";
import {Redirect} from "react-router-dom";
class BossInfo extends Component{
    state = {
        header: '', // 头像名称
        info: '', // 职位简介
        post: '', // 职位名称
        company: '', // 公司名称
        salary: '' // 工资
    };
    getHeader=(header)=>{
        this.setState({
            header
        })
    };
    handleChange=(name,value)=>{
        this.setState({
            [name]:value
        })
    };
    save=()=>{
        this.props.updateUser(this.state);
    };
    render(){
        const {header}=this.props.users;
        if(header){
            return <Redirect to="/boss" />
        }
        return(
            <div>
                <NavBar>老板信息填写</NavBar>
                <InfoHeader getHeader={this.getHeader}/>
                <WingBlank>
                    <List>
                        <InputItem onChange={(val)=>this.handleChange("post",val)}>招聘职位：</InputItem>
                        <InputItem onChange={(val)=>this.handleChange("company",val)}>公司名称：</InputItem>
                        <InputItem onChange={(val)=>this.handleChange("salary",val)}>职位薪资：</InputItem>
                        <TextareaItem title="职位要求：" rows={2}
                                      onChange={(val)=>this.handleChange("info",val)}
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
)(BossInfo)