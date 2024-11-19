import { useState } from 'react'
import { HiArrowLeft } from 'react-icons/hi2'
import { GrHomeRounded } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import note from '@/api/note.js'
import { useSelector } from 'react-redux'

export default function NoteAddPage() {
    const navigate = useNavigate()
    const userName = useSelector((state) => state.userSlice.userName)
    const [noteTitle, setNoteTitle] = useState('')

    const updateData = (e) => {
        setNoteTitle(e.target.value)
    }

    // 단어장 추가
    const submitData = async (e) => {
        e.preventDefault()
        try {
            const response = await note.createNote(userName, noteTitle)
            console.log(response.data)
            navigate(-1)
        } catch (error) {
            console.error('Request Error:', error.message)
            // alert(error.message)
        }
    }

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
                <div className="flex h-full w-full flex-col p-8">
                    <form
                        action=""
                        className="flex h-full flex-col justify-center gap-y-28 py-10"
                        onSubmit={(e) => {
                            submitData(e)
                        }}
                    >
                        <input
                            name="word"
                            type="text"
                            placeholder="단어장 이름"
                            className="text-input"
                            value={noteTitle}
                            onChange={(e) => {
                                updateData(e)
                            }}
                            required={true}
                        />
                        <button type="submit" className="submit-btn">
                            단어장 추가
                        </button>
                    </form>
                </div>
                <div className="h-20"></div>
            </div>
        </div>
    )
}
