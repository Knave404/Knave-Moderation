const Discord = require("discord.js");
var cooldown = new Map();

module.exports.run = async (client, message, args) => {
    if (Date.now() - Number(cooldown.get(message.author.id)) < 5000) return message.reply("Bu komutu 5 saniyede bir kullanabilirsin.");
    cooldown.set(message.author.id, Date.now());

    try {
      let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#009dff').setTimestamp().setThumbnail(message.author.avatarURL).setFooter("Developed By Knave");
        await message.channel.send(embed.setDescription(`Komutlar: \n${client.commands.map(props => `\`${props.help.name}\``).join(" | ")}`));
        
    } catch (e) {
        throw e;
    }
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["commands"],
  permLevel: 0
};

module.exports.help = {
  name: 'commands',
  description: 'Botta bulunan tüm komutları gösterir',
  usage: 'commands'
};