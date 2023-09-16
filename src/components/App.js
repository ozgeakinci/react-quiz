import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

//reducerda yer alan initialState
const initialState = {
  questions: [],

  //'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    //datayı aldığımız yer
    case "dataRecevied":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    //dataya ulaşamadığımız durumda
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    //soruları görüntülediğimiz yer
    case "start":
      return {
        ...state,
        status: "active",
      };
    //cevapları görüntülediğimiz kısım
    case "newAnswer":
      // burada reducerın questionsdan bilgisi olmadığı için öncelikle var olan indexi alıyoruz.
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        // ve burda eğer payload durumu correctOption ile aynıysa mevcut state duruma puanunu ekliyoruz. yoksa point olduğu yerde kalıyor.
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        //diğer soruya geçerken cevabı sıfırlamak için
        answer: null,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "reset":
      return {
        ...state,
        status: "ready",
        index: 0,
        points: 0,
        answer: null,
      };
    default:
      throw new Error("Unknown action");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points, highScore } = state;

  const numQuestions = questions.length;
  const maxPointsProgress = questions.reduce(
    (acc, curr) => acc + curr.points,
    0
  );

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataRecevied", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    };

    fetchQuestions();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPointsProgress={maxPointsProgress}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <NextQuestion
              dispach={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPointsProgress={maxPointsProgress}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
