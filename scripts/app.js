function spaceInvaderGame() {

  // ============================== setup game ==============================

  // setup grid - width, cells adding to arrays, adding players to positions (as a let outside the function)

  const width = 20
  const grid = document.querySelector('.grid')
  const cells = []
  let player = 389
  let alien = 29
  const gridSize = width ** 2
  const playerBullet = []
  let alienBomb = []    // you need an empty array for anything that moves on the grid 
  let alienMove = [] 
  let lives = 0
  let score = 0
  let fireBulletId 
  let bulletPosition

  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('div') // this is creating the square cells in the grid 
    grid.appendChild(cell)  // you need to append the cells as children to the grid so the div's are added to the grid array! 
    cells.push(cell)        // push the cell div into the cells array - this creates an index for each cell/div - this allows us to give our player a position as they have a number 
    alienMove.push(cell)   // push the cell div into the empty alienMove array, so that when the aliens move, the cell id can appear in the alienMove array - basically assigning a position
    playerBullet.push(cell)
    alienBomb.push(cell)
  }

  cells[player].classList.add('player')
  alienMove[alien].classList.add('alien')

 
  // setup eventlistener for keys with function inside, which states what each key does (switch statement)

  const bulletIntervals = []
  function fireBullet() { 
    bulletPosition = player																			// add function, remove bullet function, and then reset function 
    fireBulletId = setInterval(() => {
      playerBullet[bulletPosition].classList.remove('bullet')
      bulletPosition = bulletPosition - width 
      if (bulletPosition <= 0) {
        clearInterval(fireBulletId) 
      } else if (bulletPosition > -1) {
        playerBullet[bulletPosition].classList.add('bullet')
      }
    }, 200)	
    bulletIntervals.push(fireBulletId)	
  }
	
  // pushing interval of bullets firing into a empty array of lazer intervals allows multiple bullets - e.g. bulletIntervals.push[intervalId]


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
        fireBullet()   
        console.log(playerBullet)	// need to set a time out for when it hits the top'! 
	
        break
      }
    }
  }) 
	
  window.addEventListener('load', () => {
    setInterval(() => {
      alienMove[alien].classList.remove('alien')
      alien = alien + 1
      alienMove[alien].classList.add('alien') 
    }, 1000)
  })
	



  // set up player position - state initial position (with a let) and possible positions within the key cases  

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