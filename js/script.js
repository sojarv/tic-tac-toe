const Board = (() => { // Module board

    const one = 'X'
    const two = 'O'
    var _pTurn
    var _winnerPos
    var _squares = document.getElementsByClassName('square');

    const _xBoard = ['', '', '', // board for X
        '', '', '',
        '', '', ''
    ]

    const _oBoard = ['', '', '', // board for X
        '', '', '',
        '', '', ''
    ]

    const _board = ['', '', '', // board for every move
        '', '', '',
        '', '', ''
    ]

    const _turn = () => { // deciding which player have the turn
        var numX = _board.filter(x => x === '').length;
        (numX % 2 == 0) ? _pTurn = two: _pTurn = one;
    }

    var ai = [0, 1, 2, 3, 4, 5, 6, 7, 8] // options for ai (not yet included)

    const winnerCombinations = [ //  winner combinatons
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]

    const _checkWinner = () => { // check is there is a winning combination already in
        x = _xBoard.filter(x => x != '') //removes all empty slots for both symbols
        o = _oBoard.filter(o => o != '')

        var allX = _subarray(x) // makes subarrays for both symbols
        var allO = _subarray(o)

        const _isIn = (element) => JSON.stringify(winnerCombinations).includes(element); // checks if element from a subarry is in winning combination
        const _whichElements = () => {
            if (allX.some(_isIn)) return (allX.filter(v => JSON.stringify(winnerCombinations).includes(v))) // if it is in X, returns it 
            else return (allO.filter(v => JSON.stringify(winnerCombinations).includes(v))) // else is in O
        }

        if ((allX.some(_isIn) || allO.some(_isIn))) {
            _winnerPos = _whichElements() // if there exsists a winning combination, store it in _winnerPos
            return true
        } else false

    }

    const _subarray = (arr) => { // computes all subarrays from an array and returns only those of length 3
        var subs = []
        for (var i = 0, n = Math.pow(2, arr.length); i < n; ++i) {
            var sub = [];
            for (var j = 0; j < arr.length; ++j) {
                if (((i >> j) & 1) == 1) sub.push(arr[j]);
            }
            if (sub.length == 3) subs.push(sub);
        }
        return subs;
    }

    const _changeBoard = id => { // changes  _board array and then displays it
        _turn()
        _board[id] = _pTurn;
        (_pTurn == one) ? _xBoard[id] = id + 1: _oBoard[id] = id + 1

        ai = []

        for (var i = 1; i < _board.length + 1; i++) {
            if (_board[i - 1] == '') {
                ai.push(i - 1)
            }
        }

        _displayBoard()
    }

    const _displayBoard = () => { // displays the board and checks if there exsists a winner
        for (var i = 1; i < _board.length + 1; i++) {
            document.getElementById(i).innerHTML = _board[i - 1]
        }
        if (_checkWinner() || ai.length == 0) {
            _endGame()
        }
    }

    const _endGame = () => { // when the game is over
        for (var i = 0; i < _squares.length; i++) {
            _squares[i].removeEventListener('click', _changeValue)
        }
        if (ai.length == 0) { // if all fields are full
            if (_checkWinner()) setTimeout(function() { alert('The winner is ' + _pTurn) }, 200) // if there is a winner in last turn
            else setTimeout(function() { alert('It\'s a tie!') }, 200) // else is a tie
        } else {
            for (var i = 0; i < _winnerPos[0].length; i++) { // if there is a winner before last turn, color those fields green and alert user
                document.getElementById(_winnerPos[0][i]).style.backgroundColor = '#BFD7B5'
            }
            setTimeout(function() { alert('The winner is ' + _pTurn) }, 200)
        }

        // removes all style from button, and sets a new one. And adds an event listener
        document.getElementById('restart').classList = []
        document.getElementById('restart').style = ''
        document.getElementById('restart').className = 'restartShow'
        document.getElementById('again').className = 'againButton'
        document.getElementById('again').addEventListener('click', newGame)
    }

    const _changeValue = e => { // gets an id from the event listener, on which field the user clicked 
        if (e.srcElement.innerHTML == '') {
            idChanged = e.srcElement.id - 1
            _changeBoard(idChanged)
        }
    }

    const newGame = () => { // function for new game
        ai = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        document.getElementById('restart').style.display = 'none' // hides the restart button

        // empties all three board arrays for new game
        _board.forEach(function(part, index) {
            this[index] = '';
        }, _board);

        _xBoard.forEach(function(part, index) {
            this[index] = '';
        }, _xBoard);

        _oBoard.forEach(function(part, index) {
            this[index] = '';
        }, _oBoard);

        _displayBoard() // displays board

        for (var i = 0; i < _squares.length; i++) { // makes all fields white
            _squares[i].addEventListener('click', _changeValue);
            document.getElementById(i + 1).style.backgroundColor = 'white'
        }
    }

    return { newGame } // only public option is newGame

})();

Board.newGame() // start the new game