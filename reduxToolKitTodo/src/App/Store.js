// 1st step 
import {configureStore} from '@reduxjs/toolkit';
import TodoSliceReducer from '../Features/Todo/TodoSlice.js'


export const Store=configureStore({
    reducer: {                            // ab app sonchoge ki, TodoSliceReducer to khin tha bhi nahi , lekin yeb kha se ayya so it comes from (TodoSlice.reducer)
        todo: TodoSliceReducer             // (useDispatch) is connects with (Store) by the help of (reducer)
    }
})
