
function spaceInvaderGame() {
  // ============================== setup game ==============================

  // setup grid - width, cells adding to arrays, adding players to positions (as a let outside the function)

  const width = 20
  const grid = document.querySelector('.grid')
  const cells = []
  let player = 389
  let aliens = [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
    64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
    84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95]
  const topRow = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  const bottomRow = [379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399]
  const gridSize = width ** 2
  let direction = 1
  let lives = 3
  let score = 0
  let fireBulletId
  let bulletPosition
  const startButton = document.querySelector('button')

  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('div') // this is creating the square cells in the grid 
    grid.appendChild(cell)  // you need to append the cells as children to the grid so the div's are added to the grid array! 
    cells.push(cell)        // push the cell div into the cells array - this creates an index for each cell/div - this allows us to give our player a position as they have a number 
  }

  function playGame() {
    cells[player].classList.add('player') // player on canvas 
    aliens.forEach((e) => {
      cells[e].classList.add('alien')    /// aliens on canvas
    })
    moveAliens()
    randomBomb()
  }
  startButton.addEventListener('click', playGame)


  function moveAliens() {
    setInterval(() => {
      aliens.forEach(alien => {
        cells[alien].classList.remove('alien')
      })
      for (var i = 0; i < aliens.length; i++) {
        aliens[i] += 1
      }
      aliens.forEach(alien => {
        cells[alien].classList.add('alien')
      })

      const rightWall = aliens[aliens.length - 1] % width === width - 1
      const leftWall = aliens[0] % width

      // if (rightWall === true ) {
      //   moveDown() 
      // }
    }, 500)
  }

  function moveDown() {
    aliens.forEach(alien => {
      cells[alien].classList.remove('alien')
    })
    aliens = aliens.map(alien => alien += width)
    aliens.forEach(alien => {
      cells[alien].classList.add('alien')
    })
    aliens = aliens.map(alien => alien -= 1)
  }

  // function downAndLeft() {
  //   for (var i = 0; i < aliens.length; i++) {
  //     aliens[i] -= 1
  //   }
  // }

  const bulletSuperArray = []
  let bulletsFired = 0
  let newBullet = player - width


  function shotBullet() {
    // this creates a bullet array containing arrays - to allow for effectively a loop 
    const bulletArray = bulletSuperArray[bulletsFired]
    const shotInterval = setInterval(() => {
      // at the first position of the bulletArray remove the bullet when shot
      cells[bulletArray[0]].classList.remove('bullet')
      // create new bullet, which is the initial position - width --> this creates the movement upwards 
      newBullet = bulletArray[0] - width
      // adds the bullet into the cells --> again contributing to the movement upwards
      cells[newBullet].classList.add('bullet')
      // take the last eleement from the bulletArray as it's been shot --> when logged, it logs empty arrays // THINK OF THIS AS EQUIVALENT TO REMOVING THE CLASS IMAGE
      bulletArray.pop()
      // push the new bullet into the bullet Array --> this logs every position the bullet enters up the grid // EQUIVALENT OF ADDING CLASS IMAGE 
      bulletArray.push(newBullet)
      // checks if bullet has hit an alien to remove both alien and bullet 
      for (let i = 0; i < aliens.length; i++) {
        if (bulletArray.includes(aliens[i])) {
          console.log('hit')
          clearInterval(shotInterval)
          cells[newBullet].classList.remove('alien', 'bullet')
          // start from alien position and remove one 
          aliens.splice(i, 1)
          // add function to +score 
        }
      }
    }, 50)


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

  const bombSuperArray = []
  let bombsFired = 0
  let newBomb

  function dropBombs() {
    const bombArray = bombSuperArray[bombsFired]
    const bombInterval = setInterval(() => {
      cells[bombArray[0]].classList.remove('bomb')
      newBomb = bombArray[0] + width
      cells[newBomb].classList.add('bomb')
      bombArray.pop()
      bombArray.push(newBomb)
      if (cells[bombArray].classList.contains('player')) {
        console.log('hello')
      } 
      console.log(newBomb)
      if (newBomb >= 379) {
        console.log(newBomb)
        clearInterval(bombInterval)
        setTimeout(() => {
          cells[bombArray].classList.remove('bomb')
        }, 60)
      }
    }, 100)
  }
	
  let randomBombs 
  function randomBomb() {
    setInterval(() => {
      randomBombs = aliens[Math.floor(Math.random() * aliens.length)] 
      defineBombs()	
    }, 500)
  }
	
  function defineBombs() {
    cells[randomBombs + width].classList.add('bomb')
    bombSuperArray.push([randomBombs + width])
    dropBombs()
    bombsFired += 1
  }
	
  // function loseLife() {
  //   if (cells[player].classList.contains('bomb')) {
  //     console.log('hello')
  //   }
  // }

  // loseLife()

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
        // set initial bullet position
        bulletPosition = player - width
        //push the bullet position into the bullet array - bulletPosition = the number of the square above the player
        bulletSuperArray.push([bulletPosition])
        // shoot the bullet
        shotBullet()
        // this basically allows for the firing of multiple bullets at once, it creates a new loop of arrays for new position
        bulletsFired += 1
      }
        break
    }

  })


  // setup alien position - use array square id for setting different values 

  // for shooting at aliens - keyup space - class added to bullet 

  // set lives 

  // set score 

  // set const for space above (e.g. alien - 25) and below 

  // ============================== aliens ==================================

  // aliens dropping bombs (function) - setInterval for time & alien - width (so it drops from current position) --> can only be from front 4, but when all four are killed alien array becomes empty and reassigned to next four OR 'if empty cell infront - based on alien + number of cells it takes to get below' then do x  

  // alien movement: use array square id for setting different values (map through array when they move) --> one function for moving right, one for moving left 

  // alien speed: function that controls speed depending on number i.e. move every 2 seconds, if aliens < 25, move every 3s, else .... 


  // ============================== player ==================================

  // player shooting at aliens - 'keyup' space - class added to bullet (something like: gridsize - width & classList add or remove - if it hits the alien)  --> keyframes possibly used for bullets 


  // ============================== scoring/lives ==================================

  // if alien bomb === player position -1 from life 

  // & if loop for if player bullet hits alien & score effect

  //if div .contains bullet and alien - remove class alien add class blank div --> and add to score 

  // ============================== end game ==================================

  // CSS animation hidden style visibility -- google - moving between states --> use true or false statements (if start button = clicked - it becomes true and when end game function is called (no more lives) it becomes false)
  // this hides things based on whether theyre true or false - this basically loops through the game 

  // if loop - if player lives = 0 => try again and score game state, else if aliens === 0 => congratulations and score game state  // array of aliens = 0? 

  // event listener for try again button

  // =================  BONUS =================

  // protective boulders as an extra 

  // DIFFERENT POINT PER ALIEN TYPE

}

window.addEventListener('DOMContentLoaded', spaceInvaderGame)


// aliens to right: if (aliens.length - 1 === (gridSize - 1)) {
//give interval id and then stop the interval 
//create a function aliens[i] -= 1 
// }

// aliens to left: aliens[0] === 

// function to move down -- setTimeOut (moveDown function) x - width 