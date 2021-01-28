const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
	name: 'report',
	category: 'moderation',
	description: 'Reports a member',
	usage: '<mention, id>',
	run: async (client, message, args) => {
		if (message.deletable) message.delete();

		const rMember = message.mentions.members.first() || message.guild.members.fetch(args[0]);

		if (!rMember) {return message.reply('Couldn\'t find that person?').then(m => m.delete(5000));}

		if (rMember.hasPermission('BAN_MEMBERS') || rMember.user.bot) {return message.channel.send('Can\'t report that member').then(m => m.delete(5000));}

		if (!args[1]) {return message.channel.send('Please provide a reason for the report').then(m => m.delete(5000));}

		const channel = message.guild.channels.id('804165339738144809');
		if (!channel) {return message.channel.send('Couldn\'t find a `#reports` channel').then(m => m.delete(5000));}

		const embed = new MessageEmbed()
			.setColor('#ff0000')
			.setTimestamp()
			.setFooter(message.guild.name, message.guild.iconURL)
			.setAuthor('Reported member', rMember.user.displayAvatarURL)
			.setDescription(stripIndents`**> Member:** ${rMember} (${rMember.user.id})
            **> Reported by:** ${message.member}
            **> Reported in:** ${message.channel}
            **> Reason:** ${args.slice(1).join(' ')}`);

		return channel.send(embed);
	},
};