import React,{Component} from "react";
import logos from "./images/logo.png";
import "./logo.less";
class Logo extends Component{
    render(){
        return(
            <div id="logos">
                <img src={logos} alt="logo"/>
            </div>
        )
    }
}
export default Logo;