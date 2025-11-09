import React from 'react'
import './App.css'
import LinesFillingPage from './pages/LinesFilling'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import TextAppears from './pages/TextAppears'
import TextAppears2 from './pages/TextAppears2'
import Exercises from './pages/Exercises'
import Dictionary from './pages/Dictionary'
import GrammarRule from './pages/GrammarRule'
// import FastWordRememberDemo from './pages/FastWordRemember'
import RuleThroughExamples from './pages/RuleThroughExamples'
import DifferentCourses from './pages/DifferentCourses'
import Upstairs from './pages/Upstairs'
import Efficiency from './pages/Efficiency'
import TextTypingPage from './pages/TextTyping'
import FastWordRememberDemo from './pages/FastWordRemember/demo'
import AlphabetsCollagePage from './pages/Alphabets'

const HomePage: React.FC = () => {
	return (
		<div>
			<h1>Animations</h1>
			<nav>
				<Link to='/lines-filling'>Lines Filling</Link>
				<br />
				<Link to='/text-appears'>Text Appears</Link>
				<br />
				<Link to='/text-appears2'>Text Appears 2</Link>
				<br />
				<Link to='/exercises'>Exercises</Link>
				<br />
				<Link to='/dictionary'>Dictionary</Link>
				<br />
				<Link to='/grammar-rule'>Grammar Rule</Link>
				<br />
				<Link to='/fast-word-remember'>Fast Word Remember</Link>
				<br />
				<Link to='/rule-through-examples'>Rule Through Examples</Link>
				<br />
				<Link to='/different-courses'>Different Courses</Link>
				<br />
				<Link to='/upstairs'>Upstairs</Link>
				<br />
				<Link to='/efficiency'>Efficiency</Link>
				<br />
				<Link to='/text-typing'>Text Typing</Link>
				<br />
				<Link to='/alphabets'>Writing Systems Collage</Link>
			</nav>
		</div>
	)
}

const App: React.FC = () => {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<div className='App'>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/lines-filling' element={<LinesFillingPage />} />
					<Route path='/text-appears' element={<TextAppears />} />
					<Route path='/text-appears2' element={<TextAppears2 />} />
					<Route path='/exercises' element={<Exercises />} />
					<Route path='/dictionary' element={<Dictionary />} />
					<Route path='/grammar-rule' element={<GrammarRule />} />
					<Route
						path='/fast-word-remember'
						element={<FastWordRememberDemo />}
					/>
					<Route
						path='/rule-through-examples'
						element={<RuleThroughExamples />}
					/>
					<Route path='/different-courses' element={<DifferentCourses />} />
					<Route path='/upstairs' element={<Upstairs />} />
					<Route path='/efficiency' element={<Efficiency />} />
					<Route path='/text-typing' element={<TextTypingPage />} />
					<Route path='/alphabets' element={<AlphabetsCollagePage />} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
