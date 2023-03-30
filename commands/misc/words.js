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

module.exports = {
	name: "words",
	description: "Få en lista över alla förbjudna ord",
	// eslint-disable-next-line
	execute(message, args) {
		message.reply({
			content: "**Förbjudna ord:** ```" + words + "```",
		});
	},
};
