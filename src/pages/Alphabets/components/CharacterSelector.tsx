import React from 'react'

interface CharacterSelectorProps {
	characters: string[]
	activeCharacters: Set<string>
	onToggleCharacter: (char: string) => void
	label?: string
}

const CharacterSelector: React.FC<CharacterSelectorProps> = ({ characters, activeCharacters, onToggleCharacter, label }) => {
	if (characters.length === 0) {
		return <p className='empty-chars'>Нет доступных символов.</p>
	}

	return (
		<div className='characters-grid' role='group' aria-label={label}>
			{characters.map(char => {
				const isActive = activeCharacters.has(char)
				return (
					<button
						key={char}
						type='button'
						className={`char-chip ${isActive ? 'active' : 'inactive'}`}
						onClick={() => onToggleCharacter(char)}
						aria-pressed={isActive}
					>
						{char}
					</button>
				)
			})}
		</div>
	)
}

export default CharacterSelector
