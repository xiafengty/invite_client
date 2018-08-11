import React,{Component} from "react";
import {Button} from "antd-mobile";
import {Route,Switch} from "react-router-dom";
import Main from "./containers/main/main";
import Register from "./containers/register/register";
import Login from "./containers/login/login";
class App extends Component{
    render(){
        return(
            <div>
                <p>一生有你</p>
                <Button type="primary">三生有幸</Button>
                <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route component={Main} />
                </Switch>
            </div>
        )
    }
}
export default App;