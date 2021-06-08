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
          >
          <q-tooltip anchor="center middle" self="center middle" :offset="[10, 10]">
            <strong>Mute My Audio </strong>
            <q-icon size="20px" name="mic_off"/>
          </q-tooltip>
          </q-btn>
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
          <q-tooltip anchor="center middle" self="center middle" :offset="[10, 10]">
            <strong>Unmute My Audio </strong>
            <q-icon size="20px" name="volume_off"/>
          </q-tooltip>
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
