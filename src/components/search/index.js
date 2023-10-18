import searchIcon from '../../assets/search.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './search.css'
import { useState } from 'react'
import { addSearchValue } from '../../store/taskSlice/TaskSlice'
import { RESULT } from '../routes/constants'



function Search() {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const search = (e) => {
        e.preventDefault()
        dispatch(addSearchValue(value))
        navigate(RESULT)
    }

  return (
    <div className='search'>
        <img src={searchIcon} alt='searchs icon' onClick={() => navigate(RESULT)} />
        <form onSubmit={search}>
            <input type="text" placeholder='Поиск' value={value} onChange={(e) => setValue(e.target.value)} />
        </form>
    </div>
  )
}

export default Search