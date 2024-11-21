import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'

export default function FlashCard({
    choice,
    id,
    word,
    meaning,
    example,
    memo,
}) {
    const [isFront, setIsFront] = useState(true)
    const [onChange, setOnChange] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)

    const tts = (e, text) => {
        e.stopPropagation()

        if (isSpeaking) {
            window.speechSynthesis.cancel()
            setIsSpeaking(false)
            return
        }

        const utterance = new SpeechSynthesisUtterance(text)

        // 언어 영어로 설정
        utterance.lang = 'en-US'

        // 음성 설정
        let voices = window.speechSynthesis.getVoices()

        // voices 배열이 비어있을 경우를 대비한 처리
        if (voices.length === 0) {
            window.speechSynthesis.onvoiceschanged = () => {
                voices = window.speechSynthesis.getVoices()
                setVoice()
            }
        } else {
            setVoice()
        }

        function setVoice() {
            // 영어 남성 음성 찾기
            const maleVoice =
                voices.find(
                    (voice) =>
                        voice.lang.includes('en') &&
                        voice.name.includes('Male'),
                ) ||
                voices.find(
                    (voice) => voice.lang.includes('en'), // 백업: 영어 음성이면 사용
                )

            if (maleVoice) {
                utterance.voice = maleVoice
            }
        }

        // 피치와 속도 설정 (남성 목소리에 더 자연스럽게)
        utterance.pitch = 0.9 // 0.1 ~ 2 (낮을수록 낮은 음)
        utterance.rate = 0.9 // 0.1 ~ 10 (1이 기본 속도)

        utterance.onend = () => {
            setIsSpeaking(false)
        }

        window.speechSynthesis.speak(utterance)
        setIsSpeaking(true)
    }

    useEffect(() => {
        setOnChange(true)
        setIsFront(true)
        const timer = setTimeout(() => {
            setOnChange(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [id])

    return (
        <div className="relative h-3/5 w-full break-all [perspective:1100px]">
            {/* 카드 앞면*/}
            <div
                className={`flash-card absolute h-full w-full overflow-hidden transition-transform duration-1000 ${isFront ? 'front' : 'front-back'}`}
                onClick={() => setIsFront((prev) => !prev)}
            >
                <div className="h-full w-full p-5">
                    <div className="no-scrollbar relative flex h-full w-full items-center justify-center overflow-y-auto text-3xl font-semibold">
                        {choice === 'word' && (
                            <button
                                className="absolute top-10 w-fit"
                                onClick={(e) => {
                                    tts(e, word)
                                }}
                            >
                                <FontAwesomeIcon icon={faVolumeHigh} />
                            </button>
                        )}
                        <div className="">
                            {choice === 'word' ? word : meaning}
                        </div>
                    </div>
                </div>
            </div>
            {/* 카드 뒷면*/}
            <div
                className={`flash-card absolute h-full w-full transition-transform duration-1000 ${!isFront ? 'back-front' : 'back'}`}
                onClick={() => setIsFront((prev) => !prev)}
            >
                <div className="h-full w-full overflow-hidden p-5">
                    <div
                        className={`no-scrollbar flex h-full w-full flex-col items-center justify-center gap-y-8 overflow-y-auto text-3xl font-semibold ${onChange ? 'hidden' : 'flex'}`}
                    >
                        {choice === 'word' ? (
                            <p>{meaning}</p>
                        ) : (
                            <div className="flex flex-col justify-between gap-y-8">
                                <button
                                    className=""
                                    onClick={(e) => {
                                        tts(e, word)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faVolumeHigh} />
                                </button>
                                <p>{word}</p>
                            </div>
                        )}
                        {example && <p className="text-xl">{example}</p>}
                        {memo && <p className="text-xl">{memo}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}
