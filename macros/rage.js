const updates = [];

let normal = 'worlds/forgotten-advisor-of-luthard/characters/047_-__D0_9B_D1_83_D0_B1_D1_83_D1_88/sides/side_0.png';
let enraged = 'worlds/forgotten-advisor-of-luthard/characters/047_-__D0_9B_D1_83_D0_B1_D1_83_D1_88/sides/side_1.png';

const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

const explosions = [
  "modules/jb2a_patreon/Library/Generic/Explosion/SideExplosion01_01_Regular_Orange_600x600.webm",
  "modules/JB2A_DnD5e/Library/Generic/Explosion/Explosion_01_Orange_400x400.webm",
  "modules/JB2A_DnD5e/Library/Generic/Explosion/Explosion_03_Regular_BlueYellow_400x400.webm",
  "modules/JB2A_DnD5e/Library/Generic/Explosion/SideExplosion01_01_Regular_Orange_600x600.webm",
  "modules/jb2a_patreon/Library/Generic/Explosion/Explosion_02_Orange_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Explosion/Explosion_04_Dark_Red_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Explosion/Explosion_04_Regular_Orange_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Explosion/ShrapnelBomb01_01_Regular_Red_800x800.webm",
]

const pulses = [
  "modules/jb2a_patreon/Library/TMFX/OutPulse/Circle/OutPulse_01_Circle_Normal_500.webm",
  "modules/jb2a_patreon/Library/TMFX/OutPulse/Circle/OutPulse_02_Circle_Normal_500.webm",
  "modules/jb2a_patreon/Library/TMFX/OutPulse/Circle/OutPulse_03_Circle_Normal_500.webm",
  "modules/jb2a_patreon/Library/TMFX/OutFlow/Circle/OutFlow_02_Circle_500x500.webm",
  "modules/jb2a_patreon/Library/TMFX/OutFlow/Circle/OutFlow_03_Circle_500x500.webm"
]

const impacts = [
  "modules/jb2a_patreon/Library/Generic/Impact/GroundCrackImpact_01_Dark_Red_600x600.webm",
  "modules/jb2a_patreon/Library/Generic/Impact/GroundCrackImpact_01_Regular_Blue_600x600.webm",
  "modules/jb2a_patreon/Library/Generic/Impact/GroundCrackImpact_01_Regular_Green_600x600.webm",
  "modules/jb2a_patreon/Library/Generic/Impact/GroundCrackImpact_01_Regular_White_600x600.webm",
  "modules/jb2a_patreon/Library/Generic/Impact/GroundCrackImpact_01_StillFrame.webp",
  "modules/jb2a_patreon/Library/Generic/Impact/GroundCrackImpact_02_Dark_Red_600x600.webm",
  "modules/jb2a_patreon/Library/Generic/Impact/GroundCrackImpact_02_Regular_Orange_600x600.webm",
  "modules/jb2a_patreon/Library/Generic/Impact/GroundCrackImpact_03_Dark_Red_600x600.webm",
  "modules/jb2a_patreon/Library/Generic/Impact/GroundCrackImpact_03_Regular_White_600x600.webm",
  "modules/jb2a_patreon/Library/Generic/Impact/Impact_04_Dark_Red_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Impact/Impact_11_Regular_Red_400x400.webm"
]

// ID of the token that used the item
let eventToken =  canvas.tokens.get(args[1].tokenId)
let controlledToken = canvas.tokens.controlled[0];

if (args[0] == "on")
{
    new Sequence()
    .effect()
    .file(randomItem(explosions))
    .attachTo(eventToken)
    .belowTokens()
    .filter("ColorMatrix", {hue:-15, saturate:1})
    .size(1.5, {gridUnits: true})

  .effect()
    .file(randomItem(pulses))
    .attachTo(eventToken)
    .size(4, { gridUnits: true })
    .opacity(0.25)

  .effect()
    .file(randomItem(impacts))
    .attachTo(eventToken)
    .belowTokens()
    .filter("ColorMatrix", {hue:-15, saturate:1})
    .size(3.5, {gridUnits: true})

      .play()

    updates.push({
        _id: controlledToken.id,
        img: enraged
    });
}
if (args[0] == "off")
{
    updates.push({
        _id: controlledToken.id,
        img: normal
    });
    await TokenMagic.deleteFiltersOnSelected();
}

canvas.scene.updateEmbeddedDocuments("Token", updates);
