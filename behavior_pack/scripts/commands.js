import { world } from "@minecraft/server";
import { PokemonTeam } from "./main.js";
import { BattleSystem, Inventory } from "./battle.js";

// Registrar comandos do PokeCraft

world.beforeEvents.chatSend.subscribe((event) => {
  const player = event.sender;
  const message = event.message;

  if (!message.startsWith("/poke")) return;

  const args = message.slice(1).split(" ");
  const command = args[0];

  switch (command) {
    // Obter Pokémon inicial
    case "getstarter":
      handleGetStarter(player, args[1]);
      break;

    // Ver time
    case "team":
      handleTeam(player);
      break;

    // Ver Pokédex
    case "pokedex":
      handlePokedex(player);
      break;

    // Inventário
    case "inventory":
      handleInventory(player);
      break;

    // Comprar item
    case "buy":
      handleBuy(player, args[1], args[2]);
      break;

    // Usar item
    case "useitem":
      handleUseItem(player, args[1], args[2]);
      break;

    // Status do Pokémon
    case "status":
      handleStatus(player, args[1]);
      break;

    // Evoluir Pokémon
    case "evolve":
      handleEvolve(player, args[1]);
      break;

    // Batalha
    case "battle":
      handleBattle(player, args[1]);
      break;

    // Ajuda
    case "help":
      showHelp(player);
      break;

    default:
      player.sendMessage("§cComando desconhecido! Use §b/poke help");
  }
});

function handleGetStarter(player, choice) {
  const starters = ["bulbasaur", "charmander", "squirtle"];
  
  if (!starters.includes(choice)) {
    player.sendMessage("§cEscolha um: bulbasaur, charmander ou squirtle");
    player.sendMessage("§bExemplo: /poke getstarter charmander");
    return;
  }

  const team = new PokemonTeam(player);
  const result = team.catchPokemon(choice, 5);
  
  player.sendMessage(result.message);
  if (result.success) {
    player.sendMessage("§eSeu Pokémon inicial foi adicionado ao time!");
  }
}

function handleTeam(player) {
  const team = new PokemonTeam(player);
  const pokemons = team.getTeam();

  let message = "§6=== SEU TIME ===\n";
  
  if (pokemons.length === 0) {
    player.sendMessage("§cVocê não tem Pokémons! Use §b/poke getstarter <nome>");
    return;
  }

  pokemons.forEach((poke, index) => {
    message += `§e${index + 1}. ${poke.name} §7(Nv. ${poke.level})\n`;
    message += `   HP: §c${poke.hp}§7/§c${poke.maxHp}\n`;
  });

  player.sendMessage(message);
}

function handlePokedex(player) {
  const team = new PokemonTeam(player);
  const teamPokemons = team.getTeam();

  let message = "§6=== SEU POKÉDEX ===\n";
  
  if (teamPokemons.length === 0) {
    player.sendMessage("§cVocê ainda não capturou nenhum Pokémon!");
    return;
  }

  teamPokemons.forEach((poke) => {
    message += `§e${poke.name} - Tipo: §b${poke.type} §7(Nv. ${poke.level})\n`;
  });

  player.sendMessage(message);
}

function handleInventory(player) {
  const inventory = new Inventory(player);
  player.sendMessage(inventory.listInventory());
}

function handleBuy(player, itemId, quantity) {
  if (!itemId || !quantity) {
    player.sendMessage("§bExemplo: /poke buy pokeball 5");
    return;
  }

  const team = new PokemonTeam(player);
  const inventory = new Inventory(player);
  const money = team.getMoney();

  const { ITEMS } = require('./battle.js');
  const item = ITEMS[itemId];

  if (!item) {
    player.sendMessage("§cItem não encontrado!");
    return;
  }

  const totalCost = item.price * parseInt(quantity);

  if (money < totalCost) {
    player.sendMessage(`§cVocê precisa de §b₽${totalCost}§c, mas tem apenas §b₽${money}`);
    return;
  }

  team.addMoney(-totalCost);
  const result = inventory.addItem(itemId, parseInt(quantity));
  
  player.sendMessage(result.message);
  player.sendMessage(`§eSeu dinheiro: §b₽${money - totalCost}`);
}

