const Discord = require("discord.js")
const config = require("../config.js");

module.exports.run = async (client, message, args) => {
  const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    var tagli = message.guild.members.cache.filter(member => member.user.username.includes((config.tag))).size
    let knavesesli = 0;
    for (const [id, voiceChannel] of voiceChannels) knavesesli += voiceChannel.members.size;
      const emoji = client.emojis.cache.find(emoji => emoji.id === "810059686275448842")
  const knaveembed = new Discord.MessageEmbed()
  .setColor("RANDOM")
        .setDescription(`\`•\`Seste toplam **${knavesesli}** kullanıcı var. \n \`•\`Toplam **${tagli}** kişi tagımıza sahip. \n \`•\`Sunucumuzda toplam **${message.guild.memberCount}** üye var. \n \`•\`Sunucumuza **${message.guild.premiumSubscriptionCount}** takviye yapılmış. \n \`•\`Sunucumuzda toplam **${message.guild.members.cache.filter(m => m.presence.status !== "offline").size}** çevrimiçi üye var.`)
 
  message.channel.send(knaveembed)
  message.react(emoji)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["info"],
  permLevel: 0
};
exports.help = {
  name: 'say',
  description: '',
  usage: 'say'
}; 