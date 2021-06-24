<template>
  <q-item v-if="officeDetails.length == null">
    <q-item-section avatar>
      <q-icon size="35px" color="indigo" name="maps_home_work" />
    </q-item-section>
    <q-item-section>
      <q-item-label> {{ officeDetails.officeName }}</q-item-label>
      <q-item-label caption> @{{ officeDetails.codeNum }}</q-item-label>
    </q-item-section>
    <q-item-section>
      <q-item-label>
        <q-badge outline color="red" label="Not connected"
      /></q-item-label>
    </q-item-section>
  </q-item>
  <q-item v-else>
    <q-item-section avatar>
      <q-icon size="35px" color="indigo" name="maps_home_work" />
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-red">
        No College or Office Found!
      </q-item-label>
      <q-item-label caption> Please register...</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import areaProfileService from "../services/area-profile.service.js";
export default {
  name: "InstituitionProfile",
  data() {
    return {
      officeDetails: {},
      area: {
        officeName: null,
        codeNum: null
      }
    };
  },
  mounted() {
    this.getOfficeDetails();
  },
  created() {
    areaProfileService.isItemExist("area");
  },
  methods: {
    async getOfficeDetails() {
      const officeProfile = await areaProfileService.getOfficeDetails();
      this.officeDetails = officeProfile;
      console.log("length: ", this.officeDetails.length);
    }
  }
};
</script>
