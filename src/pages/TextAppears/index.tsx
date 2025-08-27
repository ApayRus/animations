import React, { useState, useEffect } from 'react'
import './TextAppears.css'

const TextAppears = () => {
	const [currentIndex, setCurrentIndex] = useState(-1)
	const [isVisible, setIsVisible] = useState(false)

	const texts = [
		{ text: 'young', color: '#2563eb' },
		{ text: 'jʌŋ', color: '#388e3c' },
		{ text: 'йан̣', color: '#d32f2f' },
		{ text: 'молодой', color: '#f57c00' }
	]

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true)
			// Начинаем с первой строки после задержки
			setCurrentIndex(0)
		}, 1000)

		return () => clearTimeout(timer)
	}, [])

	useEffect(() => {
		if (currentIndex >= 0 && currentIndex < texts.length) {
			const timer = setTimeout(() => {
				setCurrentIndex(prev => prev + 1)
			}, 2000)

			return () => clearTimeout(timer)
		}
	}, [currentIndex, texts.length])

	return (
		<div className='text-appears-container'>
			<div className='text-content'>
				{texts.map((item, index) => (
					<div
						key={index}
						className={`text-line ${index === currentIndex ? 'active' : ''} ${
							index < currentIndex ? 'visible' : ''
						}`}
						style={{
							color: item.color
						}}
					>
						{item.text}
					</div>
				))}
			</div>
		</div>
	)
}

export default TextAppears
