import { configureStore } from '@reduxjs/toolkit'
import userSlice from '@/store/user-slice.js'
import noteSlice from '@/store/note-slice.js'

export default configureStore({
    reducer: {
        userSlice,
        noteSlice,
    },
})
