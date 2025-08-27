import React, { useState, useEffect } from 'react'
import styles from './GrammarRule.module.css'

const GrammarRule = () => {
	const [displayedWords, setDisplayedWords] = useState<string[]>([])
	const [displayedTitleWords, setDisplayedTitleWords] = useState<string[]>([])
	const [currentWordIndex, setCurrentWordIndex] = useState(0)
	const [currentTitleWordIndex, setCurrentTitleWordIndex] = useState(0)
	const [isComplete, setIsComplete] = useState(false)

	const title = 'Present Perfect Continuous Tense'
	const text =
		'Настоящее совершенное длительное время используется для выражения действий, которые начались в прошлом, продолжаются в настоящем и могут продолжаться в будущем. Образуется с помощью have/has been + глагол с окончанием -ing. Указывает на процесс, а не на результат действия.'

	const titleWords = title.split(' ')
	const words = text.split(' ')

	// Анимация заголовка
	useEffect(() => {
		if (currentTitleWordIndex < titleWords.length) {
			const timer = setTimeout(() => {
				setDisplayedTitleWords(prev => [
					...prev,
					titleWords[currentTitleWordIndex]
				])
				setCurrentTitleWordIndex(prev => prev + 1)
			}, 300) // Скорость появления слов заголовка

			return () => clearTimeout(timer)
		}
	}, [currentTitleWordIndex, titleWords.length])

	// Анимация основного текста (начинается после заголовка)
	useEffect(() => {
		if (
			currentTitleWordIndex >= titleWords.length &&
			currentWordIndex < words.length
		) {
			const timer = setTimeout(() => {
				setDisplayedWords(prev => [...prev, words[currentWordIndex]])
				setCurrentWordIndex(prev => prev + 1)
			}, 200) // Скорость появления слов

			return () => clearTimeout(timer)
		} else if (
			currentTitleWordIndex >= titleWords.length &&
			currentWordIndex >= words.length
		) {
			setIsComplete(true)
		}
	}, [currentTitleWordIndex, currentWordIndex, words.length, titleWords.length])

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1 className={styles.title}>
					{displayedTitleWords.map((word, index) => (
						<span
							key={index}
							className={`${styles.word} ${
								index === displayedTitleWords.length - 1
									? styles.currentWord
									: ''
							}`}
						>
							{word}
						</span>
					))}
					{currentTitleWordIndex < titleWords.length && (
						<span className={styles.cursor}>|</span>
					)}
				</h1>
				<div className={styles.text}>
					{displayedWords.map((word, index) => (
						<span
							key={index}
							className={`${styles.word} ${
								index === displayedWords.length - 1 ? styles.currentWord : ''
							}`}
						>
							{word}
						</span>
					))}
					{!isComplete && currentTitleWordIndex >= titleWords.length && (
						<span className={styles.cursor}>|</span>
					)}
				</div>
			</div>
		</div>
	)
}

export default GrammarRule
