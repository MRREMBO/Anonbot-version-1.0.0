require("./all/global")

const func = require("./all/place")
const readline = require("readline");
const usePairingCode = true
const question = (text) => {
  const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
  });
  return new Promise((resolve) => {
rl.question(text, resolve)
  })
};
async function startSesi() {

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const { state, saveCreds } = await useMultiFileAuthState(`./session`)
const { version, isLatest } = await fetchLatestBaileysVersion()
console.log(chalk.red.bold('</> #################################### •'))
const connectionOptions = {
version,
keepAliveIntervalMs: 30000,
printQRInTerminal: !usePairingCode,
logger: pino({ level: "fatal" }),
auth: state,
browser: [ "Ubuntu", "Chrome", "20.0.04" ]   
// browser: ['Chrome (Linux)', '', '']
}
const Ditzz = func.makeWASocket(connectionOptions)
if(usePairingCode && !Ditzz.authState.creds.registered) {
		const phoneNumber = await question('Masukan Nomer Yang Aktif Tanpa + , - Dan spasi:\n');
		const code = await Ditzz.requestPairingCode(phoneNumber.trim())
		console.log(chalk.red.bold(`=> [ ${code} ] <=`))

	}
store.bind(Ditzz.ev)

Ditzz.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
const reason = new Boom(lastDisconnect?.error)?.output.statusCode
console.log(color(lastDisconnect.error, 'deeppink'))
if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
process.exit()
} else if (reason === DisconnectReason.badSession) {
console.log(color(`Bad Session File, Please Delete Session and Scan Again`))
process.exit()
} else if (reason === DisconnectReason.connectionClosed) {
console.log(color('[SYSTEM]', 'white'), color('Connection closed, reconnecting...', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionLost) {
console.log(color('[SYSTEM]', 'white'), color('Connection lost, trying to reconnect', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(color('Connection Replaced, Another New Session Opened, Please Close Current Session First'))
Ditzz.logout()
} else if (reason === DisconnectReason.loggedOut) {
console.log(color(`Device Logged Out, Please Scan Again And Run.`))
Ditzz.logout()
} else if (reason === DisconnectReason.restartRequired) {
console.log(color('Restart Required, Restarting...'))
await startSesi()
} else if (reason === DisconnectReason.timedOut) {
console.log(color('Connection TimedOut, Reconnecting...'))
startSesi()
}
} else if (connection === "connecting") {
start(`1`, `Connecting...`)
} else if (connection === "open") {
success(`1`, `Tersambung`)
Ditzz.sendMessage(`628388886755@s.whatsapp.net`, { text: `✅ Bot succes connect

CONNECTING *DONE* ✅
CREDIT : 𝕯𝖎𝖙𝖟𝖟𝖕𝖗𝖔𝖏𝖊𝖈𝖙`})
if (autoJoin) {
Ditzz.groupAcceptInvite(codeInvite)
}
}
})

Ditzz.ev.on('messages.upsert', async (chatUpdate) => {
try {
m = chatUpdate.messages[0]
if (!m.message) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
if (m.key && m.key.remoteJid === 'status@broadcast') return Ditzz.readMessages([m.key])
if (!Ditzz.public && !m.key.fromMe && chatUpdate.type === 'notify') return
if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
m = func.smsg(Ditzz, m, store)
require("./case")(Ditzz, m, store)
} catch (err) {
console.log(err)
}
})

Ditzz.ev.on('contacts.update', (update) => {
for (let contact of update) {
let id = Ditzz.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

Ditzz.public = true

Ditzz.ev.on('creds.update', saveCreds)
return Ditzz
}

startSesi()

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err)
})