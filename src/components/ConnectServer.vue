<template>
  <div class="q-gutter-xs row item-start">
    <q-btn
      :loading="showConnectLoader"
      :disable="isDisableConnect"
      align="left"
      class="btn-fixed-width"
      label="connect server"
      size="10px"
      @click.prevent="connectServer"
    >
      <template v-slot:loading>
        connecting...
      </template>
    </q-btn>
    <q-btn
      :disable="isDisableDisconnect"
      align="right"
      class="btn-fixed-width"
      color="red-12"
      label="Disconnect"
      size="10px"
      @click.prevent="disconnect"
    />
    <div v-if="isConnected == false" class="q-ml-md">
      <q-badge outline color="red" label="Not connected"></q-badge>
    </div>
    <div v-else class="q-ml-md">
      <q-badge color="green" label="Connected"></q-badge>
    </div>
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
      server_ip: {}
    };
  },
  mounted() {
    this.getIP();
  },
  created() {
    this.getIP();
      serverConnectionService.isItemExist("server_ip");
      serverConnectionService.startPlayer();
  },
  methods: {
    async getIP() {
      const ip = await serverConnectionService.getIpAddress();
      this.server_ip = ip;
      console.log(this.server_ip);
    },
    async connectServer() {
      this.showConnectLoader = true;
      const res = await serverConnectionService.connect(
        this.server_ip.ipAddress,
        this.server_ip.port
      );
      if (res.type != "close") {
        setTimeout(() => {
          this.notifyMessage("Connected to the server", "green-6");
          this.isDisableConnect = true;
          this.isDisableDisconnect = false;
          this.isConnected = true;
          this.showConnectLoader = false;
        }, 2000);
      } else {
        setTimeout(() => {
          this.isDisableConnect = false;
          this.isDisableDisconnect = true;
          this.isConnected = false;
          this.showConnectLoader = false;
          this.notifyMessage("Can't connect to the server.", "red");
        }, 2000);
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
