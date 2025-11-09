import React, { useState, useEffect } from 'react'
import './TextAppears2.css'

const TextAppears2 = () => {
	const [currentIndex, setCurrentIndex] = useState(-1)

	const textParts = [
		{ text: '100 уроков', color: '#2563eb', delay: 0 },
		{ text: '=', color: '#6b7280', delay: 500 },
		{ text: '1000 слов', color: '#388e3c', delay: 1000 },
		{ text: '+', color: '#6b7280', delay: 1500 },
		{ text: '100 правил', color: '#f57c00', delay: 2000 },
		{ text: '=', color: '#6b7280', delay: 2500 },
		{ text: 'уверенное владение языком', color: '#d32f2f', delay: 3000 }
	]

	useEffect(() => {
		const timer = setTimeout(() => {
			setCurrentIndex(0)
		}, 1000)

		return () => clearTimeout(timer)
	}, [])

	useEffect(() => {
		if (currentIndex >= 0 && currentIndex < textParts.length) {
			const currentPart = textParts[currentIndex]
			const timer = setTimeout(() => {
				setCurrentIndex(prev => prev + 1)
			}, currentPart.delay + 1500) // 1.5 секунды показа + задержка

			return () => clearTimeout(timer)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentIndex, textParts.length])

	return (
		<div className='text-appears2-container'>
			<div className='text-content'>
				{textParts.map((part, index) => (
					<div
						key={index}
						className={`text-part ${index === currentIndex ? 'active' : ''} ${
							index < currentIndex ? 'visible' : ''
						}`}
						style={{
							color: part.color,
							animationDelay: `${part.delay}ms`
						}}
					>
						{part.text}
					</div>
				))}
			</div>

			{/* Анимированные частицы на фоне */}
			<div className='particles'>
				{Array.from({ length: 20 }).map((_, i) => (
					<div
						key={i}
						className='particle'
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 5}s`,
							animationDuration: `${3 + Math.random() * 4}s`
						}}
					/>
				))}
			</div>
		</div>
	)
}

export default TextAppears2
