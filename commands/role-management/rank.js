module.exports = {
	name: 'Role',
	aliases: ['rank', 'join', 'add'],
	category: 'role-management',
	description: 'Lets the user join the Singleplayer, Multiplayer, or Server Owner roles.',
	usage: '<singleplayer, multiplayer, or server owner>',
	run: (client, message, args) => {
		// The code in here to execute
		message.delete();
		// eslint-disable-next-line no-shadow
		const role = client.roles.cache.find(role => role.name === args);
		const member = message.author;
		if(role != null) {
			member.roles.add(role);
			message.channel.send('<@' + member + '>  has been added to ' + role);
		}
	},
};