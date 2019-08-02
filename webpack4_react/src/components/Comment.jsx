import React from 'react'
import { Form, Input } from 'antd';
import './style.scss'


class Comment extends React.Component{
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    
    return (
      <div className="myForm">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              placeholder="Username"
            />,
          )}
          </Form.Item>
        </Form>
      </div>
    )
  }
}
const WrappedComment = Form.create({ name: 'horizontal_login' })(Comment);
export default WrappedComment;
