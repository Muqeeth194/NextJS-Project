import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// We define the NavbarState interface to represent the structure of the state, containing a property value of type string.
interface NavBarState {
    value:  string
}

// Defined interface or structure will be assigned to the initialState which will be used in the slice. 
// It specifies that initialState should adhere to the structure defined by the NavbarState interface or type.
const initialState: NavBarState = {
    value: 'public' // Initial value can be empty string or any default value you want
}

export const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        changeState : (state, action : PayloadAction<string>) => {
            state.value = action.payload
        }
    }
})

export const { changeState } = navbarSlice.actions
export default navbarSlice.reducer