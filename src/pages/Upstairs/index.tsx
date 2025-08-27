import React, { useState, useEffect } from 'react'
import styles from './Upstairs.module.css'

const Upstairs: React.FC = () => {
	const [activeIndex, setActiveIndex] = useState(0)
	const [manPosition, setManPosition] = useState(0)
	const [isStarted, setIsStarted] = useState(false)

	const rectangles = [
		{ id: 0, label: '0' },
		{ id: 1, label: 'A1' },
		{ id: 2, label: 'A2' },
		{ id: 3, label: 'B1' },
		{ id: 4, label: 'B2' },
		{ id: 5, label: 'C1' },
		{ id: 6, label: 'C2' }
	]

	// Позиции ступенек (вторая точка каждой пары - где человек "стоит" на ступеньке)
	const stepPositions = [
		// 0 - старт
		{ left: 15, bottom: 217 },
		// A1 - вторая точка (вправо)
		{ left: 162, bottom: 456 },
		// A2 - вторая точка (вправо)
		{ left: 323, bottom: 700 },
		// B1 - вторая точка (вправо)
		{ left: 474, bottom: 940 },
		// B2 - вторая точка (вправо)
		{ left: 631, bottom: 1178 },
		// C1 - вторая точка (вправо)
		{ left: 780, bottom: 1417 },
		// C2 - вторая точка (вправо)
		{ left: 949, bottom: 1657 }
	]

	// Задержка перед началом движения (3 секунды на 0-й ступеньке)
	useEffect(() => {
		const startTimer = setTimeout(() => {
			setIsStarted(true)
		}, 3000)

		return () => clearTimeout(startTimer)
	}, [])

	useEffect(() => {
		if (!isStarted) return

		const interval = setInterval(() => {
			setActiveIndex(prevIndex => (prevIndex + 1) % rectangles.length)
			setManPosition(prevPosition => (prevPosition + 1) % stepPositions.length)
		}, 1000)

		return () => clearInterval(interval)
	}, [isStarted])

	return (
		<div className={styles.container}>
			{rectangles.map((rectangle, index) => (
				<div
					key={rectangle.id}
					className={`${styles.rectangle} ${
						index === activeIndex ? styles.active : ''
					}`}
				>
					{rectangle.label}
				</div>
			))}

			<img
				src='/man.png'
				alt='Человечек'
				className={styles.man}
				style={{
					left: `${stepPositions[manPosition]?.left || 15}px`,
					bottom: `${stepPositions[manPosition]?.bottom || 217}px`
				}}
			/>
		</div>
	)
}

export default Upstairs
