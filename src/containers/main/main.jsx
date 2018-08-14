import React,{Component} from "react";
import {Route,Switch} from  "react-router-dom";
import BossInfo from "../boss-info/bossinfo";
import DaZenInfo from "../dazen-info/dazeninfo";
class Main extends Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route path="/bossinfo"  component={BossInfo}/>
                    <Route path="/dazeninfo"  component={DaZenInfo}/>
                </Switch>
            </div>
        )
    }
}
export default Main;