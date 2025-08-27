import React, { useState, useEffect } from 'react'
import './DifferentCourses.css'

const DifferentCourses: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState(0)

	// Список всех изображений из папки popular-textbooks-apps в порядке номеров
	const images = [
		'/popular-textbooks-apps/3.webp',
		'/popular-textbooks-apps/4.webp',
		'/popular-textbooks-apps/7.webp',
		'/popular-textbooks-apps/8.webp',
		'/popular-textbooks-apps/9.webp',
		'/popular-textbooks-apps/10.avif',
		'/popular-textbooks-apps/12.jpg',
		'/popular-textbooks-apps/13.jpg',
		'/popular-textbooks-apps/14.png',
		'/popular-textbooks-apps/15.webp',
		'/popular-textbooks-apps/16.jpg',
		'/popular-textbooks-apps/17.png',
		'/popular-textbooks-apps/18.png'
	]

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex(prev => (prev + 1) % images.length)
		}, 800)

		return () => clearInterval(interval)
	}, [images.length])

	return (
		<div className='different-courses'>
			<div className='images-stack'>
				{images.map((image, index) => {
					const isCurrent = index === currentIndex

					return (
						<div
							key={index}
							className={`image-wrapper ${isCurrent ? 'current' : 'hidden'}`}
							style={{
								backgroundImage: `url(${image})`,
								zIndex: isCurrent ? 10 : 1
							}}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default DifferentCourses
