import { useRef, useState } from 'react'
import detail from '@/api/detail.js'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function ImageUploadPage() {
    const userName = useSelector((state) => state.userSlice.userName)
    const noteId = useSelector((state) => state.noteSlice.noteId)
    const imgRef = useRef(null)
    const navigate = useNavigate()
    const [imgFile, setImgFile] = useState(null)
    const [previewImg, setPreviewImg] = useState(null)

    // 선택한 사진으로 변경
    const changeImg = (e) => {
        const img = e.target.files[0]
        // 사진 파일이 존재하면서 파일이 이미지라면 미리보기 이미지 띄우기
        if (img && img.type.startsWith('image/')) {
            setImgFile(img)
            // 미리보기 이미지 설정
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImg(reader.result)
            }
            reader.readAsDataURL(img)
        }
    }

    // 사진 선택 버튼 클릭
    const clickChoiceBtn = () => {
        imgRef.current.click()
    }

    // 사진 업로드
    const uploadImg = async () => {
        // 선택한 이미지가 없다면
        if (!imgFile) {
            alert('파일을 선택해주세요')
            return
        }

        // 선택한 이미지가 있다면 서버로 사진 전송
        try {
            const formData = new FormData()
            formData.append('file', imgFile)
            const response = await detail.uploadImage(
                userName,
                noteId,
                formData,
            )
            history.replaceState(null, '', document.referrer)
            navigate(-1)
        } catch (error) {
            console.error('Request Error:', error.message)
            // alert(error.message)
        }
    }

    return (
        <div className="flex h-full w-full flex-col overflow-hidden p-4">
            <div className="flex h-20 justify-between pb-8 text-lg">
                <input
                    type="file"
                    accept="image/*"
                    ref={imgRef}
                    onChange={changeImg}
                    className="hidden"
                />
                <button
                    className="flex w-[45%] cursor-pointer items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#F5F5F5] hover:border-[#C7CCD3] hover:bg-[#E5E7EB]"
                    onClick={clickChoiceBtn}
                >
                    사진 선택
                </button>
                <div
                    className="flex w-[45%] cursor-pointer items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#F5F5F5] hover:border-[#C7CCD3] hover:bg-[#E5E7EB]"
                    onClick={uploadImg}
                >
                    사진 업로드
                </div>
            </div>
            {previewImg && (
                <div className="no-scrollbar flex-1 overflow-y-auto">
                    <p className="text-xl">미리보기</p>
                    <img
                        src={previewImg}
                        alt=""
                        className="border-2 border-gray-300"
                    />
                </div>
            )}
        </div>
    )
}
