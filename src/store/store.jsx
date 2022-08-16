import { configureStore } from "@reduxjs/toolkit";
import useMenu from "../components/menuToggle";

export const store = configureStore({
    reducer: {},
});
export const menuStore = configureStore({
    reducer: {
        menuToggle: useMenu,
    },
});
