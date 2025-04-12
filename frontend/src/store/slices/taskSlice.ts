import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        createTask: (state) => {
            state.loading = true;
            
        }
    }
});

export const { createTask } = taskSlice.actions;
export default taskSlice.reducer;