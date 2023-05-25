import "./app.css";
import TodoList from "./components/TodoList";

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
