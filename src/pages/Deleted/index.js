import ModalAddTask from "../../components/modalAddTask";
import Search from "../../components/search";
import TasksList from "../../components/tasksList";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useEffect, useState } from "react";
import '../pages.css'
import { dragAndDropDeleted, resetDeletedTask } from "../../store/deletedTaskSlice/DeletedTaskSlice";
import { addTask } from "../../store/taskSlice/TaskSlice";
import { addImportantTask } from '../../store/importantTaskSlice/ImportantTaskSlice';
import { sortFunc } from "../MyTasks";


const Deleted = () => {

    const { isProductivite, isEducation, isHealth, isImportant } = useSelector(store => store.tags)

    const tasksRed = useSelector(store => store.deletedTasks.deletedTasks)

    const [tasks, setTasks] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        const tasksLocal = JSON.parse(localStorage.getItem('deletedTask'))

        sortFunc(isProductivite, isEducation, isImportant, isHealth, setTasks, tasksLocal)

    }, [tasksRed, isProductivite, isEducation, isHealth, isImportant])


    const deletedTask = (item) => {
        dispatch(resetDeletedTask(item))
        dispatch(addTask(item))
        if (item.star) {
            dispatch(addImportantTask(item))
        }
    }

    return (
        <div className="myPage">
            <Search />
            <h1>Удаленные</h1>
            <TasksList
                tasks={tasks}
                deletedTask={deletedTask}
                dispatchFunction={(newTask) => dispatch(dragAndDropDeleted(newTask))}
                deletedPage={true}
            />
            <ModalAddTask />
        </div>
    );
}

export default Deleted;