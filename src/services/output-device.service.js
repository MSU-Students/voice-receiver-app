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
}

let outputDeviceService = new OutputDeviceSevice();

export default outputDeviceService;