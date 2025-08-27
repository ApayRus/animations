import Gauge from './Gauge'

const Efficiency = () => {
	return (
		<Gauge
			radius1={180}
			radius2={30}
			colors={['#ED1C24', '#EE791F', '#F0B510', '#9EAC37', '#0BA14B']}
			backgroundColor='#f0f0f0'
			arrowColor='#333'
			startAngle={90}
			endAngle={260}
			arrowLength={150}
		/>
	)
}

export default Efficiency
