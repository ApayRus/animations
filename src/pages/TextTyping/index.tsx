import React from 'react'
import TextTyping from './TextTyping'

const TextTypingPage = () => {
	const text = `
    <p>СЛОВО правит<br />мечом.</p>
    <p>МЕЧ правит<br/>золотом.</p>
    <p>ЗОЛОТО правит<br />всем остальным.</p>
  `

	return <TextTyping text={text} speed={200} />
}

export default TextTypingPage
