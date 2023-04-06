/**
 * @file Sample help command with slash command.
 * @author tompahans
 * @since 3.3.3
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const {
	SlashCommandBuilder,
	ActivityType,
	GuildMember,
} = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("aktivitet")
		.setDescription("Ändrar botens aktivitet (spelar, tittar, streamar m.m")
		.addStringOption((option) =>
			option
				.setName("aktivitet")
				.setDescription(
					`typ av aktivitet: "spelar", "streamar", "tittar", "lyssnar"`
				)
		)
		.addStringOption((option) =>
			option
				.setName("text")
				.setDescription('text som syns efter aktivitet, exempel: "på musik"')
		),

	async execute(interaction) {
		/**
		 * @type {string}
		 * @description The "command" argument
		 */
		let name = interaction.options.getString("aktivitet");
		const text = interaction.options.getString("text");

		if (!interaction.memberPermissions.has("Administrator")) {
			return interaction.reply({
				content: "Du har inte rättigheter för detta kommando",
				ephemeral: true,
			});
		}

		if (name && text) {
			name = name.toLowerCase();

			// If a single command has been asked for, send only this command's help.

			if (interaction.client.slashCommands.has("aktivitet")) {
				const getActivity = () => {
					if (name === "spelar") {
						return ActivityType.Playing;
					}
					if (name === "streamar") {
						return ActivityType.Streaming;
					}
					if (name === "tittar") {
						return ActivityType.Watching;
					}
					if (name === "lyssnar") {
						return ActivityType.Listening;
					} else {
						return ActivityType.Competing;
					}
				};

				interaction.client.user.setActivity(`${text}`, {
					type: getActivity(),
				});
				await interaction.reply({
					content: `Sätter aktiviteten till id **${getActivity()}** med text: *"${text}"*`,
					ephemeral: true,
				});
			}
		} else {
			await interaction.reply({
				content: "du måste skriva in både aktivitet och text",
				ephemeral: true,
			});
		}

		// Replies to the interaction!
	},
};
