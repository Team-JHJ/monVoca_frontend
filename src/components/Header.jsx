import { IoArrowBack } from 'react-icons/io5'
import { GrHomeRounded } from 'react-icons/gr'
import { HiArrowLeft } from 'react-icons/hi2'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
    const navigate = useNavigate()
    const noteTitle = useSelector((state) => state.noteSlice.noteTitle)

    return (
        <div className="sticky top-0 flex h-20 w-full items-center justify-between bg-[#3C82F6] px-5 text-white">
            <HiArrowLeft
                size={35}
                className="cursor-pointer"
                onClick={() => navigate(-1)}
            />
            <p className="w-9/12 overflow-hidden text-ellipsis whitespace-nowrap text-center text-2xl font-semibold">
                {noteTitle}
            </p>
            <GrHomeRounded
                size={25}
                className="cursor-pointer"
                onClick={() => navigate('/')}
            />
        </div>
    )
}
