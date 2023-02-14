const {SlashCommandBuilder,  ActionRowBuilder, Events, StringSelectMenuBuilder } = require("discord.js");

const row = new ActionRowBuilder()
.addComponents(
    new StringSelectMenuBuilder()
        .setCustomId('select')
        .setPlaceholder('Nada Selecionado')
        .addOptions([
            {
                label: 'Javascript',
                description: 'Veja a documentação do Javascript',
                value: 'javascript',
            },
            {
                label: 'React',
                description: 'Veja a documentação do React',
                value: 'react',
            },
            {
                label: 'Java',
                description: 'Veja a documentação do Java',
                value: 'java',
            },
        ]),
);


module.exports = {
    
    data: new SlashCommandBuilder()
        .setName("docs")
        .setDescription("Acesse a documentação da sua linguagem "),
    async execute(interaction){
        await interaction.reply({ content: 'Selecione uma das tecnologias abaixo', components: [row] });
    }

}