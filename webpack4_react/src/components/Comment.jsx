/*
 * @Descripttion: 
 * @version: 
 * @Author: xushanshan
 * @Date: 2019-08-02 15:25:24
 * @LastEditors: xushanshan
 * @LastEditTime: 2019-08-06 18:05:20
 */
import React from 'react'
import { connect } from 'react-redux';
import axios from 'axios'
import moment from 'moment'
import { Table, Divider, Tag, Result, Form, Input, Button } from 'antd';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
// const OPTIONS = {
//   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
// }
const OPTIONS = {
  headers: {'Content-Type': 'application/json;charset=utf-8'}
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Color',
    dataIndex: 'color',
    key: 'color',
  },
  {
    title: 'Sex',
    dataIndex: 'sex',
    key: 'sex',
  },
  {
    title: 'CreateTime',
    dataIndex: 'createTime',
    key: 'createTime',
    render: createTime => (
      <span>
        {moment(createTime).format('YYYY-MM-DD HH:mm:ss')}
      </span>
    )
  }
];

class Comment extends React.Component{
  state = {
      repoName:'',
      repoUrl:'',
      getRst: false,
      rstStatus: null,
      catsList: [],
  };
  componentDidMount(){
    this.initTable()
  }
  initTable() {
    const url = `http://127.0.0.1:8088/cat/list`;
    let data = {};
    let promise = axios.post(url, data, OPTIONS);

    promise.then(response=>{
      console.log(response);
      const result = response.data;
        // const {xing,ming} = result;
        
      this.setState({
        catsList: result.list
      })
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        // const url = `https://api.github.com/search/repositories?q=r&sort=stars`;
        const url = `http://127.0.0.1:8088/process_get?first_name=xu&last_name=shanshan`;
        // const url = `my_test`;
        let promise = axios.get(url);
        promise.then(response=>{
            console.log(response);
            const result = response.data;
            const {xing,ming} = result;
            
            this.setState({
                repoName:xing,
                repoUrl:ming
            })
        });
      }
    });
  };
  handleSubmitPost = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // const url = `https://api.github.com/search/repositories?q=r&sort=stars`;
        // const url = `http://127.0.0.1:8088/process_post`;//?first_name=xu&last_name=shanshan
        const url = `http://127.0.0.1:8088/cat/add`;
        // const url = `my_test`;
        let { name, color, sex, age} = values;
        let data = {name, color, sex, age};
        let promise = axios.post(url, data, OPTIONS);
        promise.then(response=>{
            console.log(response);
            const data = response.data;
            // const {xingPost,mingPost} = result;
            if(data.code == 200) {
              this.showResult(true);
              // this.setState({getRst: true, rstStatus: 1})
            } else {
              this.showResult();
              // this.setState({getRst: true, rstStatus: 0})
            }
        });
      }
    });
  };
  showResult(rst) {
    if(this.props.showResult) {
      this.props.showResult(rst);
    }
  }
  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    
    return (
      <div className="myForm">
        <Form className="login-form">
          <Form.Item label="name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!' }],
          })(
            <Input
              placeholder="name"
            />,
          )}
          </Form.Item>
          <Form.Item label="color">
          {getFieldDecorator('color', {
            rules: [{ required: true, message: 'Please input your color!' }],
          })(
            <Input
              placeholder="color"
            />,
          )}
          </Form.Item>
          <Form.Item label="sex" help="Should be 'F' or 'M'">
          {getFieldDecorator('sex', {
            rules: [{ required: true, message: 'Please input your sex!' }],
          })(
            <Input
              placeholder="sex"
            />,
          )}
          </Form.Item>
          <Form.Item label="age" help="Should be numbers">
          {getFieldDecorator('age', {
            rules: [{ required: true, message: 'Please input your age!' }],
          })(
            <Input
              placeholder="age"
            />,
          )}
          </Form.Item>
          <Form.Item>
            {/* <Button type="primary" htmlType="button" onClick={this.handleSubmit} disabled={hasErrors(getFieldsError())}>
              Log in GET
            </Button> */}
            <Button type="primary" htmlType="button" onClick={this.handleSubmitPost} disabled={hasErrors(getFieldsError())}>
              Add我的🐱
            </Button>
          </Form.Item>
        </Form>
        <Button type="primary" htmlType="button" onClick={this.initTable.bind(this)}>
          获取list
        </Button>
        userName: {this.props.userName}<br/>
        projectName: {this.props.projectName}
        <Button type="primary" htmlType="button" onClick={this.showResult.bind(this)}>
          切换projectName
        </Button>
        <Table columns={columns} dataSource={this.state.catsList} rowKey='_id' />
        {/* this.state.getRst && (this.state.rstStatus == 1?<Result
              status="success"
              title="Successfully!"
              subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
              extra={[
                <Button type="primary" key="console">
                  Go Console
                </Button>,
                <Button key="buy">Buy Again</Button>,
              ]}
            />:<Result
            status="error"
            title="Submission Failed"
            subTitle="Please check and modify the following information before resubmitting."
            extra={[
              <Button type="primary" key="console">
                Go Console
              </Button>,
              <Button key="buy">Buy Again</Button>,
            ]}
        />) */}
      </div>
    )
  }
}
const WrappedComment = Form.create({ name: 'horizontal_login' })(Comment);

function showResult(rst) {
  return {
    type: 'TOGGLE_RESULT',
    show: true,
    status: rst?1:0
  }
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    show: state.global.show,
      // projectName: state.project.name,
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    showResult: (rst) => {
      dispatch(showResult(rst))
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedComment);

// export default WrappedComment;
