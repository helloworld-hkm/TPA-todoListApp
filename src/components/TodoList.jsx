import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import { FaTrashAlt, FaPen, FaSave } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo, getTodo } from "../redux/action/todoAction";
import Spinner from "react-bootstrap/Spinner";
import "./filter.css";
import FormInput from "./FormInput";
function TodoList() {
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");
  const { todos, isLoading } = useSelector((state) => state.toDoReducer);
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState("all");

  //   logic checkbox
  const handleCheck = (e) => {};
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

  const handleDelete = (id) => {
    dispatch(deleteTodo(id, selectedFilter));
  };

  // edit edit data

  const handleEditInputChange = (event) => {
    setEditTodoText(event.target.value);
  };

  const handleEditTodo = (todoId) => {
    setEditTodoId(todoId);
    const todoToEdit = todos.find((todo) => todo.id === todoId);

    setEditTodoText(todoToEdit.title);
  };

  const handleUpdateTodo = () => {
    let data = {
      id: editTodoId,
      title: editTodoText,
      isDone: false,
    };
    dispatch(editTodo(data, selectedFilter));
    setEditTodoId("");
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    console.log(selectedFilter);
  };

  useEffect(() => {
    dispatch(getTodo(selectedFilter));
  }, [selectedFilter]);
  const dataFilter = selectedFilter;

  // const filterIsDone = todos.filter(item => item.isDone == false).map(item => item);

  return (
    <>
      <FormInput filter={dataFilter} />
      <div className="toggle">
        <button
          onClick={() => handleFilterChange("all")}
          className={selectedFilter === "all" ? "active" : "inactive"}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange("active")}
          className={selectedFilter === "active" ? "active" : "inactive"}
        >
          Active
        </button>
        <button
          onClick={() => handleFilterChange("completed")}
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
          <Card className="mt-4" key={i.id}>
            <Card.Body>
              <Stack direction="horizontal" gap={3}>
                <div className="d-flex">
                  <input
                    type="checkbox"
                    style={{ width: "20px", height: "20px" }}
                    onChange={handleCheck}
                  />
                </div>

                {editTodoId === i.id ? (
                  <input
                    type="text"
                    className="me-auto form-control"
                    value={editTodoText}
                    onChange={handleEditInputChange}
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
                  onClick={() => handleDelete(i.id)}
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
