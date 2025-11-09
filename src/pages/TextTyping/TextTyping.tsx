import React, { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import styles from './TextTyping.module.css'

interface TextTypingProps {
	text: string
	speed?: number
	pauseMs?: number
	startPauseMs?: number
	endPauseMs?: number
	textStyles?: React.CSSProperties
	backgroundStyles?: React.CSSProperties
}

const TextTyping: React.FC<TextTypingProps> = ({
	text,
	speed = 50,
	pauseMs = 0,
	startPauseMs,
	endPauseMs,
	textStyles,
	backgroundStyles
}) => {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		const symbols = Array.from(
			container.querySelectorAll(`.${styles.symbol}`)
		) as HTMLElement[]
		const chars = Array.from(
			container.querySelectorAll(`.${styles.char}`)
		) as HTMLElement[]

		// Reset all chars and caret
		chars.forEach(el => {
			el.style.opacity = '0'
		})
		symbols.forEach(el => el.classList.remove(styles.caret))

		let currentIndex = 0
		if (symbols.length > 0) {
			symbols[0].classList.add(styles.caret)
		}

		let intervalId: number | null = null
		let endPauseId: number | null = null
		let startPauseId: number | null = null

		const startPause = Math.max(0, startPauseMs ?? pauseMs)
		const endPause = Math.max(0, endPauseMs ?? pauseMs)

		const startTyping = () => {
			// Reserve last symbol (trailing space) for end caret blink
			const lastRevealIndex = Math.max(0, chars.length - 1)

			intervalId = window.setInterval(() => {
				if (currentIndex >= lastRevealIndex) {
					// Finished revealing all real characters, move caret to trailing space and pause
					if (intervalId) window.clearInterval(intervalId)
					// Ensure caret on trailing symbol if it exists
					const trailingSymbol = symbols[lastRevealIndex]
					if (trailingSymbol) trailingSymbol.classList.add(styles.caret)
					// End pause
					endPauseId = window.setTimeout(() => {
						// Cleanup caret after end pause
						symbols.forEach(el => el.classList.remove(styles.caret))
					}, endPause)
					return
				}

				// Reveal current char
				animate(chars[currentIndex], {
					opacity: 1,
					duration: 1,
					ease: 'linear'
				})

				// Move caret from current symbol to next
				const currentSymbol = symbols[currentIndex]
				if (currentSymbol) currentSymbol.classList.remove(styles.caret)
				currentIndex += 1
				const nextSymbol = symbols[currentIndex]
				if (nextSymbol) nextSymbol.classList.add(styles.caret)
			}, Math.max(1, speed))
		}

		// Start pause before typing
		startPauseId = window.setTimeout(() => {
			startTyping()
		}, startPause)

		return () => {
			if (intervalId) window.clearInterval(intervalId)
			if (startPauseId) window.clearTimeout(startPauseId)
			if (endPauseId) window.clearTimeout(endPauseId)
			symbols.forEach(el => el.classList.remove(styles.caret))
		}
	}, [text, speed, pauseMs, startPauseMs, endPauseMs])

	const renderTextToSymbols = (textContent: string, keyPrefix: string) => {
		return textContent.split('').map((char, i) => (
			<div key={`${keyPrefix}c-${i}`} className={styles.symbol}>
				<span className={styles.char}>{char === ' ' ? '\u00A0' : char}</span>
			</div>
		))
	}

	const renderNode = (node: ChildNode, keyPrefix: string): React.ReactNode => {
		if (node.nodeType === Node.TEXT_NODE) {
			const textContent = node.textContent || ''
			return renderTextToSymbols(textContent, keyPrefix)
		}
		if (node.nodeType === Node.ELEMENT_NODE) {
			const element = node as Element
			const tagName = element.tagName.toLowerCase()
			if (tagName === 'br') {
				return <div key={`${keyPrefix}br`} className={styles.br} />
			}
			const className = styles[tagName] || ''
			return (
				<div key={`${keyPrefix}${tagName}`} className={className}>
					{Array.from(element.childNodes).map((child, idx) => (
						<React.Fragment key={`${keyPrefix}${tagName}-${idx}`}>
							{renderNode(child, `${keyPrefix}${tagName}-${idx}-`)}
						</React.Fragment>
					))}
				</div>
			)
		}
		return null
	}

	const parseHtml = (htmlString: string) => {
		if (typeof window === 'undefined') {
			return []
		}
		const parser = new DOMParser()
		const doc = parser.parseFromString(htmlString, 'text/html')
		const elements = Array.from(doc.body.children)

		return elements.map((el, elIndex) => {
			const tagName = el.tagName.toLowerCase()
			const className = styles[tagName] || ''
			const isLast = elIndex === elements.length - 1

			return (
				<div key={elIndex} className={className} style={textStyles}>
					{Array.from(el.childNodes).map((child, idx) => (
						<React.Fragment key={`el-${elIndex}-${idx}`}>
							{renderNode(child, `el-${elIndex}-${idx}-`)}
						</React.Fragment>
					))}
					{isLast && (
						<div key={`end-space`} className={styles.symbol}>
							<span className={styles.char}>{'\u00A0'}</span>
						</div>
					)}
				</div>
			)
		})
	}

	return (
		<div
			ref={containerRef}
			style={backgroundStyles}
			className={styles.container}
		>
			{parseHtml(text)}
		</div>
	)
}

export default TextTyping
