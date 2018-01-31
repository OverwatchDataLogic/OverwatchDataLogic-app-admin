import React, { Component } from 'react'
import { connect } from 'dva'
import {
  Form,
  Input,
  Button,
  Card,
  Radio,
  Icon,
  Upload,
  Col,
  Row,
  Rate,
  Modal,
  List,
  Avatar,
  Tag
} from 'antd'
import AV from 'leancloud-storage'
import uuidv4 from 'uuid/v4'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import FooterToolbar from '../../components/FooterToolbar'
import EditableAbilityExtraTable from '../../components/EditableAbilityExtraTable'
import EditableHeroExtraTable from '../../components/EditableHeroExtraTable'
import styles from './HeroEdit.less'

const FormItem = Form.Item
const { TextArea } = Input

@Form.create()
class HeroEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      isAvatarChanged: false,
      width: '100%',
      ability_visible: false,
      extra_visible: false,
      confirmLoading: false,
      abilityUrl: '',
      abilityName: '',
      abilityDesc: '',
      abilityId: '',
      ability: {},
      abilities: this.props.hero.abilities,
      extra: this.props.hero.extra
    }
    this.onAbilityNameChange = this.onAbilityNameChange.bind(this)
    this.onAbilityDescChange = this.onAbilityDescChange.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar)
  }
  resizeFooterToolbar = () => {
    const sider = document.querySelectorAll('.ant-layout-sider')[0]
    const width = `calc(100% - ${sider.style.width})`
    if (this.state.width !== width) {
      this.setState({ width })
    }
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
      this.setState({ avatar_loading: true })
      return
    }
    if (info.file.status === 'done') {
      this.setState({
        avatarUrl: info.file.response.attributes.url,
        isAvatarChanged: true,
        avatar_loading: false
      })
    }
  }
  handleAbilityChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ ability_loading: true })
      return
    }
    if (info.file.status === 'done') {
      this.setState({
        abilityUrl: info.file.response.attributes.url,
        isAbilityChanged: true,
        ability_loading: false
      })
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.update({
          ...values,
          avatar: this.state.isAvatarChanged
            ? this.state.avatarUrl
            : this.props.avatar,
          abilities: this.state.abilities,
          extra: this.state.extra
        })
      }
    })
  }
  handleAbilityDelete = id => {
    const abilities = this.state.abilities.filter(item => item.id !== id)
    this.setState({
      abilities
    })
  }
  handleAbilityUpdate = id => {
    const ability = this.state.abilities.filter(x => x.id === id)[0]
    this.setState({
      ability_visible: true,
      isAbilityChanged: true,
      abilityId: id,
      abilityUrl: ability.icon,
      abilityName: ability.name,
      abilityDesc: ability.description
    })
  }
  onAbilityNameChange = e => {
    this.setState({
      abilityName: e.target.value
    })
  }
  onAbilityDescChange = e => {
    this.setState({
      abilityDesc: e.target.value
    })
  }
  handleAbilityModalOk = () => {
    if (this.state.abilityId) {
      const ability = {
        id: this.state.abilityId,
        name: this.state.abilityName,
        description: this.state.abilityDesc,
        icon: this.state.abilityUrl
      }
      const abilities = this.state.abilities.map(item => {
        if (item.id === this.state.abilityId) {
          return Object.assign(item, ability)
        } else {
          return item
        }
      })
      this.setState({
        ability_visible: false,
        confirmLoading: false,
        abilities
      })
    } else {
      const ability = {
        id: uuidv4(),
        name: this.state.abilityName,
        description: this.state.abilityDesc,
        icon: this.state.abilityUrl,
        extra: []
      }
      this.setState({
        ability_visible: false,
        confirmLoading: false,
        abilities: [...this.state.abilities, ability]
      })
    }
  }
  handleAbilityModalCancel = () => {
    this.setState({
      ability_visible: false
    })
  }
  handleAbilityModalShow = () => {
    this.setState({
      ability_visible: true
    })
  }
  handleExtraModalOk = () => {
    const abilities = this.state.abilities.map(item => {
      if (item.id === this.state.ability.id) {
        return Object.assign(item, this.state.ability)
      } else {
        return item
      }
    })
    this.setState({
      extra_visible: false,
      confirmLoading: false,
      abilities
    })
  }
  handleExtraModalCancel = () => {
    this.setState({
      extra_visible: false
    })
  }
  handleExtraModalShow = id => {
    this.setState({
      extra_visible: true,
      abilityUrl: '',
      abilityName: '',
      abilityDesc: '',
      abilityId: '',
      ability: this.state.abilities.filter(x => x.id === id)[0]
    })
  }
  handleAbilityExtraChange = (id, dataIndex) => {
    return value => {
      this.state.ability.extra.map(item => {
        if (item.id === id) {
          item[dataIndex] = value
          return item
        } else {
          return item
        }
      })
    }
  }
  handleAbilityExtraDelete = id => {
    this.setState({
      ability: {
        ...this.state.ability,
        extra: this.state.ability.extra.filter(item => item.id !== id)
      }
    })
  }
  handleAbilityExtraAdd = () => {
    const newData = {
      id: uuidv4(),
      name: '标题',
      value: '内容'
    }
    this.setState({
      ability: {
        ...this.state.ability,
        extra: [...this.state.ability.extra, newData]
      }
    })
  }
  handleHeroExtraChange = (id, dataIndex) => {
    return value => {
      const extra = this.state.extra.map(item => {
        if (item.id === id) {
          const target = (item[dataIndex] = value)
          return {
            ...item,
            target
          }
        } else {
          return item
        }
      })
      this.setState({
        extra: extra
      })
    }
  }
  handleHeroExtraDelete = id => {
    this.setState({
      extra: this.state.extra.filter(item => item.id !== id)
    })
  }
  handleHeroExtraAdd = () => {
    const newData = {
      id: uuidv4(),
      name: '标题',
      value: '内容'
    }
    this.setState({
      extra: [...this.state.extra, newData]
    })
  }
  render() {
    const {
      id,
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
    } = this.props.hero
    const { submitting } = this.props
    const { getFieldDecorator } = this.props.form
    const {
      ability_visible,
      extra_visible,
      confirmLoading,
      ability,
      extra,
      abilities
    } = this.state
    const avatarUrl = this.state.isAvatarChanged ? this.state.avatarUrl : avatar
    const abilityUrl = this.state.isAbilityChanged ? this.state.abilityUrl : ''
    return (
      <PageHeaderLayout title="编辑英雄">
        <Card title="基础数据" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={0} md={0} sm={0}>
                <FormItem>
                  {getFieldDecorator('id', {
                    initialValue: id
                  })(<Input type="hidden" />)}
                </FormItem>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <FormItem label="英雄名称">
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
              </Col>
              <Col
                xl={{ span: 6, offset: 2 }}
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={24}
              >
                <FormItem label="难度">
                  {getFieldDecorator('difficulty', {
                    initialValue: difficulty
                  })(<Rate count={3} />)}
                </FormItem>
              </Col>
              <Col
                xl={{ span: 8, offset: 2 }}
                lg={{ span: 10 }}
                md={{ span: 24 }}
                sm={24}
              >
                <FormItem label="角色">
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
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <FormItem label="英雄血量">
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
              </Col>
              <Col
                xl={{ span: 6, offset: 2 }}
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={24}
              >
                <FormItem label="英雄护甲">
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
              </Col>
              <Col
                xl={{ span: 8, offset: 2 }}
                lg={{ span: 10 }}
                md={{ span: 24 }}
                sm={24}
              >
                <FormItem label="英雄护盾">
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
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="扩展数据" className={styles.card} bordered={false}>
          <Form hideRequiredMark>
            <FormItem>
              <EditableHeroExtraTable
                data={extra}
                handleHeroExtraChange={this.handleHeroExtraChange}
                handleHeroExtraDelete={this.handleHeroExtraDelete}
                handleHeroExtraAdd={this.handleHeroExtraAdd}
              />
            </FormItem>
          </Form>
        </Card>
        <Card title="背景数据" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <FormItem label="英雄全称">
                  {getFieldDecorator('real_name', {
                    initialValue: real_name
                  })(<Input placeholder="请输入英雄全称" />)}
                </FormItem>
              </Col>
              <Col
                xl={{ span: 6, offset: 2 }}
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={24}
              >
                <FormItem label="英雄年龄">
                  {getFieldDecorator('age', {
                    initialValue: age
                  })(<Input placeholder="请输入英雄年龄" />)}
                </FormItem>
              </Col>
              <Col
                xl={{ span: 8, offset: 2 }}
                lg={{ span: 10 }}
                md={{ span: 24 }}
                sm={24}
              >
                <FormItem label="英雄身高">
                  {getFieldDecorator('height', {
                    initialValue: height
                  })(<Input placeholder="请输入英雄身高" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <FormItem label="职业">
                  {getFieldDecorator('profession', {
                    initialValue: profession
                  })(<Input placeholder="请输入职业" />)}
                </FormItem>
              </Col>
              <Col
                xl={{ span: 6, offset: 2 }}
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={24}
              >
                <FormItem label="行动基地">
                  {getFieldDecorator('base_of_operations', {
                    initialValue: base_of_operations
                  })(<Input placeholder="请输入行动基地" />)}
                </FormItem>
              </Col>
              <Col
                xl={{ span: 8, offset: 2 }}
                lg={{ span: 10 }}
                md={{ span: 24 }}
                sm={24}
              >
                <FormItem label="隶属">
                  {getFieldDecorator('affiliation', {
                    initialValue: affiliation
                  })(<Input placeholder="请输入隶属" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <FormItem label="英雄介绍">
                  {getFieldDecorator('description', {
                    initialValue: description
                  })(
                    <TextArea
                      style={{ minHeight: 32 }}
                      placeholder="请输入英雄介绍"
                      rows={6}
                    />
                  )}
                </FormItem>
              </Col>
              <Col
                xl={{ span: 6, offset: 2 }}
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={24}
              >
                <FormItem label="头像">
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
                      onChange={this.handleAvatarUploadChange}
                      customRequest={this.handleUpload}
                    >
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="" />
                      ) : (
                        <div>
                          <Icon
                            type={
                              this.state.avatar_loading ? 'loading' : 'plus'
                            }
                          />
                          <div className="ant-upload-text">上传</div>
                        </div>
                      )}
                    </Upload>
                  )}
                </FormItem>
              </Col>
              <Col
                xl={{ span: 8, offset: 2 }}
                lg={{ span: 10 }}
                md={{ span: 24 }}
                sm={24}
              />
            </Row>
          </Form>
        </Card>
        <Card
          title="英雄技能"
          extra={<a onClick={() => this.handleAbilityModalShow()}>新增技能</a>}
          className={styles.abilities}
          bordered={false}
        >
          <List
            itemLayout="horizontal"
            dataSource={abilities}
            renderItem={item => (
              <List.Item
                actions={[
                  <a onClick={() => this.handleExtraModalShow(item.id)}>
                    扩展
                  </a>,
                  <a onClick={() => this.handleAbilityUpdate(item.id)}>编辑</a>,
                  <a onClick={() => this.handleAbilityDelete(item.id)}>删除</a>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src={item.icon} size="large" shape="square" />
                  }
                  title={item.name}
                  description={item.description}
                />
                <div>
                  {item.extra.length > 0 ? (
                    item.extra.slice(0, 6).map(x => (
                      <div key={x.id}>
                        <Tag color="magenta">{x.name}</Tag>：<span>
                          {x.value}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div />
                  )}
                </div>
              </List.Item>
            )}
          />
        </Card>
        <FooterToolbar style={{ width: this.state.width }}>
          <Button
            type="primary"
            onClick={this.handleSubmit}
            loading={submitting}
          >
            提交
          </Button>
        </FooterToolbar>
        <Modal
          title="英雄技能"
          visible={ability_visible}
          onOk={this.handleAbilityModalOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleAbilityModalCancel}
        >
          <Form hideRequiredMark>
            <FormItem label="技能图标">
              <Upload
                name="ability_icon"
                accept="image/jpg,image/jpeg,image/png"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                onChange={this.handleAbilityChange}
                customRequest={this.handleUpload}
              >
                {abilityUrl ? (
                  <img src={abilityUrl} alt="" />
                ) : (
                  <div>
                    <Icon
                      type={this.state.ability_loading ? 'loading' : 'plus'}
                    />
                    <div className="ant-upload-text">上传</div>
                  </div>
                )}
              </Upload>
            </FormItem>
            <FormItem>
              <Input type="hidden" value={this.state.abilityId} />
            </FormItem>
            <FormItem label="技能名称">
              <Input
                placeholder="请输入技能名称"
                onChange={this.onAbilityNameChange}
                value={this.state.abilityName}
              />
            </FormItem>
            <FormItem label="技能描述">
              <TextArea
                style={{ minHeight: 32 }}
                placeholder="请输入技能描述"
                onChange={this.onAbilityDescChange}
                value={this.state.abilityDesc}
                rows={6}
              />
            </FormItem>
          </Form>
        </Modal>
        <Modal
          title="技能扩展"
          visible={extra_visible}
          onOk={this.handleExtraModalOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleExtraModalCancel}
        >
          <Form hideRequiredMark>
            <FormItem>
              <EditableAbilityExtraTable
                data={ability}
                handleAbilityExtraChange={this.handleAbilityExtraChange}
                handleAbilityExtraDelete={this.handleAbilityExtraDelete}
                handleAbilityExtraAdd={this.handleAbilityExtraAdd}
              />
            </FormItem>
          </Form>
        </Modal>
      </PageHeaderLayout>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { heroes, loading } = state
  return {
    hero:
      heroes.data.list.length > 0
        ? heroes.data.list.filter(x => x.id === ownProps.match.params.id)[0]
        : heroes.default,
    loading: loading.models.heroes
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    update: params => {
      dispatch({
        type: 'heroes/update',
        payload: params
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroEdit)
