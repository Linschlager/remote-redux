import {
  ACTIVATE_TODO,
  ADD_TODO,
  DELETE_TODO,
  FINISH_TODO,
  SELECT_TODO,
  UPDATE_TODO
} from "../../common/redux/consts";
import uuid from "../../common/uuid";

// Internal Action creators
const todoAdd = title => {
  const id = uuid();
  return {
    type: ADD_TODO,
    payload: {
      id,
      title
    }
  };
};

const todoSelect = selectedId => {
  return {
    type: SELECT_TODO,
    payload: selectedId
  };
};

const todoUpdate = (id, changedData) => {
  return {
    type: UPDATE_TODO,
    payload: {
      id,
      ...changedData
    }
  };
};

const todoDelete = id => {
  return {
    type: DELETE_TODO,
    payload: id
  };
};

const todoFinish = id => {
  return {
    type: FINISH_TODO,
    payload: id
  };
};

const todoActivate = id => {
  return {
    type: ACTIVATE_TODO,
    payload: id
  };
};

// External Actions
export const addTodo = title => {
  return todoAdd(title);
};

export const selectTodo = selectedId => {
  return todoSelect(selectedId);
};

export const updateTodo = (selectedTodo, changedData) => {
  return todoUpdate(selectedTodo, changedData);
};

export const deleteTodo = listItemId => {
  return todoDelete(listItemId);
};

export const toggleTodo = (listItemId, nextState) => {
  if (nextState === true) {
    return todoActivate(listItemId);
  } else {
    return todoFinish(listItemId);
  }
};
