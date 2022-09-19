import './styles.css'

const Input = ({ type, textLabel, placeholder, onChange, value }) => {
  return (  
    <div className='inputFild'>
      <label className="label">
        {textLabel}
      </label>

      <input 
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

export default Input
