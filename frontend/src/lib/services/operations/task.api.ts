import { apiConnector } from "../apiConnector";
import { project, task } from "../api";
import { addTask, setLoading, setTasks } from "../../../store/slices/taskSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

const { CREATE_TASK, UPDATE_TASK, DELETE_TASK, GET_ALL_TASKS } = task;

interface ITask{
    projectId: string;
    taskId?: string;
    name: string;
    description: string;
    status?: string;
}

export const createTask = ( {name, description, projectId}:ITask) => {
    return async (dispatch:Dispatch<UnknownAction>) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", CREATE_TASK, {
                name,
                description,
                projectId
            });
            console.log(response);

            dispatch(addTask(response.data.task));

        } catch (error) {
            console.log("error in createTask", error);
        }
        finally {
            dispatch(setLoading(false));
        }
    }
}

export const updateTask = ({name, description, status}:ITask, projectId:string, taskId:string) => {
    return async (dispatch:Dispatch<UnknownAction>) => {
        try {
        const response = await apiConnector("PUT", UPDATE_TASK, {
            name,
            description,
            status,
            projectId,
            taskId
        });

        console.log(response);

        // updateTask({});

    } catch (error) {
        console.log("error in createTask", error);
    }
    }
}

export const getAllTasks = (projectId) => {
  return async (dispatch: Dispatch<UnknownAction>) => {
    try {
        const response = await apiConnector("GET", GET_ALL_TASKS(projectId),);
        console.log("TASKS", response);
        if(!response.data.success ) throw new Error("Error in fetching tasks");
        dispatch(setTasks(response.data.tasks));
    } catch (error) {
        console.log(error);
    }
}
};

export const updateTaskStatus = async (taskId:string, status:string):Promise<void> => {
    try {
        const response = await apiConnector("PUT", UPDATE_TASK, {
            taskId,
            status
        });

        console.log(response);

    } catch (error) {
        console.log("error in createTask", error);
    }
}