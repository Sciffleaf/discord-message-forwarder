# Discord Selfbot Message Forwarder

This is a **Discord Selfbot** that listens to messages from specified source channels and forwards them to a destination channel thread. The bot supports forwarding both text messages and embedded content (such as images or rich embeds).

## Features
- Listens to messages from multiple source channels.
- Forwards text messages to a destination thread.
- Extracts and forwards images from embedded messages.
- Differentiates messages from different users.
- Avoids redundant messages by tracking the last user and source channel.

## Prerequisites
- **Node.js** installed (version 16+ recommended)
- A **Discord Selfbot Token** (Use at your own risk, selfbots violate Discord's Terms of Service!)
- A `.env` file with your Discord token
- **discord.js-selfbot-v13** installed

## Installation

1. Clone this repository:
    ```sh
    git clone https://github.com/Sciffleaf/discord-message-forwarder.git
    cd discord-message-forwarder
    ```

2. Install dependencies:
    ```sh
    npm install discord.js-selfbot-v13 dotenv
    ```

3. Create a `.env` file in the project directory and add your **Discord Selfbot Token**:
    ```env
    DISCORD_TOKEN=your_discord_token_here
    ```

4. Modify the `channelMappings` in `index.js`:
    ```js
    const channelMappings = {
        'source_channel_here': { name: 'source_channel_name_here', thread: 'thread_id_here' }
        // Add more mappings for other channels
    };
    ```
    Replace:
    - `source_channel_here` with the actual source channel ID
    - `source_channel_name_here` with the friendly name
    - `thread_id_here` with the target thread ID

5. Set the **destination channel ID**:
    ```js
    const targetChannelId = 'dest_channel_id_here';
    ```
    Replace `'dest_channel_id_here'` with your actual destination channel ID.

## Usage

Run the bot:
```sh
node index.js
```

Once logged in, the bot will start listening to messages from the specified source channels and forward them accordingly.

## Warning
**Selfbots are against Discord's Terms of Service.** Use this bot responsibly, as using a selfbot can result in **account termination**.

## License
This project is open-source under the **MIT License**.

---

Enjoy automating your message forwarding! 🚀

