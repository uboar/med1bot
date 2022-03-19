require('dotenv').config();

const review = require('./review.js');
const fs = require('fs');
const exp = require('express');
const {
    Client,
    Collection,
    Intents,
} = require('discord.js');
const req = require('express/lib/request');


/**
 * Discord.js関連
 */
const options = {
    intents: [Intents.FLAGS.GUILDS]
};
const client = new Client(options);
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

/**
 * express関連
 */
const app = exp();
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('./index.ejs', review.getSendData());
});


/**
 * Discord.jsの初期化
 */
function discordjsInitialize() {
    /**
     * コマンド収集
     */
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
}


/**
 * 初期実行
 */
discordjsInitialize();
client.login(process.env.TOKEN);
app.listen(process.env.PORT);