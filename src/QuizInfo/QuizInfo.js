import React, { useState } from 'react'
import "./QuizInfo.scss"
import { useSelector, useDispatch } from 'react-redux'
import { getQuizSettings, getQuestions } from "../Store/questionsSlice"
import { useNavigate } from "react-router-dom"
const QuizInfo = () => {

    let navigate = useNavigate()
    let reduxData = useSelector(state => state.questions)
    let dispatch = useDispatch()

    const [isWrong, setIsWrong] = useState(false);
    const GoToQuestionsHere = () => {
        if (reduxData.category && reduxData.difficulty && reduxData.amount > 0) {
            setIsWrong(false)
            navigate("/home")
            dispatch(getQuestions())
        }
        else {
            setIsWrong(true)
        }
    }

    return (
        <div className="settings_board">
            <h1>Quiz Settings</h1>
            <div className="categories">
                <label htmlFor="category" >Category</label>
                <select id="category" name="category" onChange={(e) => dispatch(getQuizSettings([e, "category"]))}>
                    <option value="9">General Knowledge</option>
                    <option value="22">Geography</option>
                    <option value="24">Politics</option>
                    <option value="18">Science: Computers</option>
                    <option value="23">History</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="21">Art</option>
                    <option value="26">celebrities</option>
                    <option value="10">Books Games</option>
                    <option value="12">Music</option>
                    <option value="15">Video Games</option>
                    <option value="27">Animals</option>
                    <option value="32">Cartoon</option>
                </select>
            </div>
            <div className="difficulty">
                <label htmlFor="difficulty" className="label_difficulty"> Difficulty</label>
                <div id="difficulty">
                    <label >
                        <input type="radio" name="difficulty" id="easy" value="easy" onChange={(e) => dispatch(getQuizSettings([e, "difficulty"]))} />
                        Easy
                    </label>
                </div>

                <div >
                    <label >
                        <input type="radio" name="difficulty" id="medium" value="medium" onChange={(e) => dispatch(getQuizSettings([e, "difficulty"]))} />
                        Medium
                    </label>
                </div>

                <div >
                    <label >
                        <input type="radio" name="difficulty" id="hard" value="hard" onChange={(e) => dispatch(getQuizSettings([e, "difficulty"]))} />
                        Hard
                    </label>
                </div>
            </div>

            <div className="numberOfQuestions">
                <input type="number" name="" id="numOfQuestions" placeholder="Number Of questions" onChange={(e) => dispatch(getQuizSettings([e, "number"]))} />
            </div>

            <div className="testYourself">
                {/* <button onClick={() => dispatch(GoToQuestions())}>Test Yourself</button> */}
                <button onClick={() => GoToQuestionsHere()}>Test Yourself</button>
            </div>

            {isWrong && <h2>You must choose all options</h2>}



        </div >
    )
}

export default QuizInfo
