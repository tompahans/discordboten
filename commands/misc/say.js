/**
 * @file say command
 * @author Tommy Jämsä
 * @since 3.2.2
 * @version 3.2.2
 */

/**
 * @type {import('../../typings').LegacyCommand}
 */
const { PermissionsBitField } = require("discord.js");
module.exports = {
	name: "say",

	async execute(message, args) {
		try {
			const text = args.join(" ");
			if (
				message.guild.members.me.permissions.has(
					PermissionsBitField.Flags.ManageMessages
				)
			) {
				message.delete();
				message.channel.send(text);
			}
		} catch (error) {
			console.log(error);
		}
	},
};
