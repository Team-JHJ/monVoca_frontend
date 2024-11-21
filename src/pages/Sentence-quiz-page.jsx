import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import review from '@/api/review.js'
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loading from '@/components/loading.jsx'
import { useNavigate } from 'react-router-dom'

export default function SentenceQuizPage() {
    const navigate = useNavigate()
    const userName = useSelector((state) => state.userSlice.userName)
    const noteId = useSelector((state) => state.noteSlice.noteId)

    const [quizList, setQuizList] = useState([])
    const [quiz, setQuiz] = useState({ options: [] })
    const [quizIndex, setQuizIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
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

    // 퀴즈 문제 저장
    const getQuiz = () => {
        setIsCorrect('')
        const data = quizList[quizIndex]
        if (!data) {
            return
        }
        // console.log(`데이터 ${data}`)
        const exampleObj = {}
        let options = []
        for (const [key, value] of Object.entries(data)) {
            // console.log(`${key}: ${value}`)
            if (key === 'example') {
                // 예문이라면
                exampleObj[key] = value
            } else if (key === 'word1') {
                // 정답이라면
                exampleObj['answer'] = value

                // 정답 밑줄 처리
                exampleObj['example'] = exampleObj['example'].replace(
                    value,
                    '_______',
                )
                options.push(value)
            } else {
                // 보기에 추가
                options.push(value)
            }
        }
        exampleObj['options'] = options.toSorted()
        setQuiz(exampleObj)
        setIsLoading(false)
    }

    // 예문에 단어가 들어갔는지 확인하고 들어갔다면 저장
    const validExample = (exampleArray) => {
        const exampleList = exampleArray.filter((data) =>
            new RegExp(`(^|\\s)${data.word1}(\\s|$)`).test(data.example),
        )

        setQuizList(exampleList)
    }

    const getExample = async () => {
        try {
            if (isLoading) return
            setIsLoading(true)
            const response = await review.getExampleQuiz(userName, noteId)
            validExample(response.data)
            setIsLoading(false)
        } catch (error) {
            console.error('Request Error:', error.message)
            // alert(error.message)
        }
    }

    const evaluate = (e, choice, answer) => {
        if (choice === answer) {
            // 정답이라면
            setIsCorrect('answer')
            // 밑줄 정답 채워넣기
            const answer = quiz.example.replace('_______', e.target.innerText)
            setQuiz({ ...quiz, ['example']: answer })
        } else {
            // 틀렸다면
            setIsCorrect(choice)
            console.log('오답')
        }
    }

    useEffect(() => {
        getExample()
    }, [])

    useEffect(() => {
        if (quizList.length > 0) {
            getQuiz()
        }
    }, [quizList, quizIndex])

    return (
        <div
            className={`flex h-full w-full flex-col justify-evenly overflow-hidden p-4 ${quizList.length === 0 && 'justify-center'}`}
        >
            {isLoading ? (
                <Loading />
            ) : quizList.length === 0 ? (
                <div className="flex h-48 items-center justify-center rounded-lg bg-[#DBE9FE]">
                    예문이 없습니다
                </div>
            ) : (
                <>
                    <div className="flex h-full flex-col justify-center gap-y-10">
                        <div className="no-scrollbar flex min-h-48 items-center justify-center overflow-y-auto rounded-lg bg-[#DBE9FE] p-4">
                            {quizList.length > 0
                                ? quiz.example
                                : '예문이 없습니다'}
                        </div>
                        <div className="flex flex-wrap justify-between gap-y-6">
                            {quiz.options.map((item, index) => (
                                <div
                                    key={index}
                                    className={`w-5/12 cursor-pointer rounded-lg bg-[#E5E7EB] py-4 text-center ${isCorrect === 'answer' && item === quiz.answer ? 'text-red-500' : isCorrect !== '' && item === isCorrect ? 'text-blue-500' : ''}`}
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
                                ? '정답입니다'
                                : isCorrect !== ''
                                  ? '틀렸습니다'
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
                    </div>{' '}
                </>
            )}
        </div>
    )
}
