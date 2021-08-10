import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Questions from "../data/Questions";
import QuizContext from "../contexts/QuizContext";

function QuestionsPage(props) {
    const [ questions, setQuestions ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ email, setEmail ] = useState('');
    const { answers } = useContext(QuizContext);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        const url = `http://www.farmersph.com/addons/quiz-api/api/v1/quiz/${props.match.params.id}`;
        const abortCon = new AbortController();

        setLoading(true);

        fetch(url, { signal: abortCon.signal })
        .then(res => res.json())
        .then(data => {
            setQuestions(data);
            setLoading(false);
        })
        .catch(err => {
            if (err.name === 'AbortError') {
                console.log("Fetch aborted!");
            }
            console.log(err);
            setLoading(false);
        });

        return () => abortCon.abort();
    }, [questions, props.match.params.id]);

    const submitAnswer = () => {
        setLoading(true);

        let data = {
            'quiz_id': parseInt(props.match.params.id),
            'email': email,
            content: answers
        };

        console.log("Submitted Data", data);

        axios({
            method: 'POST',
            url: `http://www.farmersph.com/addons/quiz-api/api/v1/quiz/submit`,
            data: data,
        })
        .then(function(res) {
            console.log(res);

            MySwal.fire({
                title: <p>Success</p>,
                didOpen: () => {
                    MySwal.clickConfirm()
                }
            }).then(() => {
                return MySwal.fire(<p>Your answers have been successfully submitted</p>);
            });
        })
        .catch(function(res) {
            let code = res.response.status;

            console.log("Error", code);

            if (code === 401) {
                MySwal.fire({
                    title: <p>Error</p>,
                    didOpen: () => {
                        MySwal.clickConfirm()
                    }
                }).then(() => {
                    return MySwal.fire(<p>You can take this quiz only once!</p>);
                });
            }
        });

        setLoading(false);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    return (
        <QuizContext.Consumer>
            {context => (
                <React.Fragment>
                    <header>
                        <div className="header">
                            <h1>A-One Trivia</h1>
                        </div>
                        <nav className="top-menu">
                            <ul>
                                <li>
                                    <NavLink to="/">Back to List of Quizzes</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </header>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2 className="mb-30">Questions</h2>
                                        <Questions questions={questions} />
                                        {loading && <div className="align-center"><Spinner animation="border" variant="primary" /></div>}
                                        <div className="row mb-15 mt-30">
                                            <div className="col-md-12">
                                                <p>Enter your email address</p>
                                                <input type="text" name="email" className="email" onChange={handleEmail} />
                                            </div>
                                        </div>
                                        <div className="row mb-30">
                                            <div className="col-md-12">
                                                <button
                                                    className="btn submit-answer"
                                                    onClick={() => submitAnswer() }>
                                                    Submit Answer
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </QuizContext.Consumer>
    )
}

export default QuestionsPage;
