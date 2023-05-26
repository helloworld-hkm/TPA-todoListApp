import "./style.css";
import TodoList from "./components/TodoList";
import './index.css'
function App() {

  return (
    <>
     <div className="container">
      <div id="header-form">
      <div className="card-1">
        <h2>📃 What`s the plan for today?</h2>
       <TodoList/>
      </div>
      </div>
      <div id="footer">
        <hr/>
        <p>  created by<b> Hakim Firman F.</b></p>
      </div>
      </div>
    </>
  );
}

export default App;
