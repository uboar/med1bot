const { SlashCommandBuilder } = require('@discordjs/builders');
const review = require('../src/review.js')

const texts = {
    colorCode: "colorcode",
    description: "結果表示画面の背景色を変更します。",
    colorCodeDescription: "カラーコードを指定します。(例：#00FF00)",
}

async function execute(interaction) {
    var color = interaction.options.getString(texts.colorCode);
    review.sendData.backgroundColor = color;
    interaction.reply(`背景色を${color}に変更しました。`);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setbgc')
        .setDescription(texts.description)
        .addStringOption(option => option
            .setName(texts.colorCode)
            .setDescription(texts.colorCodeDescription)
            .setRequired(true)
        ),
    execute: execute,
}