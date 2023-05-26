
import { START, SUCCESS } from "../action/todoAction";
const initialState = {
  todos: [],
  isLoading: false,
};
function toDoReducer(state = initialState, action) {
  switch (action.type) {
    case START:
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESS:
      return {
        todos: [...action.payload],
        isLoading: false,
      };

    default:
      return state;
  }
}
export default toDoReducer;
