import React from 'react'

interface SpeedControlProps {
	value: number
	onChange: (value: number) => void
	min: number
	max: number
	step?: number
}

const SpeedControl: React.FC<SpeedControlProps> = ({
	value,
	onChange,
	min,
	max,
	step = 0.05
}) => {
	return (
		<div className='speed-control'>
			<div className='slider-row'>
				<input
					id='speed-slider'
					type='range'
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={event => onChange(parseFloat(event.target.value))}
				/>
				<span className='speed-value'>{value.toFixed(2)}×</span>
			</div>
		</div>
	)
}

export default SpeedControl
