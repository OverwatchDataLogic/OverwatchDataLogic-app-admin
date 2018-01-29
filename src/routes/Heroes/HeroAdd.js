import React, { PureComponent } from 'react'
import { connect } from 'dva'
import {
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  Radio,
  Icon,
  Upload
} from 'antd'
import AV from 'leancloud-storage'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'

const FormItem = Form.Item
const { TextArea } = Input

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

@Form.create()
class HeroAdd extends PureComponent {
  state = {
    loading: false,
    isAvatarChanged: false
  }
  avatarUpload = ({ onSuccess, onError, file }) => {
    var newfile = new AV.File(file.name, file)
    newfile.save().then(
      function(res) {
        onSuccess(res)
      },
      function(error) {
        console.log(error)
      }
    )
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          avatarUrl: imageUrl,
          isAvatarChanged: true,
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
          type: 'heroes/create',
          payload: {
            ...values,
            avatar: this.state.isAvatarChanged
              ? this.state.avatarUrl
              : this.props.avatar
          }
        })
      }
    })
  }
  render() {
    const {
      name,
      description,
      health,
      armour,
      shield,
      real_name,
      age,
      height,
      profession,
      affiliation,
      base_of_operations,
      difficulty,
      role,
      avatar
    } = this.props.default
    const { submitting } = this.props
    const { getFieldDecorator } = this.props.form
    const avatarUrl = this.state.isAvatarChanged ? this.state.avatarUrl : avatar
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
            <FormItem {...formItemLayout} label="英雄名称">
              {getFieldDecorator('name', {
                initialValue: name,
                rules: [
                  {
                    required: true,
                    message: '请输入英雄名称'
                  }
                ]
              })(<Input placeholder="请输入英雄名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="英雄血量">
              {getFieldDecorator('health', {
                initialValue: health,
                rules: [
                  {
                    required: true,
                    message: '请输入英雄血量'
                  }
                ]
              })(<Input placeholder="请输入英雄血量" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="英雄护甲">
              {getFieldDecorator('armour', {
                initialValue: armour,
                rules: [
                  {
                    required: true,
                    message: '请输入英雄护甲'
                  }
                ]
              })(<Input placeholder="请输入英雄护甲" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="英雄护盾">
              {getFieldDecorator('shield', {
                initialValue: shield,
                rules: [
                  {
                    required: true,
                    message: '请输入英雄护盾'
                  }
                ]
              })(<Input placeholder="请输入英雄护盾" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="英雄全称">
              {getFieldDecorator('real_name', {
                initialValue: real_name
              })(<Input placeholder="请输入英雄全称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="英雄年龄">
              {getFieldDecorator('age', {
                initialValue: age
              })(<Input placeholder="请输入英雄年龄" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="英雄身高">
              {getFieldDecorator('height', {
                initialValue: height
              })(<Input placeholder="请输入英雄身高" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="职业">
              {getFieldDecorator('profession', {
                initialValue: profession
              })(<Input placeholder="职业" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="行动基地">
              {getFieldDecorator('base_of_operations', {
                initialValue: base_of_operations
              })(<Input placeholder="行动基地" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="隶属">
              {getFieldDecorator('affiliation', {
                initialValue: affiliation
              })(<Input placeholder="隶属" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="难度">
              {getFieldDecorator('difficulty', {
                initialValue: difficulty,
                rules: [
                  {
                    required: true,
                    message: '请输入英雄难度'
                  }
                ]
              })(<InputNumber placeholder="请输入" min={1} max={3} />)}
              <span>星</span>
            </FormItem>
            <FormItem {...formItemLayout} label="角色">
              <div>
                {getFieldDecorator('role', {
                  initialValue: role
                })(
                  <Radio.Group>
                    <Radio value="offense">突击</Radio>
                    <Radio value="deffense">防御</Radio>
                    <Radio value="tank">重装</Radio>
                    <Radio value="support">支援</Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="英雄介绍">
              {getFieldDecorator('description', {
                initialValue: description,
                rules: [
                  {
                    required: true,
                    message: '请输入英雄介绍'
                  }
                ]
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="请输入英雄介绍"
                  rows={6}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="头像">
              {getFieldDecorator('avatar', {
                initialValue: {
                  url: avatar
                }
              })(
                <Upload
                  name="avatar"
                  accept="image/jpg,image/jpeg,image/png"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={this.handleChange}
                  customRequest={this.avatarUpload}
                >
                  {avatarUrl ? <img src={avatarUrl} alt="" /> : uploadButton}
                </Upload>
              )}
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
  const { heroes, loading } = state
  return {
    default: heroes.default,
    loading: loading.models.heroes
  }
}

export default connect(mapStateToProps)(HeroAdd)