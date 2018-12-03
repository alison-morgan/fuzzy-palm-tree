import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import SmallCircle from '../../components/tictactoe/SmallCircle';
import SmallCross from '../../components/tictactoe/SmallCross';
import MedCross from '../../components/tictactoe/MedCross';
import MedCircle from '../../components/tictactoe/MedCircle';
import LargeCircle from '../../components/tictactoe/LargeCircle';
import LargeCross from '../../components/tictactoe/LargeCross';
import SmallBoard from './SmallBoard';
import MedBoard from './MedBoard';
import LargeBoard from './LargeBoard';
import {AREAS, CONDITIONS, GAME_RESULT_NO, GAME_RESULT_USER, GAME_RESULT_AI, GAME_RESULT_TIE, CENTER_POINTS } from '../../components/tictactoe/Constants';
import PromptArea from './PromptArea';
export default class TicTacComp extends React.Component{

    constructor(){
        super()
        this.state= {
        AIInputs: [],
        userInputs: [],
        result: GAME_RESULT_NO,
        round: 0,
        board: '',
        cross: '',
        circle: ''
        }
    }      

    componentWillMount() {
        if(this.props.board.small === true) {
            console.log('small')
            this.state.board = <SmallBoard/>
            this.state.cross = <SmallCross/>
            this.state.circle = <SmallCircle/>
        } else if (this.props.board.med === true) {
            console.log('med')
            this.state.board = <MedBoard/>
            this.state.cross = <MedCross/>
            this.state.circle = <MedCircle/>
        } else if (this.props.board.large === true) {
            console.log('large')
            this.state.board = <LargeBoard/>
            this.state.cross = <LargeCross/>
            this.state.circle = <LargeCircle/>
        }
    }

    restart() {
        const { round } = this.state
        this.setState({
            AIInputs: [],
            userInputs: [],
            result: GAME_RESULT_NO,
            round: round + 1
        })
        setTimeout(() => {
            if (round % 2 === 0) {
                this.AIAction()
            }
        }, 10)
    }

    boardClickHandler(e) {
        function allInputs() {
        return e !== area.id
        }
        const { locationX, locationY } = e.nativeEvent
        console.log(locationX,locationY)
        const { userInputs, AIInputs, result } = this.state
        if (result !== -1) {
            return
        }
        const inputs = userInputs.concat(AIInputs)

        const area = AREAS.find(e => 
            (locationX >= e.startX && locationX <= e.endX) &&
            (locationY >= e.startY && locationY <= e.endY))

            if (area && inputs.every(allInputs)) {
                console.log(locationX, locationY)
                console.log('locationX', 'locationY')
                this.setState({ userInputs: userInputs.concat(area.id) })
                setTimeout(() => {
                    this.judgeWinner()
                    this.AIAction()
                }, 5)
            }
    }

    AIAction() {
        const { userInputs, AIInputs, result } = this.state
        if (result !== -1) {
            return 
        }
        while(true) {
            const inputs = userInputs.concat(AIInputs)
            const randomNumber = Math.round(Math.random() * 8.3)
            if (inputs.every(e => e !== randomNumber)) {
                this.setState({ AIInputs: AIInputs.concat(randomNumber) })
                this.judgeWinner()
                break
            }
        }
    }

    componentDidMount(){
        this.restart()
    }

    isWinner(inputs) {
        return CONDITIONS.some(d => d.every(item => inputs.indexOf(item) !== -1))
      }

    judgeWinner() {
        const { userInputs, AIInputs, result } = this.state
        const inputs = userInputs.concat(AIInputs)
        if (inputs.length >= 5) {
            let res;
            console.log(result, "result")
            console.log(GAME_RESULT_USER, "GAME USER")
            console.log(GAME_RESULT_AI, 'GAME AI')
            res = this.isWinner(userInputs)
            if (res && result !== GAME_RESULT_USER) {
                console.log(res, "in if")
                return this.setState({ result: GAME_RESULT_USER })
            }
            res = this.isWinner(AIInputs)
            if (res && result !== GAME_RESULT_AI) {
                console.log(res, "in else")
                return this.setState({ result: GAME_RESULT_AI })
            }
        }

        if (inputs.length === 9 &&
                result === GAME_RESULT_NO &&
                    result !== GAME_RESULT_TIE) {
                        this.setState({
                            result: GAME_RESULT_TIE
                        })
                    }
    }

    render(){
        const { userInputs, AIInputs, result, board, cross, circle } = this.state;
        return(
            <TouchableOpacity onPress={(e) => this.boardClickHandler(e)}>
                <View style={styles.container}> 
                    <View style={styles.board} >
                    {board}
                        {
                            userInputs.map((e, i) => (
                                // {circle}
                                //have to find out how to make this component respond to state change
                                    <SmallCircle
                                    key={i}
                                    xTranslate={CENTER_POINTS[e].x}
                                    yTranslate={CENTER_POINTS[e].y}
                                    color='black'
                                />
                            ))
                        }
                        {
                            AIInputs.map((e, i) => (
                                // {cross}
                                //have to find out how to make this component respond to state change
                                <SmallCross
                                    key={i}
                                    xTranslate={CENTER_POINTS[e].x}
                                    yTranslate={CENTER_POINTS[e].y}
                                />
                            ))
                        }
                    </View>
                <PromptArea result={result} onRestart={() => this.restart()} />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: '80%',
        alignItems: 'center'
    },
    board: {
        borderWidth: 3,
        height: 300,
        width: 300
    },
    lines: {
        backgroundColor: '#000',
        height: 295,
        width: 3, 
        position: 'absolute'
    }
})
