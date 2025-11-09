import React from 'react'
import styles from './Efficiency.module.css'

interface GaugeProps {
	radius1: number
	radius2: number
	colors: string[]
	backgroundColor?: string
	arrowColor?: string
	startAngle?: number
	endAngle?: number
	arrowLength?: number
}

const Gauge: React.FC<GaugeProps> = ({
	radius1,
	radius2,
	colors,
	backgroundColor = 'white',
	arrowColor = 'black',
	startAngle = -90,
	endAngle = 90,
	arrowLength
}) => {
	const centerX = window.innerWidth / 2
	const centerY = window.innerHeight / 2

	// Создаем 10 секторов по всей окружности (от 0° до 360°)
	const createSectorPath = (startAngle: number, endAngle: number) => {
		// Внешняя дуга (больший радиус)
		const outerStartX = centerX + radius1 * Math.cos(startAngle)
		const outerStartY = centerY + radius1 * Math.sin(startAngle)
		const outerEndX = centerX + radius1 * Math.cos(endAngle)
		const outerEndY = centerY + radius1 * Math.sin(endAngle)

		// Внутренняя дуга (меньший радиус)
		const innerStartX = centerX + radius2 * Math.cos(startAngle)
		const innerStartY = centerY + radius2 * Math.sin(startAngle)
		const innerEndX = centerX + radius2 * Math.cos(endAngle)
		const innerEndY = centerY + radius2 * Math.sin(endAngle)

		// Создаем путь сектора для полной окружности
		const largeArcFlag = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0
		return `M ${outerStartX} ${outerStartY} A ${radius1} ${radius1} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY} L ${innerEndX} ${innerEndY} A ${radius2} ${radius2} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY} Z`
	}

	// Разделяем полную окружность на 10 равных секторов (от 0° до 2π)
	const sectorAngle = (2 * Math.PI) / 10 // 36 градусов каждый сектор

	// Создаем стрелку-указатель
	const createArrowPath = () => {
		// Длина стрелки: если не задана, то чуть меньше внутреннего радиуса
		const actualArrowLength = arrowLength || radius2 - 20
		const arrowWidth = 8 // Ширина стрелки

		// Точка стрелки (кончик) - стрелка направлена вверх
		const tipX = centerX + actualArrowLength * Math.cos(Math.PI / 2)
		const tipY = centerY + actualArrowLength * Math.sin(Math.PI / 2)

		// Основание стрелки (слева)
		const leftBaseX = centerX + arrowWidth * Math.cos(0)
		const leftBaseY = centerY + arrowWidth * Math.sin(0)

		// Основание стрелки (справа)
		const rightBaseX = centerX + arrowWidth * Math.cos(Math.PI)
		const rightBaseY = centerY + arrowWidth * Math.sin(Math.PI)

		return `M ${tipX} ${tipY} L ${leftBaseX} ${leftBaseY} L ${centerX} ${centerY} L ${rightBaseX} ${rightBaseY} Z`
	}

	// Создаем CSS переменные для анимации
	const arrowStyle = {
		'--start-angle': `${startAngle}deg`,
		'--end-angle': `${endAngle}deg`
	} as React.CSSProperties

	return (
		<div className={styles.container} style={{ backgroundColor }}>
			<svg
				width='100%'
				height='100%'
				viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
				className={styles.svg}
			>
				{/* Первая полная окружность */}
				<path
					d={`M ${centerX - radius1} ${centerY} A ${radius1} ${radius1} 0 0 1 ${
						centerX + radius1
					} ${centerY} A ${radius1} ${radius1} 0 0 1 ${
						centerX - radius1
					} ${centerY}`}
					fill='none'
					stroke='transparent'
					strokeWidth={0}
				/>

				{/* Вторая полная окружность */}
				<path
					d={`M ${centerX - radius2} ${centerY} A ${radius2} ${radius2} 0 0 1 ${
						centerX + radius2
					} ${centerY} A ${radius2} ${radius2} 0 0 1 ${
						centerX - radius2
					} ${centerY}`}
					fill='none'
					stroke='transparent'
					strokeWidth={0}
				/>

				{/* Секторы 6-10 (индексы 5-9) */}
				{Array.from({ length: 5 }, (_, index) => {
					const actualIndex = index + 5 // Начинаем с 6-го сектора (индекс 5)
					const startAngle = actualIndex * sectorAngle
					const endAngle = (actualIndex + 1) * sectorAngle
					const color = colors[actualIndex % colors.length] || '#ccc'

					return (
						<path
							key={actualIndex}
							d={createSectorPath(startAngle, endAngle)}
							fill={color}
							opacity={0.7}
						/>
					)
				})}

				{/* Стрелка-указатель */}
				<g className={styles.arrowContainer} style={arrowStyle}>
					<path
						d={createArrowPath()}
						fill={arrowColor}
						className={styles.arrow}
					/>
				</g>

				{/* Центр для наглядности */}
				<circle cx={centerX} cy={centerY} r={12} fill={arrowColor} />
			</svg>
		</div>
	)
}

export default Gauge
