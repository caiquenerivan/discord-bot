const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

//dotenv
const dotenv = require('dotenv'); 
dotenv.config();
const {TOKEN, CLIENT_ID, GUILD_ID} = process.env;


//importaçção dos comandos
const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file=>file.endsWith(".js"));


const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for(const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if("data" in command && "execute" in command){
        client.commands.set(command.data.name, command);
    } else {
        console.log(`Esse comando em ${filePath} está com "data" ou "execute" ausentes.`);
    }

    console.log(client.commands);
}


client.once(Events.ClientReady, c => {
	console.log(`Pronto! Loggin feito por ${c.user.tag}`);
});

client.login(TOKEN);

//Listener 

client.on(Events.InteractionCreate, async interaction => {

    if(interaction.isStringSelectMenu()){
        const selected = interaction.values[0];
        if(selected === "javascript"){
            await interaction.reply("Documentação do Javascript: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript")
        } else if(selected === "react"){
            await interaction.reply("Documentação do React: https://pt-br.reactjs.org/")
        } else if(selected === "java"){
            await interaction.reply("Documentação do Java: https://docs.oracle.com/en/java/")
        } 
    }

    if(!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command){
        console.error("Comando não encontrado");
        return
    } 
    
    try{
        await command.execute(interaction);
    } 
    catch (error){
        console.log(error);
        await interaction.reply("Houve um erro ao executar esse comando");
    }
});