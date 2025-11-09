import React, { useMemo } from 'react'

import { WritingSystem } from '../alphabets'
import CharacterSelector from './CharacterSelector'

interface WritingSystemCardProps {
	system: WritingSystem
	activeCharacters: string[]
	onToggleCharacter: (char: string) => void
}

const WritingSystemCard: React.FC<WritingSystemCardProps> = ({ system, activeCharacters, onToggleCharacter }) => {
	const characters = system.characters ?? []
	const activeSet = useMemo(() => new Set(activeCharacters), [activeCharacters])

	return (
		<article className='system-card'>
			<header>
				<div>
					<h3>{system.name}</h3>
					{system.nativeName && <span className='native-name'>{system.nativeName}</span>}
				</div>
				<span className='badge'>{activeSet.size}</span>
			</header>

			<div className='system-meta'>
				<div>
					<strong>Регионы:</strong> {system.regions.join(', ')}
				</div>
				<div>
					<strong>Пример:</strong> <span className='sample'>{system.sample}</span>
				</div>
			</div>

			<CharacterSelector
				characters={characters}
				activeCharacters={activeSet}
				onToggleCharacter={onToggleCharacter}
				label={`Символы для ${system.name}`}
			/>
		</article>
	)
}

export default WritingSystemCard
