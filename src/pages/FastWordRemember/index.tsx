import React, { useState, useEffect, useRef } from 'react'
import './styles.css'

interface WordPair {
	russian: string
	english: string
}

interface FastWordRememberProps {
	wordPairs: WordPair[]
	// Координаты для настройки позиций текста
	russianWordPosition: {
		x: number // от 0 до 100 (проценты от ширины экрана)
		y: number // от 0 до 100 (проценты от высоты экрана)
	}
	englishWordPosition: {
		x: number // от 0 до 100 (проценты от ширины экрана)
		y: number // от 0 до 100 (проценты от высоты экрана)
	}
	autoPlay?: boolean
	interval?: number // интервал между словами в миллисекундах
}

const FastWordRemember: React.FC<FastWordRememberProps> = ({
	wordPairs,
	russianWordPosition,
	englishWordPosition,
	autoPlay = true,
	interval = 3000
}) => {
	const [currentPairIndex, setCurrentPairIndex] = useState(0)
	const [showRussian, setShowRussian] = useState(false)
	const [showEnglish, setShowEnglish] = useState(false)
	const [englishLetters, setEnglishLetters] = useState<string[]>([])
	const timeoutsRef = useRef<number[]>([])

	const currentPair = wordPairs[currentPairIndex]

	useEffect(() => {
		if (!autoPlay) return

		// Очистка всех предыдущих таймеров, чтобы не дублировались буквы
		const pendingTimeoutsRef = timeoutsRef.current
		pendingTimeoutsRef.forEach(id => clearTimeout(id))
		timeoutsRef.current = []

		const cycleWords = () => {
			// Показываем русское слово
			setShowRussian(true)
			setShowEnglish(false)
			setEnglishLetters([]) // Очищаем массив при начале нового цикла

			// Через 1 секунду начинаем показывать английское слово по буквам
			const startEnglishId = window.setTimeout(() => {
				setShowEnglish(true)
				setEnglishLetters([]) // Очищаем массив перед началом

				const letters = currentPair.english.split('')

				// Анимируем появление букв (ускорено) - слева направо
				letters.forEach((letter, index) => {
					const id = window.setTimeout(() => {
						setEnglishLetters(prev => [...prev, letter])
					}, index * 80) // 80ms между буквами (было 150ms)
					timeoutsRef.current.push(id)
				})
			}, 1000)
			timeoutsRef.current.push(startEnglishId)
		}

		cycleWords()

		const timer = setInterval(() => {
			setCurrentPairIndex(prev => (prev + 1) % wordPairs.length)
			setEnglishLetters([]) // Очищаем массив при смене слова
		}, interval)

		return () => {
			clearInterval(timer)
			// Очистить все отложенные таймеры при размонтировании/смене пары
			timeoutsRef.current.forEach(id => clearTimeout(id))
			timeoutsRef.current = []
		}
	}, [currentPairIndex, wordPairs.length, autoPlay, interval, currentPair])

	return (
		<div className='fast-word-remember'>
			{/* Фоновое изображение мозга */}
			<div className='brain-background'>
				<img src='/brain.png' alt='Brain' />
			</div>

			{/* Русское слово над головой */}
			{showRussian && (
				<div
					className='russian-word'
					style={{
						left: `${russianWordPosition.x}%`,
						top: `${russianWordPosition.y}%`,
						transform: 'translate(-50%, -50%)'
					}}
				>
					{currentPair.russian}
				</div>
			)}

			{/* Английское слово в области рта */}
			{showEnglish && (
				<div
					className='english-word'
					style={{
						left: `${englishWordPosition.x}%`,
						top: `${englishWordPosition.y}%`,
						transform: 'translate(0, -50%)',
						width: 'auto',
						minWidth: '200px'
					}}
				>
					{englishLetters.map((letter, index) => (
						<span
							key={index}
							className='english-letter'
							style={{ animationDelay: `${index * 0.1}s` }}
						>
							{letter}
						</span>
					))}
				</div>
			)}
		</div>
	)
}

export default FastWordRemember
