

// // const Main = observer(({timerStore}) => { <- like that
// // more like that really ->
class Test extends React.Component {
    render(){
        console.log(this.props.store)
    return (
      <View>
        <Text>hi</Text>
      </View>
    )}
  };


 export default createAutoSubscriber()(observer(Test));