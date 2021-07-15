<template>
  <q-page style="min-width: 570px">
    <q-toolbar
      class="text-white"
      style="background: linear-gradient(145deg, #15503e 15%, #133154 70%);"
    >
      <q-btn icon="arrow_back" flat label="Back" to="/popup" />
      <q-toolbar-title class="text-center">
        <strong>Instituition</strong> Info
      </q-toolbar-title>
    </q-toolbar>
    <div class="q-pa-md">
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="col-6">
            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold "
                  >Server Setting</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-form @submit="save()" class="q-gutter-xs">
              <q-input
                dense
                filled
                v-model="server.ipAddress"
                label="IP Address"
                hint="ex. 192.168.100.1"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please type something.'
                ]"
              />

              <q-input
                dense
                filled
                v-model="server.port"
                label="Port"
                hint="ex. 8080"
                lazy-rules
                :rules="[
                  val => (val !== null && val !== '') || 'Please type port #.'
                ]"
              />

              <div>
                <q-btn
                  :loading="showSaveLoader"
                  class="full-width"
                  label="Save"
                  type="submit"
                  color="indigo"
                >
                </q-btn>
              </div>
            </q-form>
          </q-card-section>
          <q-separator vertical />
          <q-card-section class="col-6">
            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold "
                  >Office Details</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <q-input
                filled
                v-model="area.client"
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
                v-model="area.code"
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
                  label="Send"
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
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import areaProfileService from "../services/area-profile.service.js";
import serverConnection from "src/services/server-connection.service";
export default {
  name: "InstituitionInfo",

  data() {
    return {
      officeDetails: {},
      area: {
        client: null,
        code: null,
        status: "Online"
      },
      showSubmitLoader: false,
      showSaveLoader: false,
      server: {
        ipAddress: null,
        port: null
      },
      server_ip: {}
    };
  },
  mounted() {
    this.getOfficeDetails();
  },
  created() {
    areaProfileService.isItemExist("area");
    serverConnection.isItemExist("server_ip");
  },

  methods: {
    async onSubmit() {
      this.showSubmitLoader = true;
      await areaProfileService.addProfile("area", this.area).then(() => {
        setTimeout(() => {
          this.$router.replace("/popup");
          serverConnection.sendData(this.area);
          this.notifyMessage("Welcome to Voice Receiver!", "primary");
        }, 2000);
      });
    },

    async getOfficeDetails() {
      const officeProfile = await areaProfileService.getOfficeDetails();
      this.officeDetails = officeProfile;
    },

    async save() {
      this.showSaveLoader = true;
      await serverConnection
        .addServerIP("server_ip", this.server)
        .then(() => {
          setTimeout(() => {
            this.showSaveLoader = false;
            this.$router.replace("/popup");
            this.notifyMessage("IP Address and Port configured!", "green");
          }, 2000);
        });
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
