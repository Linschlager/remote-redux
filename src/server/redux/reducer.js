import {
  ACTIVATE_TODO,
  ADD_TODO,
  DELETE_TODO,
  FINISH_TODO,
  SELECT_TODO,
  UPDATE_TODO
} from "../../common/redux/consts";
import combineReducers from "./tools/combineReducers";

/**
 * Keeping an array of all ids
 * @param state Last
 * @param {{type: String, payload: { id: String, title: String, content: String }}} action
 * @return {String[]} Array of all ids
 */
const ids = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload.id];
    case DELETE_TODO:
      return state.filter(id => id !== action.payload);
    default:
      return state;
  }
};

/**
 * maps id's to their data
 * @param state Last
 * @param {{type: String, payload: { id: String, title: String, content: String }}} action
 * @returns {{[String]: {id: String, title: String, content: String}}} Array of all ids
 */
const byId = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case UPDATE_TODO:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload // Merge changes into item
        }
      };
    case DELETE_TODO:
      return Object.keys(state).reduce((tempState, current) => {
        if (current !== action.payload) {
          return { ...tempState, [current]: state[current] };
        }
        return tempState;
      }, {});
    case FINISH_TODO:
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          done: true
        }
      };
    case ACTIVATE_TODO:
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          done: false
        }
      };
    default:
      return state;
  }
};

const todos = combineReducers({
  ids,
  byId
});

/**
 * id of the currently selected item
 * @param state Last
 * @param {{type: String, payload: String}} action
 * @return {String} id of selected list
 */
const selected = (state, action) => {
  switch (action.type) {
    case SELECT_TODO:
      return action.payload;
    case DELETE_TODO:
      if (action.payload === state) {
        return null;
      }
      return state;
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  todos,
  selectedTodo: selected
});

export default rootReducer;
