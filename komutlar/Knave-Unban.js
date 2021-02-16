const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const moment = require('moment')
exports.run = async (client, message, args) => {

  
  
if(![(config.banhammer)].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için <@&${config.banhammer}> rolune sahip olmalisin.`).setColor('RANDOM').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));





  
  
let knaveqwe = await client.users.fetch(args[0]);
if(!knaveqwe) return message.channel.send(new MessageEmbed().setDescription(`${message.author} bir @Knave/İD belirtmelisin.`).setColor('RANDOM').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

message.guild.members.unban(knaveqwe.id)
message.channel.send(new MessageEmbed().setDescription(`${message.author} tarafından ${knaveqwe} adlı kullanıcının sunucu yasağı kaldırıldı.`).setColor('RANDOM').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic:true }))).then(x => x.delete({ timeout: 5000}))
  
message.react((config.onayemoji))

}
  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unban", "yasak-kaldır"],
  permLvl: 0,
}

  exports.help = {
  name: 'unban'
}

