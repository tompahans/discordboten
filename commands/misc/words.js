/**
 * @file Forbidden words print out
 * @author Tompahans
 * @since 3.2.2
 * @version 3.2.2
 */

/**
 * @type {import('../../typings').LegacyCommand}
 */
// Wordlist
const data = require("../../data/words.json");
// Sort list and add spaces between them
const words = data.words.sort().join(" ");

// Timer
const wait = require("node:timers/promises").setTimeout;

module.exports = {
	name: "words",
	description: "Få en lista över alla förbjudna ord",
	// eslint-disable-next-line
	async execute(message, args) {
		const arg = args.join(" ");
		if (arg.startsWith("reload")) {
			try {
				await message.reply("Laddar om ordlistan....");
				delete require.cache[require.resolve(`../../data/words.json`)];
				await wait(2000);
				await message.reply("Done");
			} catch (error) {
				console.log(error);
			}
		} else {
			await message.reply({
				content: "**Förbjudna ord:** ```" + words + "```",
			});
		}
	},
};
