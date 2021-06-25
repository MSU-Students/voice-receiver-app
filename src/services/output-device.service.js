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
    }
}

let outputDeviceService = new OutputDeviceSevice();

export default outputDeviceService;