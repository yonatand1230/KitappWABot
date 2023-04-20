const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});
client.on("qr", qr => {
    qrcode.generate(qr, {small: true});
});

client.on("ready", () => {
    console.log("Ready!");
});

client.on("message", message => {
	if(message.body === "שלום!") {
		client.sendMessage(message.from, "שלום");
	}
});


client.on("message", async (msg) => {
    const mentions = await msg.getMentions();
    
    for(let contact of mentions) {
        client.sendMessage(msg.from, "מישהו קרא לי?")
    }
});




client.initialize();
