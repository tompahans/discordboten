/**
 * @file Change online status of bot
 * @author tompahans
 * @since 3.3.3
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
  // The data needed to register slash commands to Discord.

  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Ändrar botens status (online, dnd, busy)")
    .addStringOption((option) =>
      option
        .setName("typ")
        .setDescription(`typ av status: "online", "dnd", "busy"`)
    ),

  async execute(interaction) {
    /**
     * @type {string}
     * @description The "command" argument
     */
    const type = interaction.options.getString("typ");

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

    if (type) {
      // If a single command has been asked for, send only this command's help.

      if (interaction.client.slashCommands.has("status")) {
        const getStatus = () => {
          switch (type) {
            case "idle":
              return "idle";
            case "dnd":
              return "dnd";
            default:
              return "online";
          }
        };

        interaction.client.user.setPresence({
          status: `${getStatus()}`,
        });
        await interaction.reply({
          content: `Status ändrad till: **${getStatus()}**`,
          ephemeral: true,
        });
      }
    } else {
      interaction.client.user.setPresence({
        status: "online",
      });
      await interaction.reply({
        content: "Inga argument, sätter status till online!",
        ephemeral: true,
      });
    }
  },
};
