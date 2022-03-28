//memory game
//steps
//provide 12 cards
//duplicate cards
//randomize display
//style selected cards
//two selections limit
//if 2 selected cards are equals determinate match
//in refresh page reset order card random
//styling delay
//style flip on guess   

//array of images
var cardsArray = [
    {    'name': 'CSS',    'img': 'https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true',  },
    {    'name': 'HTML',    'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true',  },
    {    'name': 'jQuery',    'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true',  },
    {    'name': 'JS',    'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true',  },
    {    'name': 'Node',    'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true',  },
    {    'name': 'Photo Shop',    'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true',  },
    {    'name': 'PHP',    'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true',  },
    {    'name': 'Python',    'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true',  },
    {    'name': 'Ruby',    'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true',  },
    {    'name': 'Sass',    'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true',  },
    {    'name': 'Sublime',    'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true',  },
    {    'name': 'Wordpress',    'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true',  },
];

//Duplicate cardsArray
var gameGrid = cardsArray.concat(cardsArray);

//randomize game grid on each load
gameGrid.sort(function() {
    return 0.5 - Math.random();
})

//var game->div with id game-board
var game = document.getElementById('game-board');

//var grid->will create a section div
var grid = document.createElement('section');

//give section element a class of grid
grid.setAttribute('class', 'grid');

//Append the grid section to the game-board div
game.appendChild(grid);

//loop through each item in pur card arrays
for(var i = 0; i < gameGrid.length; i++) {
    //create a div 
    var card = document.createElement('div');

    //add class card last div
    //card.setAttribute('class', 'card');
    card.classList.add('card')

    //Set the data-name -> dataset attribute of the div to the cardsArray name
    card.dataset.name = gameGrid[i].name;

    //create front card
    var front = document.createElement('div');
    front.classList.add('front');

    //creat back card
    var back = document.createElement('div');
    back.classList.add('back');
    //Apply the backgroundImage style of the div to the cardsArray image
    back.style.backgroundImage = `url(${gameGrid[i].img})`;

    //Append the div to the grid section
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
}

//set count to 0
var count = 0;

//prevent click over the firts target more that one time
var previousTarget = null;

//var for the guess
var firtsGuess = '';
var secondGuess = '';

//delay
var delay = 1200;

// Reset guesses after two attempts
var resetGuesses = function() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    for (i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');
    }
};

//Add match to CSS
var match = function() {
    var selected = document.querySelectorAll('.selected');

    //for loop the array that content selected
    for( i = 0; i < selected.length; i++) {
        selected[i].classList.add('match');
    }
}

//Add event listener to grid
grid.addEventListener('click', function(e) {
    //declared variable to target our clicked item
    var clicked = e.target;

    //not select grid div
    if (clicked.nodeName === 'SECTION' 
    || clicked === previousTarget 
    || clicked.parentNode.classList.contains('match')
    || clicked.parentNode.classList.contains('selected')) {
        return;
    }

    //We only want to add selected class if the current count  is less that 2
    if (count < 2) {
        count++;

        //Add selected class
        //clicked.classList.add('selected');
        if ( count === 1) {
            //assign firts guess
            firtsGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else {
            //assign second guess
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected')
        }
        //If both guesses are not empty
        if ( firtsGuess !== '' && secondGuess !== '') {
            //and the firtsGuess matches secondGuess
            if (firtsGuess === secondGuess) {
                //call the match function
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
            } else {
                setTimeout(resetGuesses, delay);
        } 
        }
        previousTarget = clicked;
    }
    

})