import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import authReducer from "./slices/authSlice"
import profileReducer from "./slices/profileSlice"
import taskReducer from "./slices/taskSlice";
import projectReducer from "./slices/projectSlice"

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        profile: profileReducer,
        task: taskReducer,
        project: projectReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;