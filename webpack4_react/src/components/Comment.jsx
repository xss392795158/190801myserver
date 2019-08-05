/*
 * @Descripttion: 
 * @version: 
 * @Author: xushanshan
 * @Date: 2019-08-02 15:25:24
 * @LastEditors: xushanshan
 * @LastEditTime: 2019-08-05 17:32:07
 */
import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { Table, Divider, Tag, Result, Form, Input, Button } from 'antd';
import './style.scss'

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
  },
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: tags => (
  //     <span>
  //       {tags.map(tag => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </span>
  //   ),
  // },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (text, record) => (
  //     <span>
  //       <a href="javascript:;">Invite {record.name}</a>
  //       <Divider type="vertical" />
  //       <a href="javascript:;">Delete</a>
  //     </span>
  //   ),
  // },
];

/* const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]; */

class Comment extends React.Component{
  state = {
      repoName:'',
      repoUrl:'',
      getRst: false,
      rstStatus: null,
      catsList: []
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
              this.setState({getRst: true, rstStatus: 1})
            } else {
              this.setState({getRst: true, rstStatus: 0})
            }
        });
      }
    });
  };
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
        <Table columns={columns} dataSource={this.state.catsList} />
        {this.state.getRst && (this.state.rstStatus == 1?<Result
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
        />)}
      </div>
    )
  }
}
const WrappedComment = Form.create({ name: 'horizontal_login' })(Comment);
export default WrappedComment;
