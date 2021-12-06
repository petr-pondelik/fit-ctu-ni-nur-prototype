export interface IMessage {
	id: number,
	msg: string
}


class MessagesModel {

	dataDefinition: Array<IMessage> = [];
	data: Array<IMessage> = [];

	constructor() {
		let sessionMessages: string | null = sessionStorage.getItem('messages');
		sessionMessages !== null ? this.constructFromSession(sessionMessages) : this.constructFromDataDefinition();
	}

	constructFromDataDefinition() {
		this.data = [];
		sessionStorage.setItem('messages', JSON.stringify(this.data));
	}

	/**
	 * @param sessionMessages
	 */
	constructFromSession(sessionMessages: string) {
		let messages: Array<IMessage> = JSON.parse(sessionMessages);
		/** Construct events from session */
		for (const m of messages) {
			this.data.push(m);
		}
	}

	/**
	 * @param message
	 */
	push(message: string) {
		this.data.push({
			id: this.data.length + 1,
			msg: message
		});
		sessionStorage.setItem('messages', JSON.stringify(this.data));
	}

	pop() {
		let msg = this.data.pop();
		sessionStorage.setItem('messages', JSON.stringify(this.data));
		return msg;
	}

}

export default new MessagesModel();