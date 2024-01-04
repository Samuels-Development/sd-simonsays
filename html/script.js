document.addEventListener('DOMContentLoaded', () => {
  let cells;
  let sequence = [];
  let playerSequence = [];
  let sequenceStep = 0;
  let gridSize;
  let repetitions;
  let currentRepetitions = 0;
  let gameActive = false;
  let onClick = new Audio("https://cdn.discordapp.com/attachments/1053976576179568721/1061414043937689742/hack-click.mp3");
  let onSuccess = new Audio("https://cdn.discordapp.com/attachments/1053976576179568721/1061411326158716928/hack-success.mp3");
  let onFail = new Audio("https://cdn.discordapp.com/attachments/1002646303139958784/1192255571219447848/error.ogg");
  const gameContainer = document.querySelector('.game-container');

  window.addEventListener('message', (event) => {
    if (event.data.type === "startGame") {
      gameContainer.style.display = 'flex';
      gameContainer.classList.remove('hidden');
      gridSize = Math.max(3, Math.min(event.data.gridSize, 7));
      repetitions = event.data.repetitions;
      createGrid(gridSize);
      resetGame();
      gameActive = true;
    }
  });

  function createGrid(size) {
    const gameGrid = document.getElementById('gameGrid');
    gameGrid.innerHTML = '';
    gameGrid.style.gridTemplateColumns = `repeat(${size}, 100px)`;
    gameGrid.style.gridTemplateRows = `repeat(${size}, 100px)`;

    for (let i = 0; i < size * size; i++) {
      const cell = document.createElement('div');
      cell.classList.add('game-cell');
      cell.dataset.id = i.toString();
      gameGrid.appendChild(cell);
    }

    cells = document.querySelectorAll('.game-cell');
    cells.forEach(cell => cell.addEventListener('click', playerInput));
  }

  function resetGame() {
    sequence = [];
    playerSequence = [];
    sequenceStep = 0;
    currentRepetitions = 0;
    addRandomToSequence();
    playbackSequence();
  }

  function addRandomToSequence() {
    sequence.push(Math.floor(Math.random() * cells.length));
  }

  function playbackSequence() {
    let i = 0;
    const interval = setInterval(() => {
      if (!gameActive) {
        clearInterval(interval);
        return;
      }
      activateCell(sequence[i], 'red');
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
        setTimeout(() => allowPlayerInput(), 500);
      }
    }, 1000);
  }

  function activateCell(index, color) {
    if (!gameActive) return;
    const cell = cells[index];
    cell.classList.add(color);
    onClick.play();
    setTimeout(() => {
      cell.classList.remove(color);
    }, 500);
  }

  function allowPlayerInput() {
    cells.forEach(cell => cell.addEventListener('click', playerInput));
  }

  function blockPlayerInput() {
    cells.forEach(cell => cell.removeEventListener('click', playerInput));
  }

  function playerInput(event) {
    const cellIndex = Array.from(cells).indexOf(event.target);
    playerSequence.push(cellIndex);
    activateCell(cellIndex, 'green');

    if (sequence[playerSequence.length - 1] !== cellIndex) {
      onFail.play();
      endGame(false);
    } else if (playerSequence.length === sequence.length) {
      sequenceStep++;
      currentRepetitions++;
      playerSequence = [];
      blockPlayerInput();
      if (currentRepetitions < repetitions) {
        addRandomToSequence();
        setTimeout(() => playbackSequence(), 1000);
      } else {
        onSuccess.play();
        endGame(true);
      }
    }
  }

  function endGame(success) {
    gameActive = false;
    blockPlayerInput();
    fetch(`https://${GetParentResourceName()}/endGame`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ success: success })
    }).then(() => {
      gameActive = false;
      gameContainer.classList.add('hidden');
  
      setTimeout(() => {
        gameContainer.style.display = 'none';
        resetGame();
      }, 500);
    });
  }
});
