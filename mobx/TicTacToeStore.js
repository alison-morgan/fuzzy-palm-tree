import { observable, computed, action, decorate } from 'mobx';


export default class TicTacToeStore {
	//creating initial values for our store values
	constructor() {
		this._turn='X';
		this._size=3;
		this._squareSize=100;
		this._boardState= [... Array(this.size)].map(el => Array(this.size));
		this._result=null;
		this._opponent=null;
	}

	get turn(){
		return this._turn
	}

	setTurn(value){
		console.log('setting turn',value)
		this._turn=value
	}

	get size(){
		return this._size
	}

	setSize(value){
		this._size=value
	}

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
	
	get result(){
		return this._result
	}

	setResult(value){
		this._result=value
	}

	get squareSize(){
		return this._squareSize
	}

	setSquareSize(value){
		this._squareSize=value
	}
	get opponent(){
		return this._opponent
	}

	setOpponent(value){
		this._opponent=value
	}

	isWinner(y,x,input){

		let counter=0;
		//one diagnol
		if(x===y){
			while(this.boardState[counter][counter]===input){
				counter++;
				if(counter===this.size){
					this.setResult(`${input} won`);
					return 
				}
			}
		}
		counter=0;
		//another diagnol
		if((x+y)===this.size-1){
			while(this.boardState[counter][this.size-counter-1]===input){
				counter++;
				if(counter===this.size){
					this.setResult(`${input} won`);
					return 
				}
			}
		}
		counter=0;
		//checking row
		while(this.boardState[y][this.size-counter-1]===input){
			counter++;
			if(counter===this.size){
				this.setResult(`${input} won`);
				return 
			}
		}
		counter=0;
		//checking column
		while(this.boardState[this.size-counter-1][x]===input){
			counter++;
			if(counter===this.size){
				this.setResult(`${input} won`);
				return 
			}
		}
		if(this.boardState.includes(undefined)){
			this.setResult(`It's a tie`);
			return
		}
		return
	}

	AIAction=()=> {
		console.log('AIAction',this.turn)
		const x = this.getRandom(0, this.size-1);
		const y = this.getRandom(0, this.size-1)
		if(!this.boardState[y][x]){
			this.setBoardState(this.turn,y,x)
			this.setTurn('X')
		}else{
			this.AIAction()
		}
	}
	
	getRandom=(min, max)=> {
		return min + Math.floor(Math.random() * (max - min + 1));
	}
	getCenter=(num)=>{
		console.log('getting center',num)
		return num * this.squareSize+10;
	}
	reset = () => {
		console.log('resetting',this.size);
		const cleanBoard=[ ... Array(this.size)].map(el => Array(this.size));
		this.setResult(null)
		this.setBoardState(cleanBoard);
		this.setTurn(this.turn==='X'?'O':'X');
	}

}
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