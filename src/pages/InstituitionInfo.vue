<template>
  <q-page style="min-width: 440px">
    <q-toolbar
      class="text-white"
      style="background: linear-gradient(145deg, #15503e 15%, #133154 70%);"
    >
      <q-btn icon="arrow_back" flat label="Back" to="/popup" />
      <q-space />
    </q-toolbar>
    <div class="q-pa-md flex flex-center" style="max-width: 400px">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input
          filled
          v-model="area.officeName"
          label="College/Office Name"
          hint="college or office"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something.']"
        />

        <q-input
          filled
          type="number"
          v-model="area.codeNum"
          label="Code #."
          hint="sample: 1001"
          lazy-rules
          :rules="[
            val => (val !== null && val !== '') || 'Please type the code #.',
            val => (val > 0 && val < 1001) || 'Invalid code Num.'
          ]"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      area: {
        officeName: null,
        codeNum: null
      },


    };
  },

  methods: {
    onSubmit() {

      }
    },

  
};
</script>
