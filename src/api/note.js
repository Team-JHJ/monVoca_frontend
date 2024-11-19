import axiosInstance from '@/api/axios.js'

const note = {
    // 단어장 리스트 가져오기
    getNote: (userId) => {
        return axiosInstance.get(`getNotes/${userId}`)
    },

    // 단어장 추가하기
    createNote: (userId, title) => {
        return axiosInstance.post(`createNote`, { userId, title })
    },

    // 단어쟝 이름 수정하기
    updateNote: () => {},

    // 단어장 삭제하기
    deleteNote: () => {},
}

export default note
