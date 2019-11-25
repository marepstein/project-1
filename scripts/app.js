
function spaceInvaderGame() {

  // setup grid 
	
  const width = 20
  const grid = document.querySelector('.grid')
  const cells = []
  let player = 389
  const aliens = [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
    64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
    84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 
    104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115]
  const topRow = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  const gridSize = width ** 2
  let playerLives = 3
  let score = null
  let bulletPosition
  const reset = document.querySelector('button')
  const loser = document.querySelector('#lose')
  const winner = document.querySelector('#win')
  const intervals = [] 
  const backgroundMusic = new Audio()
  backgroundMusic.src = 'sounds/objekt.wav'
  const shooting = new Audio()
  shooting.src = 'sounds/3538.wav'
  shooting.volume = 0.1
  const explosion = new Audio()
  explosion.src = 'sounds/explode5.wav'
  explosion.volume = 0.1
	
  function startPage() {
    document.body.style.visibility = 'visible'
    document.querySelector('.grid').style.visibility = 'hidden'
    reset.style.visibility = 'hidden'
    winner.style.visibility = 'hidden'
    loser.style.visibility = 'hidden'
    document.querySelector('#start').style.visibility = 'visible'
    document.querySelector('.livesClass').style.visibility = 'hidden'
    document.querySelector('.scoresClass').style.visibility = 'hidden'
  }
	
  window.addEventListener('load', startPage)
	
  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('div') 
    grid.appendChild(cell) 
    cells.push(cell)       
  }
	
  document.addEventListener('keyup', function(e) {
    if (e.key === 's') {
      document.querySelector('.grid').style.visibility = 'visible'
      document.querySelector('#start').style.visibility = 'hidden'
      playGame()
    }
  })

  function playGame() {
    grid.style.position = 'absolute'
    cells[player].classList.add('player') // player on canvas 
    aliens.forEach((e) => {
      cells[e].classList.add('alien')    /// aliens on canvas
    })
    alienMove()
    randomBomb()
    document.querySelector('.livesClass').style.visibility = 'visible'
    document.querySelector('.scoresClass').style.visibility = 'visible'
    const lives = document.querySelector('#lives')
    lives.innerHTML = 3
    const score = document.querySelector('#score')
    score.innerHTML = 0
    document.querySelector('.title').style.visibility = 'hidden'
    backgroundMusic.play()
  }

  function moveAliens() {
    aliens.forEach(alien => {
      cells[alien].classList.remove('alien')
    })
    for (var i = 0; i < aliens.length; i++) {
      aliens[i] += 1
    }
    aliens.forEach(alien => {
      cells[alien].classList.add('alien')
    })
  }

  function moveDown() {
    aliens.forEach(alien => {
      cells[alien].classList.remove('alien')
    })
    for (var i = 0; i < aliens.length; i++) {
      aliens[i] += 20
    }
    aliens.forEach(alien => {
      cells[alien].classList.add('alien')
    })
  }

  function moveLeft() {
    aliens.forEach(alien => {
      cells[alien].classList.remove('alien')
    })
    for (var i = 0; i < aliens.length; i++) {
      aliens[i] -= 1
    }
    aliens.forEach(alien => {
      cells[alien].classList.add('alien')
    })
  }
	
  function alienMove() {
    const alienMoveInterval = setInterval(() => {
      setTimeout(() => {
        moveAliens()
      }, 1500)
      setTimeout(() => {
        moveDown() 
      }, 2000)
      setTimeout(() => {
        moveLeft()
      }, 2500)
      for (let i = 0; i < aliens.length; i++) {
        if (aliens[i] >= 359) {
          loseGame()
        }
      }
    }, 3000)
    intervals.push(alienMoveInterval)
  }

  const bulletSuperArray = []
  let bulletsFired = 0
  let newBullet = player - width
	
  function shotBullet() {
    const bulletArray = bulletSuperArray[bulletsFired]
    const shotInterval = setInterval(() => {
      cells[bulletArray[0]].classList.remove('bullet')
      newBullet = bulletArray[0] - width
      cells[newBullet].classList.add('bullet')
      bulletArray.pop() 
      bulletArray.push(newBullet)
      for (let i = 0; i < aliens.length; i++) {
        if (bulletArray.includes(aliens[i])) {
          console.log('hit')
          clearInterval(shotInterval)
          cells[newBullet].classList.remove('alien', 'bullet')
          aliens.splice(i, 1)
          // add function to +score 
          score += 100
          document.querySelector('#score').innerHTML = score 
          if (aliens.length === 0) {
            winGame()
          }
        } 
      }
    }, 50)
    intervals.push(shotInterval)
    setTimeout(() => {
      clearInterval(shotInterval)
      setTimeout(() => {
        topRow.forEach((i) => {
          if (cells[i].className === 'bullet') {
            cells[i].classList.remove('bullet')
          }
        })
      }, 30)
    }, 925)
		
  }

  function loseLife() {
    const lives = document.querySelector('#lives')
    if (playerLives === 3) {
      playerLives -= 1
      lives.innerHTML = 2
    } else if (playerLives === 2) {
      playerLives -= 1 
      lives.innerHTML = 1
    } else  if (playerLives === 1) {
      playerLives -= 1
      lives.innerHTML = 0
      loseGame() 
    }
  }

  const bombSuperArray = []
  let bombsFired = 0
  let newBomb

  function dropBombs() {
    const bombArray = bombSuperArray[bombsFired]
    const bombInterval = setInterval(() => {
      if (playerLives === 0) {
        loseGame()
      } else if (aliens.length === 0) {
        clearInterval(bombInterval)
        winGame()
      } 
      cells[bombArray[0]].classList.remove('bomb')
      newBomb = bombArray[0] + width
      cells[newBomb].classList.add('bomb')
      bombArray.pop()
      bombArray.push(newBomb)
      if (cells[bombArray].classList.contains('player')) {
			  grid.animate([
          // keyframes
          { transform: 'translate3d(-3px, 0, 0)' }, 
          { transform: 'translate3d(4px, 0, 0)' }, 
          { transform: 'translate3d(-6px, 0, 0)' }, 
          { transform: 'translate3d(6px, 0, 0)' },
          { transform: 'translate3d(-6px, 0, 0)' }, 
          { transform: 'translate3d(6px, 0, 0)' }, 
          { transform: 'translate3d(-6px, 0, 0)' }, 
          { transform: 'translate3d(4px, 0, 0)' },
          { transform: 'translate3d(-3px, 0, 0)' }
        ], { 
          // timing options
          duration: 0.5,
          iterations: 1000
        })
        explosion.play()
        loseLife()
      } 
      if (newBomb >= 379) {
        clearInterval(bombInterval)
        setTimeout(() => {
          cells[bombArray].classList.remove('bomb')
        }, 60)
      } 
    }, 100)
    intervals.push(bombInterval)
  }

  let randomBombs 
  function randomBomb() {
    const randomBombInterval = setInterval(() => {
      randomBombs = aliens[Math.floor(Math.random() * aliens.length)] 
      defineBombs()	
    }, 500)
    intervals.push(randomBombInterval)
    if (aliens.length === 0) {
      clearInterval(randomBombInterval)
      console.log('hello')
    }
  }
	
  function defineBombs() {
    cells[randomBombs + width].classList.add('bomb')
    bombSuperArray.push([randomBombs + width])
    dropBombs()
    bombsFired += 1
  }


  document.addEventListener('keyup', (e) => {
    switch (e.key) {
      case 'ArrowLeft': {
        if (player === 380) {
          return
        }
        cells[player].classList.remove('player')
        player = player - 1
        cells[player].classList.add('player')
        break
      }
      case 'ArrowRight': {
        if (player === (gridSize - 1)) {
          return
        }
        cells[player].classList.remove('player')
        player = player + 1
        cells[player].classList.add('player')
        break
      }
      case ' ': {
        e.preventDefault()
        bulletPosition = player - width
        bulletSuperArray.push([bulletPosition])
        shotBullet()
        bulletsFired += 1
        shooting.play()
      }
        break
    }

  })

  function loseGame() {
    intervals.map(interval => clearInterval(interval))
    document.querySelector('.grid').style.visibility = 'hidden'
    loser.style.visibility = 'visible'
    loser.style.top = '400px'
    document.querySelector('button').style.visibility = 'visible'
    console.log(intervals)
    resetGame()
  }

  function resetGame() {
    reset.addEventListener('click', () =>{
      document.location.reload(true)
    })
	
  }
	
  function winGame() {
    document.querySelector('.grid').style.visibility = 'hidden'
    winner.style.visibility = 'visible'
    document.querySelector('button').style.visibility = 'visible'
    resetGame()
  }

}

window.addEventListener('DOMContentLoaded', spaceInvaderGame)

