/**
 * @file Forbidden words print out
 * @author Tompahans
 * @since 3.2.2
 * @version 3.2.2
 */

/**
 * @type {import('../../typings').LegacyCommand}
 */
// Destructures the word list from the trigger
const { name } = require("../../triggers/reactions/hello.js");
// Makes the word list a string with spaces as separator.
const words = name.join(" ");

module.exports = {
	name: "words",
	description: "Få en lista över alla förbjudna ord",
	// Refer to typings.d.ts for available properties.
	// eslint-disable-next-line
	execute(message, args) {
		message.reply({
			content: "**Förbjudna ord:** ```" + words + "```",
		});
	},
};
