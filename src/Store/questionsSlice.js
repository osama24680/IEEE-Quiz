import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    questions: [],
    name: "osama megahed",
    category: null,
    difficulty: null,
    amount: null,
    loading: false,
}

// *************************get questions********************
export const getQuestions = createAsyncThunk("questions", async (arg, { getState }) => {
    const { questions } = getState();
    try {
        let respose = await fetch(`https://opentdb.com/api.php?amount=${Number(questions.amount)}&category=${Number(questions.category)}&difficulty=${questions.difficulty}`)
        let { results } = await respose.json()
        return results
    } catch (error) {
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
        },
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
            console.log(action.payload)
        },
        [getQuestions.rejected]: (state) => {
            state.loading = false

        },

    }
})



export default questionsSlice.reducer
export const { } = questionsSlice.actions
export const { getQuizSettings } = questionsSlice.actions


























