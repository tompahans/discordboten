/**
 * @file Sample Trigger command.
 * @author Naman Vrati
 * @since 2.0.0
 * @version 3.2.2
 */

// For now, the only available property is name array. Not making the name array will result in an error.

/**
 * @type {import('../../typings').TriggerCommand}
 */
const { PermissionsBitField } = require("discord.js");
module.exports = {
	name: [
		"fläsknos",
		"danskebank",
		"ravioli",
		"rappare",
		"sabeltand",
		"tramadol",
		"kallsup",
		"charkbricka",
		"snorlobba",
		"granris",
		"spannmål",
		"läskeblask",
		"springmask",
		"blixtlås",
	],
	// eslint-disable-next-line
	async execute(message, args) {
		message.reply({
			content: "Ge fan i såna ord!",
		});
		const member = await message.guild.members.fetch(message.author.id);
		if (
			member.bannable &&
			message.guild.members.me.permissions.has(
				PermissionsBitField.Flags.KICK_MEMBERS
			)
		) {
			member.timeout(6 * 1000, "Ge fan i såna ord!");
		}
	},
};
