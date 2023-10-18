import { useDispatch } from 'react-redux';
import './App.css';
import { useEffect } from 'react';
import { connectLocal } from './store/taskSlice/TaskSlice';
import { connectLocalImportant } from './store/importantTaskSlice/ImportantTaskSlice';
import { connectLocalDeleted } from './store/deletedTaskSlice/DeletedTaskSlice';
import SideBar from './components/sideBar';
import AppRouter from './components/routes/AppRouter';

function App() {
  const dispatch = useDispatch()
  const tasks = JSON.parse(localStorage.getItem('task'))
  const importantTasks = JSON.parse(localStorage.getItem('importantTask'))
  const deletedTasks = JSON.parse(localStorage.getItem('deletedTask'))

  useEffect(() => {
    if (tasks) dispatch(connectLocal(tasks))
  }, [])

  useEffect(() => {
    if (importantTasks) dispatch(connectLocalImportant(importantTasks))
  }, [])

  useEffect(() => {
    if (deletedTasks) dispatch(connectLocalDeleted(deletedTasks))
  }, [])
  return (
    <div className="App">
      <div className='container'>
        <div className='flex-center'>
          <div className='wrapper'>
            <SideBar/>
            <AppRouter/>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default App;
