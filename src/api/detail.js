import axiosInstance from '@/api/axios.js'

const detail = {
    // 단어장 내 단어 리스트 가져오기
    getDetail: (userId, noteId) => {
        return axiosInstance.get(`/getDetails/${userId}/${noteId}`)
    },

    // 단어장 내 단어 추가하기
    createDetail: (userId, noteId, detail) => {
        return axiosInstance.post(`/createDetail/${userId}/${noteId}`, {
            noteId,
            ...detail,
        })
    },

    // 단어쟝 내 단어 내용 수정하기
    updateDetail: () => {},

    // 단어장 내 단어 삭제하기
    deleteDetail: () => {},
}

export default detail
