<template>
  <div class="q-gutter-xs">
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
      isDisableDisconnect: true
    };
  },
  methods: {
    async connectServer() {
        try {
        const res = await serverConnectionService.connect();
          this.isDisableConnect = true;
          this.isDisableDisconnect = false;
          this.isConnected = true;
      } catch (error) {
        this.isDisableConnect = false;
        this.isDisableDisconnect = true;  
        console.log("ERROR");
      }
    },

    async disconnect() {
      this.isConnected = false;
      this.isDisableConnect = false;
      this.isDisableDisconnect = true;
      await serverConnectionService.disconnect();
    }
  }
};
</script>
