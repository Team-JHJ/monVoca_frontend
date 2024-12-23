import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userName: 'admin2',
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userName = action.payload
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
