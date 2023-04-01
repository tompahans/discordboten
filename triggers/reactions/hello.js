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

const data = require("../../data/words.json");

module.exports = {
	name: data.words,
	// eslint-disable-next-line
	async execute(message, args) {
		message.reply({
			content: "Ge fan i såna ord!",
		});
		const member = await message.guild.members.fetch(message.author.id);

		if (member.bannable) {
			member
				.timeout(6 * 1000, "Ge fan i såna ord!")
				.then(() => console.log("timeouted member " + member))
				.catch(console.log);
		}
	},
};
