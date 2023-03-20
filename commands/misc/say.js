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
	name: "say",
	// Refer to typings.d.ts for available properties.

	execute(message, args) {
		try {
			let text = args.join(" ");
			message.delete();
			message.channel.send(text);
		} catch (error) {
			console.log(error.msg);
		}
	},
};
