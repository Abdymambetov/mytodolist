import { useEffect, useState } from "react";
import ModalAddTask from "../../components/modalAddTask";
import Search from "../../components/search";
import TasksList from "../../components/tasksList";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from 'react-redux/es/exports'
import { addModalTask, dragAndDrop, removeTask, turnOnModalAdd, deletedTasks } from "../../store/taskSlice/TaskSlice";
import '../pages.css'
import { addDeletedTask } from "../../store/deletedTaskSlice/DeletedTaskSlice";
import { deleteImportantTask, removeImportantTask } from '../../store/importantTaskSlice/ImportantTaskSlice';


export const sortFunc = (isProductivite, isEducation, isImportant, isHealth, setTasks, tasksLocal) => {
    const filtrering = [
        { name: isProductivite ? 'productiveTag' : '', values: [isProductivite] },
        { name: isEducation ? 'educationTag' : '', values: [isEducation] },
        { name: isImportant ? 'importantTag' : '', values: [isImportant] },
        { name: isHealth ? 'healthTag' : '', values: [isHealth] },
    ];

    if (isProductivite || isEducation || isImportant || isHealth) {
        const output = tasksLocal.reduce((acc, curr) => { // Сортировка по нескольким позициям
            let isNodeSatisfied = false;
            filtrering.forEach((criteria) => { // Проверяем по параметру и если существует пушим в аккум
                isNodeSatisfied = isNodeSatisfied || criteria.values.indexOf(curr[criteria.name]) > -1;
            })
            if (isNodeSatisfied) {
                acc.push(curr)
            }
            return acc;
        }, []);

        setTasks(output)
    } else {
        setTasks(tasksLocal)
    }
}


const MyTasks = () => {

    const { isProductivite, isEducation, isHealth, isImportant } = useSelector(store => store.tags)

    const tasksRed = useSelector(store => store.tasks.tasks)
    const [tasks, setTasks] = useState([])

    const dispatch = useDispatch()


    // При каждом изменения стора мы берем с localStorage все данные

    useEffect(() => {
        const tasksLocal = JSON.parse(localStorage.getItem('task'))

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
            <h1>Мои задачи</h1>
            <TasksList
                setTasks={setTasks}
                checkTask={checkTask}
                tasks={tasks}
                deletedTask={deletedTask}
                dispatchFunction={(newTasks) => dispatch(dragAndDrop(newTasks))}
            />
            <ModalAddTask deleteTask={deleteTaskModal} />
        </div>
    );
}

export default MyTasks;