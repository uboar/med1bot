const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const review = require('../src/review.js');

const texts = {
    description: "結果確認用のCSVファイルとバックアップ用のJSONファイルを生成します。",
    jsonFileName: "gen.json",
    csvFileName: "gen.csv",
}

async function execute(interaction) {
    const genJsonData = JSON.stringify(review.jsonGen());
    const genCsvData = review.csvGen();

    const jsonFile = new MessageAttachment(Buffer.from(genJsonData), texts.jsonFileName);
    const csvFile = new MessageAttachment(Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), Buffer.from(genCsvData)]), texts.csvFileName);

    interaction.reply({
        files: [jsonFile, csvFile]
    });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('filegen')
        .setDescription(texts.description),
    execute: execute,
}