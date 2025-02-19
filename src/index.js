const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client();

const channelMappings = {
    'source_channel_here': { name: 'source_channel_name_here', thread: 'thread_id_here' } // Source channel ID -> Source channel name & thread ID
    // Add more mappings for other channels
};

const targetChannelId = 'dest_channel_id_here'; // Destination channel ID

let lastSourceChannelId = null;
let lastNamaUser = null;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    const sourceChannelId = message.channelId;
    const { name: sourceChannelName, thread: targetThreadId } = channelMappings[sourceChannelId] || {};
    const namaUser = message.author.username;
    console.log('ada pesan dari:', sourceChannelName, 'channelid:', sourceChannelId);
    
    if (sourceChannelName) {
        console.log(`Received message in source channel: ${message.content}`);
        
        const targetChannel = client.channels.cache.get(targetChannelId);
        const targetThread = targetChannel.threads.cache.get(targetThreadId);

        if (targetThread) {
            // Check if the message has embeds
            if (message.embeds.length > 0) {
                // Filter embeds to include those with images or text
                const embedsWithContent = message.embeds.filter(embed => embed.image || embed.description);

                // Extract image URLs from embeds with images
                const imageUrls = embedsWithContent.map(embed => embed.image?.url).filter(Boolean);
                console.log('Collected image URLs:', imageUrls);

                // Extract text from embeds with text
                const embedTexts = embedsWithContent.map(embed => embed.description).filter(Boolean);
                console.log('Collected embed texts:', embedTexts);

                // Prepare messages with the additional text
                const messagesToSend = [];

                // Add "ada pap dari" for each image URL
                imageUrls.forEach(url => {
                    if (lastSourceChannelId !== sourceChannelId || lastNamaUser !== namaUser) {
                        messagesToSend.push(`Ada pap dari ${namaUser}:\n${url}`);
                    } else {
                        messagesToSend.push(`${url}`);
                    }
                });

                // Add "chat dari" for each embed text
                embedTexts.forEach(text => {
                    if (lastSourceChannelId !== sourceChannelId || lastNamaUser !== namaUser) {
                        messagesToSend.push(`Chat dari ${namaUser}:\n${text}`);
                    } else {
                        messagesToSend.push(`${text}`);
                    }
                });

                // Send the messages to the target thread
                messagesToSend.forEach(async content => {
                    await targetThread.send(content);
                });

                // Update last source channel ID and nama user
                lastSourceChannelId = sourceChannelId;
                lastNamaUser = namaUser;
            } else {
                // If no embeds, send message content
                if (lastSourceChannelId !== sourceChannelId || lastNamaUser !== namaUser) {
                    await targetThread.send(`Chat dari ${namaUser}:\n${message.content}`);
                } else {
                    await targetThread.send(message.content);
                }

                // Update last source channel ID and nama user
                lastSourceChannelId = sourceChannelId;
                lastNamaUser = namaUser;
            }
        }
    }
});
require('dotenv').config();
client.login(process.env.DISCORD_TOKEN);
