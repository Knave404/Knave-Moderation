const { MessageEmbed } = require('discord.js')
const data = require('quick.db')


   exports.run = async(client, message, args) => {


    const knave = await data.fetch(`snipe.id.${message.guild.id}`)
    if(!knave) {
    const embeds = new MessageEmbed()
  .setDescription(`Mesaj bulunamadı!`)
.setColor(`#f3c7e1`)
    message.channel.send(embeds);
          } else {
  let kullanıcı = client.users.cache.get(knave);
  const silinen = await data.fetch(`snipe.mesaj.${message.guild.id}`)
  const embed = new MessageEmbed()
  .setDescription(`${kullanıcı} = ${silinen}`)
.setColor(`#f3c7e1`)
  message.channel.send(embed) }
}
exports.conf = {
    enabled:true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
}
exports.help = {
  name: "snipe",
  description: 'Son silinen mesajı yakalar.',
  usage: 'snipe'
} 