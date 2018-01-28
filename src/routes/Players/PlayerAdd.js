import React, { PureComponent } from 'react'
import { connect } from 'dva'
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Card,
  Radio,
  Icon,
  Upload,
  message
} from 'antd'
import moment from 'moment'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const FormItem = Form.Item
const { RangePicker } = DatePicker
const { TextArea } = Input

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJPG && isLt2M
}

@Form.create()
class PlayerAdd extends PureComponent {
  state = {
    loading: false
  }
  handleLogoChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          logoUrl: imageUrl,
          loading: false
        })
      )
    }
  }
  handlePicChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          picUrl: imageUrl,
          loading: false
        })
      )
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'players/create',
          payload: values
        })
      }
    })
  }
  render() {
    const {
      name,
      familyName,
      givenName,
      nationality,
      homeLocation,
      role
    } = this.props.default
    const { submitting } = this.props
    const { getFieldDecorator } = this.props.form
    const headshotUrl = this.state.headshotUrl
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传</div>
      </div>
    )
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 }
      }
    }
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 }
      }
    }
    return (
      <PageHeaderLayout title="新增选手">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem {...formItemLayout} label="选手名称">
              {getFieldDecorator('name', {
                initialValue: name,
                rules: [
                  {
                    required: true,
                    message: '请输入选手名称'
                  }
                ]
              })(<Input placeholder="请输入选手名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="选手姓氏">
              {getFieldDecorator('familyName', {
                initialValue: familyName,
                rules: [
                  {
                    required: true,
                    message: '请输入选手姓氏'
                  }
                ]
              })(<Input placeholder="请输入选手姓氏" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="选手名字">
              {getFieldDecorator('givenName', {
                initialValue: givenName,
                rules: [
                  {
                    required: true,
                    message: '请输入选手名字'
                  }
                ]
              })(<Input placeholder="请输入选手名字" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="选手国籍">
              {getFieldDecorator('nationality', {
                initialValue: nationality,
                rules: [
                  {
                    required: true,
                    message: '请输入选手国籍'
                  }
                ]
              })(<Input placeholder="请输入选手国籍" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="选手家乡">
              {getFieldDecorator('homeLocation', {
                initialValue: homeLocation,
                rules: [
                  {
                    required: true,
                    message: '请输入选手家乡'
                  }
                ]
              })(<Input placeholder="请输入选手家乡" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="角色">
              <div>
                {getFieldDecorator('role', {
                  initialValue: role
                })(
                  <Radio.Group>
                    <Radio value="offense">突击</Radio>
                    <Radio value="tank">重装</Radio>
                    <Radio value="support">辅助</Radio>
                    <Radio value="flex">自由人</Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="头像">
              <Upload
                name="headshot"
                accept="image/jpg,image/jpeg,image/png"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="//jsonplaceholder.typicode.com/posts/"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {headshotUrl ? <img src={headshotUrl} alt="" /> : uploadButton}
              </Upload>
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { players, loading } = state
  return {
    default: players.default,
    loading: loading.models.players
  }
}

export default connect(mapStateToProps)(PlayerAdd)
