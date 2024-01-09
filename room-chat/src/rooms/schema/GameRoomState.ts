import { Schema, Context, type } from "@colyseus/schema";
export class GameRoomState extends Schema {

    @type("number") online: number = 0;

}
