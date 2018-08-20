import React,{Component} from "react";
import {connect} from "react-redux";
import {NavBar, List, WingBlank, InputItem, TextareaItem, Button ,Icon} from "antd-mobile";
import InfoHeader from "../../components/info-headers/infoheader";
import {updateUser} from "../../redux/actions";
class DaZenInfo extends Component{
    state={
        header:"",
        info:"",
        post:"",
        salary:""
    };
    handlerChange=(type,val)=>{
        this.setState({
            [type]:val
        });

    };
    getHeader=(header)=>{
        this.setState({
            header
        })
    };
    save=()=>{
        const {header,info,post}=this.state;
        if(header&&info&&post){
            this.props.updateUser(this.state);
            alert("保存成功");
            this.props.history.replace("/personal");
        }else{
            alert("信息不能为空！");
        }

    };
    render(){
        return(
            <div>
                <NavBar
                    icon={<Icon type="left" />}
                    onClick={()=>this.props.history.replace("/personal")}
                >大神信息填写</NavBar>
                <InfoHeader getHeader={this.getHeader}/>
                <WingBlank>
                    <List>
                        <InputItem onChange={(val)=>this.handlerChange("info",val)}>求职岗位：</InputItem>
                        <InputItem onChange={(val)=>this.handlerChange("salary",val)}>薪资要求：</InputItem>
                        <TextareaItem title="个人介绍：" rows={2}
                                      onChange={(val)=>this.handlerChange("post",val)}
                        />
                        <Button style={{background:"#202020",color:"white"}} onClick={this.save}>保存</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {updateUser}
)(DaZenInfo)