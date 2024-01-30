const publicVapidKey = `BEsh1fpXaNyAZ-cqxailHC6qKjLeXiMUFCegZfoKYW8ADKPh0VEx6xs0U2ahmEtduCnvUqKqFPN_oEglVICbvfY`
/**
 * 将URL安全的base64编码的VAPID转换为 `Unit8Array`格式
 */
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function initializePushNotification(res) {
  // 请求用户权限
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      res.pushManager
        .subscribe({
          userVisibleOnly: true,
          // 提供应用服务器密钥（若需要）
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        })
        // eslint-disable-next-line no-unused-vars
        .then(subscription => {
          // 将订阅对象发送到后端
          // 发送订阅对象到后端
          fetch('/api/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
              'Content-Type': 'application/json'
            }
          })
        })
        .catch(err => console.error('Error during subscribe to push', err))
    }
  })
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(res => {
      console.log('Service Worker Registered Successfully!')
      // `PushManager` 接口是 Web Push API 的一部分，它允许网页订阅推送通知，处理订阅和发送到用户的推送消息
      if ('PushManager' in window) {
        initializePushNotification(res)
      }
    })
    .catch(error => {
      console.log('Service Worker Registered Failed ', error)
    })
}
