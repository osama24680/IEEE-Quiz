import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    questions: [],
    name: "osama megahed",
    category: null,
    difficulty: null,
    amount: null,
    loading: false,
    currentIndex: 0,
    Score: 0,
    randomAnswers: [],
    isSelected: false,
    answers: [],
    shuffledAnswers: [],
    lastQuestion: false,
    finalResult: 0,
}

// *************************get questions********************
export const getQuestions = createAsyncThunk("questions", async (arg, { getState }) => {
    const { questions } = getState();

    try {
        let respose = await fetch(`https://opentdb.com/api.php?amount=${Number(questions.amount)}&category=${Number(questions.category)}&difficulty=${questions.difficulty}`)
        let { results } = await respose.json()
        console.log(results)
        return results
    } catch (error) {
    }
})
export const Logic = createAsyncThunk("Logic", async (arg, { getState }) => {
    const { questions } = getState();
    console.log(questions)
    try {
        let answers

        if (questions?.questions[questions.currentIndex]?.incorrect_answers.length > 1) {
            answers = [...questions?.questions[questions.currentIndex]?.incorrect_answers, questions?.questions[questions.currentIndex]?.correct_answer]
            return answers

        } else {
            answers = [questions?.questions[questions.currentIndex]?.incorrect_answers[0], questions.questions[questions.currentIndex]?.correct_answer]
            return answers
        }

    } catch (error) {
    }
})
export const NextQuestion = createAsyncThunk("NextQuestion", async (arg, { getState }) => {
    const { questions } = getState();
    try {
        let allAnswers = document.getElementById("allAnswers")
        let BtnAllAnswers = allAnswers.getElementsByTagName("button")
        Array.from(BtnAllAnswers).forEach(btn => {
            return (
                btn.style.color = "#0079ff",
                btn.style.transform = "scale(1)",
                btn.style.border = "2px solid #E9E8F6"
            )
        })
        console.log(questions)

        console.log("we have clicked on next question")
        let index = questions.currentIndex
        index++;

        if (index < questions.questions.length) {
            return index
        } else {
            // navigate("/EndPage")
            console.log("go to setting page")
        }
    }

    catch (error) {
    }
})

export const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        getQuizSettings: (state, action) => {
            if (action.payload[1] === "category") {
                state.category = action.payload[0].target.value
            } else if (action.payload[1] === "difficulty") {
                state.difficulty = action.payload[0].target.value
            } else {
                state.amount = action.payload[0].target.value
            }
            state.lastQuestion = false
            state.Score = 0
        },

        getanswer: (state, action) => {
            let e = action.payload;
            let newScore = state.Score
            let answer = e.target.textContent
            if (state?.questions[state.currentIndex].correct_answer === answer || Number(answer)) {
                newScore++;
                state.Score = newScore;
                e.target.style.color = "green"
                e.target.style.border = "2px solid green"
                e.target.style.border = "2px solid green"
            } else {
                e.target.style.color = "red"
                e.target.style.border = "2px solid red"
                let rightAnswer = document.getElementById(`${state?.questions[state.currentIndex].correct_answer}`)
                rightAnswer.style.color = "green"
                rightAnswer.style.border = "2px solid green"
                rightAnswer.style.transform = "scale(1.1)"

            }
            state.isSelected = true
        },
        grade: (state) => {
            let result = (((state.Score) / state.questions.length) * 100).toFixed(0)

            state.finalResult = result
        }
    },

    extraReducers: {
        // ************* get products ****************
        [getQuestions.pending]: (state) => {
            state.loading = true
            // state.error = false
        },
        [getQuestions.fulfilled]: (state, action) => {
            state.questions = action.payload
            state.loading = false
            state.currentIndex = 0
            state.lastQuestion = false
            state.Score = 0
        },
        [getQuestions.rejected]: (state) => {
            state.loading = false
        },


        [Logic.fulfilled]: (state, action) => {
            state.shuffledAnswers = action.payload.sort(() => Math.random() - 0.5)
        },


        [NextQuestion.fulfilled]: (state, action) => {
            state.currentIndex = action.payload
            console.log(action.payload, " => ", state.questions.length)
            state.isSelected = false
            let finalResult = state.questions.length - action.payload
            console.log(finalResult)
            if (isNaN(finalResult)) {
                state.lastQuestion = true
                console.log(state.lastQuestion)
            } else {
                state.lastQuestion = false
            }
        },


    }
})



export default questionsSlice.reducer
export const { } = questionsSlice.actions
export const { getQuizSettings, getanswer, grade } = questionsSlice.actions


























