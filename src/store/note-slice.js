import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    noteId: '673ee5a50a27730ccd921926',
    noteTitle: '과일',
}

const noteSlice = createSlice({
    name: 'noteSlice',
    initialState,
    reducers: {
        setNote: (state, action) => {
            state.noteId = action.payload.noteId
            state.noteTitle = action.payload.noteTitle
        },
    },
})

export const { setNote } = noteSlice.actions
export default noteSlice.reducer
