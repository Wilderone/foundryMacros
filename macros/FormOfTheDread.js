const updates = [];

let normal = 'worlds/forgotten-advisor-of-luthard/characters/041_-_A_27yat_Nemerym/sides/side_0.png';
let undead = 'worlds/forgotten-advisor-of-luthard/characters/041_-_A_27yat_Nemerym/sides/side_1.png';

const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

const eyes = [
  "modules/jb2a_patreon/Library/Generic/Eyes/Eyes_Few01_01_Dark_Purple_600x600.webm",
  "modules/jb2a_patreon/Library/Generic/Eyes/Eyes_Few01_01_Dark_Red_600x600.webm",
  "modules/jb2a_patreon/Library/Generic/Eyes/Eyes_Few01_01_Regular_OrangeRed_600x600.webm",
  "modules/jb2a_patreon/Library/Generic/Eyes/Eyes_Few01_02_Dark_Red_600x600.webm",
  "modules/jb2a_patreon/Library/Generic/Eyes/Eyes_Few01_02_Regular_OrangeRed_600x600.webm",
  "modules/jb2a_patreon/Library/Generic/Eyes/Eyes_Few01_03_Dark_Red_600x600.webm",
  "modules/jb2a_patreon/Library/Generic/Eyes/Eyes_Many01_01_Dark_Red_600x600.webm",
  "modules/jb2a_patreon/Library/Generic/Eyes/Eyes_Many01_02_Dark_Red_600x600.webm",
  "modules/jb2a_patreon/Library/Generic/Eyes/Eyes_Many01_02_Regular_OrangeRed_600x600.webm",
  "modules/jb2a_patreon/Library/Generic/Eyes/Eyes_Many01_03_Dark_Red_600x600.webm",
  "modules/jb2a_patreon/Library/Generic/Eyes/Eyes_Single01_01_Dark_Red_300x300.webm",
  "modules/jb2a_patreon/Library/Generic/Eyes/Eyes_Single01_01_Regular_OrangeRed_300x300.webm"
]

const impacts = [
  "modules/jb2a_patreon/Library/Generic/Impact/Impact_02_Dark_Red_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Impact/Impact_03_Dark_Purple_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Impact/Impact_03_Dark_Red_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Impact/Impact_04_Dark_Red_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Impact/Impact_07_Regular_Red02_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Impact/Impact_11_Dark_Red_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Impact/Impact_12_Dark_Red_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Impact/Impact_12_Regular_Red_400x400.webm"
]

const lightnings = [
  "modules/jb2a_patreon/Library/Generic/Lightning/LightningBall_01_Dark_Red_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Lightning/LightningBall_01_Regular_Red_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Lightning/StaticElectricity_01_Dark_Red_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Lightning/StaticElectricity_01_Regular_Orange_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Lightning/StaticElectricity_02_Dark_Red_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Lightning/StaticElectricity_03_Dark_Red_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Lightning/StaticElectricity_03_Regular_Red_400x400.webm"
]

const shadows = [
  "modules/jb2a_patreon/Library/Generic/Smoke/Fumes04_01_Black_Loop_400x600.webm",
  "modules/jb2a_patreon/Library/Generic/Smoke/SmokePlumes01_03_Dark_Red_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Smoke/SmokePuff01_01_Dark_Black_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Smoke/SmokePuff01_01_Regular_Grey_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Smoke/SmokePuff01_02_Dark_Black_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Smoke/SmokePuffSide01_01_Dark_Black_400x400.webm",
  "modules/jb2a_patreon/Library/Generic/Smoke/SmokeRing_01_Dark_Black_800x800.webm"
]

// ID of the token that used by the item
let eventToken =  canvas.tokens.get(args[1].tokenId);
// ID of player token
let controlledToken = canvas.tokens.controlled[0];
// Form Of The Dread gives 1d10 + warlock level temporary HP.
let tempHP = new Roll('1d10');
await tempHP.evaluate();
if (args[0] == "on") // args is an array, zero element contains "on" or "off" (effect attribute), and [1] contains information about effect token
{
    new Sequence() // This will apply animation
    .effect()
      .file(randomItem(eyes))
      .attachTo(eventToken)
      .filter("ColorMatrix", {hue:-15, saturate:1})
      .size(3, {gridUnits: true})

    .effect()
      .file(randomItem(lightnings))
      .attachTo(eventToken)
      .size(3, { gridUnits: true })

    .effect()
      .file(randomItem(shadows))
      .attachTo(eventToken)
      .belowTokens()
      .size(3.5, {gridUnits: true})

    .effect()
      .file(randomItem(impacts))
      .attachTo(eventToken)
      .size(3.5, {gridUnits: true})
        .play();

      // And this will change image of the token
    updates.push({
        _id: controlledToken.id,
        img: undead
    })
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
