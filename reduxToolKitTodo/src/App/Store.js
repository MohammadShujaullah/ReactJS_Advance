// 1st step 
import {configureStore} from '@reduxjs/toolkit';
import TodoSliceReducer from '../Features/Todo/TodoSlice.js'


export const Store=configureStore({
    reducer: {
        todo: TodoSliceReducer
    }
})
