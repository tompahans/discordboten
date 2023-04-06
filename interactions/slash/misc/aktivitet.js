/**
 * @file Change activity on the bot
 * @author tompahans
 * @since 3.3.3
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const {
  SlashCommandBuilder,
  ActivityType,
  PermissionsBitField,
} = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
  // The data needed to register slash commands to Discord.

  data: new SlashCommandBuilder()
    .setName("aktivitet")
    .setDescription(
      "Ändrar botens aktivitet (spelar, tittar, streamar, lyssnar)"
    )
    .addStringOption((option) =>
      option
        .setName("typ")
        .setDescription(
          `Typ av aktivitet: "spelar", "tittar", "streamar", "lyssnar"`
        )
        .setRequired(true)
        .addChoices(
          { name: "Spelar", value: "spelar" },
          { name: "Tittar", value: "tittar" },
          { name: "Streamar", value: "streamar" },
          { name: "Lyssnar", value: "lyssnar" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription(
          'Text som syns efter aktivitet, exempel: "Spotify", "Risk", "Roulette"'
        )
        .setRequired(true)
    ),

  async execute(interaction) {
    /**
     * @type {string}
     * @description The "command" argument
     */
    const type = interaction.options.getString("typ").toLocaleLowerCase();
    const text = interaction.options.getString("text");

    if (
      !interaction.memberPermissions.has(
        PermissionsBitField.Flags.Administrator
      )
    ) {
      return interaction.reply({
        content: "Du har inte rättigheter för detta kommando",
        ephemeral: true,
      });
    }

    if (type && text) {
      // If a single command has been asked for, send only this command's help.

      if (interaction.client.slashCommands.has("aktivitet")) {
        const getActivity = () => {
          switch (type) {
            case "spelar":
              return ActivityType.Playing;
            case "streamar":
              return ActivityType.Streaming;
            case "tittar":
              return ActivityType.Watching;
            case "lyssnar":
              return ActivityType.Listening;
            default:
              return ActivityType.Competing;
          }
        };

        interaction.client.user.setActivity(`${text}`, { type: getActivity() });
        await interaction.reply({
          content: `Sätter aktiviteten till ActivityType: **${getActivity()}** med text: *"${text}"*`,
          ephemeral: true,
        });
      }
    } else {
      await interaction.reply({
        content: "Du måste mata in både typ av aktivitet och text",
        ephemeral: true,
      });
    }
  },
};
