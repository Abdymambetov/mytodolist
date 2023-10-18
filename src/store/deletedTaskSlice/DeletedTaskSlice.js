import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    deletedTasks: []
}

export const deletedTaskSlice = createSlice({
    name: 'deletedTaskSlice',
    initialState,
    reducers: {
        addDeletedTask: (state, {payload}) => {
            state.deletedTasks.push(payload)
        },
        resetDeletedTask: (state, {payload}) => {
            state.deletedTasks = state.deletedTasks.filter(item => item.id != payload.id)
        },
        dragAndDropDeleted: (state, {payload}) => {
            state.deletedTasks = payload
        },
        connectLocalDeleted: (state, {payload}) => {
            state.deletedTasks = payload
        }
    }
})

export const {
    addDeletedTask,
    resetDeletedTask,
    dragAndDropDeleted,
    connectLocalDeleted
} = deletedTaskSlice.actions

export default deletedTaskSlice.reducer