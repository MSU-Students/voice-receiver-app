<template>
  <q-page style="min-width: 440px">
    <q-toolbar
      class="text-white"
      style="background: linear-gradient(145deg, #15503e 15%, #133154 70%);"
    >
      <q-btn icon="arrow_back" flat label="Back" to="/popup" />
      <q-toolbar-title class="text-center">
        Instituition Info
      </q-toolbar-title>
    </q-toolbar>

    <div class="q-pa-sm">
      <q-card class="my-card" flat>
        <q-card-section>
          <q-item>
            <q-item-section avatar>
              <q-icon size="35px" color="indigo" name="maps_home_work" />
            </q-item-section>
            <q-item-section>
              <q-item-label> {{ officeDetails.officeName }}</q-item-label>
              <q-item-label caption> {{ officeDetails.codeNum }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              filled
              v-model="area.officeName"
              label="College/Office Name"
              hint="college or office"
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
              hint="sample: 1001"
              lazy-rules
              :rules="[
                val =>
                  (val !== null && val !== '') || 'Please type the code #.',
                val => (val > 0 && val < 1001) || 'Invalid code Num.'
              ]"
            />

            <div>
              <q-btn
                class="full-width"
                outline
                label="Submit"
                type="submit"
                color="indigo"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import areaProfileService from "../services/area-profile.service.js";
export default {
  data() {
    return {
      officeDetails: {},
      area: {
        officeName: null,
        codeNum: null
      }
    };
  },

  created() {
    this.getOfficeDetails();
  },

  methods: {
    async onSubmit() {
      areaProfileService.addProfile("area", this.area);
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Submitted"
      });
    },

    async getOfficeDetails() {
      const officeProfile = await areaProfileService.getOfficeDetails();
      this.officeDetails = officeProfile;
    }
  }
};
</script>
