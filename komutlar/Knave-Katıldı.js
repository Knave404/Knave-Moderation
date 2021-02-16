const { MessageEmbed } = require('discord.js')
const { config1 } = require('process')
const data = require('quick.db')
const config = require("../config.js");

exports.run = async (client, message, args) => {
if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription(`${message.author} bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın.`).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor("RANDOM")).then(x => x.delete({timeout: 6500}));
let members = message.guild.members.cache.filter(member => member.roles.cache.has(config.katıldırol) && member.voice.channelID != config.toplantikanal);
if (!message.member.voice.channelID) return message.reply("bir ses kanalinda olmalisin!")
members.array().forEach((member, index) => {setTimeout(() => {member.roles.remove(config.katıldırol).catch();}, index * 1250)});
let verildi = message.member.voice.channel.members.filter(member => !member.roles.cache.has(config.katıldırol) && !member.user.bot)
verildi.array().forEach((member, index) => {setTimeout(() => {member.roles.add(config.katıldırol).catch();}, index * 1250)});
message.channel.send(new MessageEmbed().setDescription(`<@&${config.katıldırol}> Rolü Dağıtılmaya Başladı.\n\n ${config.onayemoji1} Toplam Rol Verilen Kullanıcı: \n \`${verildi.size}\` \n\n ${config.redemoji1} Rolleri Geri Alınan Kullanıcı Sayısı: \n \`${members.size}\``).setColor('RANDOM').setTitle(`Toplantı Yoklaması Alındı.`).setThumbnail(message.guild.iconURL({dynamic:true})))}
exports.conf = {
    aliases: ['katıldı'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'katıldı'
  }; 