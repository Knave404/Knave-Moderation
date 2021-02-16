const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js')
const config = require("../config.js");


exports.run = async (client, message, args) => {

if (!message.member.voice.channel) {
return message.reply("Ses kanalında olman lazım!");
}
const filter = (reaction, user) => {
return [(config.onayemoji) , (config.redemoji)].includes(reaction.emoji.id) && user.id === kullanıcı.id;
};
  
let kullanıcı = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if (!kullanıcı) return message.channel.send(new MessageEmbed().setDescription(`Odasına gitmek istedğiniz kullanıcıyı belirtmeniz gerekir @Knave/İD gibi`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM').setTimestamp()).then(x => x.delete({timeout: 5000}));

let rol = message.mentions.roles.first();
let member = message.guild.member(kullanıcı);


if (!member.voice.channel) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Belirttiğin kullanıcı seste değil.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM').setTimestamp()).then(x => x.delete({timeout: 5000}));

  
let log = new Discord.MessageEmbed()
.setColor("#RANDOM")
.setDescription(`${kullanıcı}, ${message.author} \`${kullanıcı.voice.channel.name}\` Odasına Gelmek İstiyor. Kabul Ediyormusun ?`)
  
let mesaj = await message.channel.send(log)
await mesaj.react((config.onayemoji))
await mesaj.react((config.redemoji))
mesaj.awaitReactions(filter, {
max: 1,
time: 60000,
errors: ['time']
}).then(collected => {
const reaction = collected.first();
if (reaction.emoji.id === (config.onayemoji)) {
let kabul = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`${kullanıcı} Odaya Gelmeni Onayladı.`)
message.channel.send(kabul)
message.member.voice.setChannel(kullanıcı.voice.channel.id)
} else {
let knave = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`${kullanıcı} Odaya Gelmeni Onaylamadı.`)
message.channel.send(knave)
}
})}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["git"],
  permLevel: 0,
}

exports.help = {
  name: "git"
};