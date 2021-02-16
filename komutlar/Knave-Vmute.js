const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const ms = require('ms');
const moment = require("moment");
const config = require("../config.js");


exports.run = async (client, message, args) => {


  
if(![(config.vmutehammer)].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('RANDOM').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
const mutelog = message.guild.channels.cache.find(c => c.id === (config.vmutelog))


let aylartoplam = {
"01": "Ocak",
"02": "Şubat",
"03": "Mart",
"04": "Nisan",
"05": "Mayıs",
"06": "Haziran",
"07": "Temmuz",
"08": "Ağustos",
"09": "Eylül",
"10": "Ekim",
"11": "Kasım",
"12": "Aralık"};
let aylar = aylartoplam;

let kullanici = message.mentions.members.first()  || message.guild.members.cache.get(args[0]);
if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, bir kullanıcı belirt @Knave/D gibi.`).setColor('RANDOM').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.author.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Kendini  muteleyemezsin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM').setTimestamp()).then(x => x.delete({timeout: 5000}));
let sure = args[1];
let sebep = args.splice(2).join(" ");
if(!sure) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir zaman belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(!sebep) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir sebep belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.voice.channel) kullanici.voice.setMute(true).catch();
let zaman1 = args[1]
.replace("sn", "s")
.replace("dk", "m")
.replace("sa", "h")
.replace("gün", "d");

var vakit = zaman1
.replace("m", " dakika")
.replace("s", " saniye")
.replace("h", " saat")
.replace("d", " d");    



message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp().setDescription(`${kullanici.user} (${kullanici.user.tag} - \`${kullanici.user.id}\`) kişisi ${vakit} boyunca ses kanallarında susturuldu.`));
message.react(config.onayemoji)
mutelog.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp().setDescription(`${kullanici.user} (${kullanici.user.tag} - \`${kullanici.user.id}\`) kişisi ${vakit} boyunca ses kanallarında susturuldu. \n
• Susturulma sebebi: __${sebep}__
• Susturulma Süresi: __${vakit}__
• Susturan Yetkili: <@${message.author.id}>`));
setTimeout(async function() {
kullanici.voice.setMute(false);  
mutelog.send(new MessageEmbed().setColor('RANDOM').setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(`Kullanıcının Susturma Süresi Doldu. \n Kullanıcı: ${kullanici} |\` ${kullanici.id}\``))}, ms(zaman1));}; 
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["vmute", "seslisustur"],
  permLevel: 0,
}

exports.help = {
  name: "vmute"
};
