/**
 * @file say command
 * @author Tommy Jämsä
 * @since 3.2.2
 * @version 3.2.2
 */

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
	name: "say",

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
