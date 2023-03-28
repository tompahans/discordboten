/**
 * @file Sample ping command
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
	name: "ping",
	// Refer to typings.d.ts for available properties.
	// eslint-disable-next-line
	execute(message, args) {
		message.reply({ content: "Pong." });
	},
};
