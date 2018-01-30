import React, { PureComponent } from 'react'
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
import styles from './HeroEdit.less'

const FormItem = Form.Item
const { TextArea } = Input

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

@Form.create()
class HeroEdit extends PureComponent {
  state = {
    loading: false,
    isAvatarChanged: false,
    width: '100%',
    visible: false,
    extra_visible: false,
    confirmLoading: false,
    ability: [],
    abilityName: '',
    abilityDesc: '',
    abilityExtra: [
      {
        id: '0',
        name: 'Edward King 0',
        value: '32'
      },
      {
        id: '1',
        name: 'Edward King 1',
        value: '32'
      }
    ]
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
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          avatarUrl: imageUrl,
          isAvatarChanged: true,
          avatar_loading: false
        })
      )
    }
  }
  handleAbilityChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ ability_loading: true })
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          abilityUrl: imageUrl,
          isAbilityChanged: true,
          ability_loading: false
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
  handleModalOk = () => {
    this.setState({
      confirmLoading: true
    })
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      })
      this.props.push({
        id: uuidv4(),
        name: this.abilityName,
        description: this.abilityDesc,
        icon: this.state.abilityUrl
      })
    }, 2000)
  }
  handleModalCancel = () => {
    console.log('Clicked cancel button')
    this.setState({
      visible: false
    })
  }
  handleModalShow = () => {
    this.setState({
      visible: true
    })
  }
  handleExtraModalOk = () => {
    this.setState({
      confirmLoading: true
    })
    setTimeout(() => {
      this.setState({
        extra_visible: false,
        confirmLoading: false
      })
    }, 2000)
  }
  handleExtraModalCancel = () => {
    console.log('Clicked cancel button')
    this.setState({
      extra_visible: false
    })
  }
  handleExtraModalShow = () => {
    this.setState({
      extra_visible: true
    })
  }
  handleAbilityExtraChange = (id, dataIndex) => {
    return value => {
      const abilityExtra = [...this.state.abilityExtra]
      const target = abilityExtra.find(item => item.id === id)
      if (target) {
        target[dataIndex] = value
        this.setState({ abilityExtra })
      }
    }
  }
  handleAbilityExtraDelete = id => {
    const abilityExtra = [...this.state.abilityExtra]
    this.setState({ abilityExtra: abilityExtra.filter(item => item.id !== id) })
  }
  handleAbilityExtraAdd = () => {
    const { abilityExtra } = this.state
    const newData = {
      id: uuidv4(),
      name: '大招',
      value: '是'
    }
    this.setState({
      abilityExtra: [...abilityExtra, newData]
    })
  }
  onAbilityNameChange = e => {
    this.setState({
      abilityName: e.target.value
    })
  }
  onAbilityNameChange = e => {
    this.setState({
      abilityDesc: e.target.value
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
      avatar,
      abilities
    } = this.props.hero
    const { submitting } = this.props
    const { getFieldDecorator } = this.props.form
    const { visible, extra_visible, confirmLoading, abilityExtra } = this.state
    const avatarUrl = this.state.isAvatarChanged ? this.state.avatarUrl : avatar
    const abilityUrl = this.state.isAbilityChanged ? this.state.abilityUrl : ''
    return (
      <PageHeaderLayout title="编辑英雄">
        <Card title="游戏数据" className={styles.card} bordered={false}>
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
          extra={<a onClick={() => this.handleModalShow()}>新增技能</a>}
          className={styles.abilities}
          bordered={false}
        >
          <List
            itemLayout="horizontal"
            dataSource={abilities}
            renderItem={item => (
              <List.Item
                actions={[
                  <a onClick={() => this.handleExtraModalShow()}>扩展</a>,
                  <a>编辑</a>,
                  <a>详细</a>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src={item.icon} size="large" shape="square" />
                  }
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={item.description}
                />
                <div>
                  {item.extra.length > 0 ? (
                    item.extra.slice(0, 6).map(x => (
                      <Row key={x.id}>
                        <Col>
                          <Tag color="magenta">{x.name}</Tag>：<span>
                            {x.value}
                          </span>
                        </Col>
                      </Row>
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
          visible={visible}
          onOk={this.handleModalOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleModalCancel}
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
            <FormItem label="技能名称">
              <Input
                placeholder="请输入技能名称"
                onChange={() => this.onAbilityNameChange}
              />
            </FormItem>
            <FormItem label="技能描述">
              <TextArea
                style={{ minHeight: 32 }}
                placeholder="请输入技能描述"
                onChange={() => this.onAbilityDescChange}
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
                data={abilityExtra}
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

export default connect(mapStateToProps)(HeroEdit)
