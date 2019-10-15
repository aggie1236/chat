const SocketIO = require("socket.io");
let io = null;
module.exports = {
  init(server) {
    io = SocketIO(server);
    const messages = [];
    const members = {};
    io.on("connection", async function(socket) {
      const socketId = socket.id;
      console.log("socket connection");

      socket.on("msg", function(msg) {
        if (msg.channel.channelId === "all") {
          io.emit("uploadMsg", msg);
        } else {
          io.in(msg.channel.channelId).emit("uploadMsg", msg);
        }
      });

      socket.on("login", (memberData, fn) => {
        const memberId = memberData.memberId;

        members[socketId] = memberData;
        members[socketId].socketId = socketId;
        fn();
        io.emit("uploadMember", members);
      });

      socket.on("newChannel", (data, callback) => {
        // 新增聊天室
        socket.join(data.channelId, () => {
          let rooms = Object.keys(socket.rooms);
          callback();
        });
      });

      socket.on("inviteMember", (data, callback) => {
        // 邀請某人加入聊天室
        console.log("inviteMember");
        io.to(data.member.socketId).emit("joinChannel", data.channel);
        callback();
      });

      socket.on("acceptJoin", (channel, callback) => {
        // 接受聊天室邀請
        console.log("acceptJoin", channel);
        socket.join(channel.channelId, () => {
          callback();
          io.to(channel.channelId).emit("comming");
        });
      });

      socket.on("disconnect", () => {
        delete members[socketId];
        io.emit("uploadMember", members);
      });
      socket.on("error", error => {
        console.log(error);
        io.emit("error", error);
      });
    });
  }
};
