import { Room, Client } from "@colyseus/core";
import { MyRoomState } from "./schema/MyRoomState";
import {GameRoomState} from "./schema/GameRoomState";

export class MyRoom extends Room<GameRoomState> {
  maxClients = 10;

  onCreate (options: any) {
    this.setState(new GameRoomState());

    this.onMessage("*", (client, message) => {
      //
      // handle "type" message
      //
      this.broadcast("Message: ", client.sessionId + " chat: " + message + " Number online: " + this.state.online, { except: client})
    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    this.state.online++;
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    this.state.online--;
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
