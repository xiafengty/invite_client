import {createStore}  from "react-router-dom";
import reducer from "./reducers";
const store=createStore(reducer);
export default store;