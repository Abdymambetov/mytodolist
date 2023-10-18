import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    importantTasks: [],
}


export const importantTasksSlice = createSlice({
    name: 'importantTasks',
    initialState,
    reducers: {
        addImportantTask: (state, {payload}) => { 
            const foundTask = state.importantTasks.find(item => item.id === payload.id)
            if (foundTask) { // условтя на изменения существующего таска в том же порядке
                const newState = state.importantTasks.map(item => {
                    if (item.id === foundTask.id) {
                        return { ...payload }
                    } else {
                        return item
                    }
                })
                state.importantTasks = newState
            } else {
                state.importantTasks.push(payload)
            }
        },
        deleteImportantTask: (state, {payload}) => {
            state.importantTasks = state.importantTasks.filter(item => item.id != payload.id)
        },
        removeImportantTask: (state, {payload}) => {
            state.importantTasks = state.importantTasks.filter(item => item.id != payload.id)
        },
        dragAndDropImportant: (state, {payload}) => {
            state.importantTasks = payload
        },
        connectLocalImportant: (state, {payload}) => {
            state.importantTasks = payload
        },
    }
})


export const { deleteImportantTask, addImportantTask, removeImportantTask, connectLocalImportant, dragAndDropImportant } = importantTasksSlice.actions 

export default importantTasksSlice.reducer