import React from 'react'
import FastWordRemember from './index'

const FastWordRememberDemo: React.FC = () => {
	// Примеры пар слов для демонстрации
	const wordPairs = [
		{ russian: 'Кошка', english: 'Cat' },
		{ russian: 'Собака', english: 'Dog' },
		{ russian: 'Машина', english: 'Car' },
		{ russian: 'Большой', english: 'Big' },
		{ russian: 'Влажный', english: 'Wet' },
		{ russian: 'Воздух', english: 'Air' },
		{ russian: 'Небо', english: 'Sky' }
	]

	// Координаты для позиционирования текста
	// Эти значения можно легко редактировать для настройки позиций
	const russianWordPosition = {
		x: 33, // 50% от ширины экрана (центр)
		y: 25 // 25% от высоты экрана (над головой)
	}

	const englishWordPosition = {
		x: 75, // 50% от ширины экрана (центр)
		y: 55 // 75% от высоты экрана (в области рта)
	}

	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: '#000'
			}}
		>
			<FastWordRemember
				wordPairs={wordPairs}
				russianWordPosition={russianWordPosition}
				englishWordPosition={englishWordPosition}
				autoPlay={true}
				interval={4000} // 4 секунды между словами
			/>
		</div>
	)
}

export default FastWordRememberDemo
