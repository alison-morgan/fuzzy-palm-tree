import { observable, computed, action, decorate } from 'mobx';


export default class TicTacToeStore {
	//creating initial values for our store values
	constructor() {
		this._turn='X';
		this._size=null;
		this._squareSize=null;
		this._boardState=null;
		this._result=null;
		this._opponent=null;
	}

	//getter/computed for players turn
	get turn(){
		return this._turn
	}

	setTurn(value){
		this._turn=value
	}

	//getter/computed for board size
	get size(){
		return this._size
	}

	setSize(value){
		this._size=value
	}

	//getter/computed for boardState array
	get boardState(){
		return this._boardState
	}

	setBoardState(value,y=null,x=null){
		if(y===null && x===null){
			this._boardState=value
		}else{
			this._boardState[y][x]=value
		}
	}
	
	//getter/computed for result variable
	get result(){
		return this._result
	}

	setResult(value){
		this._result=value
	}

	//getter/computed for squareSize inside the board 
	get squareSize(){
		return this._squareSize
	}

	setSquareSize(value){
		this._squareSize=value
	}

	//getter/computed for opponent variable
	get opponent(){
		return this._opponent
	}

	setOpponent(value){
		this._opponent=value
	}

	//function that checks if winner exist
	isWinner(y,x){
		let counter=0;
		//left diagnol
		if(x===y){
			while(counter<this.size && this.boardState[counter][counter]===this.turn){
				counter++;
				if(counter===this.size){
					this.setResult(`${this.turn} won!!!`);
					return 
				}
			}
		}
		counter=0;
		//right diagnol
		if((x+y)===this.size-1){
			while(counter<this.size && this.boardState[counter][this.size-counter-1]===this.turn){
				counter++;
				if(counter===this.size){
					this.setResult(`${this.turn} won!!!`);
					return 
				}
			}
		}
		counter=0;
		//checking row
		while(counter<this.size && this.boardState[y][this.size-counter-1]===this.turn){
			counter++;
			if(counter===this.size){
				this.setResult(`${this.turn} won!!!`);
				return 
			}
		}
		counter=0;
		//checking column
		while(counter<this.size && this.boardState[this.size-counter-1][x]===this.turn){
			counter++;
			if(counter===this.size){
				this.setResult(`${this.turn} won!!!`);
				return 
			}
		}
		//check for empty squares on the board
		const isTie = !this.boardState.find(subArr=>
			subArr.includes(1)
		)

		//if no empty squares available
		if(isTie){
			this.setResult(`It's a tie.`);
		}
		return
	}

	//functionality for AI
	AIAction=()=> {
		//generate random coordinates
		const x = this.getRandom(0, this.size-1);
		const y = this.getRandom(0, this.size-1)
		//check is square with those coordinates is available
		if(this.boardState[y][x]===1){
			//AI makes move
			this.setBoardState(this.turn,y,x)
			//check for winning combination
			this.isWinner(y,x);
			//if there is no winning combination
			if(this.result===null){
				//pass turn
				this.setTurn(this.turn==='X'?'O':'X')
			}
		//if square already occupied	
		}else{
			//make AI generate new coordinates
			this.AIAction()
		}
	}

	//random coordinate generator
	getRandom=(min, max)=> {
		return min + Math.floor(Math.random() * (max - min + 1));
	}

	//get coordinate where to start drawing cross/circle
	getCenter=(num)=>{
		return num * this.squareSize + 10;
	}

	//reset boardState for the new game
	reset = () => {
		const cleanBoard=[... Array(this.size)].map(el => Array(this.size).fill(1));
		this.setResult(null)
		this.setBoardState(cleanBoard);
		this.setTurn(this.turn==='X'?'O':'X');
	}
}

//assign decorators to the TicTacToeStore
decorate( TicTacToeStore, {
	_boardState:observable,
	_size:observable,
	_turn:observable,
	_result:observable,
	_squareSize:observable,
	_opponent:observable,
	boardState: computed,
	setBoardState:action,
	turn:computed,
	setTurn:action,
	size:computed,
	setSize:action,
	result:computed,
	setResult:action,
	squareSize:computed,
	setSquareSize:action,
	opponent:computed,
	setOpponent:action
} )