import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userId: null,
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return action.payload
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
