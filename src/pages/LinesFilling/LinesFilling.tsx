import React, { useEffect, useState } from 'react'
import './LinesFilling.css'

interface LinesFillingProps {
	labels: string[][] // Двумерный массив подписей
	lineSpacing: number // Расстояние между соседними линиями в пикселях
}

const LinesFilling: React.FC<LinesFillingProps> = ({
	labels,
	lineSpacing = 2
}) => {
	const [visibleLines, setVisibleLines] = useState<number[]>([])
	const [visibleRectangles, setVisibleRectangles] = useState<{
		[key: string]: boolean
	}>({})

	const reversedLabels = [...labels].reverse()

	useEffect(() => {
		// Запускаем анимацию после монтирования компонента
		const timer = setTimeout(() => {
			// Показываем линии снизу вверх

			reversedLabels.forEach((row, reversedIndex) => {
				const originalIndex = labels.length - 1 - reversedIndex

				// Задержка перед началом анимации строки
				setTimeout(() => {
					setVisibleLines(prev => [...prev, originalIndex])

					// Показываем прямоугольники в строке слева направо
					row.forEach((_, colIndex) => {
						setTimeout(() => {
							setVisibleRectangles(prev => ({
								...prev,
								[`${originalIndex}-${colIndex}`]: true
							}))
						}, colIndex * 100) // 100ms между прямоугольниками
					})
				}, reversedIndex * (row.length * 100 + 200)) // Задержка между строками
			})
		}, 100)

		return () => clearTimeout(timer)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [labels])

	return (
		<div className='lines-filling-container'>
			<div className='lines-wrapper'>
				{reversedLabels.map((row, rowIndex) => (
					<div
						key={rowIndex}
						className={`line-row ${
							visibleLines.includes(rowIndex) ? 'visible' : ''
						}`}
						style={{
							marginBottom: `${lineSpacing}px`
						}}
					>
						{row.map((label, colIndex) => {
							// Разделяем на буквы и число (включая кириллицу)
							const letters = label.match(/[A-Za-zА-Яа-я]/g) || []
							const number = label.match(/\d+/g) || []
							const isRule = label.includes('правило')

							return (
								<div
									key={colIndex}
									className={`rectangle ${
										visibleRectangles[`${rowIndex}-${colIndex}`]
											? 'visible'
											: ''
									} ${isRule ? 'rule' : ''}`}
								>
									<span className='label'>
										{letters.map((letter, letterIndex) => (
											<span key={letterIndex} className='letter'>
												{letter}
											</span>
										))}
										{number.length > 0 && (
											<span className='number'>{number.join('')}</span>
										)}
									</span>
								</div>
							)
						})}
					</div>
				))}
			</div>
		</div>
	)
}

export default LinesFilling
