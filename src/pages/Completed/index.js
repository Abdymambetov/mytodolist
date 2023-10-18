import { useEffect, useState } from "react";
import ModalAddTask from "../../components/modalAddTask";
import Search from "../../components/search";
import TasksList from "../../components/tasksList";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from 'react-redux/es/exports'
import { addModalTask, deletedTasks, dragAndDrop, removeTask, turnOnModalAdd } from "../../store/taskSlice/TaskSlice";
import '../pages.css'
import { addDeletedTask } from "../../store/deletedTaskSlice/DeletedTaskSlice";
import { deleteImportantTask, removeImportantTask } from '../../store/importantTaskSlice/ImportantTaskSlice';
import { sortFunc } from "../MyTasks";

const Completed = () => {

    const { isProductivite, isEducation, isHealth, isImportant } = useSelector(store => store.tags)

    const tasksRed = useSelector(store => store.tasks.tasks)
    const [tasks, setTasks] = useState([])

    const dispatch = useDispatch()

    // При каждом изменения стора мы берем с localStorage все данные и фильтруем по выполненным

    useEffect(() => {
        const tasksLocal = JSON.parse(localStorage.getItem('task'))?.filter(item => item.isCompleted === true)

        sortFunc(isProductivite, isEducation, isImportant, isHealth, setTasks, tasksLocal)

    }, [tasksRed, isProductivite, isEducation, isHealth, isImportant])

    const deletedTask = (item) => {
        dispatch(addDeletedTask(item))
        dispatch(removeTask(item))
        if (item.star) {
            dispatch(removeImportantTask(item))
        }
    }

    const checkTask = (item) => {
        dispatch(addModalTask(item))
        dispatch(turnOnModalAdd())
    }

    const deleteTaskModal = (item) => {
        dispatch(deletedTasks(item))
        dispatch(deleteImportantTask(item))
    }

    return (
        <div className="myPage">
            <Search />
            <h1>Выполненные</h1>
            <TasksList
                checkTask={checkTask}
                tasks={tasks}
                deletedTask={deletedTask}
                dispatchFunction={(newTasks) => dispatch(dragAndDrop(newTasks))}
            />
            <ModalAddTask deleteTask={deleteTaskModal} />
        </div>
    );
}

export default Completed;