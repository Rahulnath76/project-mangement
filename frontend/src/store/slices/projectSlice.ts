import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../lib/types";

export interface TaskState {
  projectData: Project[];
  currentProject: Project | null;
  projectBoard: boolean;
  success: boolean;
  error?: string;
  loading: boolean;
}

const initialState: TaskState = {
  projectData: [],
  currentProject: null,
  projectBoard: false,
  success: false,
  error: "",
  loading: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setProjectData: (
      state: TaskState,
      action
    ) => {
      state.projectData = action.payload;
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
    updateProjectsInfo: (state, action) => {
      state.projectData = state.projectData.filter((project) => project._id !== action.payload);
    },
    toggleBoard: (state) => {
        state.projectBoard = !state.projectBoard;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state: TaskState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSuccess: (state: TaskState, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
  },
});

export const { setProjectData, setCurrentProject, updateProjectsInfo, toggleBoard, setLoading, setSuccess, setError } =
  taskSlice.actions;
export default taskSlice.reducer;
