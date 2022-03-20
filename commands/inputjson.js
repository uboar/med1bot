const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const https = require("https");
const review = require('../src/review.js');

const texts = {
    url: "url",
    description: "バックアップJSONファイルから採点データを復元します。",
    urlDescription: "JSONファイルのURLを指定します。"
}

async function execute(interaction) {
    var getData = "";
    https.get(interaction.options.getString(texts.url), (res) => {
        res.on("data", (data) => {
            getData += data;
        })
        res.on("end", () => {
            var json = JSON.parse(getData);
            review.sendData.reviewers = json.reviewers;
            review.sendData.medleys = json.medleys;
            interaction.reply("JSONファイルから採点データを復元しました。");
        })
    })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inputjson')
        .setDescription(texts.description)
        .addStringOption(option => option
            .setName(texts.url)
            .setDescription(texts.urlDescription)
            .setRequired(true)
        ),

    execute: execute,
}