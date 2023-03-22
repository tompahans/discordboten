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
	],

	execute(message, args) {
		// Put all your trigger code over here. This code will be executed when any of the element in the "name" array is found in the message content.

		message.reply({
			content: "Ge fan i såna ord!",
		});
	},
};
