import { useEffect, useState } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const fetchQuestions = () => {
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        if (data.response_code == 0) {
          setQuestions(data.results);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  function validateAnswer(correct) {
    if (correct) {
      setScore(score + 1);
    }
    if (index <= 9) setIndex(index + 1);
  }

  return (
    <div>
      {index <= 9 ? (
        <div>
          <h1>Let's have a quiz, Question : {index + 1}</h1>
          {questions.length > 0 ? (
            <div>
              <p>{questions[index].question}</p>
              {questions[index].incorrect_answers.map((item, ind) => (
                <button onClick={() => validateAnswer(false)}>{item}</button>
              ))}
              <button onClick={() => validateAnswer(true)}>
                {questions[index].correct_answer}
              </button>
              <p style={{ display: "none" }}>
                {" "}
                {/* {setTimeout(() => setIndex(index + 1), 5000)} */}
              </p>
            </div>
          ) : null}

          <br />
          <button onClick={() => setIndex(index + 1)}>Skip Question</button>
        </div>
      ) : (
        <div>
          <h1>Quiz is Over</h1>
          <p>Score is : {score}/10</p>
        </div>
      )}
    </div>
  );
}

export default App;