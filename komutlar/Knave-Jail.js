const Discord = require('discord.js');
const db = require("quick.db")
const config = require("../config.js");

exports.run = async (client, message, args) => {
 if (!message.member.roles.cache.has((config.jailhammer)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Bu komutu kullanabilmek için** <@&${config.jailhammer}> **Yetkisine Sahip Olman Gerek**`).setColor("Black"));
 let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  if (!member ) return message.channel.send(new Discord.MessageEmbed().setDescription('**Bir @Knave#1987/İD belirtmelisin.**').setColor("RANDOM"));
   let Knavesebep = args.slice(1).join(" ")
      if(!Knavesebep) return message.channel.send("**Lütfen Bir Sebep Yazınız**").then(m => m.delete({timeout: 5000}))
      message.guild.member(member.id).voice.setChannel(null)

  member.roles.set(member.roles.cache.has(config.booster) ? [config.booster , config.cezalırol] : [config.cezalırol]);
     const jaillog = message.guild.channels.cache.find(c => c.id == (config.jaillog))
     let embed1 = new Discord.MessageEmbed() 
     .setDescription(`<a:knave_onay:${config.onayemoji}> <@${member.id}> adlı kullanıcı __${Knavesebep}__ Sebebiyle <@${message.author.id}> Tarafından cezalıya atıldı.`).setColor("RANDOM")
     jaillog.send(embed1)
}

exports.conf = {
    aliases: ['cezalı'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'jail'
  }; 