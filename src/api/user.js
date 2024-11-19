import axiosInstance from '@/api/axios.js'

const user = {
    // 사용자 정보 가져오기
    getUser: (userName) => {
        return axiosInstance.get(`/getUser/${userName}`)
    },

    // 사용자 생성하기
    createUser: (userName, userPassword, userEmail) => {
        return axiosInstance.post('/createUser', {
            userName,
            userPassword,
            userEmail,
        })
    },

    // 사용자 정보 수정하기
    updateUser: () => {},

    // 사용자 삭제하기
    deleteUser: () => {},
}

export default user
