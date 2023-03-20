/**
 * @file roll a pizza
 * @author Tommy Jämsä
 * @since 1.0.0
 * @version 3.2.2
 */
// Deconstructing prefix from config file to use in help command

// Deconstructing EmbedBuilder to create embeds within this command
const { EmbedBuilder } = require("discord.js");

// Pizza database
const data = require("../../data/db.json");

const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const phrases = [
	"Smaklig måltid!",
	"Hoppas det smakar!",
	"Femton minuter - en kvart.",
	"Fridens liljor!",
	"Live long and prosper.",
];

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
	name: "rulla",
	description: "Skriv !rulla <restarurangnamn>",
	aliases: ["commands"],
	usage: "[command name]",
	cooldown: 5,
	// Refer to typings.d.ts for available properties.

	execute(message, args) {
		if (!args.length || args.length > 1) {
			/**
			 * @type {EmbedBuilder}
			 * @description what type of pizza embed
			 */

			return message.reply({ content: "Förstår inte frågan" });
		}
		const arg = args[0];
		var restaurant;

		if (arg.startsWith("lilla")) {
			restaurant = "lillaitalien";
		}
		if (arg.startsWith("kaktus")) {
			restaurant = "kaktusen";
		}
		if (arg.startsWith("chrille")) {
			restaurant = "chrilles";
		}
		if (arg.startsWith("hörnet") || arg.startsWith("pizzahö")) {
			restaurant = "pizzahornet";
		}
		if (arg.startsWith("ösmo")) {
			restaurant = "osmokrog";
		}
		if (arg === "kodord kebab") {
			restaurant = "kebab";
		}

		if (data.hasOwnProperty(restaurant)) {
			const menu = data[restaurant].meny;
			const pizza = menu[getRandomInt(0, menu.length - 1)];
			let pizzaEmbed = new EmbedBuilder()
				.setColor("Random")
				.setTitle(
					`Du rullade en **#${pizza.id}. ${pizza.name}** från **${data[restaurant].name}**`
				)
				.setDescription(
					`*${pizza.ingredients}.* ${
						pizza.price ? "***Pris: " + pizza.price + " SEK***" : ""
					}\n*${phrases[getRandomInt(0, phrases.length - 1)]}*`
				)
				.setThumbnail("https://i.imgur.com/nhf9C8V.png");

			return message.reply({ embeds: [pizzaEmbed] });
		}
	},
};
