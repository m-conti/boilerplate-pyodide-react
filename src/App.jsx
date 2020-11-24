import React, { useState } from 'react';
import useWorker from './hooks/useWorker';


const App = () => {
  const [ responses, dispatch ] = useWorker('main', (result) => console.log(`result : ${result}`));
  const [ count, setCount ] = useState(1);

  const dispatchAction = (type) => {
    dispatch({ type, payload: count });
  }
  return <div>
    <button onClick={() => setCount(count > 1 ? count - 1 : 1)}> - </button>{count}<button onClick={() => setCount(count + 1)}> + </button>
    <br/>
    <button onClick={() => dispatchAction('SQUARE')}>X^2</button>
    <button onClick={() => dispatchAction('CUBE')}>X^3</button>
    <button onClick={() => dispatchAction('ADD')}>X + 3</button>
    <button onClick={() => dispatchAction('UNKNOWN')}>ERROR</button>
    <br/>
    result : { responses && responses.length && responses[responses.length - 1] }
  </div>
}

export default App;
