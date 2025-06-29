//2nd step
import { createSlice, nanoid } from "@reduxjs/toolkit";  // nano id is used for generation of unique id's


// in starting ,store kaisa dikhega, usmain value kha se aenge, database se aengi, ya phir khin or se , ye sab initialState mian dete han
const initialState = {
    todos: [{
        id: 1,
        text: "hello world"
    }]
};


//todoSlice almost reducer ka bda version ha , or reducer ek functionality ha 

export const TodoSlice = createSlice({   // createSlice main object pass hota ha , or us object main ( name or initalstate or reducer ) pass hota ha
    name: 'todo',
    initialState,
    reducers: {                        //reducer main ham function paas kraate han , saare
        addTodo: (state, action) => {            // state , currently initailstate main kitni values ha ye state btata ha , ye current situation btata ha initialstate ka . and action remove todo konse , id se remove krega ye sab action btata ha 
            const todo = {                 //creating todo object to add in todos array.
                id: nanoid(),
                text: action.payload
            };
            // but you must add also in todos, so update its state
            state.todos.push(todo);
        },       // unlike contextapi, here you not only define function but also , write its functionality here
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },  // state se todos ko accsess kr lia, and action maain wo is ha jisko remove krna ha
        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.text = text;
            }
        }
    }
});


export const { addTodo, removeTodo, updateTodo } = TodoSlice.actions;
export default TodoSlice.reducer;