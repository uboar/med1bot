const { SlashCommandBuilder } = require('@discordjs/builders');
const review = require('../src/review.js');
const texts = {
    slotnum: "slotnum",
    user: "user",
    description: "指定したユーザーを審査員として割り当てます。",
    slotnumDescription: "セットする場所を1～5で選択します。",
    userDescription: "セットするユーザーを選択します。",
}

async function execute(interaction) {
    const slotNum = interaction.options.getNumber(texts.slotnum);
    const user = interaction.options.getUser(texts.user);


    if (review.sendData.reviewingStatus != 0) {
        interaction.reply("審査員の変更はアイドル状態で無ければ実行出来ません。");
    } else if ((slotNum < 1) || (slotNum > review.maxReviewerNum)) {
        interaction.reply('スロットは1から' + review.maxReviewerNum.toString() + 'の間で指定する必要があります。');
    } else {
        review.sendData.reviewers[slotNum - 1] = {
            name: user.username,
            id: user.id,
            icon: user.displayAvatarURL(),
            isValid: true,
        }
        interaction.reply(slotNum.toString() + '番スロットに <@' + user.id + '> さんを割り当てました。');
    }

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('attach')
        .setDescription(texts.description)
        .addNumberOption(option => option
            .setName(texts.slotnum)
            .setDescription(texts.slotnumDescription)
            .setRequired(true)
        )
        .addUserOption(option => option
            .setName(texts.user)
            .setDescription(texts.userDescription)
            .setRequired(true)
        ),
    execute: execute,
}