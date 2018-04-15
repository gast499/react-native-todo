import {combineReducers} from 'redux';
import {TASKS_AVAILABLE, ADD_TASK, UPDATE_TASK, DELETE_TASK} from "../actions/";

let dataState = {tasks: [], loading: true};

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case ADD_TASK: {
            let tasks = cloneObject(state.tasks);
            tasks.unshift(action.task);
            state = Object.assign({}, state, {tasks: tasks});
            return state;
        }

        case TASKS_AVAILABLE: {
            state = Object.assign({}, state, {tasks: action.tasks, loading: false});
            return state;
        }

        case UPDATE_TASK: {
            let task = action.task;
            let tasks = cloneObject(state.tasks);
            let index = getIndex(tasks, task.id);
            if (index !== -1) {
                tasks[index]['completed'] = !task.completed;
                //tasks[index]['task'] = task.task;
            }
            state = Object.assign({}, state, { tasks: tasks});
            return state;
        }

        case DELETE_TASK:{
            let tasks = cloneObject(state.tasks);
            let index = getIndex(tasks, action.id);
            if (index !== -1){
                tasks.splice(index, 1);
            }
            state = Object.assign({}, state, {tasks: tasks});
            return state;
        }
        default:
            return state;
    }
};

function cloneObject(object) {
    return JSON.parse(JSON.stringify(object));
}

function getIndex(data, id) {
    let clone = cloneObject(data);
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}

const rootReducer = combineReducers({
    dataReducer
})

export default rootReducer;