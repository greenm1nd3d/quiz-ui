import React, { useContext } from 'react';

import QuizContext from "../contexts/QuizContext";

function Questions(props) {
    const { addAnswer } = useContext(QuizContext);
    const questions = props.questions;

    function handleSelect(item, e) {
        let answer = e.target.value;

        let data = {
            'question_id': item.id,
            'answer': answer
        }

        addAnswer(data);
    }

    return (
        <div className="row questions">
            {
                questions.map(item => (
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12" key={item.id}>
                        <div className="question">
                            <div className="row">
                                <div className="col-md-12">
                                    <h4>{item.question}</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <ul className="choices">
                                        <li>
                                            <input type="radio"
                                                name={`choices-${item.id}`}
                                                onClick={(e) => handleSelect(item, e)}
                                                value={item.choices.choice1}
                                            />{item.choices.choice1}
                                            
                                        </li>
                                        <li>
                                            <input type="radio"
                                                name={`choices-${item.id}`}
                                                onClick={(e) => handleSelect(item, e)}
                                                value={item.choices.choice2}
                                            />{item.choices.choice2}</li>
                                        <li>
                                            <input type="radio"
                                                name={`choices-${item.id}`}
                                                onClick={(e) => handleSelect(item, e)}
                                                value={item.choices.choice3}
                                            />{item.choices.choice3}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Questions;
