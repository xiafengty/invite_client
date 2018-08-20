import React,{Component} from "react";
import {TabBar} from "antd-mobile";
import PropTypes from "prop-types";
import {withRouter} from 'react-router-dom'
import "./css/footless.less";
class NavFoot extends Component{
    static propTypes={
        navList:PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired
    };
    render(){
        const path=this.props.location.pathname;
        const navList=this.props.navList.filter(item=>!item.hide);
        console.log(this.props);
        return(
                <TabBar>
                {navList.map((item,index)=>
                    <TabBar.Item
                        key={index}
                        badge={item.path==='/message' ? this.props.unReadCount : 0}
                        onPress={()=>this.props.history.replace(item.path)}
                        selected={path===item.path}
                        icon={{uri:require("./images/"+item.icon+".png")}}
                        selectedIcon={{uri:require("./images/"+item.icon+"-selected.png")}}
                        title={item.title}
                    />
                )}
                </TabBar>
        )
    }
}
export default withRouter(NavFoot);