import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";

const initialState = {
  questions: [],

  //'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataRecevied":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    default:
      throw new Error("Unknown action");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status } = state;

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
      </Main>
    </div>
  );
}

export default App;
