<template>
  <q-page padding style="min-width: 440px">
    <div class="q-pa-md">
      <q-card class="my-card" flat>
        <q-card-section v-if="isSpeakerOn" class="text-center">
          <q-btn
            class="shadow-13"
            size="35px"
            round
            color="green-7"
            icon="volume_up"
            @click="muteSpeaker()"
          >
            <q-tooltip
              anchor="center middle"
              self="center middle"
              :offset="[10, 10]"
            >
              <strong>Press to Mute </strong>
              <q-icon size="20px" name="volume_off" />
            </q-tooltip>
          </q-btn>
          <div class="row justify-center text-overline q-pt-sm">
            {{ status }}
            <q-spinner-audio color="primary" size="2em" />
          </div>
        </q-card-section>
        <q-card-section v-else class="text-center">
          <q-btn
            size="35px"
            round
            color="red-6"
            icon="volume_off"
            @click="onSpeaker()"
          />
          <div class="row justify-center q-pt-sm text-overline">
            Press to Unmute
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            outline
            icon="maps_home_work"
            color="indigo"
            label="Instituition Info"
            to="/office"
            no-caps
          />
        </q-card-actions>
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
      status: "Listening...",
      tab: ''
    };
  },
  methods: {
    onSpeaker() {
      return (this.isSpeakerOn = true);
    },
    muteSpeaker() {
      return (this.isSpeakerOn = false);
    }
  }
};
</script>
