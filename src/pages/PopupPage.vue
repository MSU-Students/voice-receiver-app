<template>
  <q-page padding :style="$q.screen.lt.md ? 'min-width: 570px' : ''">
    <div class="q-pa-sm">
      <InstituitionProfile />
      <q-card class="my-card" flat>
      <q-separator />
        <q-card-section>
          <ConnectServer/>
        </q-card-section>
        <q-card-section v-if="isSpeakerOn" class="text-center">
          <q-btn
            class="shadow-10"
            size="35px"
            round
            outline
            color="info"
            text-color="green"
            icon="volume_up"
            @click="muteSpeaker()"
          >
            <q-tooltip
              content-class="bg-red text-white shadow-4" :offset="[10, 10]"
            >
              Are you sure, you want to mute broadcasting?
            </q-tooltip>
          </q-btn>
          <div class="row justify-center text-overline q-pt-sm">
            {{ status }}
          </div>
        </q-card-section>
        <q-card-section v-else class="text-center">
          <q-btn
            size="35px"
            round
            outline
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
              :options="speakers"
              outlined
              label="Select Microphone"
              v-model="selectedDevice"
              @input="setConnectedDevices($event)"
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
import ConnectServer from "src/components/ConnectServer.vue";
import serverConnectionService from "../services/server-connection.service.js"
export default {
  name: "PopupPage",
  components: { InstituitionProfile, ConnectServer },
  data() {
    return {
      isSpeakerOn: true,
      status: "Press to mute",
      showAudioLoader: false,
      speakers: [],
      selectedDevice: "",
      soundStreamSelected: undefined
    };
  },

  async created() {
    const devices = await outputDeviceService.devices();
    this.speakers = devices;
    this.selectedDevice = devices[0];
  },

  methods: {
    onSpeaker() {
      this.isSpeakerOn = true;
      serverConnectionService.unmute();
    },
    muteSpeaker() {
      this.isSpeakerOn = false;
      serverConnectionService.mute();
    },
    async playSound() {
      const audio = require("src/assets/audio/countdown.mp3");
      this.showAudioLoader = true;
      await outputDeviceService.playAudio(audio);
      this.showAudioLoader = audio.playEnded;
    },
    async setConnectedDevices(device) {
      await outputDeviceService.selectDevice(device);
    }
  }
};
</script>
