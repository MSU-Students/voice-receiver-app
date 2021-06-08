<template>
  <q-page padding style="min-width: 440px">
    <div class="q-pa-md">
      <q-card class="my-card" flat>
        <q-card-section v-if="isSpeakerOn" class="text-center">
          <q-btn
            class="shadow-13"
            size="35px"
            round
            color="green-6"
            icon="mic"
            @click="muteSpeaker()"
          />
          <div class="row justify-center text-overline">
            {{ status }}
            <q-spinner-audio
              color="primary"
              size="2em"
            />
          </div>
        
        </q-card-section>
        <q-card-section v-else class="text-center">
          <q-btn
            class="shadow-7"
            size="35px"
            round
            color="light-green-10"
            icon="mic_off"
            @click="onSpeaker()"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PopupPage",
  data() {
    return {
      isSpeakerOn: true,
      status: 'Speaking...'
    };
  },
  methods: {
    onSpeaker() {
      return this.isSpeakerOn = true;
    },
    muteSpeaker() {
      return this.isSpeakerOn = false;
    }
  }
};
</script>
