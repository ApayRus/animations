export const createSeededRandom = (seed: number) => {
	let state = seed | 0
	return () => {
		state = (state + 0x6d2b79f5) | 0
		let t = Math.imul(state ^ (state >>> 15), 1 | state)
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296
	}
}

export const shuffle = <T,>(source: T[], random: () => number): T[] => {
	const array = [...source]
	for (let i = array.length - 1; i > 0; i -= 1) {
		const j = Math.floor(random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}
