import rootReducer from "./reducer";
import { createStore } from "./tools/createStore";

// TODO !remove
import { addTodo } from "../../client/redux/actions";

// THE State object.
const store = createStore(
  {
    selectedTodo: undefined,
    todos: {
      ids: [],
      byId: {}
    }
  },
  rootReducer
);

store.dispatch(addTodo("First Todo"));
store.dispatch(addTodo("Second Todo"));
store.dispatch(addTodo("Third Todo"));

export default store;
