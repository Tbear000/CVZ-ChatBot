module.exports = {
	name: 'rank',
	aliases: ['role', 'join', 'addrole'],
	category: 'moderation',
	description: 'Lets the user join the Singleplayer, Multiplayer, or Server Owner roles.',
	usage: '<singleplayer, multiplayer, or server owner>',
	run: (client, message, args) => {
		// The code in here to execute
		if(args == 'singleplayer' || args == 'multiplayer' || args == 'server owner') {
		// eslint-disable-next-line no-shadow
			const role = client.roles.cache.find(role => role.name === args);
			const member = message.author;
			if(role != null) {
				member.roles.add(role);
				message.channel.send('<@' + member + '>  has been added to ' + role);
			}
		}
		else{
			message.channel.send('Incorrect role. Please pick between Singleplayer, Multiplayer or Server owner.');
		}
	},
};