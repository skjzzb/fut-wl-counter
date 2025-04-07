import { useState } from 'react';

const divisions = [
  { name: 'Div 10', requiredWins: 4 },
  { name: 'Div 9', requiredWins: 5 },
  { name: 'Div 8', requiredWins: 6 },
  { name: 'Div 7', requiredWins: 6 },
  { name: 'Div 6', requiredWins: 7 },
  { name: 'Div 5', requiredWins: 7 },
  { name: 'Div 4', requiredWins: 8 },
  { name: 'Div 3', requiredWins: 9 },
  { name: 'Div 2', requiredWins: 12 },
  { name: 'Div 1', requiredWins: 0 }, // Final
];

export default function HorizontalStepper() {
  const [currentDivIndex, setCurrentDivIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleWin = () => {
    const required = divisions[currentDivIndex].requiredWins;
    if (progress + 1 >= required) {
      if (currentDivIndex < divisions.length - 1) {
        setCurrentDivIndex(currentDivIndex + 1);
        setProgress(0);
      }
    } else {
      setProgress(progress + 1);
    }
  };

  const handleLose = () => {
    if (progress > 0) {
      setProgress(progress - 1);
    } else if (currentDivIndex > 0) {
      const prevRequired = divisions[currentDivIndex - 1].requiredWins;
      setCurrentDivIndex(currentDivIndex - 1);
      setProgress(prevRequired - 1);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (e.type === 'click') {
      handleWin(); // Left click = Win
    } else if (e.type === 'contextmenu') {
      handleLose(); // Right click = Loss
    }
  };

  const currentDivision = divisions[currentDivIndex];

  return (
    <div
      onClick={handleClick}
      onContextMenu={handleClick}
      style={{
        marginTop: '20px',
        textAlign: 'center',
        padding: '1rem',
        border: '2px solid #333',
        borderRadius: '10px',
        maxWidth: '400px',
        marginInline: 'auto',
        backgroundColor: '#f9f9f9',
        userSelect: 'none',
        cursor: 'pointer',
      }}
      title='Left Click = Win | Right Click = Loss'
    >
      <h2 style={{ marginBottom: '10px' }}>{currentDivision.name}</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '1rem' }}>
        {[...Array(currentDivision.requiredWins)].map((_, i) => (
          <div
            key={i}
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '4px',
              backgroundColor: i < progress ? '#007bff' : '#ccc',
              transition: 'background-color 0.3s',
            }}
          ></div>
        ))}
      </div>
      <p style={{ fontSize: '0.9rem', color: '#555' }}>Click Right = ❌ | Click Left = ✅</p>
    </div>
  );
}
