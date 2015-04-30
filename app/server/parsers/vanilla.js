var stringToCode = require('../utils').stringToCode;
var parseExtra   = require('../parsers/extra');

module.exports = (jsonMsg) => {

  var username, msg, sender, broadcast, connected, max, current, pages, player, victim, killer, achievement;
  var color  = stringToCode(jsonMsg.color);

  switch (jsonMsg.translate) {

    case 'chat.type.text':
      username    = jsonMsg.with[0].text;
      msg         = jsonMsg.with[1];
      return '§' + color + '<' + username + '> ' + msg;


    case 'chat.type.announcement':
      sender      = jsonMsg.with[0];
      broadcast   = parseExtra(jsonMsg.with[1].extra);
      return '§' + color + '[' + sender + '] ' + broadcast;


    case 'commands.generic.notFound':
      return '§' + color + 'Unknown command. Try /help for a list of commands';


    case 'commands.players.list':
      connected   = jsonMsg.with[0];
      max         = jsonMsg.with[1];
      return '§' + color + 'There are ' + connected + '/' + max + ' players online:';


    case 'commands.help.header':
      current     = jsonMsg.with[0];
      pages       = jsonMsg.with[1];
      return '§' + color + '--- Showing help page ' + current + ' of ' + pages + ' (/help <page>) ---';


    case 'commands.generic.usage':
      return '§' + color + 'Usage: ' + parseCommandUsage(jsonMsg.with[0].translate);


    case 'multiplayer.player.left':
      player      = jsonMsg.with[0].text;
      return '§' + color + player + ' left the game';


    case 'multiplayer.player.joined':
      player      = jsonMsg.with[0].text;
      return '§' + color + player + ' joined the game';


    case 'chat.type.admin':
      return '§' + color + '[' + jsonMsg.with[0] + ': ' + parseAdmin(jsonMsg.with[1]) + ']';


    case 'death.attack.mob':
      victim      = jsonMsg.with[0].text;
      killer      = jsonMsg.with[1].text;
      return '§' + color + victim + ' was slain by ' + killer;


    case 'death.attack.arrow':
      victim      = jsonMsg.with[0].text;
      killer      = jsonMsg.with[1].text;
      return '§' + color + victim + ' was shot by ' + killer;


    case 'death.attack.player':
      victim      = jsonMsg.with[0].text;
      killer      = jsonMsg.with[1].text;
      return '§' + color + victim + ' was slain by ' + killer;


    case 'death.attack.explosion.player':
      victim      = jsonMsg.with[0].text;
      killer      = jsonMsg.with[1].text;
      return '§' + color + victim + ' was blown up by ' + killer;


    case 'chat.type.achievement':
      player      = jsonMsg.with[0].text;
      achievement = jsonMsg.with[1].extra[0].translate;
      return '§' + color + player + ' has just earned the achievement ' + '§a[' + parseAchievement(achievement) + ']';

  }

  // if message is a command usage
  if (/^commands\..*usage$/.test(jsonMsg.translate)) {
    return '§' + color + parseCommandUsage(jsonMsg.translate);
  }

};


function parseAdmin(command) {

  var player, gamemode;

  switch (command.translate) {

    case 'commands.downfall.success':
      return 'Toggled downfall';

    case 'commands.op.success':
      return 'Opped ' + command.with[0];

    case 'commands.tp.success':
      return 'Teleported ' + command.with[0] + ' to ' + command.with[1];

    case 'commands.kill.successful':
      return 'Killed ' + command.with[0];

    case 'commands.gamemode.success.other':
      player   = command.with[0];
      gamemode = command.with[1].translate.split('.')[1];
      gamemode = gamemode.charAt(0).toUpperCase() + gamemode.slice(1);
      return 'Set ' + player + ' game mode to ' + gamemode + ' Mode';

    default:
      return 'Unknown admin message';

  }

}



function parseAchievement(achievementid) {

  var achievements = {
    'achievement.acquireIron': 'Acquire Hardware',
    'achievement.bakeCake': 'The Lie',
    'achievement.blazeRod': 'Into Fire',
    'achievement.bookcase': 'Librarian',
    'achievement.breedCow': 'Repopulation',
    'achievement.buildBetterPickaxe': 'Getting an Upgrade',
    'achievement.buildFurnace': 'Hot Topic',
    'achievement.buildHoe': 'Time to Farm!',
    'achievement.buildPickaxe': 'Time to Mine!',
    'achievement.buildSword': 'Time to Strike!',
    'achievement.buildWorkBench': 'Benchmarking',
    'achievement.cookFish': 'Delicious Fish',
    'achievement.diamonds': 'DIAMONDS!',
    'achievement.diamondsToYou': 'Diamonds to you!',
    'achievement.enchantments': 'Enchanter',
    'achievement.exploreAllBiomes': 'Adventuring Time',
    'achievement.flyPig': 'When Pigs Fly',
    'achievement.fullBeacon': 'Beaconator',
    'achievement.get': 'Achievement get!',
    'achievement.ghast': 'Return to Sender',
    'achievement.killCow': 'Cow Tipper',
    'achievement.killEnemy': 'Monster Hunter',
    'achievement.killWither': 'The Beginning.',
    'achievement.makeBread': 'Bake Bread',
    'achievement.mineWood': 'Getting Wood',
    'achievement.onARail': 'On A Rail',
    'achievement.openInventory': 'Taking Inventory',
    'achievement.overkill': 'Overkill',
    'achievement.overpowered': 'Overpowered',
    'achievement.portal': 'We Need to Go Deeper',
    'achievement.potion': 'Local Brewery',
    'achievement.snipeSkeleton': 'Sniper Duel',
    'achievement.spawnWither': 'The Beginning?',
    'achievement.taken': 'Taken!',
    'achievement.theEnd': 'The End?',
    'achievement.theEnd2': 'The End.',
    'achievement.unknown': '???'
  };

  return achievements[achievementid] || '???';
}

