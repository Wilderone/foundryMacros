const updates = [];

let normal = 'worlds/forgotten-advisor-of-luthard/characters/047_-__D0_9B_D1_83_D0_B1_D1_83_D1_88/sides/side_0.png';
let enraged = 'worlds/forgotten-advisor-of-luthard/characters/047_-__D0_9B_D1_83_D0_B1_D1_83_D1_88/sides/side_1.png';

// ID of the token that used the item
let eventToken =  canvas.tokens.get(args[1].tokenId)
let controlledToken = canvas.tokens.controlled[0];

if (args[0] == "on")
{
    new Sequence()
    .effect()
    .file("modules/jb2a_patreon/Library/Generic/Explosion/SideExplosion01_01_Regular_Orange_600x600.webm")
    .attachTo(eventToken)
    .belowTokens()
    .filter("ColorMatrix", {hue:-15, saturate:1})
    .size(1.5, {gridUnits: true})

  .effect()
    .file("modules/jb2a_patreon/Library/TMFX/OutPulse/Circle/OutPulse_02_Circle_Normal_500.webm")
    .attachTo(eventToken)
    .size(4, { gridUnits: true })
    .opacity(0.25)

  .effect()
    .file("modules/jb2a_patreon/Library/Generic/Impact/GroundCrackImpact_01_Regular_Orange_600x600.webm")
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
