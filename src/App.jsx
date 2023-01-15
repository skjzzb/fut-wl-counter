import { useState } from 'react';

function App() {
  const [wins, setWins] = useState(0);
  const [loses, setLoses] = useState(0);

  const addWin = () => {
    setWins((wins) => wins + 1);
  };
  const removeWin = (e) => {
    e.preventDefault();
    setWins((wins) => wins - 1);
  };
  const addLose = () => {
    setLoses((loses) => loses + 1);
  };
  const removeLose = (e) => {
    e.preventDefault();
    setLoses((loses) => loses - 1);
  };
  const reset = () => {
    setWins(0);
    setLoses(0);
  };

  return (
    <div className='app'>
      <div className='counter'>
        <p className='wins' onClick={addWin} onContextMenu={removeWin}>
          {wins}
        </p>
        <div className='mid'>
          <div className='reset' onClick={reset}></div>
        </div>
        <p className='loses' onClick={addLose} onContextMenu={removeLose}>
          {loses}
        </p>
      </div>
    </div>
  );
}

export default App;
