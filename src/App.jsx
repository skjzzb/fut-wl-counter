import { useEffect, useState } from 'react';

function App() {
  const [wins, setWins] = useState(localStorage.getItem('wins') || 0);
  const [loses, setLoses] = useState(localStorage.getItem('loses') || 0);

  const addWin = () => {
    if (wins >= 20) return;
    setWins((wins) => parseInt(wins) + 1);
    localStorage.setItem('wins', parseInt(wins) + 1);
  };
  const removeWin = (e) => {
    e.preventDefault();
    if (wins <= 0) return;
    setWins((wins) => parseInt(wins) - 1);
    localStorage.setItem('wins', parseInt(wins) - 1);
  };
  const addLose = () => {
    if (loses >= 20) return;
    setLoses((loses) => parseInt(loses) + 1);
    localStorage.setItem('loses', parseInt(loses) + 1);
  };
  const removeLose = (e) => {
    e.preventDefault();
    if (loses <= 0) return;
    setLoses((loses) => parseInt(loses) - 1);
    localStorage.setItem('loses', parseInt(loses) - 1);
  };
  const reset = () => {
    setWins(0);
    setLoses(0);
    localStorage.setItem('loses', 0);
    localStorage.setItem('wins', 0);
  };

  useEffect(() => {
    window.addEventListener('storage', () => {
      window.location.reload();
    });
    return () => {
      window.removeEventListener('storage', () => {
        window.location.reload();
      });
    };
  }, []);

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
