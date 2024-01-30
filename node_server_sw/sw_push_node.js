// Node.js 示例
const webpush = require('web-push')
const express = require('express')
const app = express()

// 添加这一行来解析 JSON 请求体
app.use(express.json())

// VAPID keys
// 使用环境变量或生成新的 VAPID 密钥
// `npx web-push generate-vapid-keys`
// const privateVapidKey = process.env.PRIVATE_VAPID_KEY || webpush.generateVAPIDKeys().privateKey
const publicVapidKey =
  'BEsh1fpXaNyAZ-cqxailHC6qKjLeXiMUFCegZfoKYW8ADKPh0VEx6xs0U2ahmEtduCnvUqKqFPN_oEglVICbvfY'
const privateVapidKey = '9ceW1ZzqPwc-hYi08IPjYj1_5lHeK-Dexl5A6UVxADE'

// 设置 web-push 的 VAPID 详情
webpush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey)

// 接收订阅对象的路由
app.post('/subscribe', (req, res) => {
  const subscription = req.body

  // 存储订阅信息...

  // 确保接收到完整的订阅对象
  if (!subscription || !subscription.endpoint) {
    return res.status(400).send('Invalid subscription object.')
  }

  // 发送立即响应
  res.status(201).json({})

  // 创建和发送通知
  const payload = JSON.stringify({ title: 'Test', body: 'Push Test' })
  webpush.sendNotification(subscription, payload).catch(error => console.error(error))
})

// 启动服务器
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
