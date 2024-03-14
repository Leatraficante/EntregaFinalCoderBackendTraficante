export default class MessagesDto {
    constructor(message) {
      this.user = message.user;
      this.message = message.message;
      this.date = message.date;
    }
  };