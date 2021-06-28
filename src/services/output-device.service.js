const audio = document.createElement("audio");
class OutputDeviceSevice {
  async playAudio(sound) {
    audio.src = sound;
    await audio.play();
    return new Promise(resolve => {
      audio.onended = () => {
        resolve({
          playEnded: false
        });
      };
    });
  }
  async devices() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      throw Error(
        "UserMediaDetector getDevices failded: enumerateDevices is not support!"
      );
    }
    await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaDevices = await navigator.mediaDevices.enumerateDevices();
    const speakers = mediaDevices.filter(
      device => device.kind === "audiooutput"
    );
    return speakers.map(d => {
      return d.label;
    });
  }
  async selectDevice(device) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const listSpeaker = devices.filter(device => device.kind === "audiooutput");
    const selectedDevice = listSpeaker.find(d => d.label == device);
    await audio.setSinkId(selectedDevice.deviceId);
    console.log('Audio is being played on ' + audio.sinkId);
  }
}

let outputDeviceService = new OutputDeviceSevice();

export default outputDeviceService;
