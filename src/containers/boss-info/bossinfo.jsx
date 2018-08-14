import React,{Component} from "react";
import {connect} from "react-redux";
import {} from "../../redux/action-types";
import {NavBar, List, WingBlank, InputItem, TextareaItem} from "antd-mobile";
import InfoHeader from "../../components/info-headers/infoheader";
class BossInfo extends Component{
    render(){
        return(
            <div>
                <WingBlank>
                    <NavBar>老板信息填写</NavBar>
                    <InfoHeader />
                    <List>
                        <InputItem>招聘职位：</InputItem>
                        <InputItem>公司名称：</InputItem>
                        <InputItem>职位薪资：</InputItem>
                        <TextareaItem title="职位要求：" rows={5}/>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>({}),
    {}
)(BossInfo)