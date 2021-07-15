<template>
  <div>
    <q-toolbar>
      <q-item v-if="officeDetails.length == null">
        <q-item-section avatar>
          <q-icon size="35px" color="indigo" name="maps_home_work" />
        </q-item-section>
        <q-item-section>
          <q-item-label> {{ officeDetails.client }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-else>
        <q-item-section avatar>
          <q-icon size="35px" color="indigo" name="maps_home_work" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-red text-overline">
            No College or Office Found!
          </q-item-label>
          <q-item-label caption> Please register. </q-item-label>
        </q-item-section>
      </q-item>
      <q-space />
      <q-item>
        <q-item-section>
          <q-item-label caption>
            Server IP: {{ server_ip.ipAddress }}
          </q-item-label>
          <q-item-label caption> Port: {{ server_ip.port }} </q-item-label>
        </q-item-section>
      </q-item>
      <q-space />
    </q-toolbar>
  </div>
</template>

<script>
import areaProfileService from "../services/area-profile.service.js";
import serverConnectionService from "../services/server-connection.service.js";
export default {
  name: "InstituitionProfile",
  data() {
    return {
      officeDetails: {},
      showConnectLoader: false,
      isConnected: false,
      server_ip: {}
    };
  },
  mounted() {
    this.getOfficeDetails();
    this.getIP();
  },
  created() {
    areaProfileService.isItemExist("area");
  },
  methods: {
    async connectServer() {
      await serverConnectionService.connect();
      this.isConnected = true;
    },

    async disconnect() {
      this.isConnected = false;
      await serverConnectionService.disconnect();
    },

    async getOfficeDetails() {
      const officeProfile = await areaProfileService.getOfficeDetails();
      this.officeDetails = officeProfile;
    },
    async getIP() {
      const ip = await serverConnectionService.getIpAddress();
      this.server_ip = ip;
      console.log(this.server_ip);
    }
  }
};
</script>
