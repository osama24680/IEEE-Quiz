import React, { useEffect } from 'react'
import "./EndPage.scss"
import { useSelector, useDispatch } from 'react-redux'
import { grade } from "../Store/questionsSlice"
import { Link } from "react-router-dom"
const EndPage = () => {
    let reduxData = useSelector(state => state.questions)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(grade())
    }, [dispatch])
    return (
        <div className='end_board'>
            {reduxData.finalResult < 60 ? <h1>Oops!! Your Score Is {reduxData.finalResult}% </h1> : <h1>Congratulations Osama! Your Score Is {reduxData.finalResult}% </h1>}

            <div className="options">
                <button>View my answers</button>
                <button><Link to="/QuizInfo">Play again</Link></button>
            </div>
        </div>
    )
}

export default EndPage