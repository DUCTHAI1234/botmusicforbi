const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("shuffle").setDescription("Shuffles he queue"),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("There are no song in the queue")
        
            queue.shuffle()
            await interaction.editReply(`The queue of ${queue.tracks.length} songs have been shuffled!`)
    },
}