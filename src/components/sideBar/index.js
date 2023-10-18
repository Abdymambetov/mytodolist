import React from 'react';
import { NavLink } from 'react-router-dom'
import { COMPLETED, DELETED, IMPORTANT, MY_TASKS } from '../routes/constants';
import { useDispatch, useSelector } from 'react-redux';
import './sideBar.css'
import { addModalTask, turnOnModalAdd } from '../../store/taskSlice/TaskSlice';
import { changeEduc, changeHealth, changeImportant, changeProduct } from '../../store/tagsSlice/TagsSLice';

const SideBar = () => {

    const dispatch = useDispatch() 

    const tags = useSelector(store => store.tags)


    const handleProduct = () => {
        dispatch(changeProduct())
    }
    const handleEduc = () => {
        dispatch(changeEduc())
    }
    const handleHealth = () => {
        dispatch(changeHealth())
    }
    const handleImportant = () => {
        dispatch(changeImportant())
    } 

    const openModal = () => {
        dispatch(addModalTask([]))
        dispatch(turnOnModalAdd())
    }

    return (
        <div className="sideBar">
            <button className='sideBar-btn' onClick={() => openModal()}>Новая задача</button>
            <NavLink to={MY_TASKS} className='sideBar-items sideBar-mytask' end>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.6667 2.5H3.33337C1.91671 2.5 0.833374 3.58333 0.833374 5V15C0.833374 16.4167 1.91671 17.5 3.33337 17.5H16.6667C18.0834 17.5 19.1667 16.4167 19.1667 15V5C19.1667 3.58333 18.0834 2.5 16.6667 2.5ZM3.33337 4.16667H16.6667C17 4.16667 17.25 4.33333 17.4167 4.66667L10 9.83333L2.58337 4.66667C2.75004 4.33333 3.00004 4.16667 3.33337 4.16667ZM3.33337 15.8333H16.6667C17.1667 15.8333 17.5 15.5 17.5 15V6.58333L10.5 11.5C10.3334 11.5833 10.1667 11.6667 10 11.6667C9.83337 11.6667 9.66671 11.5833 9.50004 11.5L2.50004 6.58333V15C2.50004 15.5 2.83337 15.8333 3.33337 15.8333Z" fill="black" />
                    <mask id="mask0_26_2665" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="2" width="20" height="16">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16.6667 2.5H3.33337C1.91671 2.5 0.833374 3.58333 0.833374 5V15C0.833374 16.4167 1.91671 17.5 3.33337 17.5H16.6667C18.0834 17.5 19.1667 16.4167 19.1667 15V5C19.1667 3.58333 18.0834 2.5 16.6667 2.5ZM3.33337 4.16667H16.6667C17 4.16667 17.25 4.33333 17.4167 4.66667L10 9.83333L2.58337 4.66667C2.75004 4.33333 3.00004 4.16667 3.33337 4.16667ZM3.33337 15.8333H16.6667C17.1667 15.8333 17.5 15.5 17.5 15V6.58333L10.5 11.5C10.3334 11.5833 10.1667 11.6667 10 11.6667C9.83337 11.6667 9.66671 11.5833 9.50004 11.5L2.50004 6.58333V15C2.50004 15.5 2.83337 15.8333 3.33337 15.8333Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_26_2665)">
                        <rect width="20" height="20" />
                    </g>
                </svg>
                <span> Мои задачи </span>
            </NavLink>
            <NavLink to={IMPORTANT} className='sideBar-items sideBar-mytask'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.4712 6.84447C18.8034 6.92767 19.0525 7.09407 19.1356 7.42686C19.2186 7.67646 19.1356 8.00925 18.8864 8.17565L15.0661 11.9196L15.9797 17.2443C16.0627 17.5771 15.8966 17.9099 15.6475 18.0763C15.4814 18.1595 15.3153 18.2427 15.1492 18.2427H14.7339L10 15.7467L5.26618 18.2427C4.93398 18.4091 4.60178 18.3259 4.35263 18.1595C4.10348 17.9931 3.93738 17.6603 4.02043 17.3275L4.93398 12.0028L1.11367 8.25885C0.864518 8.09245 0.781468 7.75965 0.864518 7.42686C1.03062 7.09407 1.27977 6.84447 1.61197 6.84447L6.84413 6.01248L9.25259 1.27017C9.50174 0.687777 10.4983 0.687777 10.7475 1.27017L13.1559 6.09568L18.4712 6.84447ZM13.322 11.8364C13.322 11.5868 13.4051 11.3372 13.5712 11.0876L16.561 8.17565L12.4915 7.59326C12.1593 7.59326 11.9102 7.42686 11.8271 7.17726L10 3.51653L8.17294 7.26046C8.00684 7.42686 7.75769 7.67646 7.50853 7.67646L3.43907 8.25885L6.42888 11.0876C6.59498 11.3372 6.67803 11.5868 6.67803 11.8364L5.93058 15.9131L9.58479 13.9995C9.83394 13.8331 10.0831 13.8331 10.3322 13.9995L13.9865 15.9131L13.322 11.8364Z" fill="black" />
                    <mask id="mask0_18_956" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="19">
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.4712 6.84447C18.8034 6.92767 19.0525 7.09407 19.1356 7.42686C19.2186 7.67646 19.1356 8.00925 18.8864 8.17565L15.0661 11.9196L15.9797 17.2443C16.0627 17.5771 15.8966 17.9099 15.6475 18.0763C15.4814 18.1595 15.3153 18.2427 15.1492 18.2427H14.7339L10 15.7467L5.26618 18.2427C4.93398 18.4091 4.60178 18.3259 4.35263 18.1595C4.10348 17.9931 3.93738 17.6603 4.02043 17.3275L4.93398 12.0028L1.11367 8.25885C0.864518 8.09245 0.781468 7.75965 0.864518 7.42686C1.03062 7.09407 1.27977 6.84447 1.61197 6.84447L6.84413 6.01248L9.25259 1.27017C9.50174 0.687777 10.4983 0.687777 10.7475 1.27017L13.1559 6.09568L18.4712 6.84447ZM13.322 11.8364C13.322 11.5868 13.4051 11.3372 13.5712 11.0876L16.561 8.17565L12.4915 7.59326C12.1593 7.59326 11.9102 7.42686 11.8271 7.17726L10 3.51653L8.17294 7.26046C8.00684 7.42686 7.75769 7.67646 7.50853 7.67646L3.43907 8.25885L6.42888 11.0876C6.59498 11.3372 6.67803 11.5868 6.67803 11.8364L5.93058 15.9131L9.58479 13.9995C9.83394 13.8331 10.0831 13.8331 10.3322 13.9995L13.9865 15.9131L13.322 11.8364Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_18_956)">
                        <rect width="20" height="20" />
                    </g>
                </svg>
                <span> Важные </span>
            </NavLink>
            <NavLink to={COMPLETED} className='sideBar-items sideBar-mytask'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.25 6.41667L8.08333 15.5833C7.91667 15.75 7.75 15.8333 7.5 15.8333C7.25 15.8333 7.08333 15.75 6.91667 15.5833L2.75 11.4167C2.41667 11.0833 2.41667 10.5833 2.75 10.25C3.08333 9.91667 3.58333 9.91667 3.91667 10.25L7.5 13.8333L16.0833 5.25C16.4167 4.91667 16.9167 4.91667 17.25 5.25C17.5833 5.58333 17.5833 6.08333 17.25 6.41667Z" fill="black" />
                    <mask id="mask0_18_953" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="2" y="5" width="16" height="11">
                        <path d="M17.25 6.41667L8.08333 15.5833C7.91667 15.75 7.75 15.8333 7.5 15.8333C7.25 15.8333 7.08333 15.75 6.91667 15.5833L2.75 11.4167C2.41667 11.0833 2.41667 10.5833 2.75 10.25C3.08333 9.91667 3.58333 9.91667 3.91667 10.25L7.5 13.8333L16.0833 5.25C16.4167 4.91667 16.9167 4.91667 17.25 5.25C17.5833 5.58333 17.5833 6.08333 17.25 6.41667Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_18_953)">
                        <rect width="20" height="20" />
                    </g>
                </svg>
                <span> Выполненные </span>
            </NavLink>
            <NavLink to={DELETED} className='sideBar-items sideBar-mytask'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.5 4.16671H14.1666V3.33337C14.1666 1.91671 13.0833 0.833374 11.6666 0.833374H8.33329C6.91663 0.833374 5.83329 1.91671 5.83329 3.33337V4.16671H2.49996C1.99996 4.16671 1.66663 4.50004 1.66663 5.00004C1.66663 5.50004 1.99996 5.83337 2.49996 5.83337H3.33329V16.6667C3.33329 18.0834 4.41663 19.1667 5.83329 19.1667H14.1666C15.5833 19.1667 16.6666 18.0834 16.6666 16.6667V5.83337H17.5C18 5.83337 18.3333 5.50004 18.3333 5.00004C18.3333 4.50004 18 4.16671 17.5 4.16671ZM7.49996 3.33337C7.49996 2.83337 7.83329 2.50004 8.33329 2.50004H11.6666C12.1666 2.50004 12.5 2.83337 12.5 3.33337V4.16671H7.49996V3.33337ZM14.1666 17.5C14.6666 17.5 15 17.1667 15 16.6667V5.83337H4.99996V16.6667C4.99996 17.1667 5.33329 17.5 5.83329 17.5H14.1666Z" fill="black" />
                    <mask id="mask0_18_950" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="1" y="0" width="18" height="20">
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.5 4.16671H14.1666V3.33337C14.1666 1.91671 13.0833 0.833374 11.6666 0.833374H8.33329C6.91663 0.833374 5.83329 1.91671 5.83329 3.33337V4.16671H2.49996C1.99996 4.16671 1.66663 4.50004 1.66663 5.00004C1.66663 5.50004 1.99996 5.83337 2.49996 5.83337H3.33329V16.6667C3.33329 18.0834 4.41663 19.1667 5.83329 19.1667H14.1666C15.5833 19.1667 16.6666 18.0834 16.6666 16.6667V5.83337H17.5C18 5.83337 18.3333 5.50004 18.3333 5.00004C18.3333 4.50004 18 4.16671 17.5 4.16671ZM7.49996 3.33337C7.49996 2.83337 7.83329 2.50004 8.33329 2.50004H11.6666C12.1666 2.50004 12.5 2.83337 12.5 3.33337V4.16671H7.49996V3.33337ZM14.1666 17.5C14.6666 17.5 15 17.1667 15 16.6667V5.83337H4.99996V16.6667C4.99996 17.1667 5.33329 17.5 5.83329 17.5H14.1666Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_18_950)">
                        <rect width="20" height="20" />
                    </g>
                </svg>
                <span> Удаленные </span>
            </NavLink>
            <span className='teg'>Тэги</span>
            <div className={tags.isProductivite ? 'sideBar-teg product choosen' : 'sideBar-teg product'} onClick={() => handleProduct()}>
                <div className='circle'></div>
                <span>Продуктивность</span>
            </div>
            <div className={tags.isEducation ? 'sideBar-teg educ choosen' : 'sideBar-teg educ'} onClick={() => handleEduc()}>
                <div className='circle'></div>
                <span>Образование</span>
            </div>
            <div className={tags.isHealth ? 'sideBar-teg healthy choosen' : 'sideBar-teg healthy'} onClick={() => handleHealth()}>
                <div className='circle'></div>
                <span>Здоровье</span>
            </div>
            <div className={tags.isImportant ? 'sideBar-teg import choosen' : 'sideBar-teg import'} onClick={() => handleImportant()}>
                <div className='circle'></div>
                <span>Срочно</span>
            </div>
        </div>
    );
}

export default SideBar;