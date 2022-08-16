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
    },
});
export const { menuToggle } = useMenu.actions

export default useMenu.reducer;