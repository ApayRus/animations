import React, { useState, useEffect } from 'react'
import './Exercises.css'

const Exercises = () => {
	const [currentExercise, setCurrentExercise] = useState(-1)

	const exercises = [
		{
			id: 1,
			type: 'multiple-choice',
			title: 'Выберите правильный ответ',
			question: 'Какой звук обозначает буква "A" в слове "cat"?',
			options: [
				{ id: 'a', text: '[æ]', correct: true },
				{ id: 'b', text: '[ɑː]', correct: false },
				{ id: 'c', text: '[eɪ]', correct: false },
				{ id: 'd', text: '[ə]', correct: false }
			]
		},
		{
			id: 2,
			type: 'fill-blanks',
			title: 'Выберите правильную форму глагола "to be"',
			question: 'Заполните пропуски в предложении:',
			text: 'I [BLANK] a student. You [BLANK] my friend. He [BLANK] tall.',
			blanks: ['am', 'are', 'is'],
			answer: 'I am a student. You are my friend. He is her brother.'
		}
	]

	useEffect(() => {
		const timer = setTimeout(() => {
			setCurrentExercise(0)
		}, 1000)

		return () => clearTimeout(timer)
	}, [])

	useEffect(() => {
		if (currentExercise >= 0 && currentExercise < exercises.length - 1) {
			const timer = setTimeout(() => {
				setCurrentExercise(prev => prev + 1)
			}, 6000) // Увеличиваем время показа до 6 секунд

			return () => clearTimeout(timer)
		}
	}, [currentExercise, exercises.length])

	const renderMultipleChoice = (exercise: any) => (
		<div className='exercise-content'>
			<h2 className='exercise-title'>{exercise.title}</h2>
			<p className='exercise-question'>{exercise.question}</p>
			<div className='options-container'>
				{exercise.options.map((option: any) => (
					<div key={option.id} className='option'>
						<span className='option-letter'>{option.id.toUpperCase()})</span>
						<span className='option-text'>{option.text}</span>
					</div>
				))}
			</div>
		</div>
	)

	const renderFillBlanks = (exercise: any) => {
		return (
			<div className='exercise-content'>
				<h2 className='exercise-title'>{exercise.title}</h2>
				<p className='exercise-question'>{exercise.question}</p>
				<div className='fill-blanks-container'>
					<div className='blanks-text'>
						I <span className='blank-box'></span> a student. You{' '}
						<span className='blank-box'></span> my friend. He{' '}
						<span className='blank-box'></span> her brother.
					</div>
					<div className='blanks-options'>
						{exercise.blanks.map((blank: string, index: number) => (
							<div key={index} className='blank-option'>
								{blank}
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='exercises-container'>
			<div className='exercises-content'>
				{exercises.map((exercise, index) => (
					<div
						key={exercise.id}
						className={`exercise-card ${
							index === currentExercise ? 'active' : ''
						} ${index < currentExercise ? 'visible' : ''}`}
					>
						{exercise.type === 'multiple-choice' &&
							renderMultipleChoice(exercise)}
						{exercise.type === 'fill-blanks' && renderFillBlanks(exercise)}
					</div>
				))}
			</div>
		</div>
	)
}

export default Exercises
