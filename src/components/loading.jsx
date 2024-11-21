import loadingSpinner from '@/assets/img/spinners.svg'

export default function Loading() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <img
                src={loadingSpinner}
                alt="loading spinner"
                className="block w-2/12"
            />
        </div>
    )
}
