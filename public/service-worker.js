/**
 * Service-worker 主要用于网路请求的拦截和缓存策略，
 * 不能直接创建或管理 websocket连接
 */
const CACHE_NAME = 'vue-app-cache'
// 预缓存关键资源
const urlsToCache = [
  '/',
  '/index.html'
  //  其他需要缓存的资源
]

self.addEventListener('install', event => {
  console.log('Service Worker installing.')
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache: ', cache)
      return cache.addAll(urlsToCache)
    })
  )
})

// eslint-disable-next-line no-unused-vars
self.addEventListener('activate', event => {
  console.log('Service Worker activated')
})

//  fetch 事件中返回缓存的响应（如果可用）
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})

// 监听推送事件
self.addEventListener('push', event => {
  const data = event.data.json()
  console.log('push---', event.data, data)
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: 'https://lovepik.com/image-401231841/cute-girl-avatar.html'
  })
})

function processData(data) {
  return JSON.stringify({ text: `${JSON.parse(data).text} processed in service worker` })
}

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'WEBSOCKET_DATA') {
    const processedData = processData(event.data.data)
    // 处理数据后，将其送回住线程
    self.clients.matchAll({ type: 'window' }).then(clients => {
      clients.forEach(client => {
        // console.log('bb---', client, 'postMessage' in client)
        if ('postMessage' in client) {
          client.postMessage({
            type: 'PROCESSED_DATA',
            data: processedData
          })
        }
      })
    })
  }
})
