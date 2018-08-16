import React,{Component} from "react";
import {connect} from "react-redux";
import {getUserList} from "../../redux/actions";
import UserList from "../../components/user-list/userlist";
class DaZen extends Component{
    componentDidMount(){
        this.props.getUserList("boss");
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
)(DaZen);