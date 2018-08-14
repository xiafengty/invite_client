import React,{Component} from "react";
import {Route,Switch,HashRouter as Router} from "react-router-dom";
import Main from "./containers/main/main";
import Register from "./containers/register/register";
import Login from "./containers/login/login";
class App extends Component{
    render(){
        return(
            <div>
                <Router>
                <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route component={Main} />
                </Switch>
                </Router>
            </div>
        )
    }
}
export default App;