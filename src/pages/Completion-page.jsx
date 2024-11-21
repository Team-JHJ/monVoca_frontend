import { useSelector } from 'react-redux'

export default function CompletionPage() {
    const noteTitle = useSelector((state) => state.noteSlice.noteTitle)

    return (
        <div className="flex h-full w-full items-center justify-center p-4">
            <div className="w-full rounded-lg bg-[#DBE9FE] py-10 text-center">
                얏호 {noteTitle}을(를) 마스터했어요! 🥳
            </div>
        </div>
    )
}
