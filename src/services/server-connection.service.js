import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

class ServerConnectionService {
  async connect() {
    return new Promise(resolve => {
      this.socket = new SockJS("http://192.168.43.140:9000/ws");
      this.stompClient = Stomp.over(this.socket);
      const stomp = this.stompClient.connect(
        {},
        frame => {
          resolve(frame);
          this.stompClient.subscribe("/topic/announcements", tick => {
            let buffer = JSON.parse(tick.body);
            console.log(buffer.content.split(","));
            let arrayBuffer = buffer.content.split(",");
            var snd = new Audio("data:audio/wav;base64," + arrayBuffer[1]);
            snd.play();
          });
        },
        error => {
          //reject(error);
          console.log("Cannot connect to server.");
        }
      );
    });
  }
  async disconnect() {
    if (this.stompClient) {
      await this.stompClient.disconnect();
    }
  }
  async send(message) {
    console.log("Send message: " + message);
    if (this.stompClient && this.stompClient.connected) {
      const msg = { name: message };
      console.log(JSON.stringify(msg));
      await this.stompClient.send("/app/information", JSON.stringify(msg), {});
    } else {
      console.log("Not connected to server! ");
    }
  }
  async tickleConnection() {
    (await this.isConnected) ? this.disconnect() : this.connect();
  }
}

let serverConnectionService = new ServerConnectionService();

export default serverConnectionService;
