import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

function Home(props) {
    const [ quizzes, setQuizzes ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const url = `http://www.farmersph.com/addons/quiz-api/api/v1/quizzes`;
        const abortCon = new AbortController();

        setLoading(true);

        fetch(url, { signal: abortCon.signal })
        .then(res => res.json())
        .then(data => {
            setQuizzes(data);
            setLoading(false);
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
    }, [quizzes]);

    return (
        <React.Fragment>
            <header>
                <div className="header">
                    <h1>A-One Trivia</h1>
                </div>
            </header>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-12">
                        <h2 className="align-center">Select a Quiz</h2>
                        {loading && <div className="align-center"><Spinner animation="border" variant="primary" /></div>}
                        <div className="row quizzes">
                            <ul className="quizzes">
                                {
                                    quizzes.map(item => (
                                        <li key={item.id}>
                                            <h4><NavLink to={`/quiz/${item.id}`}>{item.title}</NavLink></h4>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home;
