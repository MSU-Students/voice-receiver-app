<template>
  <div>
    <q-toolbar>
      <q-item v-if="officeDetails.length == null">
        <q-item-section avatar>
          <q-icon size="35px" color="indigo" name="maps_home_work" />
        </q-item-section>
        <q-item-section>
          <q-item-label> {{ officeDetails.officeName }}</q-item-label>
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
      <div v-if="isConnected == false" class="q-ml-md">
        <q-badge outline color="red" label="Connect to server"></q-badge>
      </div>
      <div v-else class="q-ml-md">
        <q-badge color="green" label="Connected"></q-badge>
      </div>
      <!-- <q-space />
      <div class="row q-gutter-sm">
        <q-btn
          :loading="showConnectLoader"
          color="green"
          rounded
          label="Connect"
          @click.prevent="connectServer"
        >
          <template v-slot:loading>
            <q-spinner-ios v-if="showConnectLoader" />
          </template>
        </q-btn>
        <q-btn
          :loading="showConnectLoader"
          rounded
          color="negative"
          text-color="white"
          label="Disconnect"
          @click.prevent="disconnect"
        >
        </q-btn>
      </div> -->

      <!-- <div v-if="isConnected == false" class="q-ml-md">
          <q-badge outline color="red" label="Connect to server"></q-badge>
        </div>
        <div v-else class="q-ml-md">
          <q-badge color="green" label="Connected"></q-badge>
        </div> -->
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
      area: {
        officeName: null,
        codeNum: null
      },
      showConnectLoader: false,
      isConnected: false
    };
  },
  mounted() {
    this.getOfficeDetails();
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
      console.log("length: ", this.officeDetails.length);
    }
  }
};
</script>
