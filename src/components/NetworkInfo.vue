<template>
  <div class="q-pa-md">
    <q-form  class="q-gutter-md">
      <q-input
        filled
        v-model="ipAddress"
        label="IP Address"
        hint="ex. 192.168.100.1"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something.']"
      />

      <q-input
        filled
        type="number"
        v-model="port"
        label="Port"
        hint="ex. 8080"
        lazy-rules
        :rules="[
          val => (val !== null && val !== '') || 'Please type the code #.',
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
          <!-- <template v-slot:loading>
            <q-spinner-ios v-if="showSubmitLoader" class="on-left" />
          </template> -->
        </q-btn>
      </div>
    </q-form>
  </div>
</template>
<script>
export default {
    data() {
        return {
            showSubmitLoader: false,
            ipAddress: '',
            port: ''
        }
    }
}
</script>