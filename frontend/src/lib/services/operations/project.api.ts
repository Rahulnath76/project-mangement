import {
  setLoading,
  setProjectData,
  setSuccess,
  updateProjectsInfo,
} from "../../../store/slices/projectSlice";
import { AppDispatch } from "../../../store/store";
import { ProjectResponse } from "../../types";
import { project } from "../api";
import { apiConnector } from "../apiConnector";

const {
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_PROJECT,
  GET_ALL_PROJECTS,
} = project;

interface IProject {
  name: string;
  description: string;
}

export const postProject = ({ name, description }: IProject) => {
  return async (dispatch: AppDispatch, getState: () => any) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", CREATE_PROJECT, {
        name,
        description,
      });

      console.log("POST PROJECT RESPONSE", response);
      console.log(response);

      const currentProjectData = getState().project.projectData;
      dispatch(setProjectData([...currentProjectData, response.data.project]));

      dispatch(setSuccess(true));
    } catch (error) {
      console.log("111111");
      console.log(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const updateProject = async ({ title, description }: IProject) => {
  try {
    const response = await apiConnector("PUT", UPDATE_PROJECT, {
      title,
      description,
    });

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserProjects = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_ALL_PROJECTS);

      dispatch(setProjectData(response.data.projects));

      dispatch(setSuccess(true));
    } catch (error: any) {
      console.log("Fetch user projects error:", error.message);
      dispatch(setSuccess(false));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const deleteProject = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await apiConnector<ProjectResponse>(
        "DELETE",
        DELETE_PROJECT(id)
      );
      console.log(response);

      if (!response.data.success) throw new Error("something went wrong");
      dispatch(updateProjectsInfo(id));
      
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProjectDetails = async (id: string) => {
  try {
    const response = await apiConnector("GET", GET_PROJECT(id));

    console.log(response);

    return response.data.project;
  } catch (error) {
    console.log(error);
  }
};
