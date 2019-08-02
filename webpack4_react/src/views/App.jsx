import React from 'react'
import ReactDOM from 'react-dom'
import WrappedComment from '../components/Comment.jsx'

class App extends React.Component{
  render() {
    return (
      <div>
        <div>im App!!</div>
        <WrappedComment></WrappedComment>
      </div>
    )
  }
}

export default App;
