import { configureStore } from '@reduxjs/toolkit'
import userSlice from '@/store/user-slice.js'

export default configureStore({
    reducer: {
        userSlice,
    },
})
