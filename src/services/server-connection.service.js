import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

let bufferArray = [];
class ServerConnectionService {
  async connect(ip, port) {
    return new Promise((resolve, reject) => {
      const live = "https://voice-serve.herokuapp.com/ws";
      const dev = `http://${ip}:${port}/ws`;
      this.socket = new SockJS(dev);
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.debug = () => {};
      const stomp = this.stompClient.connect(
        {},
        frame => {
          resolve(frame);
          this.stompClient.subscribe("/topic/announcements", async tick => {
            let buffer = JSON.parse(tick.body);
            const headers = tick.headers;

            const data = buffer.content;
            const validEncoding = "data:audio/webm;codecs=opus;base64,";
            if (data.startsWith(validEncoding)) {
              this.play(headers["message-id"], data.substr(validEncoding.length));
            }
          });
        },
        error => {
          resolve(error);
          console.log("Cannot connect to server.");
        }
      );
    });
  }
  startPlayer() {
    const self = this;
    var mediaSource = new MediaSource();
    
    this.player.src = window.URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', async function(e) {
       self.sourceBuffer = mediaSource.addSourceBuffer('audio/webm\;codecs=opus');
    });
    //this.player.autoplay = true;
    this.player.play();
  }
  sourceBuffer = null;
  player = new Audio();
  async play(msgId, message) {
    const self = this;
    console.log("Queue ", msgId);
    
    if (self.sourceBuffer && self.sourceBuffer.updating) {
      await (new Promise((resolve) => {
        self.sourceBuffer.onupdateend = resolve;
      }))
    }
    
    self.sourceBuffer.appendBuffer(Buffer.from(message, 'base64'));
    
    await (new Promise((resolve) => {
      self.sourceBuffer.onupdateend = resolve;
      console.log('done appending ', msgId);
    }))
    
    //self.player.play(); 
  }

  blobs = [];
  play2(msgId, data) {
    //start
  
    const self = this;
    self.blobs.push(data);
    var mediaSource = new MediaSource();
    let sourceBuffer = undefined;
    var replay = new Audio();
    replay.src = window.URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', async function(e) {
        sourceBuffer = mediaSource.addSourceBuffer('audio/webm\;codecs=opus');

        for (let index = 0; index < self.blobs.length; index++) {
          const blob = self.blobs[index];
          if (sourceBuffer && sourceBuffer.updating) {
            await (new Promise((resolve) => {
              sourceBuffer.onupdateend = resolve;
            }))
            
          }
          
          const head = 'data:audio/webm;codecs=opus;base64,';
          sourceBuffer.appendBuffer(Buffer.from(blob.substr(head.length), 'base64'));
        }
        
        
        console.log('playing...........', self.blobs.length);
    });
    //send multiple 
  }
  

  async disconnect() {
    if (this.stompClient) {
      await this.stompClient.disconnect();
    }
  }

  async sendData(clientInfo) {
    if (this.stompClient && this.stompClient.connected) {
      await this.stompClient.send("/app/instituition", JSON.stringify(clientInfo), {});
    } else {
      console.log("Not connected to server! ");
    }
  }

  async tickleConnection() {
    (await this.isConnected) ? this.disconnect() : this.connect();
  }

  async isItemExist(itemName) {
    if (localStorage.getItem(itemName) !== null) {
      console.log(`IP exist`);
    } else {
      console.log(`ip not found`);
      let ip = JSON.stringify("");
      this.addServerIP("server_ip", ip);
    }
  }
  async addServerIP(key, val) {
    let ip = JSON.stringify(val);
    return await localStorage.setItem(key, ip);
  }
  async getIpAddress() {
    let ip = JSON.parse(localStorage.getItem("server_ip"));
    return await ip;
  }
}

let serverConnectionService = new ServerConnectionService();

export default serverConnectionService;
