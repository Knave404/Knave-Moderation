const Discord = require("discord.js"),

client = new Discord.Client();
const config = require("../config.js");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {

var yetkiliRolID;
var yetkiliIzinIsmi;
var spotifyEngel;

spotifyEngel = await db.fetch("spotifyEngel");

yetkiliRolID = config.owner || "";
yetkiliIzinIsmi = "ADMINISTRATOR" || "ADMINISTRATOR";

let reawEmbed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Developed By Knave", message.guild.iconURL({dynamic: true})).setColor("RANDOM")

if (!message.member.roles.cache.has(yetkiliRolID) && !message.member.hasPermission(yetkiliIzinIsmi)) return message.channel.send(` ${config.redemoji2} Yeterli izinlere sahip değilsin`);

if (!spotifyEngel) {
db.set("spotifyEngel", true);
message.channel.send(reawEmbed.setDescription(`Spotify engel başarıyla aktif edildi!`));
return;
} else if (spotifyEngel) {
db.delete("spotifyEngel");
message.channel.send(reawEmbed.setDescription(`Spotify engel başarıyla devre dışı bırakıldı!`));
return;
}
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["spotyengel", "spotyengel"],
    permLevel: 0,
  }
  
  exports.help = {
    name: "spotyengel"
  };
  