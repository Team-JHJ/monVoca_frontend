import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    noteId: '',
}

const noteSlice = createSlice({
    name: 'noteSlice',
    initialState,
    reducers: {
        setNote: (state, action) => {
            state.noteId = action.payload
        },
    },
})

export const { setNote } = noteSlice.actions
export default noteSlice.reducer
