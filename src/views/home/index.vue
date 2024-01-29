<template>
  <div class="home">
    <div class="home-messages">
      <div v-for="(message, index) in messages" :key="`message${index}`">{{ message.text }}</div>
    </div>
    <div class="home-send flex-start">
      <el-input v-model="newMessage" @keyup.native.enter="sendMessage" />
      <el-button type="primary" @click="sendMessage">Send</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      messages: [],
      newMessage: '',
      ws: null
    }
  },
  mounted() {
    this.connectToWebSocket()
    // const _this = this
    // 监听 Service Worker 的消息
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data && event.data.type === 'PROCESSED_DATA') {
        const msg = JSON.parse(event.data.data)
        this.messages.push(msg)
      }
    })
  },
  methods: {
    connectToWebSocket() {
      this.ws = new WebSocket('ws://localhost:8765')
      this.ws.onmessage = event => {
        // const message = JSON.parse(event.data)
        // console.log('from ws:', message)
        // this.messages.push(message)

        // 接收的 websocket 数据 并发送到 service worker
        if (navigator.serviceWorker.controller) {
          // 使用 postMessage
          navigator.serviceWorker.controller.postMessage({
            type: 'WEBSOCKET_DATA',
            data: event.data
          })
        }
      }
    },
    sendMessage() {
      // WebSocket.OPEN = 1
      // console.log('vvv11--', this.ws, this.ws.readyState)
      if (this.newMessage && this.ws !== null && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ text: this.newMessage }))
        this.newMessage = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  &-messages {
    height: 300px;
    overflow-y: scroll;
  }

  &-send {
    width: 50%;
  }
}
</style>
