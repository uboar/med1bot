const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const review = require('../src/review.js');

const texts = {
    okey: "okey",
    description: "作品の採点を終了し、アイドル状態に戻ります。",
    okeyDescription: "作品の採点が進行中の場合、『okey』と入力する必要があります。",
    jsonFileName: "gen.json"
}

async function execute(interaction) {
    if (review.sendData.reviewingStatus == -1) {
        if (interaction.options.getString(texts.okey) === texts.okey) {
            review.sendData.reviewingStatus = 0;
            review.setCurrentMedleyData("", "");
            interaction.reply("採点を強制終了しました。採点データは初期化されます。");
        } else {
            interaction.reply("採点が進行中です。引数に『**okey**』を入力する事で採点を強制終了出来ます。");
        }
    } else {
        review.sendData.reviewingStatus = 0;
        const genJsonData = JSON.stringify(review.jsonGen());
        review.sendData.medleys.push({ ...review.sendData.currentMedley });

        const jsonFile = new MessageAttachment(Buffer.from(genJsonData), texts.jsonFileName);
        interaction.reply({ files: [jsonFile], content: "採点を終了しました。次の採点を開始出来ます。", });
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('endreviewing')
        .setDescription(texts.description)
        .addStringOption(option => option
            .setName(texts.okey)
            .setDescription(texts.okeyDescription)
            .setRequired(false)
        ),
    execute: execute,
}