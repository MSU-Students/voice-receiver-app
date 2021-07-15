import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

let index = 0;
class ServerConnectionService {
  async connect(ip, port) {
    return new Promise((resolve, reject) => {
      const live = "https://voice-serve.herokuapp.com/ws";
      const dev = `http://${ip}:${port}/ws`;
      this.socket = new SockJS(dev);
      this.stompClient = Stomp.over(this.socket);
      const stomp = this.stompClient.connect(
        {},
        frame => {
          resolve(frame);
          this.stompClient.subscribe("/topic/announcements", async tick => {
            let buffer = JSON.parse(tick.body);
            // const message = buffer.content.split(",");
            const message = buffer.content;
            this.play(message);
          });
          this.stompClient.subscribe("/topic/register", tick => {
            let buffer = JSON.parse(tick.body);
            console.log(buffer);
          });
        },
        error => {
          resolve(error);
          console.log("Cannot connect to server.");
        }
      );
    });
  }
  player = Promise.resolve();
  async play(message) {
    await this.player;
    this.player = new Promise(resolve => {
      console.log("omair: ", message.data);
      var announce = new Audio("data:audio/wav;base64," + message.data);
      announce.play();
      announce.onended = resolve;
    });
  }
  async disconnect() {
    if (this.stompClient) {
      await this.stompClient.disconnect();
    }
  }

  async sendData() {
    if (this.stompClient && this.stompClient.connected) {
      const msg = { institution: "CIT", code: "1234", status: "online" };
      //console.log(JSON.stringify(msg));
      await this.stompClient.send("/app/instituition", JSON.stringify(msg), {});
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
