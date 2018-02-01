import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Form, Input, Button, Card, Radio, Icon, Upload, Select } from 'antd'
import AV from 'leancloud-storage'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './Players.less'

const FormItem = Form.Item
const Option = Select.Option

@Form.create()
class PlayerAdd extends PureComponent {
  state = {
    loading: false,
    avatarUrl: '',
    heroes: []
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

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.create({
          ...values,
          avatar: this.state.avatarUrl,
          heroes: this.state.heroes
        })
      }
    })
  }

  handleHeroChange = value => {
    const heroes = []
    value.forEach(item => {
      const hero = this.props.heroes.filter(x => x.id === item)[0]
      heroes.push({
        id: hero.id,
        name: hero.name,
        avatar: hero.avatar
      })
    })
    this.setState({
      heroes
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
      heroes
    } = this.props.player
    const { submitting } = this.props
    const { getFieldDecorator } = this.props.form
    const avatarUrl = this.state.avatarUrl
    const heroOptions = []
    this.props.heroes.forEach(item => {
      heroOptions.push(
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      )
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
    return (
      <PageHeaderLayout title="新增选手">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
            className={styles.playerImg}
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
            <FormItem {...formItemLayout} label="擅长英雄">
              {getFieldDecorator('heroes', {
                initialValue: heroes
              })(
                <Select
                  mode="multiple"
                  placeholder="请选择擅长英雄"
                  onChange={this.handleHeroChange}
                >
                  {heroOptions}
                </Select>
              )}
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
        type: 'heroes/get',
        payload: {}
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerAdd)