function handleUseItem(player, itemId, targetSlot) {
  const inventory = new Inventory(player);
  const team = new PokemonTeam(player);
  const pokemons = team.getTeam();

  if (!targetSlot || isNaN(targetSlot) || targetSlot < 1 || targetSlot > pokemons.length) {
    player.sendMessage("§cSlot de Pokémon inválido!");
    return;
  }

  const pokemon = pokemons[targetSlot - 1];
  const { ITEMS } = require('./battle.js');
  const item = ITEMS[itemId];

  if (!item) {
    player.sendMessage("§cItem não encontrado!");
    return;
  }

  if (inventory.getItem(itemId) === 0) {
    player.sendMessage("§cVocê não possui este item!");
    return;
  }

  if (item.type === "healing") {
    pokemon.hp = Math.min(pokemon.maxHp, pokemon.hp + item.heal);
    player.sendMessage(`§a${pokemon.name} recuperou ${item.heal} HP!`);
  } else if (item.type === "levelup") {
    pokemon.level += item.bonusLevel;
    player.sendMessage(`§a${pokemon.name} subiu para o nível ${pokemon.level}!`);
  }

  inventory.removeItem(itemId, 1);
  team.saveTeam();
}

function handleStatus(player, slot) {
  const team = new PokemonTeam(player);
  const pokemons = team.getTeam();

  if (!slot || isNaN(slot) || slot < 1 || slot > pokemons.length) {
    player.sendMessage("§cSlot inválido!");
    return;
  }

  const poke = pokemons[slot - 1];
  let message = `§6=== ${poke.name.toUpperCase()} ===\n`;
  message += `§eNível: §b${poke.level}\n`;
  message += `§eHP: §c${poke.hp}§7/§c${poke.maxHp}\n`;
  message += `§eAtaque: §b${poke.stats.attack}\n`;
  message += `§eDefesa: §b${poke.stats.defense}\n`;
  message += `§eVelocidade: §b${poke.stats.speed}\n`;

  player.sendMessage(message);
}

function handleEvolve(player, slot) {
  const team = new PokemonTeam(player);
  const pokemons = team.getTeam();

  if (!slot || isNaN(slot) || slot < 1 || slot > pokemons.length) {
    player.sendMessage("§cSlot inválido!");
    return;
  }

  const poke = pokemons[slot - 1];
  const { POKEMONS } = require('./main.js');
  const data = POKEMONS[poke.id];

  if (!data || !data.evolvesTo || poke.level < data.evolveLevel) {
    player.sendMessage(`§c${poke.name} não pode evoluir agora!`);
    return;
  }

  poke.id = data.evolvesTo;
  poke.name = POKEMONS[data.evolvesTo].name;
  player.sendMessage(`§a${poke.name} evoluiu!`);
  team.saveTeam();
}

function handleBattle(player, targetPlayer) {
  if (!targetPlayer) {
    player.sendMessage("§bExemplo: /poke battle [nome do jogador]");
    return;
  }

  player.sendMessage("§eAceitamos sua luta! Procure por §b" + targetPlayer);
}

function showHelp(player) {
  let help = "§6=== POKECRAFT AJUDA ===\n";
  help += "§e/poke getstarter <nome> §7- Obter Pokémon inicial\n";
  help += "§e/poke team §7- Ver seu time\n";
  help += "§e/poke pokedex §7- Ver Pokédex\n";
  help += "§e/poke inventory §7- Ver inventário\n";
  help += "§e/poke buy <item> <qtd> §7- Comprar itens\n";
  help += "§e/poke useitem <item> <slot> §7- Usar item\n";
  help += "§e/poke status <slot> §7- Ver status\n";
  help += "§e/poke evolve <slot> §7- Evoluir Pokémon\n";
  help += "§e/poke battle <jogador> §7- Desafiar\n";
  
  player.sendMessage(help);
}

console.warn("§a[PokeCraft] Sistema de comandos carregado!");
