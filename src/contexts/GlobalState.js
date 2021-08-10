import React, { useReducer } from "react";
import { reducer, ADD_ANSWER } from "./reducers";

import QuizContext from "./QuizContext";

function GlobalState(props) {
    const [answerState, dispatch] = useReducer(reducer, { answers: [] });

    function addAnswer(item) {
        dispatch({ type: ADD_ANSWER, item: item });
    };

    return (
        <QuizContext.Provider
            value={{
                answers: answerState.answers,
                addAnswer: addAnswer
            }}
        >
            {props.children}
        </QuizContext.Provider>
    );
}

export default GlobalState;