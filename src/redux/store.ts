import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import TodoReducer from './TodoSlice'
import {todoApi} from './api/api'

export const store = configureStore({
  reducer: {
    [todoApi.reducerPath] : todoApi.reducer,
    todo: TodoReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(logger, todoApi.middleware)
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch