import React,{Component} from "react";
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
class UserList extends Component {
    static propTypes={
        userList:PropTypes.array.isRequired
    };
    render() {
        const userList=this.props.userList.filter(item=>item.header);
        return (
                <WingBlank>
                    {
                        userList.map((item,index)=>(
                            <div key={index}>
                                <WhiteSpace />
                                <Card onClick={()=>this.props.history.push(`/chat/${item._id}`)}>
                                    <Card.Header
                                        thumb={require("../../components/info-headers/images/"+item.header+".png")}
                                        extra={item.username}
                                    />
                                    <Card.Body>
                                        {item.post?<div>职位: {item.post}</div>:null}
                                        {item.company?<div>公司: {item.company}</div>:null}
                                        {item.salary?<div>月薪: {item.salary}</div>:null}
                                        {item.info?<div>描述: {item.info}</div>:null}
                                    </Card.Body>
                                </Card>
                            </div>))
                    }
                    <WhiteSpace />
                </WingBlank>
        )

    }
}
export default withRouter(UserList);