function parseCommandUsage(commandId) {

  var commands = {
    'commands.achievement.usage': '/achievement <give|take> <stat_name|*> [player]',
    'commands.ban.usage': '/ban <name> [reason ...]',
    'commands.banip.usage': '/ban-ip <address|name> [reason ...]',
    'commands.banlist.usage': '/banlist [ips|players]',
    'commands.blockdata.usage': '/blockdata <x> <y> <z> <dataTag>',
    'commands.chunkinfo.usage': '/chunkinfo [<x> <y> <z>]',
    'commands.clear.usage': '/clear [player] [item] [data] [maxCount] [dataTag]',
    'commands.clone.usage': '/clone <x1> <y1> <z1> <x2> <y2> <z2> <x> <y> <z> [mode]',
    'commands.compare.usage': '/testforblocks <x1> <y1> <z1> <x2> <y2> <z2> <x> <y> <z> [mode]',
    'commands.defaultgamemode.usage': '/defaultgamemode <mode>',
    'commands.deop.usage': '/deop <player>',
    'commands.difficulty.usage': '/difficulty <new difficulty>',
    'commands.downfall.usage': '/toggledownfall',
    'commands.effect.usage': '/effect <player> <effect> [seconds] [amplifier] [hideParticles]',
    'commands.enchant.usage': '/enchant <player> <enchantment ID> [level]',
    'commands.entitydata.usage': '/entitydata <entity> <dataTag>',
    'commands.execute.usage': '/execute <entity> <x> <y> <z> <command> OR /execute <entity> <x> <y> <z> detect <x> <y> <z> <block> <data> <command>',
    'commands.fill.usage': '/fill <x1> <y1> <z1> <x2> <y2> <z2> <TileName> [dataValue] [oldBlockHandling] [dataTag]',
    'commands.gamemode.usage': '/gamemode <mode> [player]',
    'commands.gamerule.usage': '/gamerule <rule name> [value]',
    'commands.give.usage': '/give <player> <item> [amount] [data] [dataTag]',
    'commands.help.usage': '/help [page|command name]',
    'commands.kick.usage': '/kick <player> [reason ...]',
    'commands.kill.usage': '/kill [player|entity]',
    'commands.me.usage': '/me <action ...>',
    'commands.message.usage': '/tell <player> <private message ...>',
    'commands.op.usage': '/op <player>',
    'commands.particle.usage': '/particle <name> <x> <y> <z> <xd> <yd> <zd> <speed> [count] [mode]',
    'commands.players.usage': '/list',
    'commands.playsound.usage': '/playsound <sound> <player> [x] [y] [z] [volume] [pitch] [minimumVolume]',
    'commands.publish.usage': '/publish',
    'commands.replaceitem.block.usage': '/replaceitem block <x> <y> <z> <slot> <item> [amount] [data] [dataTag]',
    'commands.replaceitem.entity.usage': '/replaceitem entity <selector> <slot> <item> [amount] [data] [dataTag]',
    'commands.replaceitem.usage': '/replaceitem <entity|block> ...',
    'commands.save-off.usage': '/save-off',
    'commands.save-on.usage': '/save-on',
    'commands.save.usage': '/save-all',
    'commands.say.usage': '/say <message ...>',
    'commands.scoreboard.objectives.add.usage': '/scoreboard objectives add <name> <criteriaType> [display name ...]',
    'commands.scoreboard.objectives.remove.usage': '/scoreboard objectives remove <name>',
    'commands.scoreboard.objectives.setdisplay.usage': '/scoreboard objectives setdisplay <slot> [objective]',
    'commands.scoreboard.objectives.usage': '/scoreboard objectives <list|add|remove|setdisplay> ...',
    'commands.scoreboard.players.add.usage': '/scoreboard players add <player> <objective> <count> [dataTag]',
    'commands.scoreboard.players.enable.usage': '/scoreboard players enable <player> <trigger>',
    'commands.scoreboard.players.list.usage': '/scoreboard players list [name]',
    'commands.scoreboard.players.operation.usage': '/scoreboard players operation <targetName> <targetObjective> <operation> <selector> <objective>',
    'commands.scoreboard.players.remove.usage': '/scoreboard players remove <player> <objective> <count> [dataTag]',
    'commands.scoreboard.players.reset.usage': '/scoreboard players reset <player> [objective]',
    'commands.scoreboard.players.set.usage': '/scoreboard players set <player> <objective> <score> [dataTag]',
    'commands.scoreboard.players.test.usage': '/scoreboard players test <player> <objective> <min> <max>',
    'commands.scoreboard.players.usage': '/scoreboard players <set|add|remove|reset|list|enable|test|operation> ...',
    'commands.scoreboard.teams.add.usage': '/scoreboard teams add <name> [display name ...]',
    'commands.scoreboard.teams.empty.usage': '/scoreboard teams empty <team>',
    'commands.scoreboard.teams.join.usage': '/scoreboard teams join <team> [player]',
    'commands.scoreboard.teams.leave.usage': '/scoreboard teams leave [player]',
    'commands.scoreboard.teams.list.usage': '/scoreboard teams list [name]',
    'commands.scoreboard.teams.option.usage': '/scoreboard teams option <team> <friendlyfire|color|seeFriendlyInvisibles|nametagVisibility|deathMessageVisibility> <value>',
    'commands.scoreboard.teams.remove.usage': '/scoreboard teams remove <name>',
    'commands.scoreboard.teams.usage': '/scoreboard teams <list|add|remove|empty|join|leave|option> ...',
    'commands.scoreboard.usage': '/scoreboard <objectives|players|teams> ...',
    'commands.seed.usage': '/seed',
    'commands.setblock.usage': '/setblock <x> <y> <z> <TileName> [dataValue] [oldBlockHandling] [dataTag]',
    'commands.setidletimeout.usage': '/setidletimeout <Minutes until kick>',
    'commands.setworldspawn.usage': '/setworldspawn [<x> <y> <z>]',
    'commands.spawnpoint.usage': '/spawnpoint [player] [<x> <y> <z>]',
    'commands.spreadplayers.usage': '/spreadplayers <x> <z> <spreadDistance> <maxRange> <respectTeams true|false> <player ...>',
    'commands.stats.block.clear.usage': '/stats block <x> <y> <z> clear <stat>',
    'commands.stats.block.set.usage': '/stats block <x> <y> <z> set <stat> <selector> <objective>',
    'commands.stats.block.usage': '/stats block <x> <y> <z> <mode> ...',
    'commands.stats.entity.clear.usage': '/stats entity <selector> clear <stat>',
    'commands.stats.entity.set.usage': '/stats entity <selector> set <stat> <selector> <objective>',
    'commands.stats.entity.usage': '/stats entity <selector> <mode>',
    'commands.stats.usage': '/stats <entity|block> ...',
    'commands.stop.usage': '/stop',
    'commands.summon.usage': '/summon <EntityName> [x] [y] [z] [dataTag]',
    'commands.tellraw.usage': '/tellraw <player> <raw json message>',
    'commands.testfor.usage': '/testfor <player> [dataTag]',
    'commands.testforblock.usage': '/testforblock <x> <y> <z> <TileName> [dataValue] [dataTag]',
    'commands.time.usage': '/time <set|add|query> <value>',
    'commands.title.usage': '/title <player> <title|subtitle|clear|reset|times> ...',
    'commands.title.usage.clear': '/title <player> clear|reset',
    'commands.title.usage.times': '/title <player> times <fadeIn> <stay> <fadeOut>',
    'commands.title.usage.title': '/title <player> title|subtitle <raw json title>',
    'commands.tp.usage': '/tp [target player] <destination player> OR /tp [target player] <x> <y> <z> [<y-rot> <x-rot>]',
    'commands.trigger.usage': '/trigger <objective> <add|set> <value>',
    'commands.unban.usage': '/pardon <name>',
    'commands.unbanip.usage': '/pardon-ip <address>',
    'commands.weather.usage': '/weather <clear|rain|thunder> [duration in seconds]',
    'commands.whitelist.add.usage': '/whitelist add <player>',
    'commands.whitelist.remove.usage': '/whitelist remove <player>',
    'commands.whitelist.usage': '/whitelist <on|off|list|add|remove|reload>',
    'commands.worldborder.add.usage': '/worldborder add <sizeInBlocks> [timeInSeconds]',
    'commands.worldborder.center.usage': '/worldborder centre <x> <z>',
    'commands.worldborder.damage.amount.usage': '/worldborder damage amount <damagePerBlock>',
    'commands.worldborder.damage.buffer.usage': '/worldborder damage buffer <sizeInBlocks>',
    'commands.worldborder.damage.usage': '/worldborder damage <buffer|amount>',
    'commands.worldborder.set.usage': '/worldborder set <sizeInBlocks> [timeInSeconds]',
    'commands.worldborder.usage': '/worldborder <set|center|damage|warning|get> ...',
    'commands.worldborder.warning.distance.usage': '/worldborder warning distance <blocks>',
    'commands.worldborder.warning.time.usage': '/worldborder warning time <seconds>',
    'commands.worldborder.warning.usage': '/worldborder warning <time|distance>',
    'commands.xp.usage': '/xp <amount> [player] OR /xp <amount>L [player]'
  };

  return commands[commandId] || 'Unknown command usage';

}
