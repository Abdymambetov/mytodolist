import { useState } from 'react'
import dropDownIcon from '../../assets/dropDown.svg'
import resetIcon from '../../assets/reset.svg'
import { addImportantTask } from '../../store/importantTaskSlice/ImportantTaskSlice'
import { addTask } from '../../store/taskSlice/TaskSlice'
import { useDispatch} from 'react-redux'
import Checkbox from '../UI/Checkbox'
import './tasksList.css'

const TasksList = ({ isResult, makeBold, importPage, checkTask, tasks, deletedTask, dispatchFunction, deletedPage }) => {

    const [currentTask, setCurrentTask] = useState(null)

    const dispatch = useDispatch()

    const dragOverHandler = (e) => {
        e.preventDefault()
        e.target.style.boxShadow = '0px 0px 5px #fff'
    }
    const dragEndHandler = (e) => {
        e.target.style.boxShadow = 'none'
    }

    const dragStartHandler = (e, task) => {
        setCurrentTask(task)
    }

    const dropHandler = (e, task) => {
        e.preventDefault()
        e.target.style.boxShadow = 'none'

        // Меняем порядки выбранных task, путем присваивания id

        const newTasks = tasks.map((item) => {
            if (item.id === task.id) {
                return { ...item, id: currentTask.id }
            }
            if (item.id === currentTask.id) {
                return { ...item, id: task.id }
            }
            return item
        })

        dispatchFunction(newTasks)
    }

    // Сортируем массив по id

    const sortTasks = (a, b) => {
        if (a.id > b.id) {
            return 1
        } else {
            return -1
        }
    }


    const onChangeCompleted = (task) => { // изменяем параметр выполненно в тасках и важных тасках
        dispatch(addTask({ ...task, isCompleted: !task?.isCompleted }))

        if (task.star) {
            dispatch(addImportantTask({ ...task, isCompleted: !task?.isCompleted }))
        }
    }

    const [taskLength, setTaskLength] = useState(6)

    return (
        <div className='task-list'>
            <div className='list-wrapper'>
                {/* Сортируем для drag and drop и обрезаем массив для функционала показать еще */}
                {tasks?.sort(sortTasks)?.slice(0, taskLength)?.map((task, i) =>
                    <div
                        className="item"
                        key={i}
                        onDragStart={e => dragStartHandler(e, task)}
                        onDragOver={e => dragOverHandler(e)}
                        onDragLeave={e => dragEndHandler(e)}
                        onDrop={e => dropHandler(e, task)}
                        draggable={true}
                    >
                        <div className='item-flex title'>
                            <Checkbox id={task.id} checked={task.isCompleted} onChangeCheck={() => onChangeCompleted(task)} />
                            {
                                isResult
                                    ?
                                    <span
                                        style={{ color: '#B4B7BD', cursor: 'pointer' }}
                                        onClick={() => checkTask(task)}
                                        dangerouslySetInnerHTML={{ __html: makeBold(task?.title) }}
                                    />
                                    :
                                    <span
                                        onClick={() => checkTask(task)}
                                        style={importPage
                                            ? { color: '#B4B7BD', cursor: 'pointer' }
                                            : task?.star
                                                ? { color: '#F2C94C', fontWeight: '600', cursor: 'pointer' }
                                                : { color: '#B4B7BD', cursor: 'pointer' }}
                                    >
                                        {task?.title}
                                    </span>
                            }
                        </div>
                        <div className='item-flex atributes'>
                            <div className='item-flex-tags'>
                                {/* Выводим только имеющие теги */}
                                {task.productiveTag && (
                                    <span className='tag-item productive'>Продуктивность</span>
                                )}
                                {task.educationTag && (
                                    <span className='tag-item education'>Образование</span>
                                )}
                                {task.healthTag && (
                                    <span className='tag-item health'>Здоровье</span>
                                )}
                                {task.importantTag && (
                                    <span className='tag-item important'>Срочно</span>
                                )}
                            </div>
                            <span className='item-flex-date' style={{ color: '#676D7D' }}>{task?.date}</span>
                            {
                                deletedPage
                                    ?
                                    <img className='reset' onClick={() => deletedTask(task)} src={resetIcon} alt='resets icon' />
                                    :
                                    <div className='item-flex-icons'>
                                        <svg onClick={() => deletedTask(task)} style={{ cursor: 'pointer' }} width="20" height="20" viewBox="0 0 20 20" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M17.5 4.16671H14.1666V3.33337C14.1666 1.91671 13.0833 0.833374 11.6666 0.833374H8.33329C6.91663 0.833374 5.83329 1.91671 5.83329 3.33337V4.16671H2.49996C1.99996 4.16671 1.66663 4.50004 1.66663 5.00004C1.66663 5.50004 1.99996 5.83337 2.49996 5.83337H3.33329V16.6667C3.33329 18.0834 4.41663 19.1667 5.83329 19.1667H14.1666C15.5833 19.1667 16.6666 18.0834 16.6666 16.6667V5.83337H17.5C18 5.83337 18.3333 5.50004 18.3333 5.00004C18.3333 4.50004 18 4.16671 17.5 4.16671ZM7.49996 3.33337C7.49996 2.83337 7.83329 2.50004 8.33329 2.50004H11.6666C12.1666 2.50004 12.5 2.83337 12.5 3.33337V4.16671H7.49996V3.33337ZM14.1666 17.5C14.6666 17.5 15 17.1667 15 16.6667V5.83337H4.99996V16.6667C4.99996 17.1667 5.33329 17.5 5.83329 17.5H14.1666Z" fill="black" />
                                            <mask id="mask0_18_950" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="1" y="0" width="18" height="20">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M17.5 4.16671H14.1666V3.33337C14.1666 1.91671 13.0833 0.833374 11.6666 0.833374H8.33329C6.91663 0.833374 5.83329 1.91671 5.83329 3.33337V4.16671H2.49996C1.99996 4.16671 1.66663 4.50004 1.66663 5.00004C1.66663 5.50004 1.99996 5.83337 2.49996 5.83337H3.33329V16.6667C3.33329 18.0834 4.41663 19.1667 5.83329 19.1667H14.1666C15.5833 19.1667 16.6666 18.0834 16.6666 16.6667V5.83337H17.5C18 5.83337 18.3333 5.50004 18.3333 5.00004C18.3333 4.50004 18 4.16671 17.5 4.16671ZM7.49996 3.33337C7.49996 2.83337 7.83329 2.50004 8.33329 2.50004H11.6666C12.1666 2.50004 12.5 2.83337 12.5 3.33337V4.16671H7.49996V3.33337ZM14.1666 17.5C14.6666 17.5 15 17.1667 15 16.6667V5.83337H4.99996V16.6667C4.99996 17.1667 5.33329 17.5 5.83329 17.5H14.1666Z" fill="white" />
                                            </mask>
                                            <g mask="url(#mask0_18_950)">
                                                <rect width="20" height="20" />
                                            </g>
                                        </svg>
                                        <img src={dropDownIcon} alt='drop downs icon' />
                                    </div>
                            }
                        </div>
                    </div>
                )}
            </div>
            {
                tasks?.length > taskLength && (
                    <div className='more' onClick={() => setTaskLength(prev => prev + 5)}>Показать еще 5</div>
            )}
        </div>
    );
}

export default TasksList;