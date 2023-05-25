import axios from "axios";
export const GET_TODO = "GET_TODO";
export const START = "START";
export const SUCCESS = "SUCCESS";
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const EDIT_TODO ="EDIT_TODO"
export const SET_DATA = 'SET_DATA';
export const SET_FILTER = 'SET_FILTER';
// Action types

export const setData = data => ({
  type: SET_DATA,
  payload: data,
});
export const setFilter = filter => ({
  type: SET_FILTER,
  payload: filter,
});


export const start = () => {
  return {
    type: START,
  };
};
const success = (payload) => {
  return {
    type: SUCCESS,
    payload,
  };
};
// tampilkan todo
export const getTodo = (data) => async (dispatch) => {
  dispatch(start());
  const url = "https://64690fc5183682d61438f5aa.mockapi.io/todo";
 
  const result = await axios(url);
  let filterIsDone = result.data
  if (data=="active") {
   filterIsDone = result.data.filter(item => item.isDone == false)
  }
  else if (data=="completed") {
    filterIsDone = result.data.filter(item => item.isDone == true)
  }
   
  
 
  dispatch(success(filterIsDone));
};
// tambah todo
export const addTodo = (data,filter) => async (dispatch) => {
  const url = "https://64690fc5183682d61438f5aa.mockapi.io/todo";
  await axios.post(url, data);
  console.log("tambah data",);

console.log("ini dari add",filter);
  dispatch(getTodo(filter));
};
export const editTodo = (data) => async (dispatch) => {
  const url = `https://64690fc5183682d61438f5aa.mockapi.io/todo/${data.id}`;
  
 await axios.put(url, data);
  dispatch(getTodo("all"));
};
// hapus todo
export const deleteTodo = (data,filter) => async (dispatch) => {
  try {
    const url=`https://64690fc5183682d61438f5aa.mockapi.io/todo/${data}`
    console.log(filter);
    console.log("data",data);
    await axios.delete(url);
    console.log("Data deleted successfully");
    dispatch(getTodo());
  
  } catch (error) {
    console.log("Error deleting data:", error);
  }
  console.log(filter);
  console.log("data",data);
  dispatch(getTodo(filter));
};