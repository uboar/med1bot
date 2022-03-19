const { SlashCommandBuilder } = require('@discordjs/builders');
const review = require('../src/review.js');
const texts = {
    slotnum: "slotnum",
    description: "指定したスロットのユーザー割当を解除します。",
    slotnumDescription: "セットする場所を1～5で選択します。",
}

async function execute(interaction) {
    const slotNum = interaction.options.getNumber(texts.slotnum);


    if (review.sendData.reviewingStatus != 0) {
        interaction.reply("審査員の変更はアイドル状態で無ければ実行出来ません。");
    } else if ((slotNum < 1) || (slotNum > review.maxReviewerNum)) {
        interaction.reply('スロットは1から' + review.maxReviewerNum.toString() + 'の間で指定する必要があります。');
    } else {
        var id = review.sendData.reviewers[slotNum - 1].id
        review.sendData.reviewers[slotNum - 1] = {
            isValid: false,
        }
        interaction.reply(slotNum.toString() + '番スロット <@' + id + '> さんの割り当てを解除しました。');
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('detach')
        .setDescription(texts.description)
        .addNumberOption(option => option
            .setName(texts.slotnum)
            .setDescription(texts.slotnumDescription)
            .setRequired(true)
        ),
    execute: execute,
}