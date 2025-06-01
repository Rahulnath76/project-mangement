import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isDarkMode: localStorage.getItem("isDarkMode") === "true" || false,
    isProjectCreationBoardOpen: false,
    isSidebarOpen: localStorage.getItem("isSidebarOpen") === "true" || false,
    isMobileMenuOpen: false,
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem("isDarkMode", String(state.isDarkMode));
        },
        toggleProjectCreationBoard: (state) => {
            state.isProjectCreationBoardOpen = !state.isProjectCreationBoardOpen;
        },
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
            localStorage.setItem("isSidebarOpen", String(state.isSidebarOpen));
        },
        toggleMobileMenu: (state) => {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
    },
});

export const { toggleDarkMode, toggleProjectCreationBoard, toggleSidebar, toggleMobileMenu } = appSlice.actions;
export default appSlice.reducer;