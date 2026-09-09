import { world, system, MolangVariableMap } from "@minecraft/server";

// Sistema de Batalhas - PokeCraft

class BattleSystem {
  constructor(player1, pokemon1, player2, pokemon2) {
    this.player1 = player1;
    this.player2 = player2;
    this.pokemon1 = { ...pokemon1, currentHp: pokemon1.maxHp };
    this.pokemon2 = { ...pokemon2, currentHp: pokemon2.maxHp };
    this.turn = 1;
    this.battleLog = [];
    this.battleActive = true;
  }

  // Calcular dano da batalha
  calculateDamage(attacker, defender, moveType) {
    const basePower = this.getMoveBasePower(moveType);
    const attack = attacker.stats.attack;
    const defense = defender.stats.defense;
    
    const damage = Math.floor((2 * 50 * basePower * attack / 5) / defense / 50) + 2;
    const variance = Math.random() * 0.15 + 0.85; // 85-100% variação
    
    return Math.floor(damage * variance);
  }

  // Obter poder base de um movimento
  getMoveBasePower(moveType) {
    const moves = {
      "tackle": 40,
      "scratch": 40,
      "ember": 40,
      "water_gun": 40,
      "thunder_shock": 40,
      "vine_whip": 45,
      "rock_throw": 50,
      "bite": 60,
      "dragon_rage": 80,
      "thunderbolt": 90
    };
    return moves[moveType] || 40;
  }

  // Executar turno de batalha
  executeTurn(attacker, defender, moveType) {
    if (!this.battleActive) return { success: false, message: "Batalha não está ativa!" };

    const damage = this.calculateDamage(attacker, defender, moveType);
    defender.currentHp = Math.max(0, defender.currentHp - damage);

    const log = `${attacker.name} usou ${moveType}! Causou ${damage} de dano!`;
    this.battleLog.push(log);

    if (defender.currentHp <= 0) {
      this.battleActive = false;
      return { success: true, message: log, battleEnd: true, winner: attacker.name };
    }

    return { success: true, message: log, battleEnd: false };
  }

  // Obter status da batalha
  getStatus() {
    return {
      pokemon1: {
        name: this.pokemon1.name,
        hp: this.pokemon1.currentHp,
        maxHp: this.pokemon1.maxHp,
        level: this.pokemon1.level
      },
      pokemon2: {
        name: this.pokemon2.name,
        hp: this.pokemon2.currentHp,
        maxHp: this.pokemon2.maxHp,
        level: this.pokemon2.level
      },
      turn: this.turn,
      active: this.battleActive
    };
  }

  // Calcular experiência
  calculateExp(level, defeated) {
    return Math.floor((defeated.level * 100) / 7);
  }

  // Jogador ganha batalha
  winBattle(winner, loser, loserPokemon) {
    const expGain = this.calculateExp(winner.level, loserPokemon);
    winner.experience += expGain;
    
    // Verificar evolução
    const POKEMONS = require('./main.js').POKEMONS;
    if (POKEMONS[winner.id] && winner.level >= POKEMONS[winner.id].evolveLevel) {
      return {
        expGain: expGain,
        evolved: true,
        evolvedTo: POKEMONS[winner.id].evolvesTo
      };
    }

    return { expGain: expGain, evolved: false };
  }
}

// Sistema de Itens
const ITEMS = {
  // Pokébolas
  pokeball: { name: "Pokébola", type: "pokeball", catchRate: 1.0, price: 200 },
  greatball: { name: "Super Bola", type: "pokeball", catchRate: 1.5, price: 600 },
  ultraball: { name: "Ultra Bola", type: "pokeball", catchRate: 2.0, price: 1200 },
  masterball: { name: "Bola Mestra", type: "pokeball", catchRate: 999, price: 10000 },

  // Poções
  potion: { name: "Poção", type: "healing", heal: 20, price: 300 },
  super_potion: { name: "Super Poção", type: "healing", heal: 50, price: 700 },
  hyper_potion: { name: "Hiperpoção", type: "healing", heal: 200, price: 1500 },
  full_restore: { name: "Restauração Total", type: "healing", heal: 999, price: 3000 },

  // Outros itens
  antidote: { name: "Antídoto", type: "status", cures: "poison", price: 100 },
  awakening: { name: "Despertador", type: "status", cures: "sleep", price: 200 },
  full_heal: { name: "Cura Total", type: "status", cures: "all", price: 600 },
  rare_candy: { name: "Doce Raro", type: "levelup", bonusLevel: 1, price: 5000 },

  // Pedras de Evolução
  fire_stone: { name: "Pedra do Fogo", type: "evolution", eleType: "fire", price: 2100 },
  water_stone: { name: "Pedra da Água", type: "evolution", eleType: "water", price: 2100 },
  thunder_stone: { name: "Pedra do Trovão", type: "evolution", eleType: "electric", price: 2100 },
  leaf_stone: { name: "Pedra da Folha", type: "evolution", eleType: "grass", price: 2100 }
};

// Sistema de Inventory
class Inventory {
  constructor(player) {
    this.player = player;
    this.items = {};
    this.loadInventory();
  }

  loadInventory() {
    try {
      const data = this.player.getDynamicProperty("pokeInventory");
      if (data) {
        this.items = JSON.parse(data);
      }
    } catch (e) {
      this.items = {};
    }
  }

  saveInventory() {
    this.player.setDynamicProperty("pokeInventory", JSON.stringify(this.items));
  }

  addItem(itemId, quantity = 1) {
    if (!ITEMS[itemId]) {
      return { success: false, message: "§cItem não encontrado!" };
    }
    
    this.items[itemId] = (this.items[itemId] || 0) + quantity;
    this.saveInventory();
    return { success: true, message: `§aAdicionado ${quantity}x ${ITEMS[itemId].name}` };
  }

  removeItem(itemId, quantity = 1) {
    if (!this.items[itemId] || this.items[itemId] < quantity) {
      return { success: false, message: "§cVocê não possui este item!" };
    }
    
    this.items[itemId] -= quantity;
    if (this.items[itemId] === 0) {
      delete this.items[itemId];
    }
    this.saveInventory();
    return { success: true, message: `§aRemovido ${quantity}x ${ITEMS[itemId].name}` };
  }

  getItem(itemId) {
    return this.items[itemId] || 0;
  }

  listInventory() {
    let list = "§6=== Seu Inventário ===\n";
    for (const [itemId, quantity] of Object.entries(this.items)) {
      list += `${ITEMS[itemId].name} x${quantity}\n`;
    }
    return list;
  }
}

export { BattleSystem, ITEMS, Inventory };
