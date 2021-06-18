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
              <strong>Mute My Speaker </strong>
              <q-icon size="20px" name="volume_off" />
            </q-tooltip>
          </q-btn>
          <div class="row justify-center text-overline">
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
            <q-badge text-color="black" color="yellow-5">
              Press to Unmute..
            </q-badge>
            
          </div>
          <!-- <q-tooltip anchor="center middle" self="center middle" :offset="[10, 10]">
            <strong>Unmute My Audio </strong>
            <q-icon size="20px" name="volume_off"/>
          </q-tooltip> -->
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
      status: "Speaking..."
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
