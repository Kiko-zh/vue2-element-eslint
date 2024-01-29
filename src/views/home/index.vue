<template>
  <div class="home">
    <div class="home-messages">
      <div v-for="message in messages" :key="message.id">{{ message.text }}</div>
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
  },
  methods: {
    connectToWebSocket() {
      this.ws = new WebSocket('ws://localhost:8765')
      this.ws.onmessage = event => {
        const message = JSON.parse(event.data)
        console.log('from ws:', message)
        this.messages.push(message)
      }
    },
    sendMessage() {
      // WebSocket.OPEN = 1
      console.log('vvv11--', this.ws, this.ws.readyState)
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
