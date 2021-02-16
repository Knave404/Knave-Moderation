const { MessageEmbed } = require('discord.js');
const config = require("../config.js");

exports.run = async(client, message, args) => {
  
if(![(config.transport)].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('RANDOM').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
if(!args[0]) return message.channel.send(new MessageEmbed().setDescription(`${message.author} bir @Knave/İD belirtmelisin.`).setColor('RANDOM').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

const kanal = message.member.voiceChannel
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if (!member.voice.channel) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Belirttiğin kullanıcı seste değil.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM').setTimestamp()).then(x => x.delete({timeout: 5000}));

if(!member) return;
if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM').setTimestamp()).then(x => x.delete({timeout: 5000}));
message.guild.member(member.id).voice.setChannel(null)
 
   message.channel.send(new MessageEmbed().setDescription(`${member} Kullancısının ${message.author} Tarafından Bağlantısı Kesildi.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM').setTimestamp()).then(x => x.delete({timeout: 5000}));
   message.react((config.onayemoji))
}
exports.conf = { 
enabled: true, 
guildOnly: true, 
aliases: ["bk"]
}

exports.help = {
name: "kes" 
}

