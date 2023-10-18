import starIcon from '../../assets/star.svg'
import closeIcon from '../../assets/close.svg'
import dateIcon from '../../assets/date.svg'
import Datepicker from '../UI/Datepicker';
import { useEffect, useState } from 'react';
import Checkbox from '../UI/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { turnOffModalAdd, addTask, deleteTask } from '../../store/taskSlice/TaskSlice';
import { addImportantTask, removeImportantTask } from '../../store/importantTaskSlice/ImportantTaskSlice';
import './modal.css'

const ModalAddTask = ({ deleteTask }) => {

    const dispatch = useDispatch()

    const modalAdd = useSelector(store => store.tasks.modalAdd)
    const task = useSelector(store => store.tasks.modalTask)

    const [activeCalendar, setActiveCalendar] = useState(false)

    const [choosenDate, setChoosenDate] = useState('')

    const [timeWrited, setTimeWrited] = useState({
        hours: '',
        minutes: ''
    })

    const onChangeTime = (e) => {
        setTimeWrited({
            ...timeWrited,
            [e.target.name]: e.target.value
        })
    }

    const [date, setDate] = useState('')

    const onChangeDate = () => {
        setDate(`${timeWrited.hours}:${timeWrited.minutes} / ${choosenDate}`)
    }
    useEffect(() => {
        if (timeWrited.hours || timeWrited.minutes || choosenDate) {
            onChangeDate()
        }
    }, [timeWrited, choosenDate])

    const [value, setValue] = useState({
        name: '',
        desc: ''
    })

    const handleOnChangeValue = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const [booleanValue, setBooleanValue] = useState({
        productActive: false,
        healthActive: false,
        educActive: false,
        importActive: false,
        starTask: false
    })


    // Модальное окно открывается с переданным таском тогда заполняю все поля данными, в ином очищаю
    useEffect(() => {
        if (task.length !== 0) {
            setBooleanValue({
                productActive: task.productiveTag,
                healthActive: task.healthTag,
                educActive: task.educationTag,   
                importActive: task.importantTag,
                starTask: task.star
            })
            setValue({ name: task.title, desc: task.description })
            setDate(task.date)
        } else {
            setBooleanValue({
                productActive: false,
                healthActive: false,
                educActive: false,
                importActive: false,
                starTask: false
            })
            setValue({ name: '', desc: '' })
            setDate('')
        }
    }, [task])


    const [error, setError] = useState({
        name: '',
        desc: '',
        date: '',
        tag: ''
    })


    // Проверяю все поля на валидность, в случае вывожу ошибку

    const addTaskModal = () => {
        if (booleanValue.productActive || booleanValue.healthActive || booleanValue.educActive || booleanValue.importActive) {

            if (!value.name) {
                setValue({
                    ...value,
                    name: 'Введите название'
                })
                setTimeout(() => {
                    setValue({
                        ...value,
                        name: ''
                    })
                }, 3000)
                return
            }

            if (!value.desc) {
                setValue({
                    ...value,
                    desc: 'Введите описание'
                })
                setTimeout(() => {
                    setValue({
                        ...value,
                        desc: ''
                    })
                }, 3000)
                return
            }

            if (!date) {
                setError({
                    ...error,
                    date: 'Выберите дату'
                })
                setTimeout(() => {
                    setError({
                        ...error,
                        date: ''
                    })
                }, 3000)
                return
            }

            const newTask = {
                id: task.id ? task.id : Date.now(),
                title: value.name,
                description: value.desc,
                date: date,
                star: booleanValue.starTask,
                productiveTag: booleanValue.productActive,
                healthTag: booleanValue.healthActive,
                educationTag: booleanValue.educActive,
                importantTag: booleanValue.importActive,
                isCompleted: false
            }

            if (booleanValue.starTask === true) {
                dispatch(addImportantTask(newTask))
                dispatch(addTask(newTask))
            } else {
                dispatch(removeImportantTask(newTask))
                dispatch(addTask(newTask))
            }

            dispatch(turnOffModalAdd())

            setBooleanValue({
                productActive: '',
                healthActive: '',
                educActive: '',
                importActive: '',
                starTask: ''
            })
            setValue({ name: '', desc: '' })
            setDate('')

        } else {
            setError({
                ...error,
                tag: 'Выберите хотя бы 1 тег'
            })
            setTimeout(() => {
                setError({
                    ...error,
                    tag: ''
                })
            }, 3000)
        }
    }

    const deleteTaskModal = (item) => {
        if (item?.length != 0) {
            deleteTask(item)
        }
        dispatch(turnOffModalAdd())
    }

    return (
        <div className="modal" style={modalAdd ? {} : { display: 'none' }}>
            <div style={{ width: '100%', height: '100%' }} onClick={() => dispatch(turnOffModalAdd())}></div>
            <div className='modal-wrapper'>
                <div className='modal-header'>
                    <span>Задача</span>
                    <div className='icons'>
                        <img src={starIcon} alt='stars icon' />
                        <img
                            src={closeIcon}
                            alt='closes icon'
                            onClick={() => dispatch(turnOffModalAdd())}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>
                <div className='modal-item'>
                    <label>Название</label>
                    <input
                        value={value.name}
                        className={error.name ? 'error' : ''}
                        name='name'
                        onChange={e => handleOnChangeValue(e)}
                        type='text'
                        placeholder='Название задачи'
                    />
                    <p className='errorText'>{error.name}</p>
                </div>
                <div className='modal-item check'>
                    <Checkbox
                        id='modal-important'
                        checked={booleanValue.starTask}
                        onChangeCheck={() => setBooleanValue({ ...booleanValue, starTask: !booleanValue.starTask })}
                    >
                        Важная задача
                    </Checkbox>
                </div>
                <div className='modal-item date' style={{ position: 'relative' }}>
                    <label>Дата и время окончания</label>
                    <input
                        value={date}
                        onClick={() => setActiveCalendar(!activeCalendar)}
                        style={{ color: '#fff', cursor: 'pointer' }}
                        className={error.date ? 'error' : ''}
                        type='text'
                        placeholder='Выберите время и дату'
                        readOnly
                    />
                    <img className='date-icon' src={dateIcon} alt='dates icon' />
                    <p className='errorText'>{error.date}</p>
                    <Datepicker
                        onChangeDate={onChangeDate}
                        onChangeTime={onChangeTime}
                        timeWrited={timeWrited}
                        setTimeWrited={setTimeWrited}
                        choosenDate={choosenDate}
                        setChoosenDate={setChoosenDate}
                        activeCalendar={activeCalendar}
                    />
                </div>
                <div className='modal-item description'>
                    <label>Описание</label>
                    <textarea
                        value={value.desc}
                        name='desc'
                        className={error.desc ? 'error' : ''}
                        onChange={e => handleOnChangeValue(e)}
                        placeholder='Опишите задачу'
                        style={{ resize: 'none' }}
                    />
                    <p className='errorText'>{error.desc}</p>
                </div>
                <div className='modal-tags'>
                    <span>Теги</span>
                    <div className='modal-tags-items'>
                        <Checkbox
                            id='product'
                            checked={booleanValue.productActive}
                            onChangeCheck={() => setBooleanValue({ ...booleanValue, productActive: !booleanValue.productActive })}>
                            Продуктивный
                        </Checkbox>
                        <Checkbox
                            id='health'
                            checked={booleanValue.healthActive}
                            onChangeCheck={() => setBooleanValue({ ...booleanValue, healthActive: !booleanValue.healthActive })}>
                            Здоровье
                        </Checkbox>
                        <Checkbox
                            id='educ'
                            checked={booleanValue.educActive}
                            onChangeCheck={() => setBooleanValue({ ...booleanValue, educActive: !booleanValue.educActive })}>
                            Образование
                        </Checkbox>
                        <Checkbox
                            id='import'
                            checked={booleanValue.importActive}
                            onChangeCheck={() => setBooleanValue({ ...booleanValue, importActive: !booleanValue.importActive })}>
                            Срочно
                        </Checkbox>
                    </div>
                    <p className='errorText' style={{ marginTop: '5px' }}>{error.tag}</p>
                    <div className='modal-btn'>
                        <button className='add' onClick={() => addTaskModal()}>{task?.length != 0 ? 'Сохранить' : 'Добавить'}</button>
                        <button className='delete' onClick={() => deleteTaskModal(task)}>Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalAddTask;