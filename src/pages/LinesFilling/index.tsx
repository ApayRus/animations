import React from 'react'
import { sampleLabels } from './data'
import LinesFilling from './LinesFilling'

const LinesFillingPage: React.FC = () => {
	return <LinesFilling labels={[...sampleLabels]} lineSpacing={2} />
}

export default LinesFillingPage
