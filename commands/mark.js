const { SlashCommandBuilder } = require('@discordjs/builders');
const review = require('../src/review.js');
const texts = {
    point: "point",
    description: "採点します。",
    pointDescription: "点数を0～100点の間で入力して下さい。",
}

async function execute(interaction) {
    const point = interaction.options.getNumber(texts.point);

    if ((point < 0) || (point > 100)) {
        interaction.reply('点数は0～100点の間で指定する必要があります。');
    } else {
        var valid = false;
        review.sendData.reviewers.forEach((elem, index) => {
            if ((elem.isValid == true) && (elem.id == interaction.user.id) && (valid == false)) {
                review.sendData.currentMedley.reviewersPoint[index] = point;
                if (review.checkReviewed() == true) {
                    review.sendData.reviewingStatus = 1;
                    valid = true;
                    interaction.reply(`**${point.toString()}点**を採点しました。**全員の投票が終了しました。結果ページから点数を確認する事が出来ます。**`);
                } else {
                    interaction.reply(`**${point.toString()}点**を採点しました。`);
                    valid = true;
                }
            }
        })
        if (!valid) {
            interaction.reply(`あなたは審査員では無いようです。`);
        }
    }

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mark')
        .setDescription(texts.description)
        .addNumberOption(option => option
            .setName(texts.point)
            .setDescription(texts.pointDescription)
            .setRequired(true)
        ),
    execute: execute,
}