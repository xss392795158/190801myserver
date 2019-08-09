import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
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
    /* let r = new Test({domain: 'http://127.0.0.1:8088'});
    let param = {
      body: {
        "id": 0,
        "category": {
          "id": 0,
          "name": "string"
        },
        "name": "doggie",
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 0,
            "name": "string"
          }
        ],
        "status": "available"
      }
      // body: { name: '测试猫', color:'rainbow', sex:'f', age:3}
    }
    let rst = r.addPet(param).then((res) => {
      //res
      debugger
    }).catch(err => {
      // err
      debugger
    }) */
    // this.props.changeState && this.props.changeState();
    /* let url = 'http://127.0.0.1:8088/pet';
    let data = {
      "id": 0,
      "category": {
        "id": 0,
        "name": "string"
      },
      "name": "doggie",
      "photoUrls": [
        "string"
      ],
      "tags": [
        {
          "id": 0,
          "name": "string"
        }
      ],
      "status": "available"
    } */
  }
  render() {
    return (
      <div id="app">
        <div>im App!!</div>
        userName: {this.props.userName}<br/>
        projectName: {this.props.projectName}<br/>
        <Input placeholder="name" id="userName" />
        <Button type="primary" htmlType="button" onClick={this.changeState.bind(this)}>
          swagger操作猫
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
