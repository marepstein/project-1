<h2> Game Overview </h2>  
Space Invaders is a classic arcade game, in which, the players aim is to shoot at an invading alien armada until there are no remaining aliens. The player can only move left or right. The aliens also move right, down and left at a set interval. The player also has to avoid the aliens bombs, which result in the reduction of a life. 

The aim is for the player to kill all aliens before they reach the player position, without being struck by three of alien bombs, leaving the player with 0 lives.  

![IMAGE of desktop 'SPACE INVADERS'](https://media.giphy.com/media/L1PwQfiDrKfstsSgqR/giphy.gif)

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

<h3> Creating and Moving Objects </h3>

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
My next goal was to create the alien movement functionality, which consists of the aliens moving across and down the screen automatically. This was the most challenging element of the game. Eventually, after some experimenting, I was able to recreate this feature through the use of setIntervals and setTimeouts, calling on three different move functions, which I quickly realised I needed to define the new position of the aliens and remove each alien from their previous position. 
		
<h3> Game functionlity </h3> 

<h4> Keypresses: </h4>

<h4> Collision (conditions): </h4>  

<h4> Audio: </h4> 

<h4> Bullets and bombs: </h4> 
		
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

