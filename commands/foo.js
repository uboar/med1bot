const { SlashCommandBuilder } = require('@discordjs/builders');

const texts = {
    description: "テストコマンドです。Herokuホスティングで寝ている時に起こす際使えるかもしれません。",
    interaction: "ばー",
}

async function execute(interaction) {
    interaction.reply(texts.interaction);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('foo')
        .setDescription(texts.description),
    execute: execute,
}