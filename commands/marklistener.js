const { SlashCommandBuilder } = require('@discordjs/builders');
const review = require('../src/review.js');
const texts = {
    point1: "point1",
    point1Description: "1点の割合を％で記入します。",
    point2: "point2",
    point2Description: "2点の割合を％で記入します。",
    point3: "point3",
    point3Description: "3点の割合を％で記入します。",
    point4: "point4",
    point4Description: "4点の割合を％で記入します。",
    point5: "point5",
    point5Description: "5点の割合を％で記入します。",
    description: "視聴者投票データを記入します。",
}

async function execute(interaction) {
    const points = [
        interaction.options.getNumber(texts.point1),
        interaction.options.getNumber(texts.point2),
        interaction.options.getNumber(texts.point3),
        interaction.options.getNumber(texts.point4),
        interaction.options.getNumber(texts.point5),
    ]
    var actualPoint = 0;
    var sumPercentage = 0;


    points.forEach((elem, index) => {
        if ((elem < 0) || (elem > 100)) {
            interaction.reply("各点の割合は0～100％で記入する必要があります。");
        }
        review.sendData.currentMedley.listenerPoint.per[index] = elem;
        sumPercentage += elem;
        actualPoint += (index + 1) * (elem * 0.01);
    })
    actualPoint = Math.round(actualPoint * 2 * 100) / 100;
    review.sendData.currentMedley.listenerPoint.actualPoint = actualPoint;
    sumPercentage = Math.round(sumPercentage * 100) / 100;

    if (review.checkReviewed() == true) {
        review.sendData.reviewingStatus = 1;
        interaction.reply(`**${actualPoint.toString()}**点を採点しました。合計は**${sumPercentage}**％でした。100％では無い場合集計ミスの可能性があります。**全員の投票が終了しました。結果ページから点数を確認する事が出来ます。**`);
    } else {
        interaction.reply(`**${actualPoint.toString()}**点を採点しました。合計は**${sumPercentage}**％でした。100％では無い場合集計ミスの可能性があります。`);
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('marklistener')
        .setDescription(texts.description)
        .addNumberOption(option => option
            .setName(texts.point5)
            .setDescription(texts.point5Description)
            .setRequired(true)
        )
        .addNumberOption(option => option
            .setName(texts.point4)
            .setDescription(texts.point4Description)
            .setRequired(true)
        )
        .addNumberOption(option => option
            .setName(texts.point3)
            .setDescription(texts.point3Description)
            .setRequired(true)
        )
        .addNumberOption(option => option
            .setName(texts.point2)
            .setDescription(texts.point2Description)
            .setRequired(true)
        )
        .addNumberOption(option => option
            .setName(texts.point1)
            .setDescription(texts.point1Description)
            .setRequired(true)
        ),
    execute: execute,
}