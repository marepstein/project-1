<h2> Game Overview </h2>  

Space Invaders is a classic arcade game, in which, the players aim is to shoot at an invading alien armada until there are no remaining aliens. The player can only move left or right. The aliens also move right, down and left at a set interval. The player also has to avoid the aliens bombs, which result in the reduction of a life. 

The aim is for the player to kill all aliens before they reach the player position, without being struck by three of alien bombs, leaving the player with 0 lives.  

   ![IMAGE of desktop 'SPACE INVADERS'](https://media.giphy.com/media/L1PwQfiDrKfstsSgqR/giphy.gif)
   
   marepstein.github.io/project-1/

<h2> Brief </h2>

* Render a version of Space Invaders where the player is able to **clear at least one wave of aliens, with the score being displayed at the end of the game.**

* Have separate **HTML / CSS / JavaScript files.**

* Use Javascript for **DOM manipulation.** 

* Establish your game online, using Github Pages.

<h2> Technologies Used </h2> 

* HTML5 with HTML5 audio
* CSS3 with animation
* JavaScript (ES6)
* Git
* GitHub
* Google Fonts

<h2> Time frame </h2>

7 days. 

<h2> Approach taken </h2> 

<h3> Grid Layout </h3> 

The game itself is contained within a 20 x 20 grid made up of an array of 400 divs (cells). This created a starting point for the movement of my elements, which was straightforward as I was able to work out the necessary indicies based on whether movement was vertical (+/- width) or horizontal (+/- 1). 

<h3> Game functionlity </h3> 

<h4> Creating and Moving Objects </h4>

I then created class names for 'alien', 'player', 'bullet' and 'bomb'. This allowed me to add CSS styling once I had defined each elements position. Alien positions were set out via an array of indicies, whilst the players initial position was a single index number. I decided to begin by focusing on the player movement as it required less logic. 

Here, I used a keyup event listener, to allow the user to move the player using left and right arrows. I used a switch statement with nested if statements to restrict the player from moving above the bottom row, and off the screen.

``` 

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
  
  ```
My next goal was to create the alien movement functionality, which consists of a movement across and down the grid automatically. Eventually, after some experimenting, I was able to recreate this feature through the use of setIntervals and setTimeouts, calling on three different move functions, which I quickly realised I needed to define the new position of the aliens and remove each alien from their previous position in order to prevent the aliens replacing one another. 

```										
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
  ```
  
  ```	
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
  
  ```
  
<h4> Bullets and bombs: </h4> 

The movement of the bombs and bullets followed a similar logic, as it required the removal and addition of the class to the grid index upon movement. 

I found the bullet functionality challenging as the player had to be able to fire more than one bullet at a time, which resulted in issues. However, by creating an array of nexted arrays combined with a setInterval and similar logic to the alien movement I was able to achieve my target. Additionally, I had to account for the bullet hitting an alien, which required a for loop and if statement nested within the bullet function and clearing of relevant intervals. A keyup event listener on the spacebar triggered the this function. 

For alien bombs,the starting position was indicated using Math.random to pick a number within the array and fire from there. I used a similar logic to the bullets, again with array methods, setIntervals and if statements for scoring and lives. 

<h4> Scoring and Lives </h4>:

For both the bullet hitting an alien and the bomb hitting a player, I nested an if statement within each function, for aliens this if statement was within a loop due to there being multiple aliens. The condition checked whether any cell contained either the player class or the alien class and then removes a life or adds to the user score - as a result of a call to the relevant function. 

```
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
  
  ``` 
  
I added an animation to make the grid shake when the player is hit by a bomb for extra effect, using keyframes. 

For alien collison, I had to ensure the relevant alien was removed. I was able to do this using <strong>slice</strong> on the alien array.

<h4> Start and Reset </h4>

Once I had achieved the functionality, I had reached my MVP target, and therefore, decided to focus on a start page and reset button. Until this point, the game started on page load which doesnt give the user much time to prepare for the game and could be seen as poor UX. I found that implementing a 'start' screen, or state, was easier as it required hiding the necessary classes (grid, players, aliens etc) and ensuring the start div I created in my index.html was visible. Additionally, I attached an event listener to the relevant button, in this case an 'S', to initiate the playGame function. 

In contrast, I found that the reset button presented more issues and required more thought. I attempted to reset the board which involved setring everything back to it's intial position, which is where I ran into issues. My game would restart but the aliens would not return to the full alien array, and those that I had shot in my previous game were still not showing. By this point I was running out of time and so was able to reset the game with a page reload. As a future goal, I am keen to work on a better solution for this. 

<h4> Design & Audio: </h4> 

I wanted to keep the space feel of the game, but with a mdoern twist. After some extensive searching, I settled on the current background GIF as I felt that it had a sort of retro/space feel. For the audio, I wanted to choose something that was inline with the design. I kept the sounds of the bullets and bombs similar to traditional sounds, however, added more modern space like music.

<h2> Wins and Blockers </h2>

<h3> Wins </h3>

 * Getting collision logic to work through 'if' statements
 * Adding the animation for the grid to shake when player is hit by bomb 
 * Ability to have multiple bullets on the grid at once
 * CSS design of the game and transition between game states 
 * Logic to lose the game if aliens reached the bottom - it was a challenge to stop both the aliens and the bombs from continuing to run once the aliens were off the grid. 

 
<h3> Blockers </h3> 

* Alien movement - ideally the aliens would move when they get to the edge of the game, similar to the traditional Space Invaders game.
* Clearing all my intervals to stop my code from running when elements were no longer in the grid.
* Chromes autoplay regulations - this stopped me from having the music on the game start page. 
* Resetting the game 


<h2> Future features </h2>

* Reset the board
* Different Levels
* Explosion animation when aliens are hit by player bullets
* A score board so player can track their progress
* Adding a second player 
* Bonus aliens that fly across the screen at set intervals s

<h2> What you have learned (tech & soft skills) </h2>

* Expanded my knowledge of functions and array methods 
* The importance of planning 
* Importance of patience when developing 
* The variety of things you can achieve with DOM Manipulation 

