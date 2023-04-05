/**
 * @file roll a pizza
 * @author Tompahans
 * @since 3.2.2
 * @version 3.2.2
 */
// Deconstructing prefix from config file to use in help command

// Deconstructing EmbedBuilder to create embeds within this command
const { EmbedBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

// Pizza database
const data = require("../../data/db.json");
// Destructure phrases from words json
const { phrases } = require("../../data/words.json");

const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getPizza(message, args) {
	const restaurant = Object.values(data).find((rest) =>
		rest.name.toLowerCase().includes(args[0])
	);

	if (restaurant) {
		const filterMenu = () => {
			if (
				args.includes("vego") ||
				args.includes("veg") ||
				args.includes("vegetarisk")
			) {
				const findVegoItems = restaurant.meny.filter(
					(menuItem) => menuItem.vego === true
				);
				if (findVegoItems?.lenght > 0) {
					return findVegoItems;
				} else {
					return restaurant.meny;
				}
			} else {
				return restaurant.meny;
			}
		};

		const menu = filterMenu();
		const menuItem = menu[getRandomInt(0, menu.length - 1)];

		/**
		 * @type {EmbedBuilder}
		 * @description what type of pizza you rolled in an embed
		 */
		const emptyEmbed = new EmbedBuilder()
			.setColor("Green")
			.setTitle("Rullar...");

		const pizzaEmbed = new EmbedBuilder()
			.setColor("Random")
			.setTitle(
				`Du rullade en **#${menuItem.id}. ${menuItem.name}** från **${restaurant.name}**`
			)
			.setDescription(
				`${menuItem.ingredients}. ${
					menuItem.price ? "*Pris: " + menuItem.price + " SEK*" : ""
				}\n*${phrases[getRandomInt(0, phrases.length - 1)]}*`
			)
			.setThumbnail("https://i.imgur.com/eyh8BVB.gif");

		return message
			.reply({ embeds: [emptyEmbed] })
			.then(wait(2000))
			.then((sentMessage) => sentMessage.edit({ embeds: [pizzaEmbed] }));
	} else {
		return message.reply(`Restaurangen kunde inte hittas`);
	}
}

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
	name: "rulla",
	description: "Skriv !rulla <restaurang>",
	aliases: ["commands"],
	usage: "[rulla <restaurang>]",
	args: true,
	cooldown: 5,
	// Refer to typings.d.ts for available properties.

	execute(message, args) {
		if (!args.length) {
			return message.reply({ content: "Förstår inte frågan" });
		}
		getPizza(message, args);
	},
};
