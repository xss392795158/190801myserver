import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import WrappedComment from '../components/Comment.jsx'
import MyResult from '../components/MyResult.jsx'
import { Input, Button } from 'antd';
import '../assets/style/index.scss'

// console.log(store.getState());
// store.subscribe(function() {
//   render()
// })

// function render(state = store.getState()) {
//   var $userName = document.getElementById('userName')
//   $userName.innerHTML = state.user.name
// }

class App extends React.Component{
  changeState() {
    this.props.changeState && this.props.changeState();
  }
  render() {
    return (
      <div id="app">
        <div>im App!!</div>
        userName: {this.props.userName}<br/>
        projectName: {this.props.projectName}<br/>
        <Input placeholder="name" id="userName" />
        <Button type="primary" htmlType="button" onClick={this.changeState.bind(this)}>
          APP操作UserName
        </Button>
        <WrappedComment></WrappedComment>
        {this.props.show?<MyResult></MyResult>:null}
      </div>
    )
  }
}

/* var simpleReducer = function(state = {}, action) {
  return {
    user: {
      name: 'redux'
    }
  }
}

var store = createStore(simpleReducer)
console.log(store.getState()) */

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    show: state.global.show,
    userName: state.user.name,
    projectName: state.project.name,
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    // changeState: () => {
    //   dispatch({
    //     type: 'CHANGE_USER_NAME',
    //     name: 'xssTest'
    //   })
    // }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
// export default App;
