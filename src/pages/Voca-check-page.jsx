import { useEffect, useState } from 'react'
import review from '@/api/review.js'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from '@/components/loading.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'

export default function VocaCheckPage() {
    const userName = useSelector((state) => state.userSlice.userName)
    const noteId = useSelector((state) => state.noteSlice.noteId)
    const navigate = useNavigate()
    const choice = useLocation().state
    let lang = ''
    if (choice === 'word') {
        lang = 'kor'
    } else {
        lang = 'eng'
    }

    const [isLoading, setIsLoading] = useState(false)
    const [quizList, setQuizList] = useState([])
    const [quiz, setQuiz] = useState([])
    const [quizIndex, setQuizIndex] = useState(0)

    // 단어 삭제
    const plusQuiz = () => {
        // 남은 단어가 없다면 완료 페이지로
        if (quizList.length === 0) navigate('/completion', { replace: true })
        if (quizIndex < quizList.length) {
            setQuizIndex((prev) => (prev + 1) % quizList.length)
        }
    }

    // 단어 그대로
    const minusQuiz = () => {
        const newQuizList = quizList.filter((_, index) => index !== quizIndex)
        setQuizList(newQuizList)

        if (newQuizList.length === 0) {
            navigate('/completion', { replace: true })
        } else {
            // 현재 인덱스가 리스트 길이보다 크면 처음으로
            if (quizIndex >= newQuizList.length) {
                setQuizIndex(0)
            }
        }
    }

    const getQuiz = () => {
        setQuiz(quizList[quizIndex])
    }

    const getQuizList = async () => {
        try {
            setIsLoading(true)
            const response = await review.getOXQuiz(lang, userName, noteId)
            setQuizList(response.data)
            getQuiz()
            setIsLoading(false)
        } catch (error) {
            console.error(error)
            // alert(error.message);
        }
    }

    useEffect(() => {
        getQuizList()
    }, [])

    useEffect(() => {
        if (quizList.length > 0) {
            setQuiz(quizList[quizIndex])
        }
    }, [quizList, quizIndex])

    return (
        <div className="flex h-full w-full flex-col p-4">
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="flex h-full flex-col justify-around">
                        <div className="flex h-48 w-full items-center justify-center rounded-lg bg-[#DBE9FE] text-3xl font-semibold">
                            {quiz}
                        </div>
                        <div className="flex w-full justify-around">
                            <FontAwesomeIcon
                                icon={faCircle}
                                className="h-full w-3/12 text-blue-500"
                                onClick={() => {
                                    minusQuiz()
                                }}
                            />
                            <FontAwesomeIcon
                                icon={faXmark}
                                className="h-full w-3/12 text-red-500"
                                onClick={() => {
                                    plusQuiz()
                                }}
                            />
                        </div>
                    </div>
                    <div className="h-24 py-3 text-center text-xl">
                        {/*<div>{`${quizIndex + 1} / ${quizList.length}`}</div>*/}
                        {quizList.length} 단어 남음
                    </div>
                </>
            )}
        </div>
    )
}
