import axiosInstance from '@/api/axios.js'

const review = {
    // OX 자가진단
    getOXQuiz: (data) => {
        return axiosInstance.post('/getOXQuiz', data)
    },

    // 예문 퀴즈
    getExampleQuiz: (userName, noteId) => {
        return axiosInstance.get(`/exampleQuestion/${userName}/${noteId}`)
    },

    // 단어 선택 퀴즈
    getSelectQuiz: (data) => {
        return axiosInstance.post('/selectQuestions', data)
    },
}

export default review
