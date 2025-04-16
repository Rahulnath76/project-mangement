import { apiConnector } from "../apiConnector";
import { project, task } from "../api";
import { setLoading, setSuccess } from "../../../store/slices/taskSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

const { CREATE_TASK, UPDATE_TASK, DELETE_TASK, GET_ALL_TASKS } = task;

interface ITask{
    projectId?: string;
    name: string;
    description: string;
    status?: string;
}

export const createTask = async ( {name, description}:ITask, projectId:string, dispatch: Dispatch<UnknownAction>):Promise<void> => {
    dispatch(setLoading(true));
    try {
        const response = await apiConnector("POST", CREATE_TASK, {
            name,
            description,
            projectId
        });
        console.log(response);
        dispatch(setSuccess(true));
    } catch (error) {
        console.log("error in createTask", error);
    }
    dispatch(setLoading(false));
}

export const updateTask = async ({name, description, status}:ITask, projectId:string, taskId:string, dispatch:Dispatch<UnknownAction>):Promise<void> => {
    try {
        const response = await apiConnector("PUT", UPDATE_TASK, {
            name,
            description,
            status,
            projectId,
            taskId
        });

        console.log(response);

    } catch (error) {
        console.log("error in createTask", error);
    }
}