import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TTodo = {
    id: string;
    _id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    originalIndex: number;
    priorityIndex: string;
}
type TInitialState = {
    todos: TTodo[];
}

const initialState: TInitialState = {
    todos: []
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<TTodo>) => {
            state.todos.push({ ...action.payload})
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(item => item.id !== action.payload)
        },
        todoCompletion: (state, action) => {
            const task = state.todos.find(item => item.id === action.payload);
            // task!.isCompleted = !task?.isCompleted // toggle isCompleted
            if(task && task.originalIndex){
                task.isCompleted = !task.isCompleted

                if(task.isCompleted){
                    state.todos = [ ...state.todos.filter( item => item.id !== action.payload ), task ]
                }else{
                    state.todos = [ ...state.todos.filter( item => item.id !== action.payload ) ]
                    state.todos.splice( task.originalIndex, 0, task )

                    state.todos.forEach((item, index) => {
                        item.originalIndex = index
                    })
                }
            }
        }
    }
})

export const { addTodo, removeTodo, todoCompletion } = todoSlice.actions;


export default todoSlice.reducer;