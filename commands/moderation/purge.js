module.exports = {
	name: 'purge',
	aliases: ['p', 'clear', 'clean'],
	category: 'moderation',
	description:
      'Lets the user clear out text chats.',
	usage: '<number of posts to delete>',
	run: async (client, message, args) => {
		if(message.member.hasPermission('MANAGE_MESSAGES')) {
			let deleteCount = 0;
			try {
				deleteCount = parseInt(args[0], 10);
			}
			catch(err) {
				return message.reply('Please provide the number of msgs to delete. (max 100)');
			}

			if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
				return message.reply('Please provide a number between 2 and 100 for the number of msgs to delete');
			}
			const fetched = await message.channel.messages.fetch({
				limit: deleteCount,
			}, true, false);
			message.channel.bulkDelete(fetched)
				.catch(error => message.reply(`Couldn't delete msgs because of: ${error}`));
		}
	},
};