import { useState, useEffect } from 'react';
import tmi from 'tmi.js';

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

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    if (params.get('streamer')) {
      const client = new tmi.Client({
        connection: {
          secure: true,
          reconnect: true,
        },
        channels: [params.get('streamer')],
      });
      client.connect();
      client.on('message', (channel, tags, message, self) => {
        // console.log(channel, tags, message);
        if (tags.badges.broadcaster == '1' && message.toLowerCase() === 'wl+') {
          addWin();
        }
        if (tags.badges.broadcaster == '1' && message.toLowerCase() === 'wl-') {
          addLose();
        }
        if (
          tags.badges.broadcaster == '1' &&
          message.toLowerCase() === 'wlreset'
        ) {
          setWins(0);
          setLoses(0);
        } else return;
      });
    }
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
