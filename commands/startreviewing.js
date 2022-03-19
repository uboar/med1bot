const { SlashCommandBuilder } = require('@discordjs/builders');
const review = require('../src/review.js');

const texts = {
    name: "name",
    artist: "artist",
    description: "作品の採点を開始します。引数に作品名と作者名を入力して下さい。",
    nameDescription: "作品名を入力して下さい。",
    artistDescription: "作者名を入力して下さい。"
}

async function execute(interaction) {
    if (review.sendData.reviewingStatus != 0) {
        interaction.reply("前の採点が終了していないので新たな採点を開始する事が出来ません。採点を終了するには**/endreviewing**コマンドを使用して下さい。");
    } else {
        var name = interaction.options.getString(texts.name);
        var artist = interaction.options.getString(texts.artist);

        review.sendData.reviewingStatus = -1;
        review.setCurrentMedleyData(name, artist);

        interaction.reply(`** ${name} / ${artist} **の採点を開始します。`);
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startreviewing')
        .setDescription(texts.description)
        .addStringOption(option => option
            .setName(texts.name)
            .setDescription(texts.nameDescription)
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName(texts.artist)
            .setDescription(texts.artistDescription)
            .setRequired(true)
        ),
    execute: execute,
}