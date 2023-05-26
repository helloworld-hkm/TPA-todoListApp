import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import { FaTrashAlt, FaPen, FaSave } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { checkTodo, deleteTodo, editTodo, getTodo } from "../redux/action/todoAction";
import Spinner from "react-bootstrap/Spinner";
import "./filter.css";
import FormInput from "./FormInput";
function TodoList() {
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");
  const { todos, isLoading } = useSelector((state) => state.toDoReducer);
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const getStyleTitle = (isDone) => {
    return {
      textDecoration: isDone ? "line-through" : "none",
    };
  };
  const getStyleIcon = (isDone) => {
    return {
      visibility: isDone ? "hidden" : "visible",
    };
  };
  // delete data

  const handleEditTodo = (todoId) => {
    setEditTodoId(todoId);
    const todoToEdit = todos.find((todo) => todo.id === todoId);
    setEditTodoText(todoToEdit.title);
  };

  const handleUpdateTodo = () => {
    console.log("edit");
    let data = {
      id: editTodoId,
      title: editTodoText,
      isDone: false,
    };
    dispatch(editTodo(data, selectedFilter));
    setEditTodoId("");
  };
  // filter menu

  //  completed todo
  const handleCheck = (id) => {
    const findData =todos.find((item) => item.id== id);
   
    let data = {
      id: findData.id,
      title: findData.title,
      isDone: !findData.isDone,
    };
    dispatch(checkTodo(data,selectedFilter) )
  };
  useEffect(() => {
    dispatch(getTodo(selectedFilter));
  }, [selectedFilter]);
  const dataFilter = selectedFilter;
  return (
    <>
   
      <FormInput filter={dataFilter} />
      <div className="toggle">
        <button
          onClick={() => setSelectedFilter("all")}
          className={selectedFilter === "all" ? "active" : "inactive"}
        >
          All
        </button>
        <button
          onClick={() => setSelectedFilter("active")}
          className={selectedFilter === "active" ? "active" : "inactive"}
        >
          Active
        </button>
        <button
          onClick={() => setSelectedFilter("completed")}
          className={selectedFilter === "completed" ? "active" : "inactive"}
        >
          Completed
        </button>
      </div>
      {isLoading ? (
        <div className="text-secondary mt-4 d-flex justify-content-center align-items-center">
          <span className="px-2 h2 ">Loading </span>
          <Spinner className="textCenter " animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : todos.length == 0 ? (
        selectedFilter == "completed" ? (
          <div className="mt-4 text-secondary">
            <h3>No Tasks Completed Yet.</h3>
            <p>
              Looks like there are no completed tasks yet. Keep working on it!
            </p>
          </div>
        ) : (
          <div className="mt-4 text-secondary">
            <h3>Empty Task List. time To Relax</h3>
            <p>Ready for some new task? Tap the input box to wrote them down</p>
          </div>
        )
      ) : (
        todos.map((i) => (
          <Card className="mt-4 todo-list" key={i.id}>
            <Card.Body>
              <Stack direction="horizontal" gap={3}>
                <div className="d-flex">
                  <input
                    type="checkbox" 
                    style={{ width: "20px", height: "20px" }}
                    onChange={()=>handleCheck(i.id)}
                    checked={i.isDone}
                  />
                </div>

                {editTodoId === i.id ? (
                  <input
                    type="text"
                    className="me-auto form-control"
                    value={editTodoText}
                    onChange={()=>setEditTodoText(event.target.value)}
                  />
                ) : (
                  <div style={getStyleTitle(i.isDone)}>
                    <span>{i.title}</span>
                  </div>
                )}

                {editTodoId === i.id ? (
                  <div
                    className=" ms-auto  "
                    onClick={handleUpdateTodo}
                    style={getStyleIcon(i.isDone)}
                  >
                    <FaSave />
                  </div>
                ) : (
                  <div
                    className=" ms-auto  "
                    onClick={() => handleEditTodo(i.id)}
                    style={getStyleIcon(i.isDone)}
                  >
                    <FaPen />
                  </div>
                )}

                <div
                  style={getStyleIcon(i.isDone)}
                  onClick={() => dispatch(deleteTodo(i.id, selectedFilter))}
                >
                  <FaTrashAlt />
                </div>
              </Stack>
            </Card.Body>
          </Card>
        ))
      )}
      
      
    </>
  );
}
export default TodoList;
