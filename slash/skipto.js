const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("skipto").setDescription("Skips to a certain track #")
    .addNumberOption((option) =>
        option.setName("tracknumber").setDescription("The track to skip to").setMinValue(1).setRequired(true)),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("There are no song in the queue")
        
        const trackNum = interaction.option.getNumber("tracknumber")
        if (trackNum > queue.track.length)
            return await interaction.editReply("Invalid track number")   
        queue.skipTo(trackNum - 1)

        await interaction.editReply(`Skipped ahead to track number ${trackNum}`)
    },
}