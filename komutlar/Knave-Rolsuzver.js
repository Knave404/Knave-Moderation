const Discord = require("discord.js");
const config = require("../config.js");


exports.run =async (bot, message, args) => {

if(![(config.Owner)].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('RANDOM').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));


let knaveqwe = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

if(args[0] == "ver") {
    knaveqwe.forEach(r => {
r.roles.add(config.kayıtsız)
})
const khold = new Discord.MessageEmbed()
.setAuthor(" "+message.author.username +" ", message.author.avatarURL())
.setColor("RANDOM")
.setDescription("Sunucuda rolü olmayan \`"+ knaveqwe.size +"\` kişiye kayıtsız rolü verildi!")
message.channel.send(khold).then(m => message.react(config.onayemoji))
} else if(!args[0]) {
const khold1 = new Discord.MessageEmbed()
.setAuthor(""+message.author.username +" ", message.author.avatarURL())
.setColor("RANDOM")
.setDescription("Sunucumuzda rolü olmayan \`"+ knaveqwe.size +"\` kişi var. Bu kişilere kayıtsız rolü vermek için \`.rolsüz ver\` komutunu uygulayın!")
message.channel.send(khold1)
}


}

exports.conf = {
enabled: true,
guildOnly: false,
aliases: ["rolsuz"],
permLevel: 0
};

exports.help = {
name: "rolsüz",
description: "[Admin Komutu]",
usage: "rolsüz ver"
};
