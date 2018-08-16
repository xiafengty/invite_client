import React,{Component} from "react";
import {connect} from "react-redux";
import {getUserList} from "../../redux/actions";
import UserList from "../../components/user-list/userlist";
class Boss extends Component{
    componentDidMount(){
        this.props.getUserList("daZen");
    }
    render(){
        return(
            <div>
                <UserList  userList={this.props.userList}/>
            </div>
        )
    }
}
export default connect(
    state=>({userList:state.userList}),
    {getUserList}
)(Boss);