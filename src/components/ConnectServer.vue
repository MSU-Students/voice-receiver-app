<template>
  <div class="q-gutter-xs row item-start">
    <q-input filled v-model="ipAddress" label="Server IP Address" dense/>  
    <q-btn
      :disable="isDisableConnect"
      align="left"
      class="btn-fixed-width"
      label="connect server"
      size="10px"
      @click.prevent="connectServer"
    />
    <q-btn
      :disable="isDisableDisconnect"
      align="right"
      class="btn-fixed-width"
      color="red-12"
      label="Disconnect"
      size="10px"
      @click.prevent="disconnect"
    />
  </div>
</template>
<script>
import serverConnectionService from "../services/server-connection.service.js";
export default {
  name: "ConnectServer",
  data() {
    return {
      showConnectLoader: false,
      isConnected: false,
      isDisableConnect: false,
      isDisableDisconnect: true,
      ipAddress: ""
    };
  },
  methods: {
    async connectServer() {
      const res = await serverConnectionService.connect();
      console.log('omair', res);
      if ((res != undefined)) {
        this.notifyMessage("Connected to the server", "green-6");
        this.isDisableConnect = true;
        this.isDisableDisconnect = false;
        this.isConnected = true;
      } else {
        this.isDisableConnect = false;
        this.isDisableDisconnect = true;
        this.isConnected = false;
        this.notifyMessage("Can't connect to the server.", "red");
      }
    },

    async disconnect() {
      this.isConnected = false;
      this.isDisableConnect = false;
      this.isDisableDisconnect = true;
      await serverConnectionService.disconnect();
    },

    notifyMessage(msg, color) {
      this.$q.notify({
        message: msg,
        color: color,
        timeout: 1000,
        icon: "error",
        position: "center"
      });
    }
  }
};
</script>
