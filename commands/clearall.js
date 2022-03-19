const { SlashCommandBuilder } = require('@discordjs/builders');
const review = require('../src/review.js');
const texts = {
    okey: "okey",
    description: "現在までに採点した全データを削除し、データを初期化します。",
    okeyDescription: "確認の為、『okey』と入力して下さい。",
}

async function execute(interaction) {
    var okey= interaction.options.getString(texts.okey);
    if(okey === texts.okey){
        review.clearAll();
        interaction.reply(`全データを削除しました。`);
    }else{
        interaction.reply(`全データを削除するには引数に『**okey**』と入力して下さい。`);
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clearall')
        .setDescription(texts.description)
        .addStringOption(option => option
            .setName(texts.okey)
            .setDescription(texts.okeyDescription)
            .setRequired(true)
        ),
    execute: execute,
}