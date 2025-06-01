import {
  addProject,
  setCurrentProject,
  setLoading,
  setProjectData,
  setSuccess,
  updateProjectsInfo,
} from "../../../store/slices/projectSlice";
import { setTasks } from "../../../store/slices/taskSlice";
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
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector<ProjectResponse>("POST", CREATE_PROJECT, {
        name,
        description,
      });

      console.log("POST PROJECT RESPONSE", response);
      console.log(response);
      if(!response.data.success)  throw new Error("Something went wrong");

      dispatch(addProject(response.data.project));
      dispatch(setSuccess(true));
    } catch (error) {
      console.log("111111");
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const updateProject = ({ name, description }: IProject) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector<ProjectResponse>("PUT", UPDATE_PROJECT, {
        name,
        description,
      });

      console.log("UPDATE PROJECT RESPONSE", response);
      if (!response.data.success || !response.data.project) {
        throw new Error("Error updating project");
      }

      dispatch(setCurrentProject(response.data.project));
      dispatch(setSuccess(true));
    } catch (error) {
      console.log("Error updating project:", error);
      dispatch(setSuccess(false));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const fetchUserProjects = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector<ProjectResponse>("GET", GET_ALL_PROJECTS);

      dispatch(setProjectData(response.data.projects));

      dispatch(setSuccess(true));
    } catch (error) {
      console.log("Fetch user projects error:", error);
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

export const getProjectDetails = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector<ProjectResponse>("GET", GET_PROJECT(id));
      console.log("Project details:", response);
      if (!response.data.success || !response.data.project) {
        throw new Error("Error fetching project details");
      }
      const { project } = response.data;
      dispatch(setCurrentProject(project));
      dispatch(setTasks(project.tasks || []));
    } catch (error) {
      console.log("Error fetching project details:", error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
};
