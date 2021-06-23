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
}

let outputDeviceService = new OutputDeviceSevice();

export default outputDeviceService;