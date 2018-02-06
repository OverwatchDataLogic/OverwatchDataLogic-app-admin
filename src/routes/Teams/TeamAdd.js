import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Form, Input, Button, Card, Radio, Icon, Upload, Select } from 'antd'
import AV from 'leancloud-storage'
import { ACCOUNTS, LEVEL } from '../../constants'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './Teams.less'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input
let uuid = 0

@Form.create()
class TeamAdd extends PureComponent {
  state = {
    logo_loading: false,
    logoUrl: '',
    icon_loading: false,
    iconUrl: ''
  }

  componentDidMount() {
    this.props.getAllPlayers({ level: 'owl' })
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

  handleLogoUploadChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ logo_loading: true })
      return
    }
    if (info.file.status === 'done') {
      this.setState({
        logoUrl: info.file.response.attributes.url,
        logo_loading: false
      })
    }
  }

  handleIconUploadChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ icon_loading: true })
      return
    }
    if (info.file.status === 'done') {
      this.setState({
        iconUrl: info.file.response.attributes.url,
        icon_loading: false
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

  onLevelChange = e => {
    this.props.getAllPlayers({ level: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.create({
          ...values,
          logo: this.state.logoUrl,
          icon: this.state.iconUrl
        })
      }
    })
  }

  render() {
    const {
      name,
      abbreviatedTitle,
      homeLocation,
      accounts,
      primaryColor,
      secondaryColor,
      addressCountry,
      description,
      match,
      level,
      honour,
      players
    } = this.props.team
    const { submitting } = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const logoUrl = this.state.logoUrl
    const iconUrl = this.state.iconUrl
    const playerOptions = []
    this.props.players.forEach(item => {
      playerOptions.push(
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
      <PageHeaderLayout title="新增队伍">
        <Card bordered={false} className={styles.team}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
            className={styles.player}
          >
            <FormItem {...formItemLayout} label="队伍名称">
              {getFieldDecorator('name', {
                initialValue: name,
                rules: [
                  {
                    required: true,
                    message: '请输入队伍名称'
                  }
                ]
              })(<Input placeholder="请输入队伍名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="队伍简称">
              {getFieldDecorator('abbreviatedTitle', {
                initialValue: abbreviatedTitle,
                rules: [
                  {
                    required: true,
                    message: '请输入队伍简称'
                  }
                ]
              })(<Input placeholder="请输入队伍简称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="队伍主色调">
              {getFieldDecorator('primaryColor', {
                initialValue: primaryColor
              })(<Input placeholder="请输入队伍主色调" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="队伍辅色调">
              {getFieldDecorator('secondaryColor', {
                initialValue: secondaryColor
              })(<Input placeholder="请输入队伍辅色调" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="队伍国籍">
              {getFieldDecorator('addressCountry', {
                initialValue: addressCountry,
                rules: [
                  {
                    required: true,
                    message: '请输入队伍国籍'
                  }
                ]
              })(<Input placeholder="请输入队伍国籍" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="队伍城市">
              {getFieldDecorator('homeLocation', {
                initialValue: homeLocation,
                rules: [
                  {
                    required: true,
                    message: '请输入队伍城市'
                  }
                ]
              })(<Input placeholder="请输入队伍城市" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="队伍介绍">
              {getFieldDecorator('description', {
                initialValue: description
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="请输入队伍介绍"
                  rows={6}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="比赛经历">
              {getFieldDecorator('match', {
                initialValue: match
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="请输入比赛经历"
                  rows={6}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="比赛荣誉">
              {getFieldDecorator('honour', {
                initialValue: honour
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="请输入比赛荣誉"
                  rows={6}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="等级">
              <div>
                {getFieldDecorator('level', {
                  initialValue: level
                })(
                  <Radio.Group onChange={this.onLevelChange}>
                    {levelRadio}
                  </Radio.Group>
                )}
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="队伍成员">
              {getFieldDecorator('players', {
                initialValue: players
              })(
                <Select mode="multiple" placeholder="请选择队伍成员">
                  {playerOptions}
                </Select>
              )}
            </FormItem>
            {formItems}
            <FormItem {...formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={this.add}>
                <Icon type="plus" /> 新增媒体账号
              </Button>
            </FormItem>
            <FormItem {...formItemLayout} label="Logo">
              <Upload
                name="logo"
                accept="image/jpg,image/jpeg,image/png"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                onChange={this.handleLogoUploadChange}
                customRequest={this.handleUpload}
              >
                {logoUrl ? (
                  <img src={logoUrl} alt="" />
                ) : (
                  <div>
                    <Icon type={this.state.logo_loading ? 'loading' : 'plus'} />
                    <div className="ant-upload-text">上传</div>
                  </div>
                )}
              </Upload>
            </FormItem>
            <FormItem {...formItemLayout} label="Icon">
              <Upload
                name="icon"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                onChange={this.handleIconUploadChange}
                customRequest={this.handleUpload}
              >
                {iconUrl ? (
                  <img src={iconUrl} alt="" />
                ) : (
                  <div>
                    <Icon type={this.state.icon_loading ? 'loading' : 'plus'} />
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
  const { teams, players, loading } = state
  return {
    team: teams.default,
    players: players.all,
    loading: loading.models.teams
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    create: values => {
      dispatch({
        type: 'teams/create',
        payload: values
      })
    },
    getAllPlayers: params => {
      dispatch({
        type: 'players/getAll',
        payload: params
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamAdd)
