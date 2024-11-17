import { useLocation } from 'react-router-dom'
import FlashCard from '@/components/Flash-card.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleChevronLeft,
    faCircleChevronRight,
} from '@fortawesome/free-solid-svg-icons'

export default function VocaFlashcardPage() {
    const choice = useLocation().state

    return (
        <div className="flex h-full w-full flex-col overflow-hidden p-4">
            <div className="no-scrollbar flex h-full items-center overflow-y-auto">
                <FlashCard />
            </div>
            <div className="flex h-24 items-center justify-between py-3">
                <FontAwesomeIcon
                    icon={faCircleChevronLeft}
                    className="h-full cursor-pointer"
                    style={{ color: '#3C82F6' }}
                />
                <div className="text-2xl font-bold">1 / 10</div>
                <FontAwesomeIcon
                    icon={faCircleChevronRight}
                    className="h-full cursor-pointer"
                    style={{ color: '#3C82F6' }}
                />
            </div>
        </div>
    )
}
