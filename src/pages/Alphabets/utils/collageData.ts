import { WritingSystem } from '../alphabets'
import { createSeededRandom, shuffle } from './random'

export const GRID_COLUMNS = 34
export const GRID_ROWS = 19
export const GRID_CELL_COUNT = GRID_COLUMNS * GRID_ROWS

export const DEFAULT_MAX_SHIFT_PX = 12
export const DEFAULT_MIN_DURATION = 7
export const DEFAULT_MAX_DURATION = 14

export interface CharacterPoolEntry {
	char: string
	scriptId: string
	scriptName: string
	scriptType: WritingSystem['scriptType']
}

export interface CharacterCell extends CharacterPoolEntry {
	color: string
	shiftX: number
	shiftY: number
	duration: number
	delay: number
}

export interface CharacterPoolResult {
	displayed: CharacterCell[]
	queue: CharacterCell[]
}

interface BuildCharacterPoolOptions {
	writingSystems: WritingSystem[]
	activeCharacters: Record<string, string[]>
	gridCellCount?: number
	maxShiftPx?: number
	minDuration?: number
	maxDuration?: number
	randomSeed?: number
}

export const buildCharacterPool = ({
	writingSystems,
	activeCharacters,
	gridCellCount = GRID_CELL_COUNT,
	maxShiftPx = DEFAULT_MAX_SHIFT_PX,
	minDuration = DEFAULT_MIN_DURATION,
	maxDuration = DEFAULT_MAX_DURATION,
	randomSeed = Date.now(),
}: BuildCharacterPoolOptions): CharacterPoolResult => {
	const entries: CharacterPoolEntry[] = []
	const seen = new Set<string>()

	writingSystems.forEach(system => {
		const sourceCharacters = system.characters ?? []
		const activeSet = new Set(
			activeCharacters[system.id] && activeCharacters[system.id].length > 0
				? activeCharacters[system.id]
				: sourceCharacters
		)

		if (activeSet.size === 0) {
			return
		}

		sourceCharacters.forEach(char => {
			if (!activeSet.has(char)) {
				return
			}

			const key = `${system.id}-${char}`
			if (seen.has(key)) {
				return
			}

			seen.add(key)
			entries.push({
				char,
				scriptId: system.id,
				scriptName: system.name,
				scriptType: system.scriptType,
			})
		})
	})

	if (entries.length === 0) {
		return { displayed: [], queue: [] }
	}

	const rng = createSeededRandom(randomSeed)
	const shuffled = shuffle(entries, rng)

	const createCell = (entry: CharacterPoolEntry): CharacterCell => {
		const hue = Math.floor(rng() * 360)
		const saturation = 62 + rng() * 28
		const lightness = 55 + rng() * 20
		const color = `hsl(${hue}deg ${saturation}% ${lightness}%)`

		const shiftX = (rng() - 0.5) * 2 * maxShiftPx
		const shiftY = (rng() - 0.5) * 2 * maxShiftPx
		const duration = minDuration + rng() * (maxDuration - minDuration)
		const delay = rng() * duration

		return {
			...entry,
			color,
			shiftX,
			shiftY,
			duration,
			delay,
		}
	}

	const displayed: CharacterCell[] = []
	const queue: CharacterCell[] = []

	shuffled.forEach(entry => {
		const cell = createCell(entry)
		if (displayed.length < gridCellCount) {
			displayed.push(cell)
		} else {
			queue.push(cell)
		}
	})

	if (displayed.length < gridCellCount) {
		for (let i = displayed.length; i < gridCellCount; i += 1) {
			const entry = shuffled[i % shuffled.length]
			displayed.push(createCell(entry))
		}
	}

	return { displayed, queue }
}
