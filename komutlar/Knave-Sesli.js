const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {

  
let knave;
let knave1 = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let knave2 = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!knave1) return message.channel.send(new MessageEmbed().setTimestamp().setColor('RANDOM').setDescription(`Bir @Knave/ID Girmelisin Veya Kullanıcı Etiketlemelisin`))
if (knave1) {
    knave = knave;
}
if (knave2) {
    knave = knave2;
}
if (!knave) {
    knave = message.member;
}

let ses = knave.voice.channel;
if (!ses) {
message.channel.send(new MessageEmbed().setColor('RANDOM').setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription("**<@"+knave.id+"> Bir Sesli Kanalda Değil.**")).then(x => x.delete({timeout: 5000}));
}
if (ses) {
message.channel.send(new MessageEmbed().setColor('RANDOM').setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(
"<@"+knave.id+"> \n ────────────────── \n `"+ses.name+"` İsimli ses kanalında."
));
}};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["n"],
    permLevel: 0,
    name: "ses"
  }
  
  exports.help = {
    name: "kontrol"
  };
  
  
