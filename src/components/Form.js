export default function Form(props) {
    let myForm;
    let inputDate;

    return (
      <form onSubmit={e => e.preventDefault()} ref={el => myForm = el}>
          <input type='date' onClick={e => e.target.showPicker()} onChange={e => {
            if (inputDate !== e.target.value) inputDate = e.target.value
          }
          } />
        
          <input type='submit' className="btn" value='Start timer' onClick={ () => {         
            myForm.reset() 
            
            props.onStart(inputDate)
          }}/>
      </form>
    );
}  