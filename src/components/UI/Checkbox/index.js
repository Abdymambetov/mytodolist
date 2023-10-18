import './check.css'

const Checkbox = (props) => {
    const {checked, children, id, onChangeCheck} = props

    return (
        <>
            <input type="checkbox" checked={checked} className='custom-ckeckbox' onChange={onChangeCheck} id={id} name={id} value='yes' />
            <label htmlFor={id} style={{color: '#D0D2D6'}}>{children}</label>
        </>
    )
}

export default Checkbox