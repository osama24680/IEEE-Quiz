import React, { useState, useEffect, useMemo, useCallback } from 'react'
import "./Home.scss"
import { getQuestions } from "../Store/questionsSlice"
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from "react-router-dom"
const Home = () => {
    let navigate =useNavigate()
    let reduxData = useSelector(state => state.questions)
    let dispatch = useDispatch()

    let [currentIndex, setCurrentIndex] = useState(0)
    let [choosenAnswer, setChoosenAnswer] = useState("")
    let [Score, setScore] = useState(0)
    let [randomAnswers, setRandomAnswers] = useState([])
    let [isSelected, setIsSelected] = useState(false)
    let [isCorrect, setIsCorrect] = useState(null)
    let [isWrong, setIsWrong] = useState(null)
    let [greenChoice, setGreenChoice] = useState(null)


    const logic = () => {
        let answers
        let shuffledAnswers = []

        if (reduxData?.questions[currentIndex]?.incorrect_answers.length > 1) {
            answers = [...reduxData?.questions[currentIndex]?.incorrect_answers, reduxData?.questions[currentIndex]?.correct_answer]
            shuffledAnswers = answers.sort(() => Math.random() - 0.5)
            setRandomAnswers(shuffledAnswers)

        } else {
            answers = [reduxData?.questions[currentIndex]?.incorrect_answers[0], reduxData?.questions[currentIndex]?.correct_answer]
            shuffledAnswers = answers.sort(() => Math.random() - 0.5)
            setRandomAnswers(shuffledAnswers)
        }
        console.log(reduxData?.questions[currentIndex]?.incorrect_answers)
        console.log("correct_answer=>", reduxData?.questions[currentIndex]?.correct_answer)
        console.log(shuffledAnswers)

    }



    function nextQuestion() {
        let allAnswers = document.getElementById("allAnswers")
        let BtnAllAnswers = allAnswers.getElementsByTagName("button")
        Array.from(BtnAllAnswers).forEach(btn => {
            return (
                btn.style.color = "#0079ff",
                btn.style.transform = "scale(1)",
                btn.style.border = "2px solid #E9E8F6"
            )
        })


        let index = currentIndex
        index = index + 1
        if (index < reduxData?.questions.length) {
            setCurrentIndex(index)
        } else {
            navigate("/EndPage")
        }
        // logic()

        setIsSelected(false)
    }



    function getanswer(e) {
        let answer = e.target.textContent
        setChoosenAnswer(answer)
        if (reduxData?.questions[currentIndex].correct_answer === answer || Number(answer)) {
            let newScore = Score;
            newScore++;
            setScore(newScore)

            e.target.style.color = "green"
            e.target.style.border = "2px solid green"
        } else {
            e.target.style.color = "red"
            e.target.style.border = "2px solid red"
            let rightAnswer = document.getElementById(`${reduxData?.questions[currentIndex].correct_answer}`)
            rightAnswer.style.color = "green"
            rightAnswer.style.border = "2px solid green"
            rightAnswer.style.transform = "scale(1.1)"

        }
        setIsSelected(true)
    }

    useEffect(() => {

        logic()
    }, [currentIndex, reduxData?.questions])
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
                                    <p>{reduxData.loading ? "........" : reduxData.questions?.[currentIndex]?.question.slice(0, reduxData.questions?.[currentIndex]?.question.length - 1)} ?</p>
                                </div>
                                <div className="answers" id="allAnswers">
                                    {randomAnswers?.map((item, index) => {
                                        return (
                                            <button disabled={isSelected} id={item} key={index} onClick={(e) => getanswer(e)}>{item}</button>
                                        )
                                    })}

                                </div>
                            </div>
                            <div className="question_number">
                                <p>Question {currentIndex + 1} of {reduxData.questions.length}</p>
                            </div>
                            <div className="finish_next">
                                <button className="finish"><p>Finish</p></button>
                                <button>{Score}</button>
                                <button disabled={!isSelected} className={!isSelected && "disabled"} onClick={() => nextQuestion()}><p>Next</p></button>
                            </div>
                        </div>
                    )
            }
        </>



    )
}

export default Home
