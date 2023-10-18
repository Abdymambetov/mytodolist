import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isProductive: false,
    isEducation: false,
    isHealth: false,
    isImportant: false
}

export const tagsSlice = createSlice({
    name: 'tagsSlice',
    initialState,
    reducers: {
        changeProduct: (state) => {
            state.isProductive = !state.isProductive
        },
        changeEduc: (state) => {
            state.isEducation = !state.isEducation
        },
        changeHealth: (state) => {
            state.isHealth = !state.isHealth
        },
        changeImportant: (state) => {
            state.isImportant = !state.isImportant
        }
    }
})
export const {
    changeEduc, 
    changeHealth,
    changeImportant,
    changeProduct
} = tagsSlice.actions
export default tagsSlice.reducer