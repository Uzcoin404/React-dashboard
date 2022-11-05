import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
};

const useMenu = createSlice({
    name: "menu-toggle",
    initialState,
    reducers: {
        menuToggle: (state) => {
            state.open = !state.open;
        },
        menuClose: (state) => {
            state.open = false;
        }
    },
});
export const { menuToggle, menuClose } = useMenu.actions

export default useMenu.reducer;