import "./style.css";
import TodoList from "./components/TodoList";
import './index.css'
function App() {

  return (
    <>
      <div className="card-1">
        <h2>📃 What`s the plan for today?</h2>
       <TodoList/>
      </div>
    </>
  );
}

export default App;
