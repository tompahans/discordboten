/**
 * @file Sample ping command
 * @author Tompahans
 * @since 3.2.2
 * @version 3.2.2
 */

/**
 * @type {import('../../typings').LegacyCommand}
 */
const { name } = require("../../triggers/reactions/hello.js");
const words = name.join(" ");

module.exports = {
	name: "words",
	description: "Få en lista över alla förbjudna ord",
	// Refer to typings.d.ts for available properties.
	// eslint-disable-next-line
	execute(message, args) {
		message.reply({
			content: "**Förbjudna ord:** " + "```" + words + "```",
		});
	},
};
