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
  Rate
} from 'antd'
import AV from 'leancloud-storage'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import FooterToolbar from '../../components/FooterToolbar'

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
    isAvatarChanged: false,
    width: '100%'
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
    } = this.props.hero
    const { submitting } = this.props
    const { getFieldDecorator } = this.props.form
    const avatarUrl = this.state.isAvatarChanged ? this.state.avatarUrl : avatar
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传</div>
      </div>
    )
    return (
      <PageHeaderLayout title="新增英雄">
        <Card title="游戏数据" bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
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
        <Card title="背景数据" bordered={false}>
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
                        uploadButton
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
        <FooterToolbar style={{ width: this.state.width }}>
          <Button
            type="primary"
            onClick={this.handleSubmit}
            loading={submitting}
          >
            提交
          </Button>
        </FooterToolbar>
      </PageHeaderLayout>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { heroes, loading } = state
  return {
    hero: heroes.default,
    loading: loading.models.heroes
  }
}

export default connect(mapStateToProps)(HeroAdd)
