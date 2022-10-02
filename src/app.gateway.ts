import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

type Message = { id: string; receiverId: string; text: string; name };

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger("AppGateWay");
  private users = [];

  @SubscribeMessage("addUser")
  handleUsers(client: Socket, payload: string): void {
    this.addUsers(payload, client.id);
    this.server.emit("getUsers", this.users);
  }

  @SubscribeMessage("sendMessage")
  handleMessage(client: Socket, { id, receiverId, text, name }: Message): void {
    const user = this.getUser(receiverId);
    this.server.to(user.soketId).emit("getMessage", {
      id,
      receiverId,
      text,
      name,
    });
  }

  addUsers(payload: string, client: string): void {
    const { id, name }: any = payload;
    !this.users.some(user => user.id === id) && this.users.push({ id, name, soketId: client });
  }

  removeUser(socketId: string): void {
    this.users = this.users.filter(user => user.soketId !== socketId);
  }

  getUser(userId: string) {
    const user = this.users.find(user => user.id === userId);
    return user;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server) {
    this.logger.log("Init");
  }

  handleConnection(client: Socket) {
    // this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.removeUser(client.id);
    this.server.emit("getUsers", this.users);
    // this.logger.log(`Client disconnected: ${client.id}`);
  }
}
