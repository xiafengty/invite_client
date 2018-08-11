import {combineReducers} from "redux";
const initState=1;
function xxx(preState=initState,action) {
    switch (action.type){
        default:
            return preState;
    }
}
function yyy(preState=initState,action) {
    switch (action.type){
        default:
            return preState;
    }
}
export default combineReducers({
    xxx,
    yyy
});