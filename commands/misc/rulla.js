/**
 * @file roll a pizza
 * @author Tompahans
 * @since 3.2.2
 * @version 3.2.2
 */
// Deconstructing prefix from config file to use in help command

// Deconstructing EmbedBuilder to create embeds within this command
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

// Pizza database
const data = require("../../data/db.json");

// Destructure phrases from words json
const { phrases } = require("../../data/words.json");

// TODO: Fix buttons

const reroll = new ButtonBuilder()
  .setCustomId("reroll")
  .setLabel("Rulla igen?")
  .setStyle(ButtonStyle.Primary);
const row = new ActionRowBuilder().addComponents(reroll); // eslint-disable-line

// END OF TODO

function getPizza(message, args) {
  const restaurant = Object.values(data).find((rest) =>
    rest.name.toLowerCase().includes(args[0].toLowerCase())
  );
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  if (restaurant) {
    const findMenu = () => {
      if (
        args.includes("vego") ||
        args.includes("veg") ||
        args.includes("vegetarisk")
      ) {
        const filterVegoItems = restaurant.meny.filter(
          (menuItem) => menuItem.vego === true
        );
        if (filterVegoItems?.length > 0) {
          return filterVegoItems;
        } else {
          return restaurant.meny;
        }
      }
      if (args.includes("köttfifan")) {
        const filterMeatItems = restaurant.meny.filter(
          (menuItem) => menuItem.vego !== true
        );
        if (filterMeatItems?.length > 0) {
          return filterMeatItems;
        } else {
          return restaurant.meny;
        }
      }

      return restaurant.meny;
    };

    const menu = findMenu();

    const menuItem = menu[getRandomInt(0, menu.length - 1)];

    /**
     * @type {EmbedBuilder}
     * @description what type of pizza you rolled in an embed
     */
    const emptyEmbed = new EmbedBuilder()
      .setColor("Grey")
      .setTitle("Rullar...");

    const pizzaEmbed = new EmbedBuilder()
      .setColor("Random")
      .setTitle(
        `Du rullade en **#${menuItem.id}. ${menuItem.name}** från **${restaurant.name}**`
      )
      .setDescription(
        `${menuItem.ingredients}. ${
          menuItem.price ? "*Pris: " + menuItem.price + " SEK*" : ""
        }\n*${phrases[getRandomInt(0, phrases.length - 1)]}*`
      )
      .setThumbnail("https://i.imgur.com/eyh8BVB.gif");

    return message
      .reply({ embeds: [emptyEmbed] })
      .then(wait(2000))
      .then((sentMessage) => sentMessage.edit({ embeds: [pizzaEmbed] }))
      .catch((error) => console.log(error));
  } else {
    return message.reply(`Restaurangen kunde inte hittas`);
  }
}

/**
 * @type {import('../../typings').LegacyCommand}
 */

module.exports = {
  name: "rulla",
  description: "Skriv !rulla <restaurang>",
  aliases: ["commands"],
  usage: "[rulla <restaurang>]",
  args: true,
  cooldown: 10,
  // Refer to typings.d.ts for available properties.

  execute(message, args) {
    if (!args.length) {
      return message.reply({ content: "Förstår inte frågan" });
    }
    getPizza(message, args);
  },
};
