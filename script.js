var game = null;

addListeners();

function addListeners() {
	var cells = document.querySelectorAll('.cell')
	for(var i = 0; i < cells.length; i++) {
		cells[i].addEventListener('click', onCellClick);
	}
}

function onNewGameClick(event) {
	game = new Game()
}

function onCellClick(event) {
	if (!game) {
		alert('You must start a new game first')
	} else {
		game.cellClicked(event.target)
	}
}

function Game() {
	this.humanWon = false;
	this.computerWon = false;
	this.isDraw = false;
	this.cells = ['', '', '', '', '', '', '', '', ''];
	
	this.clearBoard = function() {
		var cells = document.querySelectorAll('.cell')
		for(var i = 0; i < cells.length; i++) {
			cells[i].innerHTML = '';
		}
	}

	this.clearBoard();
	
	this.cellClicked = function(element) {

		// make sure nobody has already won
		if(this.humanWon || this.computerWon) {
			alert('Game is already over') 
			return
		} 

		// make sure it's not already marked
		if(this.cells[element.id] !== '') {
			alert('Cell already marked') 
			return
		} 
		
		// mark cell in array and html
		this.cells[element.id] = 'X';
		element.innerHTML = 'X';
		// check for human win
		if(this.checkForWin('X')) {
			this.humanWon = true;
			alert('You Won!') 
			return;
		}
		
    // check for draw
    this.checkForDraw();
		if(this.checkForDraw()) {
			this.isDraw = true;
			alert('Game is a draw!') 
			return;
		}
    
    
    // make computer's move
    this.makeMove();
    
		// check for computer win
		if(this.checkForWin('O')) {
			this.computerWon = true;
			alert('You Lost!') 
			return; 
		} 
    
    // check for draw
		if(this.checkForDraw()) {
			this.isDraw = true;
			alert('Game is a draw!') 
			return;
		}
	}
	
	this.makeMove = function() {
		var blankIndexes = []
  	for(var i = 0; i < this.cells.length; i++) {
  		if(this.cells[i] === '') {
  			blankIndexes.push(i);
  		}
  	}

		var randomBlankIndex = Math.floor( Math.random() * blankIndexes.length)
		var cellIndex = blankIndexes[randomBlankIndex]
		this.cells[cellIndex] = 'O';
		var cell = document.getElementById(cellIndex)
		cell.innerHTML = 'O';
	}

  this.checkForDraw = function() {
  	for(var i = 0; i < this.cells.length; i++) {
  		if(this.cells[i] === '') {
  			return false;
  		}
  	}
  	return true;
	}
	
	this.checkForWin = function(mark) {
		var wins = [
			[0,1,2],
			[3,4,5],
			[6,7,8],
			[0,3,6],
			[1,4,7],
			[2,5,8],
			[0,4,8],
			[2,4,6]
		]
		
		for(var i=0; i<wins.length; i++) {
			if( this.checkWinCells(wins[i], mark) ) {
				return true;
			}
		}
		return false;
	}
	
	this.checkWinCells = function(indexes, mark) {
		for(var i = 0; i < indexes.length; i++) {
			var cellIndex = indexes[i];
			if(this.cells[cellIndex] !== mark) {
				return false;
			}
		}
		return true;
	}
}

