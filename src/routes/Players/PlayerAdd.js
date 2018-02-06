import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Form, Input, Button, Card, Radio, Icon, Upload, Select } from 'antd'
import AV from 'leancloud-storage'
import { ACCOUNTS, LEVEL, PLAYERROLE } from '../../constants'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './Players.less'

const FormItem = Form.Item
const Option = Select.Option
const OptGroup = Select.OptGroup
let uuid = 0

@Form.create()
class PlayerAdd extends PureComponent {
  state = {
    loading: false,
    avatarUrl: ''
  }

  componentDidMount() {
    this.props.getHeroes()
  }

  handleUpload = ({ onSuccess, onError, file }) => {
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
  handleAvatarUploadChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      this.setState({
        avatarUrl: info.file.response.attributes.url,
        loading: false
      })
    }
  }

  remove = k => {
    const { form } = this.props
    // can use data-binding to get
    const keys = form.getFieldValue('accounts')
    // We need at least one passenger
    if (keys.length === 1) {
      return
    }

    // can use data-binding to set
    form.setFieldsValue({
      accounts: keys.filter(key => key !== k)
    })
  }

  add = () => {
    const { form } = this.props
    // can use data-binding to get
    const keys = form.getFieldValue('accounts')
    const nextKeys = keys.concat(uuid)
    uuid++
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      accounts: nextKeys
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.create({
          ...values,
          avatar: this.state.avatarUrl
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
      role,
      level,
      heroes,
      accounts
    } = this.props.player
    const { submitting } = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const avatarUrl = this.state.avatarUrl
    const heroOptions = []
    this.props.heroes.forEach(item => {
      heroOptions.push(
        <Option key={item.objectId} value={item.objectId}>
          {item.name}
        </Option>
      )
    })
    const accountOptions = []
    ACCOUNTS.forEach(item => {
      accountOptions.push(
        <Option key={item.type} value={item.name}>
          {item.name}
        </Option>
      )
    })
    const levelRadio = []
    LEVEL.forEach(item => {
      levelRadio.push(<Radio value={item.value}>{item.label}</Radio>)
    })
    const roleRadio = []
    PLAYERROLE.forEach(item => {
      roleRadio.push(<Radio value={item.value}>{item.label}</Radio>)
    })
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
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 }
      }
    }
    getFieldDecorator('accounts', { initialValue: accounts })
    const keys = getFieldValue('accounts')
    const formItems = keys.map((k, index) => {
      return (
        <FormItem {...formItemLayout} label="媒体账号" key={k}>
          {getFieldDecorator(`accountsValue[${k}]`, {})(
            <Input
              style={{ width: '90%' }}
              addonBefore={getFieldDecorator(`accountsType[${k}]`, {
                initialValue: 'twitter'
              })(<Select>{accountOptions}</Select>)}
            />
          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      )
    })
    return (
      <PageHeaderLayout title="新增选手">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
            className={styles.player}
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
            <FormItem {...formItemLayout} label="等级">
              <div>
                {getFieldDecorator('level', {
                  initialValue: level
                })(<Radio.Group>{levelRadio}</Radio.Group>)}
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="角色">
              <div>
                {getFieldDecorator('role', {
                  initialValue: role
                })(<Radio.Group>{roleRadio}</Radio.Group>)}
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="擅长英雄">
              {getFieldDecorator('heroes', {
                initialValue: heroes
              })(
                <Select mode="multiple" placeholder="请选择擅长英雄">
                  {heroOptions}
                </Select>
              )}
            </FormItem>
            {formItems}
            <FormItem {...formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={this.add}>
                <Icon type="plus" /> 新增媒体账号
              </Button>
            </FormItem>
            <FormItem {...formItemLayout} label="头像">
              <Upload
                name="avatar"
                accept="image/jpg,image/jpeg,image/png"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                onChange={this.handleAvatarUploadChange}
                customRequest={this.handleUpload}
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="" />
                ) : (
                  <div>
                    <Icon type={this.state.loading ? 'loading' : 'plus'} />
                    <div className="ant-upload-text">上传</div>
                  </div>
                )}
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
  const { players, heroes, loading } = state
  return {
    player: players.default,
    heroes: heroes.data.list,
    loading: loading.models.players
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    create: values => {
      dispatch({
        type: 'players/create',
        payload: values
      })
    },
    getHeroes: () => {
      dispatch({
        type: 'heroes/get'
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerAdd)
