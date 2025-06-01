import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../lib/types/index";

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  success?: boolean;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  success: true,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload.changes,
        };
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  editTask,
  deleteTask,
  setLoading,
  setSuccess,
} = taskSlice.actions;
export default taskSlice.reducer;
