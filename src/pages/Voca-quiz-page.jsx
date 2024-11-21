import { useEffect, useState } from 'react'
import review from '@/api/review.js'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Loading from '@/components/loading.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function VocaQuizPage() {
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
    const [quizIndex, setQuizIndex] = useState(0)
    const [quiz, setQuiz] = useState({ options: [] })
    const [isCorrect, setIsCorrect] = useState('')

    // 다음 퀴즈로
    const nextQuiz = () => {
        // 문제를 풀지 않고 다음 문제로 넘어간다면
        if (!isCorrect) {
            alert('문제를 풀어주세요!')
            return
        }
        // 다음 문제로
        if (quizIndex < quizList.length - 1) {
            setQuizIndex((prev) => prev + 1)
            setIsCorrect('')
        } else {
            // 다 풀었다면 완료 화면으로
            navigate('/completion', { replace: true })
        }
    }

    const getQuiz = () => {
        const data = quizList[quizIndex]
        if (!data) return

        const exampleObj = {}
        let options = []
        for (const [key, value] of Object.entries(data)) {
            // console.log(`${key}: ${value}`)
            if (key === 'question') {
                // 문제라면
                exampleObj[key] = value
            } else if (key === 'answer') {
                // 정답이라면
                exampleObj['answer'] = value
                // 보기에 추가
                options.push(value)
            } else {
                // 보기에 추가
                options.push(value)
            }
        }
        exampleObj['options'] = options.toSorted()

        setQuiz(exampleObj)
    }

    const getQuizList = async () => {
        try {
            setIsLoading(true)
            const response = await review.getSelectQuiz(lang, userName, noteId)
            // console.log(response.data)
            // validQuiz(response.data)
            setQuizList(response.data)
            getQuiz()
            setIsLoading(false)
        } catch (error) {
            console.error(error)
            // alert(error.message)
        }
    }

    const evaluate = (e, choice, answer) => {
        if (choice === answer) {
            // 정답이라면
            setIsCorrect('answer')
        } else {
            // 틀렸다면
            setIsCorrect(choice)
            // console.log('오답')
        }
    }

    useEffect(() => {
        getQuizList()
    }, [])

    useEffect(() => {
        if (quizList.length > 0) {
            getQuiz()
        }
    }, [quizList, quizIndex])

    return (
        <div
            className={`flex h-full w-full flex-col justify-evenly overflow-hidden break-all p-4 ${quizList.length === 0 && 'justify-center'}`}
        >
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="flex h-full flex-col justify-center gap-y-10 overflow-hidden">
                        <div className="no-scrollbar flex min-h-48 items-center justify-center overflow-y-auto rounded-lg bg-[#DBE9FE] p-4 text-3xl font-semibold">
                            {quiz.question}
                        </div>
                        <div className="flex flex-wrap justify-between gap-y-6">
                            {quiz.options.map((item, index) => (
                                <div
                                    key={index}
                                    className={`w-[45%] cursor-pointer rounded-lg bg-[#E5E7EB] p-4 text-center ${isCorrect === 'answer' && item === quiz.answer ? 'text-blue-500' : isCorrect !== '' && item === isCorrect ? 'text-red-500' : ''}`}
                                    onClick={(e) => {
                                        evaluate(e, item, quiz.answer)
                                    }}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="h-4 text-center">
                            {isCorrect === 'answer'
                                ? '정답입니다 ⭕️'
                                : isCorrect !== ''
                                  ? '틀렸습니다 ❌'
                                  : ''}
                        </div>
                    </div>
                    <div className="flex h-24 items-center justify-end py-3 text-xl">
                        <div>{`${quizIndex + 1} / ${quizList.length}`}</div>
                        <FontAwesomeIcon
                            icon={faCircleChevronRight}
                            className="ml-6 h-3/4 cursor-pointer text-[#3C82F6] hover:text-[#2563EB]"
                            onClick={() => {
                                nextQuiz()
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    )
}
