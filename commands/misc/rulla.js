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

const getPizza = (message, args) => {
	const arg = args.join(" ");
	const restaurant = Object.values(data).find((rest) =>
		rest.name.toLowerCase().includes(arg.toLowerCase())
	);

	if (restaurant) {
		const menu = restaurant.meny;
		const pizza = menu[getRandomInt(0, menu.length - 1)];
		let pizzaEmbed = new EmbedBuilder()
			.setColor("Random")
			.setTitle(
				`Du rullade en **#${pizza.id}. ${pizza.name}** från **${restaurant.name}**`
			)
			.setDescription(
				`*${pizza.ingredients}.* ${
					pizza.price ? "***Pris: " + pizza.price + " SEK***" : ""
				}\n*${phrases[getRandomInt(0, phrases.length - 1)]}*`
			)
			.setThumbnail("https://i.imgur.com/nhf9C8V.png");

		return message.reply({ embeds: [pizzaEmbed] });
	} else {
		return message.reply("Restaurangen kunde inte hittas");
	}
};

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
	name: "rulla",
	description: "Skriv !rulla <restaurang>",
	aliases: ["commands"],
	usage:
		"[rulla restaurangnamn, om restaurangnamn matchar något namn i databasen så rullas det en pizza]",
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
		getPizza(message, args);
	},
};
