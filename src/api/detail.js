import axiosInstance from '@/api/axios.js'

const detail = {
    // 단어장 내 단어 리스트 가져오기
    getDetail: (userName, noteId) => {
        return axiosInstance.get(`/getDetails/${userName}/${noteId}`)
    },

    // 단어장 내 단어 추가하기
    createDetail: (userName, noteId, detail) => {
        return axiosInstance.post(`/createDetail/${userName}/${noteId}`, {
            ...detail,
        })
    },

    // 단어쟝 내 단어 내용 수정하기
    updateDetail: (userName, detail) => {
        return axiosInstance.put(
            `/updateDetail/${userName}/${detail.noteId}/${detail.detailId}`,
            { ...detail },
        )
    },

    // 단어장 내 단어 삭제하기
    deleteDetail: (userName, noteId, detailId) => {
        return axiosInstance.delete(
            `/deleteDetail/${userName}/${noteId}/${detailId}`,
        )
    },

    // 이미지 업로드
    uploadImage: (userName, noteId, formData) => {
        return axiosInstance.post(
            `/translate-and-add/${userName}/${noteId}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        )
    },
}

export default detail
