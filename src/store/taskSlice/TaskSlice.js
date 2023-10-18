import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modal: false,
    modalTask: [],
    searchTasks: [],
    searchTasks: '',
    tasks: [],
    importantTasks: [],
    completedTasks: [],
    deletedTasks: [],
    resultTasks: [],
}

export const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers:{
        addModalTask: (state, {payload}) => {
            state.modal = payload
        },
        addSearchValue: (state, {payload}) => {
            state.searchValue = payload
        },
        turnOnModalAdd: (state) => {
            state.modalAdd = true
        },
        turnOffModalAdd: (state) => {
            state.modalAdd = false
        },
        addTask: (state, {payload}) => {
            const foundTask = state.tasks.find(item => item.id === payload.id)
            if (foundTask){
                const newState = state.tasks.map(item => {
                    if(item.id === foundTask.id){
                        return {...payload}
                    }else {
                        return item
                    }
                })
                state.tasks = newState
            }else state.tasks.push(payload);
        },
        daletedTasks: (state, {payload}) => {
            state.tasks = state.tasks.filter(item => item.id != payload.id)
        },
        removeTask: (state, {payload}) => {
            state.tasks = state.tasks.filter(item => item.id != payload.id)
        },
        dragAndDrop: (state, { payload }) => {
            state.tasks = payload
        },
        connectLocal: (state, { payload }) => {
            state.tasks = payload
        },
    }
})

export const {
    deletedTasks, 
    addSearchValue, 
    addModalTask,
    turnOffModalAdd, 
    turnOnModalAdd,
    addTask, 
    connectLocal,
    dragAndDrop,
    removeTask,
} = taskSlice.actions
export default taskSlice.reducer