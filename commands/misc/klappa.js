/**
 * @file pet the cat
 * @author Tommy Jämsä
 * @since 1.0.0
 * @version 3.2.2
 */
// Deconstructing prefix from config file to use in help command

// Deconstructing EmbedBuilder to create embeds within this command
const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

const fs = require("fs");
const path = require("path");
const pathToImages = "./data/images/";

const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const klappaKatt = (message, args) => {
	const folder = pathToImages + args[0] + "/";
	if (fs.existsSync(folder)) {
		fs.readdir(folder, function (err, files) {
			if (err) {
				console.log(err);
				return;
			}
			const imageFiles = files.filter(function (file) {
				return file.endsWith(".JPG");
			});

			const image = imageFiles[getRandomInt(0, imageFiles.length - 1)];
			const getPath = path.resolve(folder + image);

			const attachment = new AttachmentBuilder(getPath, {
				name: image,
			});

			return message.reply({ content: "Mjaau", files: [attachment] });
		});
	} else {
		return message.reply("no comprendo");
	}

	console.log("triggerd");
};

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
	name: "klappa",
	description: "Skriv !klappa <restaurang>",
	aliases: ["commands"],
	usage: "[klappa <tarzan>]",
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
