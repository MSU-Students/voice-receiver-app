<template>
  <q-page style="min-width: 440px">
    <q-toolbar
      class="text-white"
      style="background: linear-gradient(145deg, #15503e 15%, #133154 70%);"
    >
      <q-btn icon="arrow_back" flat label="Back" to="/popup" />
      <q-toolbar-title class="text-center">
        <strong>Instituition</strong> Info
      </q-toolbar-title>
    </q-toolbar>
    <div class="q-pa-sm">
      <q-card class="my-card" flat>
        <q-card-section>
          <InstituitionProfile />
        </q-card-section>
        <q-card-section>
          <ConnectServer />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              filled
              v-model="area.officeName"
              label="College/Office Name"
              hint="ex. Office of the Registrar"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please type something.'
              ]"
            />

            <q-input
              filled
              type="number"
              v-model="area.codeNum"
              label="Code #."
              hint="ex. 1001"
              lazy-rules
              :rules="[
                val =>
                  (val !== null && val !== '') || 'Please type the code #.',
                val => (val > 0 && val < 1001) || 'Invalid code Num.'
              ]"
            />

            <div>
              <q-btn
                :loading="showSubmitLoader"
                class="full-width"
                outline
                label="Submit"
                type="submit"
                color="indigo"
              >
                <template v-slot:loading>
                  <q-spinner-ios v-if="showSubmitLoader" class="on-left" />
                </template>
              </q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import areaProfileService from "../services/area-profile.service.js";
import InstituitionProfile from "src/components/InstituitionProfile.vue";
import ConnectServer from "src/components/ConnectServer.vue";
import serverConnection from "src/services/server-connection.service";
export default {
  name: "InstituitionInfo",
  components: { InstituitionProfile, ConnectServer },
  data() {
    return {
      officeDetails: {},
      area: {
        officeName: null,
        codeNum: null
      },
      showSubmitLoader: false
    };
  },
  mounted() {
    this.getOfficeDetails();
  },
  created() {
    areaProfileService.isItemExist("area");
  },

  methods: {
    async onSubmit() {
      serverConnection.sendData();
      this.showSubmitLoader = true;
      await areaProfileService.addProfile("area", this.area).then(() => {
        setTimeout(() => {
          this.$router.replace("/popup");
          this.notifyMessage("Welcome to Voice Receiver!", "primary");
        }, 2000);
      });
    },

    async getOfficeDetails() {
      const officeProfile = await areaProfileService.getOfficeDetails();
      this.officeDetails = officeProfile;
    },

    notifyMessage(msg, color) {
      this.$q.notify({
        message: msg,
        color: color,
        timeout: 1000,
        icon: "cloud_done",
        position: "center"
      });
    }
  }
};
</script>
