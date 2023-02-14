const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("Ouça a minha playlist favorita"),
    async execute(interaction){
        await interaction.reply("https://open.spotify.com/playlist/37i9dQZF1DX186v583rmzp?si=cb2afcf46a564196");
    }

}