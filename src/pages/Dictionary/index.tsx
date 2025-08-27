import React, { useEffect, useRef } from 'react'
import './Dictionary.css'

const Dictionary = () => {
	const magnifierRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const magnifier = magnifierRef.current
		if (!magnifier) return

		let time = 0
		const speed = 0.01 // Скорость движения

		const animate = () => {
			time += speed

			// Создаем траекторию движения горизонтальными линиями сверху вниз
			const containerWidth = 1080
			const containerHeight = 1920
			const eyeSize = 250

			// Ограничиваем область движения, чтобы глаз не выходил за границы
			const maxX = containerWidth - eyeSize - 40 // 40px отступ от краев
			const maxY = containerHeight - eyeSize - 40
			const minX = 40
			const minY = 40

			// Горизонтальное движение с переходом на следующую строку
			const lineHeight = 200 // Высота одной строки
			const currentLine =
				Math.floor(time / 2) % Math.floor((maxY - minY) / lineHeight)
			const progressInLine = (time % 2) / 2 // Прогресс в текущей строке (0-1)

			// Движение по горизонтали
			const x = minX + (maxX - minX) * progressInLine
			// Движение по вертикали (сверху вниз)
			const y = minY + currentLine * lineHeight

			// Добавляем небольшое случайное движение для реалистичности
			const microX = (Math.random() - 0.5) * 5
			const microY = (Math.random() - 0.5) * 5

			magnifier.style.left = `${x + microX}px`
			magnifier.style.top = `${y + microY}px`

			// Убираем вращение для более естественного движения
			magnifier.style.transform = 'rotate(0deg)'

			requestAnimationFrame(animate)
		}

		animate()
	}, [])

	return (
		<div className='dictionary-container'>
			<div className='dictionary-text'>
				<p>
					<span className='word'>HIGH</span> /haɪ/{' '}
					<span className='part-of-speech'>adjective</span> - высокий, большой,
					с высоким содержанием, высший, верхний, сильный.
					<span className='examples'>
						Examples: high mountain (высокая гора), high price (высокая цена),
						high quality (высокое качество), high speed (высокая скорость), high
						level (высокий уровень), high temperature (высокая температура),
						high pressure (высокое давление), high risk (высокий риск), high
						demand (высокий спрос), high expectations (высокие ожидания), high
						standards (высокие стандарты), high performance (высокая
						производительность), high priority (высокий приоритет), high
						frequency (высокая частота), high voltage (высокое напряжение), high
						resolution (высокое разрешение), high definition (высокое качество
						изображения), high security (высокая безопасность), high efficiency
						(высокая эффективность), high accuracy (высокая точность).
					</span>
				</p>
				<p>
					<span className='word'>BEAUTIFUL</span> /ˈbjuːtɪfʊl/{' '}
					<span className='part-of-speech'>adjective</span> - красивый,
					прекрасный, великолепный, очаровательный, изящный, элегантный.
					<span className='examples'>
						Examples: beautiful woman (красивая женщина), beautiful day
						(прекрасный день), beautiful music (прекрасная музыка), beautiful
						garden (красивый сад), beautiful landscape (красивый пейзаж),
						beautiful sunset (красивый закат), beautiful flowers (красивые
						цветы), beautiful painting (красивая картина), beautiful voice
						(красивый голос), beautiful smile (красивая улыбка), beautiful
						architecture (красивая архитектура), beautiful weather (прекрасная
						погода), beautiful dress (красивое платье), beautiful eyes (красивые
						глаза), beautiful hair (красивые волосы), beautiful song (красивая
						песня), beautiful performance (красивое выступление), beautiful
						design (красивый дизайн), beautiful color (красивый цвет), beautiful
						story (красивая история).
					</span>
				</p>
			</div>

			{/* Глаз вместо лупы */}
			<div ref={magnifierRef} className='eye-magnifier'>
				<div className='eye-outer'>
					<div className='eye-inner'></div>
					<div className='eyelid'></div>
				</div>
			</div>
		</div>
	)
}

export default Dictionary
