/*
 * @Descripttion: 
 * @version: 
 * @Author: xushanshan
 * @Date: 2019-08-02 15:25:24
 * @LastEditors: xushanshan
 * @LastEditTime: 2019-08-06 18:05:25
 */
import React from 'react'
import { connect } from 'react-redux';
import { Result, Button } from 'antd';

class MyResult extends React.Component{
  state = {
    
  };
  hideResult(){
    this.props.showResult && this.props.showResult();
  }
  render() {

    return (
      <div className="result-panel">
        {this.props.status == 1?<Result
              status="success"
              title="Successfully!"
              subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
              extra={[
                // <Button type="primary" key="console">
                //   Go Console
                // </Button>,
                <Button key="buy" onClick={this.hideResult.bind(this)}>OK</Button>,
              ]}
            />:<Result
            status="error"
            title="Submission Failed"
            subTitle="Please check and modify the following information before resubmitting."
            extra={[
              // <Button type="primary" key="console">
              //   Go Console
              // </Button>,
              <Button key="buy" onClick={this.hideResult.bind(this)}>Close</Button>,
            ]}
        />}
      </div>
    )
  }
}

function showResult() {
  return {
    type: 'TOGGLE_RESULT',
    show: false,
    status: null
  }
}
// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    show: state.global.show,
    status: state.global.status,
    // projectName: state.project.name,
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    showResult: () => {
      dispatch(showResult())
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyResult);
