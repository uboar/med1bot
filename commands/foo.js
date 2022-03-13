const { SlashCommandBuilder } = require('@discordjs/builders');

async function execute(interaction) {
    interaction.reply("ばー");
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('foo')
        .setDescription('テストコマンドです。中身は変わります。'),
    execute: execute,
}