import React, { useState, useEffect } from 'react'
import styles from './RuleThroughExamples.module.css'

interface Sentence {
	id: number
	text: string
}

const sentences: Sentence[] = [
	{ id: 1, text: 'I am young' },
	{ id: 2, text: 'You are old' },
	{ id: 3, text: 'He is stupid' },
	{ id: 4, text: 'She is smart' },
	{ id: 5, text: 'It is small' },
	{ id: 6, text: 'We are rich' },
	{ id: 7, text: 'They are poor' }
]

const RuleThroughExamples: React.FC = () => {
	const [visibleSentences, setVisibleSentences] = useState<number[]>([])
	const [currentIndex, setCurrentIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			if (currentIndex < sentences.length) {
				setVisibleSentences(prev => [...prev, currentIndex])
				setCurrentIndex(prev => prev + 1)
			}
		}, 700) // Показываем новое предложение каждые 3 секунды

		return () => clearInterval(interval)
	}, [currentIndex])

	const renderSentence = (sentence: Sentence, index: number) => {
		const isVisible = visibleSentences.includes(index)

		return (
			<div
				key={sentence.id}
				className={`${styles.sentence} ${isVisible ? styles.visible : ''}`}
				style={{ animationDelay: `${index * 0.2}s` }}
			>
				{sentence.text.split(' ').map((word, wordIndex) => {
					const isVerb = word === 'am' || word === 'are' || word === 'is'
					return (
						<span
							key={wordIndex}
							className={`${styles.word} ${isVerb ? styles.verb : ''}`}
							style={{ animationDelay: `${index * 0.2 + wordIndex * 0.3}s` }}
						>
							{word}
							{wordIndex < sentence.text.split(' ').length - 1 && (
								<span className={styles.space}>&nbsp;</span>
							)}
						</span>
					)
				})}
			</div>
		)
	}

	return (
		<div className={styles.ruleThroughExamples}>
			<div className={styles.sentencesContainer}>
				{sentences.map((sentence, index) => renderSentence(sentence, index))}
			</div>
		</div>
	)
}

export default RuleThroughExamples
