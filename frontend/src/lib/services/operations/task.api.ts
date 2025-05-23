import { apiConnector } from "../apiConnector";
import { task } from "../api";
import { addTask, setLoading, setTasks, deleteTask, editTask, setSuccess } from "../../../store/slices/taskSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

const { CREATE_TASK, UPDATE_TASK, DELETE_TASK, GET_ALL_TASKS } = task;

interface ITask{
    name: string | undefined;
    status?: string | undefined;
}

export const createTask = ( {name}:ITask, projectId:string) => {
    return async (dispatch:Dispatch<UnknownAction>) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", CREATE_TASK, {
                name,
                projectId
            });
            console.log(response);
            if(!response.data.success) throw new Error("Error in creating task");
            dispatch(setSuccess(true));
            dispatch(addTask(response.data.task));

        } catch (error) {
            dispatch(setSuccess(false));
            console.log("error in createTask", error);
        }
        finally {
            dispatch(setLoading(false));
        }
    }
}

export const updateTask = ({name, status}:ITask, projectId:string, taskId:string) => {
    return async (dispatch:Dispatch<UnknownAction>) => {
        try {
        const response = await apiConnector("PUT", UPDATE_TASK, {
            name,
            status,
            projectId,
            taskId
        });

        console.log(response);
        if(!response.data.success) throw new Error("Error in updating task");

        dispatch(editTask({id: taskId, changes: {name:response.data.task.name, status:response.data.task.status}}));

    } catch (error) {
        console.log("error in createTask", error);
    }
    }
}

export const getAllTasks = (projectId) => {
  return async (dispatch: Dispatch<UnknownAction>) => {
    try {
        const response = await apiConnector("GET", GET_ALL_TASKS(projectId));
        console.log("TASKS", response);
        if(!response.data.success ) throw new Error("Error in fetching tasks");
        console.log(response.data.tasks);
        dispatch(setTasks(response.data.tasks));
    } catch (error) {
        console.log(error);
    }
}
};

export const deleteTaskThunk = (projectId, taskId) => {
    return async (dispatch: Dispatch<UnknownAction>) => {
        try {
            console.log(taskId);
            const response = await apiConnector("DELETE", DELETE_TASK(projectId), {taskId});
            console.log(response);
            if(!response.data.success) throw new Error("Error in deleting task");

            dispatch(deleteTask(taskId));
            
        } catch (error) {
            console.log("error in createTask", error);
        }
    }
}