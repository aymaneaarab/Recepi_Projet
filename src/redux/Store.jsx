import { combineReducers } from "redux";
import LanguaSlicer from "./LanguaSlicer";
import { configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers(
    {
        Langue:LanguaSlicer
    }
)
const store = configureStore({reducer})
export default store