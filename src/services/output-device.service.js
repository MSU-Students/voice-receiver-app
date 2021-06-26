class OutputDeviceSevice {
    async playAudio(sound) {
        const audio = new Audio(sound);
        await audio .play();
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
        throw(Error("UserMediaDetector getDevices failded: enumerateDevices is not support!"));
      } 
      await navigator.mediaDevices.getUserMedia({  audio: true });
      const mediaDevices = await navigator.mediaDevices.enumerateDevices();
      const speakers = mediaDevices.filter(device => device.kind === "audiooutput");
      return speakers.map(d => {
        return d.label;
      });
    }
    async setConnectedDevices(device) {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const listSpeaker = devices.filter(device => device.kind === "audiooutput");
      let selectedDevice = listSpeaker.find(d => d.label == device);
      console.log('selected device: ', selectedDevice);
      return selectedDevice;
    }
}

let outputDeviceService = new OutputDeviceSevice();

export default outputDeviceService;