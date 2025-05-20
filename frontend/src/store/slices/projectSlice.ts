import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskState {
  projectData: any[];
  projectBoard: boolean;
  success: boolean;
  error?: string;
  loading: boolean;
}

const initialState: TaskState = {
  projectData: [],
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

export const { setProjectData, toggleBoard, setLoading, setSuccess, setError } =
  taskSlice.actions;
export default taskSlice.reducer;
