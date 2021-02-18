const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const express = require('express');
const config = require("./config.js");
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const ms = require('ms');
const tags = require('common-tags');
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`Knavenin Komutları ${files.length} bu kdr simdi yuklenio`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`${props.help.name} Eklendi :P`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//------------------------------------------------------------------------------------------------------------\\
client.on('messageDelete', message => {
    const data = require("quick.db")
    data.set(`snipe.mesaj.${message.guild.id}`, message.content)
    data.set(`snipe.id.${message.guild.id}`, message.author.id)

  })

//------------------------------------------------------------------------------------------------------------\\

  client.on("message", message => {
    if(message.content.toLowerCase() == "!tag") 
    return message.channel.send((config.tag))
});

client.on("message", message => {
  if(message.content.toLowerCase() == ".tag") 
  return message.channel.send((config.tag))
});

//------------------------------------------------------------------------------------------------------------\\


const kiltifat = [
    'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
    'Mavi gözlerin, gökyüzü oldu dünyamın.',
    'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
    'Huzur kokuyor geçtiğin her yer.',
    'Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.',
    'Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.',
    'Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.',
     'Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.',
     'Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.',
     'Etkili gülüş kavramını ben senden öğrendim.',
     'Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.',
     'Gözlerinle baharı getirdin garip gönlüme.',
     'Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.',
     'Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.',
     'Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.',
     'Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.',
     'Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.',
     'Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.',
     'Aynı zaman diliminde yaşamak benim için büyük ödüldür.',
    'Biraz Çevrendeki İnsanları Takarmısın ?',
    'İğrenç İnsansın!',
     'Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.',
     'Onu Bunu Boşver de bize gel 2 bira içelim.',
      'Taş gibi kızsın ama okey taşı… Elden elde gidiyorsun farkında değilsin.',
      'Knave seni çok sevdi...',
      'Mucizelerden bahsediyordum.',
  ];
  client.on("message", async message => {
    if(message.channel.id !== (config.chatkanalı)) return;
    let Knavedev = db.get('chatiltifat');
    await db.add("chatiltifat", 1);
    if(Knavedev >= 60) {
      db.delete("chatiltifat");
      const random = Math.floor(Math.random() * ((kiltifat).length - 1) + 1);
      message.reply(`${(kiltifat)[random]}`);
    };
  });


  //------------------------------------------------------------------------------------------------------------\\

 client.on('userUpdate', async (oldUser, newUser) => {
    var knaveetiket = "tag"
    let sunucu = client.guilds.cache.find(e => e.id === "sunucu id")
    let knaverol = sunucu.roles.cache.find(a => a.id === "ekip rol id")
    let üye = sunucu.members.cache.get(newUser.id)
    if (newUser.discriminator.includes(knaveetiket) && !oldUser.username.includes(knaveetiket)) {
      üye.roles.add(knaverol)
      
      const knaevlog = new Discord.MessageEmbed()
      .setColor(`BLACK`)
      .setDescription(`**<@${newUser.id}> Tagımızı Aldığı İçin ${knaverol} Rolü Verildi**`)
      client.channels.cache.get(`log kanal id`).send(knaevlog)
  
    }
  }
            );
  
  client.on('userUpdate', async (oldUser, newUser) => {
    var knave31 = "tag"
    let sunucu = client.guilds.cache.find(e => e.id === "sunucu id")
    let knave1 = sunucu.roles.cache.find(a => a.id === "ekip rol id")
    let üye = sunucu.members.cache.get(oldUser.id)
    if (oldUser.discriminator.includes(knave31) && !newUser.username.includes(knave31)) {
      üye.roles.remove(knave1)
    
      let knave = new Discord.MessageEmbed()
      .setColor(`RED`)
      .setDescription(`**<@${oldUser.id}> Tagımızı Sildiği İçin ${knave1} Rolü Alındı**`)
      client.channels.cache.get(`log kanal id`).send(knave)
  }
  }
  ); 

  //------------------------------------------------------------------------------------------------------------\\

  client.on("guildMemberAdd", async (member) => {
    member.roles.add(config.kayıtsız) 
    })
    
    client.on("guildMemberAdd", (member, message) => {
        if (member.guild.id !== (config.serverid)) return; 
        let user = client.users.cache.get(member.id);
        require("moment-duration-format");
        let eskiisim = member.user.username;
        const id = config.hgkanal ;
        const channel = member.guild.channels.cache.get(id);
        let zaman = new Date().getTime() - user.createdAt.getTime()
        const hesapzaman = moment.duration(zaman).format(` YY [Yıl] DD [Gün] HH [Saat] mm [Dakika] ss [Saniye]`) 
       
        channel.send(`
        ${config.hgemoji} **Sunucumuza Hoşgeldin** ${member.toString()} **Seninle Beraber** **${member.guild.memberCount}** **Kişiyiz** \n
${config.hgemoji} **Kaydının Yapılması için Sesli Odaya Gelip Teyit Vermen Gerekli** \n
${config.hgemoji} <@&${config.yetkilirol}> <@&${config.kayıtcırol}> **Rolündeki Yetkililer Seninle İlgilenecektir** \n
${config.hgemoji} **Hesap** **${hesapzaman}** **Önce Açılmış**`)
      });

      //------------------------------------------------------------------------------------------------------------\\

      client.on("message", async knaveqwe => {

        let spotifyEngel = await db.fetch("spotifyEngel");
        let Knaveembed = new Discord.MessageEmbed().setAuthor(knaveqwe.member.displayName, knaveqwe.author.avatarURL({dynamic: true})).setFooter("Developed By Knave", knaveqwe.guild.iconURL({dynamic: true})).setColor("010000")
        
        if (!spotifyEngel) return;
        
        if (spotifyEngel) {
        if (!knaveqwe.activity) return;
        if (knaveqwe.activity.partyID.startsWith("spotify:")) {
            knaveqwe.delete();
            knaveqwe.channel.send(Knaveembed.setDescription(`${config.redemoji2} Spotify parti daveti paylaşmak yasak!`));
        }
        }
        })
        
