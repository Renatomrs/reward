const Form = ({ title, children }) => {
  return (  
    <form>
      <h2>{title}</h2>

      {children}
    </form>
  )
}

export default Form