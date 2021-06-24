<template>
  <q-item>
    <q-item-section avatar>
      <q-icon size="35px" color="indigo" name="maps_home_work" />
    </q-item-section>
    <q-item-section>
      <q-item-label> {{ officeDetails.officeName }}</q-item-label>
      <q-item-label caption> @{{ officeDetails.codeNum }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import outputDeviceService from "src/services/output-device.service.js"
export default {
  name: 'InstituitionProfile',
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
  methods: {
    async getOfficeDetails() {
      const officeProfile = await areaProfileService.getOfficeDetails();
      this.officeDetails = officeProfile;
    },
  }
}
</script>