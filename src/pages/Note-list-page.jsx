import logo from '@/assets/img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-regular-svg-icons'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import note from '@/api/note.js'
import { GrHomeRounded } from 'react-icons/gr'
import { HiArrowLeft } from 'react-icons/hi2'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CiFolderOn } from 'react-icons/ci'
import { CiSquarePlus } from 'react-icons/ci'

export default function NoteListPage() {
    const navigate = useNavigate()
    const choice = useLocation().state.choice
    const userName = useSelector((state) => state.userSlice.userName)
    const exampleNote = [
        {
            id: 1,
            title: '단어장 1 이름이 긴경ㅇ ㅜ처리',
        },
        {
            id: 2,
            title: '단어장 3',
        },
        {
            id: 3,
            title: '단어장 1',
        },
        {
            id: 4,
            title: '단어장 1',
        },
        {
            id: 4,
            title: '단어장 1',
        },
    ]

    const [noteList, setNoteList] = useState([])

    const navigatePage = (noteid) => {
        if (choice === '단어관리') {
            navigate('/voca-edit', { state: noteid })
        } else if (choice === '전체단어') {
            navigate('/voca-learning', { state: noteid })
        } else if (choice === '단어카드') {
            navigate('/flashcard-choice', { state: noteid })
        } else if (choice === '학습진단') {
            navigate('/', { state: noteid })
        } else if (choice === '예문학습') {
            navigate('/', { state: noteid })
        } else if (choice === '단어선택') {
            navigate('/', { state: noteid })
        } else {
            navigate('/')
        }
    }

    // 단어장 리스트 가져오기
    const getNoteList = async () => {
        try {
            const response = await note.getNote(userName)
            console.log(response.data)
            setNoteList(response.data)
        } catch (error) {
            console.error('Request Error:', error.message)
            // alert(error.message)
        }
    }

    useEffect(() => {
        getNoteList()
    }, [])

    return (
        <div className="flex min-h-screen justify-center bg-gray-200">
            <div className="relative flex h-screen w-full max-w-md flex-col bg-white">
                <div className="flex h-20 items-center justify-between px-4">
                    {/*<FontAwesomeIcon icon={faArrowLeft} className="h-2/3" />*/}
                    <HiArrowLeft
                        size={35}
                        className="cursor-pointer"
                        onClick={() => navigate(-1)}
                    />
                    <GrHomeRounded
                        size={25}
                        className="cursor-pointer"
                        onClick={() => navigate('/')}
                    />
                </div>
                <div className="flex flex-1 flex-col justify-between overflow-hidden px-4">
                    <div className="flex h-1/4 items-center justify-center">
                        <img src={logo} alt="monvoca logo" className="" />
                    </div>
                    <div className="no-scrollbar flex-1 overflow-y-auto">
                        <div className="my-7 flex flex-wrap justify-around gap-y-6">
                            {noteList.map((note, index) => (
                                <div
                                    key={index}
                                    className="group flex aspect-square w-2/5 cursor-pointer flex-col items-center justify-center rounded-lg text-xl hover:bg-blue-100/50"
                                    onClick={() => navigatePage(note.id)}
                                >
                                    <div className="mb-1 h-fit w-4/6 rounded-xl p-2">
                                        {/*<FontAwesomeIcon*/}
                                        {/*    icon={faFolder}*/}
                                        {/*    className="h-full w-full"*/}
                                        {/*/>*/}
                                        <CiFolderOn className="h-full w-full text-blue-500" />
                                    </div>
                                    {/*
                                    <div className="mb-1 h-3/4 w-fit rounded-xl bg-[#D8E9FE] p-2 hover:bg-[#3C82F6]">
                                        <FontAwesomeIcon
                                            icon={faFolder}
                                            className="h-full"
                                        />
                                    </div>
                                    */}
                                    <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap px-2 text-center">
                                        {note.title}
                                    </div>
                                </div>
                            ))}
                            {choice === '단어관리' ? (
                                <div
                                    className="flex aspect-square w-2/5 cursor-pointer items-center justify-center rounded-xl hover:bg-[#f5f5f5]"
                                    onClick={() => navigate('/note-add')}
                                >
                                    <CiSquarePlus className="h-1/2 w-full" />
                                </div>
                            ) : (
                                <div className="w-5/12"></div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="h-20"></div>
            </div>
        </div>
    )
}
