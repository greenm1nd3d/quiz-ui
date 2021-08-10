export const ADD_ANSWER = "ADD_ANSWER";

const addAnswer = (item, state) => {
    const updatedAnswers = [...state.answers];

    const updatedItemIndex = updatedAnswers.findIndex(
        itm => itm.question_id === item.question_id
    );

    if (updatedItemIndex < 0) {
        updatedAnswers.push({ ...item });
    } else {
        const updatedItem = {
            ...updatedAnswers[updatedItemIndex]
        };
        updatedItem.answer = item.answer;
        updatedAnswers[updatedItemIndex] = updatedItem;
    }

    console.log("Answers Data", updatedAnswers);

    return { ...state, answers: updatedAnswers };
};

export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_ANSWER:
            return addAnswer(action.item, state);

        default:
            return state;
    }
};
