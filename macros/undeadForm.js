const updates = [];

let normal = 'worlds/forgotten-advisor-of-luthard/characters/041_-_A_27yat_Nemerym/sides/side_0.png';
let undead = 'worlds/forgotten-advisor-of-luthard/characters/041_-_A_27yat_Nemerym/sides/side_1.png';

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
      .file("modules/jb2a_patreon/Library/Generic/Eyes/Eyes_Few01_03_Dark_Red_600x600.webm")
      .attachTo(eventToken)
      .belowTokens()
      .filter("ColorMatrix", {hue:-15, saturate:1})
      .size(3, {gridUnits: true})

    .effect()
      .file("modules/jb2a_patreon/Library/Generic/Impact/Impact_11_Dark_Red_400x400.webm")
      .attachTo(eventToken)
      .size(3, { gridUnits: true })

    .effect()
      .file("modules/jb2a_patreon/Library/Generic/Lightning/StaticElectricity_01_Dark_Red_400x400.webm")
      .attachTo(eventToken)
      .belowTokens()
      .size(3.5, {gridUnits: true})

    .effect()
      .file("modules/jb2a_patreon/Library/Generic/Impact/DropShadow_01_Dark_Black_400x400.webm")
      .attachTo(eventToken)
      .belowTokens()
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
