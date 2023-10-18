import { configureStore } from "@reduxjs/toolkit";

import tasks from './taskSlice/TaskSlice'
import importantTasks from './importantTaskSlice/ImportantTaskSlice'
import deletedTasks from './deletedTaskSlice/DeletedTaskSlice'
import tags from './tagsSlice/TagsSLice'

export const store = configureStore({
    reducer: {
        tasks: tasks,
        importantTasks: importantTasks,
        deletedTasks: deletedTasks,
        tags: tags
    }
}) 

store.subscribe(() => {
    if(store.getState().tasks.tasks) {
        localStorage.setItem('task', JSON.stringify(store.getState().tasks.tasks))
    }
    if (store.getState().importantTasks.importantTasks){
        localStorage.setItem('importantTask', JSON.stringify(store.getState().importantTasks.importantTasks))
    }
    if (store.getState().deletedTasks.deletedTasks) {
        localStorage.setItem('deletedTask', JSON.stringify(store.getState().deletedTasks.deletedTasks))
    }
})