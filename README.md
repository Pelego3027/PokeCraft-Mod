# 🎮 PokeCraft - Mod de Pokémon para Minecraft Bedrock

![PokeCraft](https://img.shields.io/badge/Version-1.0.0-blue) ![Minecraft](https://img.shields.io/badge/Minecraft-Bedrock-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

Um mod completo e profissional de Pokémon para Minecraft Bedrock com sistema de captura, batalhas, evoluções e muito mais!

## ✨ Características

✅ **15 Pokémons Únicos** - Bulbasaur, Charmander, Squirtle, Pikachu, Geodude, Psyduck, Abra, Machop, Bellsprout, Ponyta, Slowpoke, Seel, Shellder, Krabby, Horsea

✅ **Sistema de Captura** - Capture Pokémons selvagens com Pokébolas diferentes

✅ **4 Tipos de Pokébolas** - Pokébola, Super Bola, Ultra Bola, Bola Mestra

✅ **Batalhas PvP** - Duel com outros jogadores

✅ **Sistema de Evolução** - Evolua seus Pokémons ao atingir níveis específicos

✅ **Inventário Completo** - Poções, Antídotos, Pedras de Evolução e muito mais

✅ **Sistema de Dinheiro** - Ganhe dinheiro capturando e vencendo batalhas

✅ **Pokédex** - Acompanhe todos os Pokémons capturados

✅ **Time de 6 Pokémons** - Organize seu time de forma estratégica

## 🚀 Instalação

### Para Minecraft Bedrock (Windows 10/11 e Consoles)

1. **Baixar o Mod**
   ```
   git clone https://github.com/Pelego3027/PokeCraft-Mod.git
   ```

2. **Localizar a Pasta de Add-ons**
   - Windows: `%APPDATA%\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\behavior_packs`
   - Console: Use um programa de transferência de arquivos

3. **Copiar Pastas**
   ```
   Copiar "behavior_pack" para a pasta de behavior_packs
   Copiar "resource_pack" para a pasta de resource_packs
   ```

4. **Ativar no Minecraft**
   - Abrir Minecraft Bedrock
   - Criar um novo mundo
   - Em "Adicionar conteúdo" → selecionar PokeCraft
   - Ativar tanto Behavior Pack quanto Resource Pack
   - Criar mundo

### 📱 Para Apple (iPhone/iPad)

#### ⚠️ Importante: Limitações do iOS

Minecraft Bedrock no iOS tem limitações significativas com Add-ons. Você tem 3 opções:

**Opção 1: Usando Realms+ (RECOMENDADO)**
1. Assine Minecraft Realms+ no seu iPad/iPhone
2. Importe o PokeCraft em um Realm
3. Acesse o mundo através do Realms

**Opção 2: Transferir de um PC**
1. Configure o mod no Windows 10/11
2. Use o OneDrive ou iCloud para sincronizar mundos
3. Acesse em seu iPad via cross-platform

**Opção 3: Usar App Alternativas
- Toolbox for Minecraft (permite instalar add-ons no iOS)
- Minecraft Launcher (versão oficial)

> **Nota**: O iOS não permite instalação direta de add-ons como o Windows. Você precisa de Realms+ ou usar aplicativos alternativos.

## 📖 Como Usar

### Comandos Básicos

```
/poke help                    - Mostra todos os comandos
/poke getstarter charmander   - Obter seu Pokémon inicial (bulbasaur, charmander, squirtle)
/poke team                    - Ver seu time atual
/poke pokedex                 - Ver todos os Pokémons capturados
/poke inventory               - Ver seu inventário
/poke status <slot>           - Ver status de um Pokémon (slot 1-6)
```

### Comprar Itens

```
/poke buy pokeball 10         - Comprar 10 Pokébolas
/poke buy potion 5            - Comprar 5 Poções
/poke buy ultraball 1         - Comprar 1 Ultra Bola
/poke buy rare_candy 1        - Comprar 1 Doce Raro
```

### Usar Itens

```
/poke useitem potion 1        - Usar poção no Pokémon do slot 1
/poke useitem rare_candy 3    - Aumentar nível do slot 3
/poke evolve 2                - Evoluir Pokémon do slot 2
```

### Batalhas

```
/poke battle [nome_jogador]   - Desafiar outro jogador
```

## 💰 Sistema de Economia

| Ação | Recompensa |
|------|-----------|
| Capturar Pokémon | ₽100 - ₽500 |
| Vencer Batalha | ₽ (depende do nível) |
| Missões | ₽1000 - ₽5000 |

### Preços dos Itens

| Item | Preço |
|------|-------|
| Pokébola | ₽200 |
| Super Bola | ₽600 |
| Ultra Bola | ₽1200 |
| Bola Mestra | ₽10000 |
| Poção | ₽300 |
| Super Poção | ₽700 |
| Doce Raro | ₽5000 |

## 🎯 15 Pokémons Disponíveis

### Tipo Grama
- **Bulbasaur** (Nível 5) → Evolui em Ivysaur no nível 16
- **Bellsprout** (Nível 10) → Evolui em Weepinbell no nível 21

### Tipo Fogo
- **Charmander** (Nível 5) → Evolui em Charmeleon no nível 16
- **Ponyta** (Nível 15) → Evolui em Rapidash no nível 40

### Tipo Água
- **Squirtle** (Nível 5) → Evolui em Wartortle no nível 16
- **Psyduck** (Nível 10) → Evolui em Golduck no nível 33
- **Seel** (Nível 12) → Evolui em Dewgong no nível 34
- **Shellder** (Nível 10) → Evolui em Cloyster no nível 30
- **Krabby** (Nível 8) → Evolui em Kingler no nível 28
- **Horsea** (Nível 12) → Evolui em Seadra no nível 32

### Tipo Elétrico
- **Pikachu** (Nível 20) - Não evolui

### Tipo Psíquico
- **Abra** (Nível 15) → Evolui em Kadabra no nível 16

### Tipo Luta
- **Machop** (Nível 12) → Evolui em Machoke no nível 28

### Tipo Rocha/Terra
- **Geodude** (Nível 8) → Evolui em Graveler no nível 25

### Tipo Água/Psíquico
- **Slowpoke** (Nível 18) → Evolui em Slowbro no nível 37

## 🎮 Dicas de Jogo

1. **Comece pelo Pokémon Inicial** - Use `/poke getstarter` para escolher entre Bulbasaur, Charmander ou Squirtle

2. **Capture Diferentes Tipos** - Ter diferentes tipos em seu time é estratégico para batalhas

3. **Economize Dinheiro** - Guarde dinheiro para comprar Ultra Bolas e Doces Raros

4. **Treine Seus Pokémons** - Use o sistema de experiência para aumentar níveis

5. **Explore** - Procure Pokémons selvagens em diferentes biomas

## 📁 Estrutura do Projeto

```
PokeCraft-Mod/
├── behavior_pack/
│   ├── manifest.json
│   ├── scripts/
│   │   ├── main.js          (Sistema principal)
│   │   ├── battle.js        (Batalhas e itens)
│   │   └── commands.js      (Comandos)
│   └── entities/
├── resource_pack/
│   ├── manifest.json
│   ├── textures/
│   ├── models/
│   └── sounds/
└── README.md
```

## 🐛 Resolução de Problemas

### "Add-on não aparece no Minecraft"
- Verifique se ambos os packs (behavior e resource) estão ativados
- Reinicie o Minecraft
- Verifique os nomes das pastas (sem espaços ou caracteres especiais)

### "Comandos não funcionam"
- Certifique-se de que o Cheats está ativado no mundo
- Use `/poke help` para listar todos os comandos
- Reinicie o mundo

### "Não consigo evoluir meu Pokémon"
- Verifique o nível mínimo necessário
- Abra a loja com `/poke buy` para comprar Pedras de Evolução

### "iOS/Apple - Add-on não funciona"
- Use Realms+ (opção recomendada)
- Use a app Toolbox for Minecraft
- Sincronize via OneDrive/iCloud com PC

## 🤝 Contribuições

Contribuições são bem-vindas! Abra uma Issue ou Pull Request com suas sugestões.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👨‍💻 Desenvolvedor

**Pelego3027** - GitHub: [@Pelego3027](https://github.com/Pelego3027)

## 🌟 Agradecimentos

- Comunidade Minecraft Bedrock
- Pokémon Company (pelos designs originais)
- Todos os beta testers

## 📞 Suporte

Encontrou um bug? Abra uma Issue no repositório!

---

**Versão Atual**: 1.0.0  
**Última Atualização**: Setembro 2026  
**Compatibilidade**: Minecraft Bedrock 1.20.0+

🎮 **Divirta-se capturando todos os Pokémons!** 🎮
