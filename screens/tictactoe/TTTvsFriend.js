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
import {AREAS, CONDITIONS, GAME_RESULT_NO, GAME_RESULT_USER1, GAME_RESULT_USER2, GAME_RESULT_TIE, CENTER_POINTS } from '../../components/tictactoe/Constants';
import PromptArea from './PromptArea';

export default class TicTacFriend extends React.Component{

    constructor(){
        super()
        this.state= {
        user2Inputs: [],
        userInputs: [],
        result: GAME_RESULT_NO,
        round: 0,
        player1Turn: true,
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
            user2Inputs: [],
            userInputs: [],
            result: GAME_RESULT_NO,
            round: round + 1
        })
    }

    boardClickHandler(e) {
        function allInputs() {
        return e !== area.id
        }
        const { locationX, locationY } = e.nativeEvent
        const { userInputs, user2Inputs, result, player1Turn } = this.state
        if (result !== -1) {
            return
        }
        const inputs = userInputs.concat(user2Inputs)

        const area = AREAS.find(e => 
            (locationX >= e.startX && locationX <= e.endX) &&
            (locationY >= e.startY && locationY <= e.endY))

            if (player1Turn === true) {
                if (area && inputs.every(allInputs)) {
                    this.setState({ userInputs: userInputs.concat(area.id) })
                    setTimeout(() => {
                        this.judgeWinner()
                        this.setState({ player1Turn: false})
                    }, 5)
                }
            } else {
                if (area && inputs.every(allInputs)) {
                    this.setState({ user2Inputs: user2Inputs.concat(area.id) })
                    setTimeout(() => {
                        this.judgeWinner()
                        this.setState({ player1Turn: true})
                    }, 5)
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
        const { userInputs, user2Inputs, result } = this.state
        const inputs = userInputs.concat(user2Inputs)
        if (inputs.length >= 5) {
            let res;
            res = this.isWinner(userInputs)
            if (res && result !== GAME_RESULT_USER1) {
                return this.setState({ result: GAME_RESULT_USER1 })
            }
            res = this.isWinner(user2Inputs)
            if (res && result !== GAME_RESULT_USER2) {
                return this.setState({ result: GAME_RESULT_USER2 })
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
        const { userInputs, user2Inputs, result, board, circle, cross } = this.state;
        return(
            <TouchableOpacity onPress={(e) => this.boardClickHandler(e)}>
                <View style={styles.container}> 
                    <View style={styles.board} >
                        {board}
                        {
                            userInputs.map((e, i) => (
                                <SmallCircle
                                    key={i}
                                    xTranslate={CENTER_POINTS[e].x}
                                    yTranslate={CENTER_POINTS[e].y}
                                    color='black'
                                />
                            ))
                        }
                        {
                            user2Inputs.map((e, i) => (
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
