/* Character training catalogue: original house-rule adaptations. */
(function(root){
const disciplines={
  "Sword Cultivator": {
    "weapon": "Sword",
    "description": "Precise cuts, measured footwork and sword intent.",
    "manual": "Clear Edge Sword Canon"
  },
  "Saber Cultivator": {
    "weapon": "Saber",
    "description": "Sweeping power, committed attacks and blade intent.",
    "manual": "Breaking Tide Saber Scripture"
  },
  "Spear Cultivator": {
    "weapon": "Spear",
    "description": "Reach, thrusts and control of an approach.",
    "manual": "Nine Lines Spear Manual"
  },
  "Halberd Cultivator": {
    "weapon": "Halberd",
    "description": "Hooking, sweeping and holding a battle line.",
    "manual": "Iron Banner Halberd Canon"
  },
  "Axe Cultivator": {
    "weapon": "Axe",
    "description": "Decisive chopping force and breaking defenses.",
    "manual": "Mountain-Cleaving Axe Manual"
  },
  "Dagger Cultivator": {
    "weapon": "Dagger",
    "description": "Close quarters, hidden openings and swift withdrawal.",
    "manual": "Hidden Thorn Dagger Manual"
  },
  "Dual-Blade Cultivator": {
    "weapon": "Pair of short swords",
    "description": "Coordinated attacks and defense with paired blades.",
    "manual": "Twin Streams Blade Canon"
  },
  "Staff Cultivator": {
    "weapon": "Staff",
    "description": "Flexible reach, redirection and nonlethal control.",
    "manual": "Returning Reed Staff Manual"
  },
  "Hammer Cultivator": {
    "weapon": "War hammer",
    "description": "Heavy strikes and strong bodily foundations.",
    "manual": "Resounding Mountain Hammer Canon"
  },
  "Bow Cultivator": {
    "weapon": "Bow and 20 arrows",
    "description": "Patient aim and qi-guided archery.",
    "manual": "Still Horizon Archery Manual"
  },
  "Chain Cultivator": {
    "weapon": "Weighted chain",
    "description": "Flexible reach, entanglement and shifting angles.",
    "manual": "Coiling River Chain Manual"
  },
  "Flying Sword Cultivator": {
    "weapon": "Qi-channeling sword",
    "description": "Guiding a sword through spiritual control.",
    "manual": "Threaded Sword Command Manual"
  },
  "Spirit Fan Cultivator": {
    "weapon": "Reinforced folding fan",
    "description": "Subtle gestures, deflection and directed qi.",
    "manual": "Cloudfold Fan Scripture"
  },
  "Ribbon Cultivator": {
    "weapon": "Reinforced silk sash",
    "description": "Flowing restraint, flexible defense and misdirection.",
    "manual": "Flowing Silk Binding Manual"
  },
  "Floating Ring Cultivator": {
    "weapon": "Pair of qi-channeling rings",
    "description": "Orbiting weapons, changing trajectories and precise control.",
    "manual": "Circling Moon Ring Canon"
  },
  "Music Cultivator": {
    "weapon": "Guqin",
    "description": "Sound, rhythm and emotional or spiritual influence.",
    "manual": "Quiet Strings Resonance Scripture"
  },
  "Body Cultivator": {
    "weapon": "",
    "description": "Strengthen the body for unarmed combat and endurance.",
    "manual": "Iron Vessel Tempering Manual"
  },
  "Spirit Arts Cultivator": {
    "weapon": "",
    "description": "Train perception, concentration and spiritual defense.",
    "manual": "Clear Mirror Spirit Scripture"
  },
  "Elemental Arts Cultivator": {
    "weapon": "",
    "description": "Shape techniques around your existing roots and polarities.",
    "manual": "Five-Phase Circulation Primer"
  },
  "Formation Master": {
    "weapon": "",
    "description": "Arrange linked anchors to control an area.",
    "manual": "Four Corners Formation Manual"
  },
  "Alchemist": {
    "weapon": "",
    "description": "Refine medicines through precise control of ingredients and qi.",
    "manual": "Measured Cauldron Alchemy Manual"
  },
  "Talisman Master": {
    "weapon": "",
    "description": "Store purposeful qi in carefully inscribed patterns.",
    "manual": "True Stroke Talisman Primer"
  },
  "Beast Tamer": {
    "weapon": "",
    "description": "Develop trust, communication and coordinated cultivation with beasts.",
    "manual": "Shared Breath Beast-Bond Scripture"
  },
  "Gu Cultivator": {
    "weapon": "",
    "description": "Nurture spiritual insects and manage their specialized effects.",
    "manual": "Jade Vessel Gu-Nurturing Manual"
  },
  "Demonic Cultivator": {
    "weapon": "",
    "description": "Study forceful assimilation and controlling its instability.",
    "manual": "Crimson Furnace Restraint Canon"
  },
  "Ghost Cultivator": {
    "weapon": "",
    "description": "Preserve spiritual identity and cultivate a stable spirit vessel.",
    "manual": "Returning Lamp Soul Scripture"
  }
};
const manuals={
  "Clear Edge Sword Canon": {
    "discipline": "Sword Cultivator",
    "description": "Teaches alignment, parries, controlled cuts and the first expression of sword intent.",
    "condition": "controlling a sword with precise timing"
  },
  "Breaking Tide Saber Scripture": {
    "discipline": "Saber Cultivator",
    "description": "Teaches rooted stances, sweeping cuts and recovering safely after a committed strike.",
    "condition": "breaking a guard with a saber"
  },
  "Nine Lines Spear Manual": {
    "discipline": "Spear Cultivator",
    "description": "Teaches thrust alignment, distance control and turning an enemy away from an ally.",
    "condition": "controlling an approach with a spear"
  },
  "Iron Banner Halberd Canon": {
    "discipline": "Halberd Cultivator",
    "description": "Teaches hooks, broad sweeps and braced defense against a charge.",
    "condition": "holding a position with a halberd"
  },
  "Mountain-Cleaving Axe Manual": {
    "discipline": "Axe Cultivator",
    "description": "Teaches committed cuts, weight transfer and striking structural weak points.",
    "condition": "breaking a physical obstruction with an axe"
  },
  "Hidden Thorn Dagger Manual": {
    "discipline": "Dagger Cultivator",
    "description": "Teaches concealed draws, close defense and precise strikes at exposed openings.",
    "condition": "exploiting an opening at dagger reach"
  },
  "Twin Streams Blade Canon": {
    "discipline": "Dual-Blade Cultivator",
    "description": "Teaches alternating guards, synchronized cuts and keeping both blades clear.",
    "condition": "coordinating a paired-blade maneuver"
  },
  "Returning Reed Staff Manual": {
    "discipline": "Staff Cultivator",
    "description": "Teaches leverage, circular guards, trips and controlled restraint.",
    "condition": "redirecting or restraining with a staff"
  },
  "Resounding Mountain Hammer Canon": {
    "discipline": "Hammer Cultivator",
    "description": "Teaches bracing, impact control and using momentum without losing balance.",
    "condition": "delivering a braced hammer strike"
  },
  "Still Horizon Archery Manual": {
    "discipline": "Bow Cultivator",
    "description": "Teaches breath control, judging distance and guiding an arrow along a clear line.",
    "condition": "making a carefully aimed bow shot"
  },
  "Coiling River Chain Manual": {
    "discipline": "Chain Cultivator",
    "description": "Teaches safe casting, retrieval, binding and controlling the space around the wielder.",
    "condition": "binding or redirecting with a weighted chain"
  },
  "Threaded Sword Command Manual": {
    "discipline": "Flying Sword Cultivator",
    "description": "Teaches close-range sword guidance, recall and maintaining control under distraction; flight distances grow with realm.",
    "condition": "guiding or recalling a qi-controlled sword"
  },
  "Cloudfold Fan Scripture": {
    "discipline": "Spirit Fan Cultivator",
    "description": "Teaches fan guards, concealed angles and shaping the direction of released qi.",
    "condition": "deflecting or directing qi with a fan"
  },
  "Flowing Silk Binding Manual": {
    "discipline": "Ribbon Cultivator",
    "description": "Teaches guiding a sash, safe bindings and redirecting force through flowing motion.",
    "condition": "binding or redirecting with a sash"
  },
  "Circling Moon Ring Canon": {
    "discipline": "Floating Ring Cultivator",
    "description": "Teaches paired orbits, controlled release, retrieval and weaving rings through openings.",
    "condition": "guiding paired floating rings"
  },
  "Quiet Strings Resonance Scripture": {
    "discipline": "Music Cultivator",
    "description": "Teaches breath-led playing, calming disrupted qi and directing sound through an instrument.",
    "condition": "stabilizing disturbed qi through instrumental music"
  },
  "Iron Vessel Tempering Manual": {
    "discipline": "Body Cultivator",
    "description": "Teaches gradual conditioning, safe reinforcement and recovery between strenuous sessions.",
    "condition": "resisting physical strain through cultivated conditioning"
  },
  "Clear Mirror Spirit Scripture": {
    "discipline": "Spirit Arts Cultivator",
    "description": "Teaches sensing qi, anchoring awareness and recognizing spiritual intrusion.",
    "condition": "detecting or resisting spiritual intrusion"
  },
  "Five-Phase Circulation Primer": {
    "discipline": "Elemental Arts Cultivator",
    "description": "Teaches elemental circulation, controlled release and recognizing resonance and suppression.",
    "condition": "stabilizing a technique using an elemental root you possess"
  },
  "Four Corners Formation Manual": {
    "discipline": "Formation Master",
    "description": "Teaches anchor placement, qi routing, boundary wards and diagnosing broken formation links.",
    "condition": "laying or repairing a small formation with prepared anchors"
  },
  "Measured Cauldron Alchemy Manual": {
    "discipline": "Alchemist",
    "description": "Teaches ingredient preparation, external flame control, essence extraction and pill formation.",
    "condition": "controlling a prepared medicinal refinement"
  },
  "True Stroke Talisman Primer": {
    "discipline": "Talisman Master",
    "description": "Teaches brush control, ordered strokes, charging patterns and recognizing unstable inscriptions.",
    "condition": "inscribing or diagnosing a talisman with suitable ink and paper"
  },
  "Shared Breath Beast-Bond Scripture": {
    "discipline": "Beast Tamer",
    "description": "Teaches calming, contract principles, shared breathing and coordinating with a willing bonded beast.",
    "condition": "communicating or coordinating with a willing bonded beast"
  },
  "Jade Vessel Gu-Nurturing Manual": {
    "discipline": "Gu Cultivator",
    "description": "Teaches feeding cycles, safe containment, qi nourishment and directing a nurtured Gu.",
    "condition": "caring for or directing Gu already under your control"
  },
  "Crimson Furnace Restraint Canon": {
    "discipline": "Demonic Cultivator",
    "description": "Teaches isolating foreign qi, identifying contamination and controlling backlash during assimilation.",
    "condition": "stabilizing foreign qi during a supervised refinement"
  },
  "Returning Lamp Soul Scripture": {
    "discipline": "Ghost Cultivator",
    "description": "Teaches anchoring memories, gathering suitable qi and stabilizing a spiritual vessel.",
    "condition": "maintaining spiritual identity against dispersal"
  },
  "Quiet River Breathing Manual": {
    "discipline": "Supplementary",
    "description": "Teaches steady breathing, basic qi circulation and recognizing strain before it becomes instability.",
    "condition": "settling turbulent qi during safe meditation"
  },
  "Seven Returning Steps Manual": {
    "discipline": "Supplementary",
    "description": "Teaches balance, efficient movement and retreat over difficult ground.",
    "condition": "withdrawing across difficult ground"
  },
  "Moon-Vessel Circulation Scripture": {
    "discipline": "Supplementary",
    "description": "Teaches retaining lunar qi, measured inward circulation and balancing Yin-heavy roots without replacing them.",
    "condition": "stabilizing Yin-polarized qi during moonlit cultivation"
  },
  "Solar Pulse Circulation Scripture": {
    "discipline": "Supplementary",
    "description": "Teaches measured Yang circulation, controlled outward release and cooling the meridians after exertion.",
    "condition": "stabilizing Yang-polarized qi during sunlit cultivation"
  },
  "Poison-Eating Cauldron Method": {
    "discipline": "Supplementary",
    "description": "Teaches sealed-vessel toxin separation and poison-medicine conversion; study begins with external refinement, not ingesting raw toxins.",
    "condition": "separating a known toxin from medicine with a sealed cauldron"
  },
  "Golden Thread Essence-Severing Art": {
    "discipline": "Supplementary",
    "description": "Teaches fine separation of medicinal essences using controlled Metal qi.",
    "condition": "separating medicinal essences with a Metal root"
  },
  "Gale-Breath Furnace Art": {
    "discipline": "Supplementary",
    "description": "Teaches regulated airflow, furnace temperature and distributing heat with Wind qi.",
    "condition": "regulating an alchemical furnace with a Wind root"
  },
  "Hundred Venom Discernment": {
    "discipline": "Supplementary",
    "description": "Teaches recognizing spiritual toxins, contamination signs and antidote principles; recipes still require ingredients.",
    "condition": "identifying a spiritual toxin from a safely contained sample"
  }
};
const trades={
  "Pill Crafter / Alchemist": {
    "description": "Prepare medicinal ingredients and refine pills. Requires recipes, ingredients, a cauldron and controlled heat.",
    "condition": "preparing or refining a medicine with suitable tools"
  },
  "Artifact Crafter": {
    "description": "Assemble and repair spiritual implements. Requires a workshop, materials and an inscription plan.",
    "condition": "constructing or repairing a spiritual implement"
  },
  "Weapon Smith": {
    "description": "Forge and maintain weapons. Requires a forge, metal and smithing tools.",
    "condition": "forging, repairing or assessing a weapon"
  },
  "Formation Master": {
    "description": "Design wards and linked qi structures. Requires suitable anchors and preparation.",
    "condition": "planning or diagnosing a formation"
  },
  "Talisman Crafter": {
    "description": "Prepare charged inscriptions. Requires ink, paper and a known pattern.",
    "condition": "preparing or repairing a talisman inscription"
  },
  "Array Inscriber": {
    "description": "Engrave qi pathways into lasting surfaces. Requires engraving tools and suitable material.",
    "condition": "engraving or inspecting qi pathways"
  },
  "Spirit Cook": {
    "description": "Prepare nourishing food from spiritual ingredients. Requires cooking tools and edible materials.",
    "condition": "preparing safe nourishing spirit food"
  },
  "Spirit Farmer / Herb Grower": {
    "description": "Tend spiritual crops and judge harvest timing. Requires land or growing vessels.",
    "condition": "cultivating or harvesting spiritual plants"
  },
  "Beast Tamer": {
    "description": "Care for, train and understand beasts; does not grant a companion.",
    "condition": "handling or training a familiar beast"
  },
  "Spirit Healer": {
    "description": "Diagnose qi imbalance and support recovery. Requires appropriate remedies and treatment tools.",
    "condition": "diagnosing or treating a cultivation injury"
  },
  "Poison Master": {
    "description": "Recognize toxins and develop controlled antidotes. Requires safe containers and ingredients.",
    "condition": "identifying a toxin or preparing its antidote"
  },
  "Puppet Crafter": {
    "description": "Build and repair qi-driven mechanisms. Requires parts, a workbench and a control design.",
    "condition": "building or repairing a puppet mechanism"
  },
  "Seal Master": {
    "description": "Study bindings and containment. Requires a suitable seal medium and preparation.",
    "condition": "preparing or examining a containment seal"
  },
  "Appraiser / Treasure Identifier": {
    "description": "Assess workmanship, qi signatures and authenticity.",
    "condition": "examining an accessible treasure for quality or authenticity"
  },
  "Spirit Miner / Ore Refiner": {
    "description": "Find veins, assess ore and remove impurities. Requires extraction or refining tools.",
    "condition": "identifying or refining spiritual ore"
  }
};
const talents={
  "Keen Observer": {
    "description": "Notice small physical clues and inconsistencies.",
    "condition": "examining a scene for a concealed physical clue"
  },
  "Trail Reader": {
    "description": "Read tracks and signs of passage.",
    "condition": "following tracks through natural terrain"
  },
  "Steady Hands": {
    "description": "Keep delicate work controlled under pressure.",
    "condition": "performing delicate manual work under distraction"
  },
  "Retentive Memory": {
    "description": "Recall studied texts and established details.",
    "condition": "recalling a text you previously studied"
  },
  "Sect Etiquette": {
    "description": "Recognize formal status, ritual and social expectations.",
    "condition": "navigating formal sect protocol"
  },
  "Patient Negotiator": {
    "description": "Read an exchange and make a considered offer.",
    "condition": "negotiating after learning the other party’s priorities"
  },
  "Acute Qi Sense": {
    "description": "Notice small changes in nearby spiritual energy.",
    "condition": "locating a nearby disturbance in qi"
  },
  "Sure-Footed": {
    "description": "Maintain balance on uncertain terrain.",
    "condition": "keeping your footing on unstable ground"
  }
};
function get(table,key){return Object.prototype.hasOwnProperty.call(table,key)?table[key]:null;}
function effects(c){
 const d=get(disciplines,c.fields.discipline);
 const selected=(keys,table)=>[...new Set(keys.map(k=>c.fields[k]).filter(Boolean))].map(name=>({name,...get(table,name)})).filter(x=>x.description);
 const ms=selected(['manualPrimary','manualSecondary'],manuals),ts=selected(['tradePrimary','tradeSecondary'],trades),talent=get(talents,c.fields.talent);
 return {discipline:d,weapon:d?.weapon||'',manuals:ms,trades:ts,talent:talent?{name:c.fields.talent,...talent}:null,conditional:[...ms,...ts,...(talent?[{name:c.fields.talent,...talent}]:[])].map(x=>({source:x.name,amount:1,condition:x.condition}))};
}
const api={disciplines,manuals,trades,talents,effects};root.BuilderTraining=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
