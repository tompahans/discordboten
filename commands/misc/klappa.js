/**
 * @file pet the cat
 * @author Tompahans
 * @since 3.2.2
 * @version 3.2.2
 */

// Deconstructing EmbedBuilder to create embeds within this command
const { AttachmentBuilder } = require("discord.js");

const fs = require("fs");
const path = require("path");
const pathToImages = "./data/images/";

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const klappaKatt = (message, args) => {
  const folder = pathToImages + args[0].toLowerCase() + "/";
  if (fs.existsSync(folder)) {
    fs.readdir(folder, function (err, files) {
      if (err) {
        console.log(err);
        return;
      }
      const imageFiles = files.filter(function (file) {
        return (
          file.endsWith(".JPG") ||
          file.endsWith(".png") ||
          file.endsWith(".PNG") ||
          file.endsWith(".jpg") ||
          file.endsWith(".JPEG")
        );
      });
      const random = getRandomInt(0, imageFiles.length - 1);
      const image = imageFiles[random];
      const getPath = path.resolve(__dirname, "..", "..", folder + image);

      const attachment = new AttachmentBuilder(getPath, {
        name: image,
      });

      return message.reply({ content: "Mjaau", files: [attachment] });
    });
  }
};

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
  name: "klappa",
  description: "Skriv !klappa <kattnamn>",
  aliases: ["commands"],
  usage: "[klappa tarzan]",
  args: true,
  cooldown: 5,
  // Refer to typings.d.ts for available properties.

  execute(message, args) {
    if (!args.length) {
      /**
       * @type {EmbedBuilder}
       * @description what type of pizza you rolled in an embed
       */

      return message.reply({ content: "Förstår inte frågan" });
    }
    klappaKatt(message, args);
  },
};
