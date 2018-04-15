export const TASKS_AVAILABLE = 'TASKS_AVAILABLE';
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
import {AsyncStorage} from 'react-native';

export function addTask(task) {
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, tasks) => {
            if (tasks !== null) {
                tasks = JSON.parse(tasks);
                tasks.unshift(task);
                AsyncStorage.setItem('data', JSON.stringify(tasks), () => {
                    dispatch({type: ADD_TASK, task: task});
                });
            }
        });
    };
}

export function getTasks() {
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, tasks) => {
            if (tasks !== null) {
                dispatch({type: TASKS_AVAILABLE, tasks: JSON.parse(tasks)});
            }
        });
    };
}

export function updateTask(task) {
    return (dispatch) => {
        AsyncStorage.getItem('data', (err,tasks) => {
            if (tasks !== null) {
                tasks = JSON.parse(tasks);
                var index = getIndex(tasks, task.id);
                if (index !== -1) {
                    tasks[index]['completed'] = !task.completed;
                    //tasks[index]['task'] = task.task;
                }
                AsyncStorage.setItem('data', JSON.stringify(tasks), () => {
                    dispatch({type: UPDATE_TASK, task:task});
                });
            }
        });
    };
}

export function deleteTask(id) {
    return (dispatch) => {
        AsyncStorage.getItem('data', (err,tasks) => {
            if (tasks !== null){
                tasks = JSON.parse(tasks);
                var index = getIndex(tasks, id);
                if (index !== -1) {
                    tasks.splice(index, 1);
                }
                AsyncStorage.setItem('data', JSON.stringify(tasks), () => {
                    dispatch({ type: DELETE_TASK, id:id});
                });
            }
        });
    };
}

function getIndex(data, id) {
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}