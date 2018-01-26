import qiniu from 'qiniu'

export function getUploadToken (req, res) {
  const bucket = 'overwatchtool'
  const accessKey = 'oCHYMgnqR8-3VQtmNkiJIpqunOZcScuSKqIkS3ls'
  const secretKey = 'bVYf_V0gRv64Sa679XJCfPATFStQPACvVjsxQR83'
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  const options = {
    scope: bucket
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)

  const result = {
    token: uploadToken
  }

  if (res && res.json) {
    res.json(result)
  } else {
    return result
  }
}

export default { getUploadToken }
