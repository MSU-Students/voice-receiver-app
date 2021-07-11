<template>
  <div class="q-gutter-xs row item-start">
    <q-btn
      color="blue-9"
      label="Set IP Address"
      size="10px"
      no-caps
      class="btn-fixed-width"
    >
      <q-menu>
        <div class="row no-wrap q-pa-md">
          <div class="column">
            <div class="text-weight-bold q-mb-md"> <q-icon name="dns" size="20px"/> Server Setting</div>
            <q-separator />
            <NetworkInfo />
          </div>
        </div>
      </q-menu>
    </q-btn>
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
import NetworkInfo from "../components/NetworkInfo.vue";
export default {
  name: "ConnectServer",
  components: { NetworkInfo },
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
  methods: {
    async getIP() {
      const ip = await serverConnectionService.getIpAddress();
      this.server_ip = ip;
      console.log(this.server_ip);
    },
    async connectServer() {
      const res = await serverConnectionService.connect(this.server_ip.ipAddress, this.server_ip.port);
      console.log("omair", res);
      if (res != undefined) {
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
