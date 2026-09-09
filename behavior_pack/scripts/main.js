import { world, system } from "@minecraft/server";

// Sistema de Pokémons - PokeCraft
const POKEMONS = {
  bulbasaur: {
    name: "Bulbasaur",
    type: "Grass/Poison",
    hp: 45,
    attack: 49,
    defense: 49,
    spAtk: 65,
    spDef: 65,
    speed: 45,
    catchRate: 45,
    evolveLevel: 16,
    evolvesTo: "ivysaur"
  },
  charmander: {
    name: "Charmander",
    type: "Fire",
    hp: 39,
    attack: 52,
    defense: 43,
    spAtk: 60,
    spDef: 50,
    speed: 65,
    catchRate: 45,
    evolveLevel: 16,
    evolvesTo: "charmeleon"
  },
  squirtle: {
    name: "Squirtle",
    type: "Water",
    hp: 44,
    attack: 48,
    defense: 65,
    spAtk: 50,
    spDef: 64,
    speed: 43,
    catchRate: 45,
    evolveLevel: 16,
    evolvesTo: "wartortle"
  },
  pikachu: {
    name: "Pikachu",
    type: "Electric",
    hp: 35,
    attack: 55,
    defense: 40,
    spAtk: 50,
    spDef: 50,
    speed: 90,
    catchRate: 190,
    evolveLevel: 999,
    evolvesTo: null
  },
  geodude: {
    name: "Geodude",
    type: "Rock/Ground",
    hp: 40,
    attack: 80,
    defense: 100,
    spAtk: 30,
    spDef: 30,
    speed: 20,
    catchRate: 255,
    evolveLevel: 25,
    evolvesTo: "graveler"
  },
  psyduck: {
    name: "Psyduck",
    type: "Water",
    hp: 50,
    attack: 52,
    defense: 48,
    spAtk: 65,
    spDef: 50,
    speed: 55,
    catchRate: 190,
    evolveLevel: 33,
    evolvesTo: "golduck"
  },
  abra: {
    name: "Abra",
    type: "Psychic",
    hp: 25,
    attack: 20,
    defense: 15,
    spAtk: 105,
    spDef: 30,
    speed: 90,
    catchRate: 200,
    evolveLevel: 16,
    evolvesTo: "kadabra"
  },
  machop: {
    name: "Machop",
    type: "Fighting",
    hp: 70,
    attack: 80,
    defense: 50,
    spAtk: 35,
    spDef: 35,
    speed: 35,
    catchRate: 180,
    evolveLevel: 28,
    evolvesTo: "machoke"
  },
  bellsprout: {
    name: "Bellsprout",
    type: "Grass/Poison",
    hp: 50,
    attack: 75,
    defense: 35,
    spAtk: 70,
    spDef: 30,
    speed: 40,
    catchRate: 255,
    evolveLevel: 21,
    evolvesTo: "weepinbell"
  },
  ponyta: {
    name: "Ponyta",
    type: "Fire",
    hp: 50,
    attack: 85,
    defense: 55,
    spAtk: 65,
    spDef: 55,
    speed: 90,
    catchRate: 180,
    evolveLevel: 40,
    evolvesTo: "rapidash"
  },
  slowpoke: {
    name: "Slowpoke",
    type: "Water/Psychic",
    hp: 90,
    attack: 65,
    defense: 65,
    spAtk: 40,
    spDef: 40,
    speed: 15,
    catchRate: 255,
    evolveLevel: 37,
    evolvesTo: "slowbro"
  },
  seel: {
    name: "Seel",
    type: "Water",
    hp: 65,
    attack: 45,
    defense: 55,
    spAtk: 45,
    spDef: 70,
    speed: 45,
    catchRate: 190,
    evolveLevel: 34,
    evolvesTo: "dewgong"
  },
  shellder: {
    name: "Shellder",
    type: "Water",
    hp: 30,
    attack: 65,
    defense: 100,
    spAtk: 45,
    spDef: 25,
    speed: 40,
    catchRate: 190,
    evolveLevel: 30,
    evolvesTo: "cloyster"
  },
  krabby: {
    name: "Krabby",
    type: "Water",
    hp: 30,
    attack: 105,
    defense: 90,
    spAtk: 25,
    spDef: 25,
    speed: 50,
    catchRate: 225,
    evolveLevel: 28,
    evolvesTo: "kingler"
  },
  horsea: {
    name: "Horsea",
    type: "Water",
    hp: 30,
    attack: 40,
    defense: 70,
    spAtk: 70,
    spDef: 25,
    speed: 60,
    catchRate: 225,
    evolveLevel: 32,
    evolvesTo: "seadra"
  }
};

// Sistema de Pokébolas
const POKEBALLS = {
  pokeball: {
    name: "Pokébola",
    catchRate: 1.0,
    cost: 200
  },
  greatball: {
    name: "Super Bola",
    catchRate: 1.5,
    cost: 600
  },
  ultraball: {
    name: "Ultra Bola",
    catchRate: 2.0,
    cost: 1200
  },
  masterball: {
    name: "Bola Mestra",
    catchRate: 999,
    cost: 10000
  }
};

// Classe para gerenciar Pokémons capturados
class PokemonTeam {
  constructor(player) {
    this.player = player;
    this.team = [];
    this.pokedex = {};
    this.money = 0;
    this.loadTeam();
  }

  loadTeam() {
    try {
      const data = this.player.getDynamicProperty("pokeTeam");
      if (data) {
        this.team = JSON.parse(data);
      }
    } catch (e) {
      this.team = [];
    }
  }

  saveTeam() {
    this.player.setDynamicProperty("pokeTeam", JSON.stringify(this.team));
  }

  catchPokemon(pokemonId, level = 5) {
    if (this.team.length >= 6) {
      return { success: false, message: "§cSeu time está cheio!" };
    }

    const pokemonData = POKEMONS[pokemonId];
    if (!pokemonData) {
      return { success: false, message: "§cPokémon não encontrado!" };
    }

    const newPokemon = {
      id: pokemonId,
      name: pokemonData.name,
      level: level,
      hp: pokemonData.hp,
      maxHp: pokemonData.hp,
      experience: 0,
      stats: {
        attack: pokemonData.attack,
        defense: pokemonData.defense,
        spAtk: pokemonData.spAtk,
        spDef: pokemonData.spDef,
        speed: pokemonData.speed
      }
    };

    this.team.push(newPokemon);
    this.saveTeam();
    return { success: true, message: `§aVocê capturou ${pokemonData.name}!` };
  }

  addMoney(amount) {
    this.money += amount;
    this.player.setDynamicProperty("pokeMoney", this.money);
  }

  getMoney() {
    this.money = this.player.getDynamicProperty("pokeMoney") || 0;
    return this.money;
  }

  getTeam() {
    this.loadTeam();
    return this.team;
  }
}

// Inicializar sistema ao carregar mundo
world.afterEvents.worldInitialize.subscribe(() => {
  console.warn("§6[PokeCraft] Sistema inicializado com sucesso!");
  console.warn("§e15 Pokémons disponíveis para captura");
});

// Evento ao jogador entrar
world.afterEvents.playerSpawn.subscribe((event) => {
  const player = event.player;
  const team = new PokemonTeam(player);
  
  if (team.getTeam().length === 0) {
    player.sendMessage("§6Welcome to PokeCraft! §eUse §b/function get_starter §epara pegar seu Pokémon inicial!");
  }
});

// Exportar dados
export { POKEMONS, POKEBALLS, PokemonTeam };
