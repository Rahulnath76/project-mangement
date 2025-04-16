import { Dispatch } from "@reduxjs/toolkit";
import { project } from "../api";
import { apiConnector } from "../apiConnector";

const {CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, GET_PROJECT, GET_ALL_PROJECTS} = project;

interface IProject{
    title: string;
    description: string;
}

export const createProject = async ({title, description}:IProject, dispatch:Dispatch) => {
    try {
        const response = await apiConnector('POST', CREATE_PROJECT, {
            title, description
        });

        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export const updateProject = async ({title, description}:IProject, dispatch:Dispatch) => {
    try {
        const response = await apiConnector('PUT', UPDATE_PROJECT, {
            title, description
        });

        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

