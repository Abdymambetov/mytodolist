import './calendar.css'
import SwitchMonth from './switchMonth'

const Calendar = (props) => {
    const { choosenDate, setChoosenDate, handlePrevMonth, handleNextMonth, currentYear, currentMonth, flexibleCurrentMonth, daysArray, days } = props
    return (
        <div className='calendar'>
            <SwitchMonth
                handlePrevMonth={handlePrevMonth}
                handleNextMonth={handleNextMonth}
                currentYear={currentYear}
                currentMonth={currentMonth}
                flexibleCurrentMonth={flexibleCurrentMonth}
            />
            <div className='grid'>
                {days.map(item => 
                    <div className='grid-item' key={item}>
                        <p>{item}</p>
                    </div>
                )}
                {daysArray.map(item => 
                    <div 
                        onClick={() => setChoosenDate(item.format('DD.MM.YYYY'))}
                        className=
                        {
                            item.isoWeekday() == 6 || item.isoWeekday() == 7
                                ? choosenDate == item.format('DD.MM.YYYY')
                                    ?'grid-item weekend activeCalendar'
                                    :'grid-item weekend'
                                : choosenDate == item.format('DD.MM.YYYY')
                                    ?'grid-item activeCalendar'
                                    :'grid-item'
                        }
                        key={item.format('DD-MM-YYYY')}
                    >
                        <p className='' > {item.format('D')} </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Calendar