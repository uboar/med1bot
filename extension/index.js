require('dotenv').config();
const defVal = require("../dashboard/initialReviewData.js");
const fs = require('fs');
const {
    Client,
    Collection,
    Intents,
} = require('discord.js');
const review = require('../src/review.js');


/**
 * Discord.js関連
 */
const options = {
    intents: [Intents.FLAGS.GUILDS]
};
const client = new Client(options);
const commandFiles = fs.readdirSync('./bundles/med1reviewing/commands').filter(file => file.endsWith('.js'));


module.exports = async function (nodecg) {
    /**
     * コマンド収集
     */

    var rep = nodecg.Replicant("reviewData", {defaultValue: {...defVal}, persistent: false});
    await review.init(nodecg);

    client.commands = new Collection();
    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        client.commands.set(command.data.name, command);
    }
    /**
     * ログイン時の挙動
     */
    client.once('ready', () => {
        console.log('Discordへのログインに成功しました。');
        console.log(`${client.user.tag} でログインしています。`);
    });
    /**
     * インタラクション設定
     */
    client.on('interactionCreate', async interaction => {
        const command = client.commands.get(interaction.commandName);

        if (!command) {
            return;
        }
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'エラーが発生した為インタラクションを生成出来ませんでした。コンソールログを確認して下さい。' });
        }
    });

    client.login(process.env.TOKEN);
}