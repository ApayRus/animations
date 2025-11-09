import React from 'react'

import { CharacterCell } from '../utils/collageData'

interface CollageGridProps {
	cells: CharacterCell[]
	speedMultiplier: number
}

const CollageGrid: React.FC<CollageGridProps> = ({ cells, speedMultiplier }) => {
	if (cells.length === 0) {
		return (
			<div className='collage-empty'>
				<p>Не выбрано ни одного символа. Включите символы в панели ниже.</p>
			</div>
		)
	}

	return (
		<div className='collage-grid'>
			{cells.map((cell, index) => {
				const style: React.CSSProperties & Record<string, string> = {
					color: cell.color,
					'--shift-x': `${cell.shiftX.toFixed(2)}px`,
					'--shift-y': `${cell.shiftY.toFixed(2)}px`,
					'--drift-duration': `${(cell.duration / speedMultiplier).toFixed(2)}s`,
					'--drift-delay': `${(cell.delay / speedMultiplier).toFixed(2)}s`,
				}

				return (
					<div
						key={`${cell.scriptId}-${cell.char}-${index}`}
						className='collage-cell'
						style={style}
						title={`${cell.scriptName} • ${cell.scriptType}`}
						aria-label={`${cell.scriptName} character '${cell.char}'`}
					>
						<span>{cell.char}</span>
					</div>
				)
			})}
		</div>
	)
}

export default CollageGrid
