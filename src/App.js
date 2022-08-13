import './App.css';
import Board from './ui/Board';
import Description from './ui/Description';
import { useState } from 'react';
import Snake from './snake/snake';

function App() {
  const [snake] = useState(new Snake());

  return (
    <div className='App'>
      <Description snake={snake} />
      <Board snake={snake} />
    </div>
  );
}

export default App;
