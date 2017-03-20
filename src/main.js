import React from 'react';
import ReactDOM from 'react-dom';
import GameApp from './components/GameApp';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(GameApp),
    document.getElementById('mount')
  );
});