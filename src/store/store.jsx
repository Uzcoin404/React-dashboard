import { configureStore } from "@reduxjs/toolkit";
import useMenu from "./menuToggle";
import ChatId from "./chatId";

export const store = configureStore({
    reducer: {},
});
export const menuStore = configureStore({
    reducer: {
        menuToggle: useMenu,
    },
});