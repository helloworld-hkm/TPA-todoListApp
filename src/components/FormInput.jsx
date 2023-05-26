
import { useState } from 'react';
import { addTodo } from '../redux/action/todoAction';
import { useDispatch } from 'react-redux';
import './form.css'
import Stack from 'react-bootstrap/esm/Stack';
function FormInput({filter}) {
    const dispatch = useDispatch()
    
    
    const [inputTodo, setInputTodo] = useState("");
    const handleInputTodo = (e) => {
        e.preventDefault();
        let data = {
          title: inputTodo,
          isDone: false,
        };
       
        dispatch(addTodo(data,filter));
        setInputTodo("");
      };
    return(
        <>
            <form onSubmit={handleInputTodo}>
        <Stack direction="horizontal" gap={3} className="mt-5">
          <input
            type="text"
            className="me-auto form-control"
            placeholder="What to do"
            value={inputTodo}
            onChange={(e) => setInputTodo(e.target.value)}
            required
          />
          <button className="btn" style={{backgroundColor:"darkblue",color:"white"}}>Add</button>
        </Stack>
      </form>
        </>
    )
}
export default FormInput