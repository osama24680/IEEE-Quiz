import React, { useState, useEffect } from 'react'
import "./Home.scss"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { getanswer, Logic, NextQuestion } from "../Store/questionsSlice"

const Home = () => {
    let navigate = useNavigate()
    let reduxData = useSelector(state => state.questions)
    let dispatch = useDispatch()


    useEffect(() => {

        dispatch(Logic())
        if(reduxData.lastQuestion){
            navigate("/EndPage")
        }
    }, [reduxData?.currentIndex, reduxData?.questions, dispatch,navigate,reduxData?.lastQuestion])
    return (

        <>
            {
                reduxData.loading ? "loading.........." :
                    (
                        <div className="question__Board">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                <path fill="#7bdaf37d" fillOpacity="1" d="M0,96L34.3,122.7C68.6,149,137,203,206,208C274.3,213,343,171,411,144C480,117,549,107,617,96C685.7,85,754,75,823,90.7C891.4,107,960,149,1029,186.7C1097.1,224,1166,256,1234,245.3C1302.9,235,1371,181,1406,154.7L1440,128L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z" />
                            </svg>
                            <div className="questionsForm">
                                <div className="question">
                                    {/* to remove . in the end of question */}
                                    <p>{reduxData.loading ? "........" : reduxData.questions?.[reduxData.currentIndex]?.question.slice(0, reduxData.questions?.[reduxData.currentIndex]?.question.length - 1)} ?</p>
                                </div>
                                <div className="answers" id="allAnswers">
                                    {reduxData.shuffledAnswers?.map((item, index) => {
                                        return (
                                            <button disabled={reduxData.isSelected} id={item} key={index} onClick={(e) => dispatch(getanswer(e))}>{item}</button>
                                        )
                                    })}

                                </div>
                            </div>
                            <div className="question_number">
                                <p>Question {reduxData.currentIndex + 1} of {reduxData.questions.length}</p>
                            </div>
                            <div className="finish_next">
                                <button className="finish"><p>Finish</p></button>
                                <button>{reduxData.Score}</button>
                                <button disabled={!reduxData.isSelected} className={!reduxData.isSelected && "disabled"} onClick={() => dispatch(NextQuestion())}><p>Next</p></button>
                            </div>
                        </div>
                    )
            }
        </>



    )
}

export default Home
