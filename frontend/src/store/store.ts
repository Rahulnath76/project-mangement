import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import profileReducer from "./slices/profileSlice"
import taskReducer from "./slices/taskSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        task: taskReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;