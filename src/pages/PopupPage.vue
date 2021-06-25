<template>
  <q-page padding style="min-width: 570px">
    <div class="q-pa-md">
      <q-card class="my-card" flat>
        <InstituitionProfile />
        <q-separator />
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
        <q-card-section>
          <div class="text-subtitle2 text-blue-grey-9 q-pb-sm">
            Speaker:
          </div>
          <div class="q-gutter-sm">
            <q-select 
            class="full-width" 
            outlined 
            label="Select Speaker"
            v-model="selectDevice"
            :options="speakers" 
            />
            <q-btn
              :loading="showAudioLoader"
              no-caps
              outline
              rounded
              color="blue-9"
              icon="volume_up"
              label="Test Speaker"
              style="width: 140px"
              class="full-width"
              @click="playSound()"
            >
              <template v-slot:loading>
                <q-spinner-audio v-if="showAudioLoader" class="on-left" />
                Playing...
              </template>
              <q-tooltip
                content-class="bg-yellow-11 text-black"
                anchor="top middle"
                self="bottom middle"
              >
                Click Test Speaker to make sure it working!
              </q-tooltip>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import outputDeviceService from "src/services/output-device.service.js";
import InstituitionProfile from "src/components/InstituitionProfile.vue";
export default {
  name: "PopupPage",
  components: { InstituitionProfile },
  data() {
    return {
      isSpeakerOn: true,
      status: "Listening...",
      showAudioLoader: false,
      speakers: [],
      selectDevice: ""
    };
  },
  methods: {
    onSpeaker() {
      return (this.isSpeakerOn = true);
    },
    muteSpeaker() {
      return (this.isSpeakerOn = false);
    },
    async playSound() {
      const audio = require("src/assets/audio/countdown.mp3");
      this.showAudioLoader = true;
      let sound = await outputDeviceService.playAudio(audio);
      this.showAudioLoader = audio.playEnded;
    }
  }
};
</script>
