
const { MessageEmbed } = require("discord.js");
const data = require("quick.db");
const config = require("../config.js");
const ms = require('ms');
const moment = require('moment');
module.exports.run = async (client, message, args) => {
  


if(![(config.mutehammer)].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için <@${config.mutehammer}> rolune sahip olmalisin.`).setColor('RANDOM').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
const mutelog = message.guild.channels.cache.find(c => c.id === (config.mutelog))
const muterol = message.guild.roles.cache.find(r => r.id === (config.muterol))



let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if (!member) return message.channel.send(new MessageEmbed().setColor('RANDOM').setDescription(`${message.author}, lütfen bir kullanici belirtin @Knave/İD gibi.`)).then(x => x.delete({timeout: 5000}))
          
let mute = message.mentions.members.first() || message.guild.members.cache.find(r => r.id === args[0]);
if (!mute) { new MessageEmbed().setColor('RANDOM').setDescription(`${message.author}, lütfen bir kullanici belirtin @Knave/İD gibi.`).then(x => x.delete({timeout: 5000}));
} else {
if (mute.roles.highest.position >= message.member.roles.highest.position) 
              {
return message.channel.send(new MessageEmbed().setColor('RANDOM').setDescription(`Bu Kullanıcı Senden Üst/Aynı Pozisyonda.`)).then(x => x.delete({timeout: 5000}));
} else {
let zaman = args[1]   
.replace("sn", "s")
.replace("dk", "m")
.replace("sa", "h")
.replace("gün", "d");
if (!zaman) { message.channel.send(new MessageEmbed().setColor('RANDOM').setDescription(`Lütfen Bir zaman dilimi belirtin.`)).then(x => x.delete({timeout: 5000}));
} else {
let sebep = args[2]
if(!sebep) return message.channel.send(new MessageEmbed().setColor('RANDOM').setDescription(`Lütfen Bir sebep belirtiniz.`)).then(x => x.delete({timeout: 5000}))  
                
let zamandilimi = zaman
.replace("m", " dakika")
.replace("s", " saniye")
.replace("h", " saat")
.replace("d", " d");
                  
           
message.react((config.onayemoji))          
message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp().setDescription(`${member} ${message.author} tarafından **${sebep}** sebebiyle **${zamandilimi} boyunca** metin kanallarında susturuldu.`)).then(x => x.delete({timeout: 5000}));;
mutelog.send(
new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true}))
.setColor('RANDOM')
.setTitle('Kullanıcı Metin Kanallarında Susturuldu.')
.setDescription(`**Kullanıcı:** <@${member.id}> | \`${member.id}\`
**Yetkili:** <@${message.author.id}> | \`${message.author.id}\`
**Sebep:** __${sebep}__
**Süre:** __${zamandilimi}__

        
`))
mute.roles.add(muterol)
message.react((config.onayemoji))
} 
setTimeout(async function() {
mute.roles.remove(muterol)
mutelog.send(
new MessageEmbed()
.setColor('GREEN')
.setTimestamp()
.setTitle('Kullanıcının Susturma Süresi Doldu.') 
.setDescription(`**Kullanıcı:** <@${member.id}> | \`${member.id}\``)
);
}, ms(zaman));
        
}}}
 
  
;
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["mute"],
    permLevel: 0,
    name: "mute"
  }
  
  exports.help = {
    name: "mute"
  };
  
  