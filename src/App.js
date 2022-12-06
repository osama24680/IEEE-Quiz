import React from 'react'
import Home from "./Home/Home"
import QuizInfo from "./QuizInfo/QuizInfo"
import EndPage from "./EndPage/EndPage"
import { Routes, Route } from "react-router-dom"
const App = () => {
  return (
    <div className="main_page">
      <Routes>
        <Route path="/" element={<QuizInfo />} />
        <Route path="/home" element={<Home />} />
        <Route path="/QuizInfo" element={<QuizInfo />} />
        <Route path="/EndPage" element={<EndPage />} />
      </Routes>

    </div>
  )
}

export default App