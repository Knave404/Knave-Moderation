const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js')
const config = require("../config.js");


exports.run = async (client, message, args) => {

if (!message.member.voice.channel) {
return message.reply("Ses kanalında olman lazım!");
}
const filter = (reaction, user) => {
return [(config.onayemoji) , (config.redemoji) ].includes(reaction.emoji.id) && user.id === kullanıcı.id;
};
  
let kullanıcı = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if (!kullanıcı) return message.channel.send(new MessageEmbed().setDescription(`Bir kullanıcıyı sese çekmek istiyorsan o kullanıcıyı belirtmen @Knave/İD gibi.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM').setTimestamp()).then(x => x.delete({timeout: 5000}));

let member = message.guild.member(kullanıcı);

if (!member.voice.channel) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Belirttiğin kullanıcı seste değil.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM').setTimestamp()).then(x => x.delete({timeout: 5000}));

const voiceChannel = message.member.voice.channel.id;
if (!voiceChannel) return;
  
let log = new Discord.MessageEmbed()
.setColor("#RANDOM")
.setDescription(`${kullanıcı}, ${message.author} \`${message.member.voice.channel.name}\` Odasına Çekmek İstiyor. Kabul ediyormusun ?`)
  
let knavemesaj = await message.channel.send(log)
await knavemesaj.react((config.onayemoji))
await knavemesaj.react((config.redemoji))
knavemesaj.awaitReactions(filter, {
max: 1,
time: 60000,
errors: ['time']
}).then(collected => {
const reaction = collected.first();
if (reaction.emoji.id === (config.onayemoji)) {
let kabul = new Discord.MessageEmbed()
.setColor("0x348f36")
.setDescription(`${kullanıcı} Odaya Çekilme Teklifini Onayladı`)
message.channel.send(kabul)
kullanıcı.voice.setChannel(message.member.voice.channel.id)
} else {
let knave = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`${kullanıcı} Odaya Çekilme Teklifini Reddetti`)
message.channel.send(knave)
}
})
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["gel"],
  permLevel: 0,
}

exports.help = {
  name: 'çek'
  
}