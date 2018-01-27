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
class SportAdd extends PureComponent {
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
          type: 'sports/create',
          payload: values
        })
      }
    })
  }
  render() {
    const {
      title,
      abbreviatedTitle,
      englishTitle,
      description,
      startDate,
      endDate,
      prize,
      status
    } = this.props.default
    const { submitting } = this.props
    const { getFieldDecorator } = this.props.form
    const logoUrl = this.state.logoUrl
    const picUrl = this.state.picUrl
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
      <PageHeaderLayout title="新增赛事">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem {...formItemLayout} label="赛事名称">
              {getFieldDecorator('title', {
                initialValue: title,
                rules: [
                  {
                    required: true,
                    message: '请输入赛事名称'
                  }
                ]
              })(<Input placeholder="请输入赛事名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="赛事简称">
              {getFieldDecorator('abbreviatedTitle', {
                initialValue: abbreviatedTitle,
                rules: [
                  {
                    required: true,
                    message: '请输入赛事简称'
                  }
                ]
              })(<Input placeholder="请输入赛事简称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="赛事英文名称">
              {getFieldDecorator('englishTitle', {
                initialValue: englishTitle,
                rules: [
                  {
                    required: true,
                    message: '请输入赛事英文名称'
                  }
                ]
              })(<Input placeholder="请输入赛事英文名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="赛事奖金">
              {getFieldDecorator('prize', {
                initialValue: prize,
                rules: [
                  {
                    required: true,
                    message: '请输入赛事奖金'
                  }
                ]
              })(<InputNumber placeholder="请输入" min={0} max={10000} />)}
              <span>万</span>
            </FormItem>
            <FormItem {...formItemLayout} label="赛事介绍">
              {getFieldDecorator('description', {
                initialValue: description,
                rules: [
                  {
                    required: true,
                    message: '请输入赛事介绍'
                  }
                ]
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="请输入赛事介绍"
                  rows={6}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="起止日期">
              {getFieldDecorator('date', {
                initialValue: [
                  moment(startDate, 'YYYY-MM-DD'),
                  moment(endDate, 'YYYY-MM-DD')
                ],
                rules: [
                  {
                    required: true,
                    message: '请选择起止日期'
                  }
                ]
              })(
                <RangePicker
                  style={{ width: '100%' }}
                  placeholder={['开始日期', '结束日期']}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="状态">
              <div>
                {getFieldDecorator('status', {
                  initialValue: status
                })(
                  <Radio.Group>
                    <Radio value="PENDING">未开始</Radio>
                    <Radio value="LIVING">进行中</Radio>
                    <Radio value="CONCLUDED">已结束</Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="LOGO">
              <Upload
                name="logo"
                accept="image/jpg,image/jpeg,image/png"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="//jsonplaceholder.typicode.com/posts/"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {logoUrl ? <img src={logoUrl} alt="" /> : uploadButton}
              </Upload>
            </FormItem>
            <FormItem {...formItemLayout} label="海报">
              <Upload
                name="pic"
                accept="image/jpg,image/jpeg,image/png"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="//jsonplaceholder.typicode.com/posts/"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
              >
                {picUrl ? <img src={picUrl} alt="" /> : uploadButton}
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
  const { sports, loading } = state
  return {
    default: sports.default,
    loading: loading.models.sports
  }
}

export default connect(mapStateToProps)(SportAdd)
