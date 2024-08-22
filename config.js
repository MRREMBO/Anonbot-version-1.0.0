require("./all/module")

global.owner = "628388886755" //PAKE NO LU BIAR BISA ADD AKSES
global.namabot = "ANONBOT V1" //NAMA BOT GANTI
global.namaCreator = "𝕯𝖎𝖙𝖟𝖟𝖕𝖗𝖔𝖏𝖊𝖈𝖙" //NAMA CREATOR GANTI AJA
global.autoJoin = false //NOT CHANGE / JANGAN GANTI
global.antilink = false //NOT CHANGE / JANGAN GANTI
global.versisc = '1.0.0' //NOT CHANGE / JANGAN GANTI
global.codeInvite = ""
global.imageurl = 'https://telegra.ph/file/439fa8b3cb9f3afbc56c6.jpg' //GANTI PP MU PAKE LINK TELEGRA PH ATAU PUN PKE PORNOHUB SUKA HATI LU😡
global.isLink = 'https://whatsapp.com/channel/0029VaefNUh8fewkWweWk535' ///GANTI PAKE LINK GC MU 
global.thumb = fs.readFileSync("./thumb.png") ///NOT CHANGE / JANGAN GANTI WOILAA😡
global.audionya = fs.readFileSync("./all/sound.mp3") //NOT CHANGE / JANGAN GANTI WOILAA😡
global.packname = "ANONBOT V1" //GANTI AJA 
global.author = "𝕯𝖎𝖙𝖟𝖟𝖕𝖗𝖔𝖏𝖊𝖈𝖙" //GANTI SERAH MU😡
global.jumlah = "5" ////NOT CHANGE / JANGAN GANTI🗿

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})