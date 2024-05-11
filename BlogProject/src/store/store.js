import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./authSlice"

const store = configureStore({ // we have only 1 parameter here 'reducer'
    reducer:{
        auth: authSlice
    }
})    

export default store