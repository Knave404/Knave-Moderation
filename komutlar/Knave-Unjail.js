const Discord = require('discord.js');
const db = require("quick.db")
const config = require("../config.js");

exports.run = async (client, message, args) => {
 if (!message.member.roles.cache.has((config.jailhammer)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
 let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
 if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().addField(`Aspasia` , `Bir kullanıcı etiketlemelisin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
 
  member.roles.add((config.kayıtsız)); //kayıtsız
  member.roles.remove((config.cezalırol)); // jail 
   
   


   const jaillog = message.guild.channels.cache.find(c => c.id == (config.jaillog))
   let embed1 = new Discord.MessageEmbed() 
   .setDescription(`<a:knave_onay:${config.onayemoji}> <@${kullanıcı.user.id}> adlı kullanıcısının cezası <@${message.author.id}> Tarafından kaldırıldı.`).setColor("RANDOM")
   jaillog.send(embed1)
   message.react((config.onayemoji))
}
   


   exports.conf = {
    aliases: ['ceza-kaldır'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'unjail'
  };