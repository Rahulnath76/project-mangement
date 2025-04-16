import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskState {
  name: string;
  description: string;
  writingpad: boolean;
  success: boolean;
  loading: boolean;
}

const initialState: TaskState = {
  name: "",
  description: "",
  writingpad: false,
  success: false,
  loading: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask: (
      state: TaskState,
      action: PayloadAction<{ name: string; description: string }>
    ) => {
      state.name = action.payload.name;
      state.description = action.payload.description;
    },
    resetTask: (state: TaskState) => {
      state.name = "";
      state.description = "";
      state.writingpad = false;
    },
    toggleWritingPad: (state: TaskState) => {
      state.writingpad = !state.writingpad;
    },
    setLoading: (state: TaskState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSuccess: (state: TaskState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setTask, resetTask, toggleWritingPad, setLoading, setSuccess } =
  taskSlice.actions;
export default taskSlice.reducer;
