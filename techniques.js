/* Silent Vault-Rat Scripture: source-grounded arts with original tabletop costs. */
(function(root){
const manual='Silent Vault-Rat Scripture';
const chapters=['Mouse and Master','The Unseen Burrow','The Empty Vault','Two Shadows, One Heart'];
const arts=[
  {
    "id": "heart-whisker",
    "name": "Heart-Whisker Communion",
    "chapter": 1,
    "qi": 0,
    "timing": "At will · within 100 m",
    "effect": "Exchange simple emotions and silent intentions such as wait, hide, search or return with your bonded rat.",
    "limit": "The bond must be intact. This does not read other minds or grant full sensory sharing.",
    "roll": "No roll for a familiar signal."
  },
  {
    "id": "borrowed-whisker",
    "name": "Borrowed Whisker Perception",
    "chapter": 1,
    "qi": 1,
    "timing": "Action · up to 10 minutes · within 100 m",
    "effect": "Borrow the rat’s hearing, smell and vibration sense while your body remains still. From Chapter II, receive rough visual impressions; from Chapter IV, fully ride its senses.",
    "limit": "Your own senses become muted; moving, taking harm or losing concentration ends the sharing.",
    "roll": "Mind to notice a hidden clue through the rat."
  },
  {
    "id": "dustless-paw",
    "name": "Dustless Paw Method",
    "chapter": 1,
    "qi": 1,
    "timing": "Action · up to 10 minutes",
    "effect": "Soften footfalls and suppress breath, scent and residual qi while moving carefully. Gain +1 on a stealth roll that relies on leaving fewer traces.",
    "limit": "Sprinting, attacking or a loud action ends the effect. It does not make you invisible.",
    "roll": "Flow when stealth is contested."
  },
  {
    "id": "burrowing-step",
    "name": "Burrowing Shadow Step",
    "chapter": 2,
    "qi": 2,
    "timing": "Action · instant · up to 10 m",
    "effect": "Burst along a physically open route to nearby cover, around a corner or past an exposed sightline.",
    "limit": "You cannot teleport, pass through solid walls or evade an attack that has already resolved.",
    "roll": "Flow if the route is guarded or hazardous."
  },
  {
    "id": "hidden-burrow",
    "name": "Hidden Burrow Technique",
    "chapter": 2,
    "qi": 1,
    "timing": "Action · up to 10 minutes",
    "effect": "While still, draw your spiritual presence inward. Gain +1 to avoid detection by spiritual sense.",
    "limit": "Fast movement, attacking or projecting another technique breaks concealment. Direct sight can still reveal you.",
    "roll": "Heart against an active spiritual search."
  },
  {
    "id": "treasure-scent",
    "name": "Treasure-Scent Discernment",
    "chapter": 1,
    "qi": 0,
    "timing": "One minute · rat searches within 10 m",
    "effect": "Let the rat sniff out exposed spiritual metal, artifact fragments or unusual metal qi and indicate a direction.",
    "limit": "Wards or sealed containers may block detection. A scent is not a full identification or proof that an object is safe.",
    "roll": "Mind to distinguish confusing or masked scents."
  },
  {
    "id": "devouring-tooth",
    "name": "Devouring Tooth Refinement",
    "chapter": 3,
    "qi": 0,
    "timing": "One hour of safe cultivation",
    "effect": "Feed the rat suitable metal or an artifact fragment to cultivate its teeth, digestion and bodily resilience. The material is consumed.",
    "limit": "Requires a material the rat can safely digest. No immediate healing, Qi refund, automatic permanent stat increase or copying of artifact powers.",
    "roll": "Mind to assess unfamiliar material; advancement is resolved through play."
  },
  {
    "id": "seal-fang",
    "name": "Seal-Gnawing Fang",
    "chapter": 3,
    "qi": 2,
    "timing": "One minute · rat must touch the target",
    "effect": "Guide the rat to bite through one exposed weak connection in an unattended lock, alarm or small formation anchor.",
    "limit": "The target must be comparable to or below the pair’s realm. Other anchors remain functional; failure can trigger the ward.",
    "roll": "Mind to identify and disable the connection."
  },
  {
    "id": "quiet-devouring",
    "name": "Quiet Devouring",
    "chapter": 3,
    "qi": 1,
    "timing": "Additional cost · during a gnawing technique",
    "effect": "Absorb escaping qi while using Seal-Gnawing Fang or Gnawed Meridian Sabotage, reducing noise and spiritual disturbance.",
    "limit": "Requires the paired technique to be learned and paid for: 3 Qi total with Seal-Gnawing Fang, or 4 with Gnawed Meridian Sabotage. It does not guarantee silence on a failed roll.",
    "roll": "Use the paired technique’s roll; +1 to its concealment aspect only."
  },
  {
    "id": "thousand-hole",
    "name": "Thousand-Hole Escape",
    "chapter": 2,
    "qi": 0,
    "timing": "Ten minutes of scouting",
    "effect": "Map a physically passable escape route together. Gain +1 on the first escape roll using that route in the current scene.",
    "limit": "Requires actual scouting; the benefit ends after use or a significant change to the route. It cannot create an exit.",
    "roll": "Mind to discover a hidden route; Flow to use it under pursuit."
  },
  {
    "id": "false-trail",
    "name": "False Treasure Trail",
    "chapter": 2,
    "qi": 1,
    "timing": "One minute · lasts up to one hour",
    "effect": "Have the rat lay a short false trail of scent, dust and metal-qi residue leading away from your real route.",
    "limit": "Requires the rat and access to the false route. Careful examination can expose the deception.",
    "roll": "Mind against a tracker’s examination."
  },
  {
    "id": "shared-crossing",
    "name": "Shared Shadow Crossing",
    "chapter": 2,
    "qi": 2,
    "timing": "Action · up to 10 minutes · within 100 m",
    "effect": "Coordinate the tamer and rat along separate routes with shared danger signals. Gain +1 to a joint infiltration roll.",
    "limit": "Requires both partners and an intact bond. The bonus applies once to the joint attempt, not once per partner.",
    "roll": "Flow for the joint infiltration attempt."
  },
  {
    "id": "empty-vault",
    "name": "Rat-King's Empty Vault",
    "chapter": 3,
    "qi": 2,
    "timing": "Action · one deposit or withdrawal",
    "effect": "The rat opens an internal pocket holding up to 5 kg total of small nonliving objects; each object must fit through a hand-sized opening.",
    "limit": "No living creatures, active hostile artifacts or objects above the rat’s realm. Contents persist without upkeep; accessing them costs 2 Qi each time.",
    "roll": "No roll for safe storage; contested objects must first be secured."
  },
  {
    "id": "meridian-sabotage",
    "name": "Gnawed Meridian Sabotage",
    "chapter": 3,
    "qi": 3,
    "timing": "Action · rat must reach the equipment",
    "effect": "The rat bites an exposed clasp, joint or inscription on an enemy’s equipment. On success, disable one specific function for the rest of the scene or until repaired.",
    "limit": "Targets equipment, not bodily meridians. The item must be comparable to or below the rat’s realm; the rat risks retaliation.",
    "roll": "Flow to coordinate the rat’s approach and strike."
  },
  {
    "id": "moonless-pursuit",
    "name": "Moonless Pursuit",
    "chapter": 4,
    "qi": 2,
    "timing": "Action · up to one minute · within 100 m",
    "effect": "Follow the rat’s immediate sensory guidance at speed. Gain +1 to pursuit, evasion or obstacle-navigation rolls.",
    "limit": "While active, take −1 on complex planning or analysis rolls. Requires the rat’s guidance and an intact bond.",
    "roll": "Flow for movement under pressure."
  },
  {
    "id": "between-heartbeats",
    "name": "Breath Between Heartbeats",
    "chapter": 4,
    "qi": 3,
    "timing": "Reaction · instant · up to 10 m",
    "effect": "Release a stored burst of qi when danger becomes apparent, moving to reachable cover before the threat resolves.",
    "limit": "The route must be open. Once per round; it cannot undo damage already taken.",
    "roll": "Flow if escape is contested."
  },
  {
    "id": "broken-treasure",
    "name": "Broken-Treasure Assimilation",
    "chapter": 4,
    "qi": 2,
    "timing": "Ten minutes · lasts one scene",
    "effect": "After Devouring Tooth Refinement, draw a trace of purified essence through the bond. Choose +1 to spiritual perception, understanding an artifact’s structure, or resisting artifact suppression.",
    "limit": "Consume one usable remnant; one benefit at a time. The tamer cannot digest artifacts or acquire their powers. No Qi recovery.",
    "roll": "No roll with safely refined essence; use the bonus only for the chosen activity."
  },
  {
    "id": "two-lives",
    "name": "One Shadow, Two Lives",
    "chapter": 4,
    "qi": 5,
    "timing": "Reaction · once per full cultivation rest · within 30 m",
    "effect": "When either partner faces imminent lethal harm, the other channels qi through the bond to pull the threatened partner up to 10 m to safety and briefly shield the retreat.",
    "limit": "Requires both partners, an intact bond, an open escape route and 5 Qi in the tamer’s reserve. Cannot resurrect or undo resolved harm.",
    "roll": "Flow: 10+ escape the immediate threat; 7–9 escape with injury, separation or lost gear; 6− the rescue fails and danger follows."
  }
];

arts.forEach(a=>{a.manual=manual;a.requires=[];});
arts.push(...[
  {
    "id": "silent-hook",
    "name": "Silent Hook",
    "chapter": 1,
    "qi": 0,
    "requires": [],
    "timing": "Action · chain reach, up to 5 m",
    "effect": "Cast the chain along a concealed arc to position it for your next move.",
    "limit": "No damage or automatic restraint; an alert observer can spot it.",
    "roll": "Flow to conceal the cast.",
    "yin": "Suppress sound and spiritual leakage as well as sight; +1 to conceal this cast.",
    "manual": "Shadow-Splitting Thunder Chain Art"
  },
  {
    "id": "black-coil",
    "name": "Black Coil Snare",
    "chapter": 1,
    "qi": 2,
    "requires": [
      "silent-hook"
    ],
    "timing": "Action · up to 5 m",
    "effect": "Wrap one limb or weapon. On success hold it until your next turn; spend your action each turn to maintain the hold.",
    "limit": "Keep hold of the chain. The target can contest with Body or Flow on its turn; no automatic incapacitation.",
    "roll": "Flow to establish the restraint.",
    "yin": "The chain becomes still and heavy: +1 to maintain the restraint, without dealing crushing damage.",
    "manual": "Shadow-Splitting Thunder Chain Art"
  },
  {
    "id": "metal-thread",
    "name": "Metal Thread Severance",
    "chapter": 1,
    "qi": 1,
    "requires": [],
    "timing": "Action · weapon reach",
    "effect": "Focus an edge to cut one exposed mundane cord, clasp or similarly fragile connection, or strike a visible seam.",
    "limit": "One cut, not an armor-ignoring attack. Reinforced or spiritual material remains contested.",
    "roll": "Flow for a contested cut; Mind to recognize an unfamiliar seam.",
    "yin": "Gain +1 to a delicate precision cut; cannot break broad or thick surfaces with this version.",
    "manual": "Shadow-Splitting Thunder Chain Art"
  },
  {
    "id": "returning-fang",
    "name": "Returning Fang",
    "chapter": 1,
    "qi": 1,
    "requires": [
      "silent-hook"
    ],
    "timing": "Reaction · after your missed chain attack",
    "effect": "Recover your unsecured weapon immediately and redirect it into a ready position.",
    "limit": "No extra attack, damage or movement. Cannot pull free a firmly trapped weapon automatically.",
    "roll": "Flow if someone contests recovery.",
    "yin": "Recover with little noise and +1 to hide the new weapon angle; lose the forceful snap needed to contest a trapped chain.",
    "manual": "Shadow-Splitting Thunder Chain Art"
  },
  {
    "id": "needle-fang",
    "name": "Needle Fang Draw",
    "chapter": 2,
    "qi": 2,
    "requires": [
      "metal-thread"
    ],
    "timing": "Action · close reach",
    "effect": "Draw and thrust the tanto in one accelerated motion; +1 to strike before a nearby foe completes a slow, telegraphed action.",
    "limit": "One normal weapon strike. Does not interrupt an action already resolved or penetrate intact armor automatically.",
    "roll": "Flow for the strike.",
    "yin": "Replace the speed bonus with +1 to conceal the precise strike; no early interruption benefit.",
    "manual": "Shadow-Splitting Thunder Chain Art"
  },
  {
    "id": "sickle-moon",
    "name": "Sickle Behind the Moon",
    "chapter": 2,
    "qi": 3,
    "requires": [
      "silent-hook",
      "returning-fang"
    ],
    "timing": "Action · up to 5 m",
    "effect": "Send the sickle around an exposed flank. Gain +1 to strike from an established blind angle.",
    "limit": "Requires room for the orbit and an actual blind angle; does not bypass walls or all-around awareness.",
    "roll": "Flow for the strike.",
    "yin": "Suppress its spiritual signature too; the same +1 also applies against spiritual tracking of this attack, without stacking.",
    "manual": "Shadow-Splitting Thunder Chain Art"
  },
  {
    "id": "tanto-gap",
    "name": "Tanto Through the Gap",
    "chapter": 2,
    "qi": 3,
    "requires": [
      "metal-thread",
      "needle-fang"
    ],
    "timing": "Action · close reach",
    "effect": "Strike a weak point identified by prior observation. Ignore one mundane armor layer only at that exposed gap.",
    "limit": "No speed bonus. First spend an action observing with Mind if no gap is evident. Sealed armor and stronger spiritual defenses still protect.",
    "roll": "Flow to strike the identified gap.",
    "yin": "Gain +1 to the minimal thrust; requires a stationary or restrained target because the quieter thrust loses pursuit speed.",
    "manual": "Shadow-Splitting Thunder Chain Art"
  },
  {
    "id": "shadow-bind",
    "name": "Shadow Bind",
    "chapter": 2,
    "qi": 3,
    "requires": [
      "black-coil"
    ],
    "timing": "Action · target already held by your chain",
    "effect": "Infuse an existing hold with Shadow. Until your next turn, the target takes −1 on escape attempts and concentration-dependent qi actions.",
    "limit": "Does not create the physical hold. Black Coil costs its own 2 Qi (5 total across both actions); breaking the chain hold ends suppression. Reusing costs 3 Qi.",
    "roll": "Flow to suppress; strong foes can resist.",
    "yin": "Also muffle calls and spiritual signals through the hold; does not silence the target completely or add damage.",
    "manual": "Shadow-Splitting Thunder Chain Art"
  },
  {
    "id": "thunderstep",
    "name": "Thunderstep",
    "chapter": 3,
    "qi": 1,
    "requires": [],
    "timing": "Action · move up to 5 m",
    "effect": "Burst along a clear route and stop instantly.",
    "limit": "Movement only; no attack, decoy, concealment or teleportation. Cannot undo a resolved hit.",
    "roll": "Flow for a hazardous or guarded route.",
    "yin": "Reduce travel to 3 m, suppress the start and stop, and gain +1 to avoid revealing your route by sound.",
    "manual": "Shadow-Splitting Thunder Chain Art"
  },
  {
    "id": "muted-thunder",
    "name": "Muted Thunder",
    "chapter": 3,
    "qi": 2,
    "requires": [
      "needle-fang"
    ],
    "timing": "Action · blade or chain contact",
    "effect": "Deliver a small discharge. On success interrupt one ongoing concentration effect OR numb a limb, giving −1 to its next use before your next turn.",
    "limit": "Choose one effect; no extra weapon damage, full stun or permanent meridian damage. A restrained target still resists.",
    "roll": "Flow to deliver the charge.",
    "yin": "Contain the electrical signature; +1 to keep the discharge unnoticed by nearby witnesses, not to overcome the target.",
    "manual": "Shadow-Splitting Thunder Chain Art"
  },
  {
    "id": "dark-current",
    "name": "Dark Current Reversal",
    "chapter": 3,
    "qi": 2,
    "requires": [
      "thunderstep",
      "returning-fang"
    ],
    "timing": "Reaction · while moving · up to 5 m",
    "effect": "Hook a secure anchor and pivot around an obstacle or away from a threatened route before the threat resolves.",
    "limit": "Needs an anchor and an open arc; no concealment or extra attack. An opponent used as an anchor can resist.",
    "roll": "Flow to anchor and redirect.",
    "yin": "Reduce travel to 3 m; gain +1 to make a quiet, controlled pivot.",
    "manual": "Shadow-Splitting Thunder Chain Art"
  },
  {
    "id": "chain-spark",
    "name": "Chain-Spark Feint",
    "chapter": 3,
    "qi": 1,
    "requires": [
      "returning-fang"
    ],
    "timing": "Action · close reach",
    "effect": "Flash harmless sparks along the chain while striking once with the tanto from the opposite side; +1 if the foe follows the flash.",
    "limit": "The sparks do no damage. Ineffective against a foe who cannot see or ignores the flash.",
    "roll": "Flow for the feint and strike as one roll.",
    "yin": "Replace the visible flash with a false spiritual disturbance; works on spiritual attention instead of sight, never both.",
    "manual": "Shadow-Splitting Thunder Chain Art"
  },
  {
    "id": "thunderclap",
    "name": "Thunderclap Veil",
    "chapter": 3,
    "qi": 4,
    "requires": [
      "muted-thunder",
      "thunderstep"
    ],
    "timing": "Action · 3 m burst, then move up to 5 m",
    "effect": "Create a loud flash and electrical interference. Gain +1 to escape nearby observers during this movement.",
    "limit": "No damage or guaranteed blindness; warns others nearby. Affects allies’ perception too.",
    "roll": "Flow to escape through the distraction.",
    "yin": "Silent Thunder Veil replaces flash and sound with dimmed perception and disrupted spiritual sense; affects spiritual observers instead, movement reduced to 3 m.",
    "manual": "Shadow-Splitting Thunder Chain Art"
  },
  {
    "id": "afterimage",
    "name": "Afterimage Decoy",
    "chapter": 4,
    "qi": 3,
    "requires": [
      "thunderstep",
      "silent-hook"
    ],
    "timing": "Action · move up to 5 m",
    "effect": "Leave a momentary visual outline at your old position; +1 to evade one observer during the move.",
    "limit": "Outline vanishes after the move; no independent action, spiritual decoy or automatic dodge.",
    "roll": "Flow against the observer.",
    "yin": "Move only 3 m; the dim outline also deceives spiritual sight in darkness, using the same non-stacking bonus.",
    "manual": "Shadow-Splitting Thunder Chain Art"
  },
  {
    "id": "black-withdrawal",
    "name": "Black Lightning Withdrawal",
    "chapter": 4,
    "qi": 3,
    "requires": [
      "thunderstep",
      "silent-hook"
    ],
    "timing": "Reaction · immediately after your strike · up to 5 m",
    "effect": "Retreat before retaliation while pulling your qi signature inward; +1 to avoid spiritual tracking during the retreat.",
    "limit": "The strike is paid and resolved separately. Needs an open route; no decoy and no reversal of resolved harm.",
    "roll": "Flow if the retreat is contested.",
    "yin": "Move only 3 m; suppress mundane tracks and sound as well as qi, extending the same +1 to those trackers.",
    "manual": "Shadow-Splitting Thunder Chain Art"
  },
  {
    "id": "empty-shadow",
    "name": "Empty Shadow Escape",
    "chapter": 4,
    "qi": 5,
    "requires": [
      "afterimage",
      "black-withdrawal"
    ],
    "timing": "Action · move up to 10 m",
    "effect": "Leave a shaped visual and spiritual decoy heading one way while escaping another. Gain +1 against pursuit until the end of your next turn.",
    "limit": "Decoy cannot attack or block, vanishes on contact, and ends after your next turn. Requires an open real route.",
    "roll": "Flow to fool pursuers.",
    "yin": "Reduce travel to 5 m; the decoy lasts one additional turn if untouched, extending the pursuit bonus.",
    "manual": "Shadow-Splitting Thunder Chain Art"
  },
  {
    "id": "one-breath",
    "name": "One Breath Execution",
    "chapter": 4,
    "qi": 6,
    "requires": [
      "black-coil",
      "tanto-gap",
      "black-withdrawal"
    ],
    "timing": "Action · approach and retreat up to 5 m each",
    "effect": "Conceal the chain, briefly bind, close, make one precision strike and withdraw in one sequence. Gain +1 when starting unnoticed.",
    "limit": "6 Qi covers the whole sequence; do not add component costs or bonuses. The momentary bind ends on retreat. One strike, no automatic kill; requires a clear route and reachable weak point.",
    "roll": "One Flow roll: 10+ strike and retreat; 7–9 strike with a compromised retreat; 6− fail and face danger.",
    "yin": "Reduce each movement to 3 m; the +1 also applies when approaching through spiritual observation. No additional stacked bonus or extra damage.",
    "manual": "Shadow-Splitting Thunder Chain Art"
  },
  {
    "id": "stormless",
    "name": "Stormless Kill",
    "chapter": 5,
    "qi": 7,
    "requires": [
      "one-breath",
      "muted-thunder",
      "metal-thread"
    ],
    "timing": "One action preparing in stillness, then one close strike next turn",
    "effect": "Hold a concealed charge and release it into one precision strike. On success resolve a weapon hit and interrupt one ongoing concentration effect.",
    "limit": "Pay 7 Qi when preparing; movement, harm or lost concentration wastes the charge. No included escape, automatic kill or bypass of superior realms.",
    "roll": "Flow: 10+ both effects; 7–9 choose one; 6− fail and take −1 to your next qi action from backlash.",
    "yin": "Gain +1 to conceal the stored charge. On 10+ the interrupted effect cannot resume until after the target’s next turn; on 7–9 also suffer the backlash penalty.",
    "manual": "Shadow-Splitting Thunder Chain Art"
  }
]);
const manuals=[{name:manual,key:'vaultRatChapter',chapters,description:'One deeply bonded Artifact-Devouring Rat. Companion arts require the bond and your rat to be present and able to act.'},{name:"Shadow-Splitting Thunder Chain Art",key:'thunderChainChapter',chapters:['Hidden Chain','Fang in the Dark','Silent Thunder','Leave No Battle','Stormless Kill'],description:'Metal conceals nothing: it shapes precision. Shadow conceals the attack; Lightning supplies speed and escape. Requires a kusarigama with a short tanto at the chain’s free end. Yin variants require Yin attached to a relevant root or another established Yin source. Pay +1 Qi once per enhanced art, including a combined sequence.'}];
arts.push(...[
  {
    "id": "cauldron-heart",
    "name": "Forged Cauldron Heart",
    "chapter": 1,
    "qi": 2,
    "requires": [],
    "timing": "One day of forge work, then one hour to kindle",
    "effect": "Forge a heat- and poison-resistant spiritual-metal chamber; engrave artificial channels and kindle its furnace with spirit stones. It serves as power source, cauldron and reservoir.",
    "limit": "Requires a forge, spiritual metal, tools and spirit stones. Pay 2 master Qi for the final kindling. Learning does not supply a finished puppet. Destruction of the heart disables the automaton.",
    "roll": "Mind to forge and inscribe; Flow to establish safe circulation.",
    "manual": "Ten Thousand Venoms Cauldron-Puppet Scripture"
  },
  {
    "id": "ingredient-maw",
    "name": "Hundred Ingredient Maw",
    "chapter": 1,
    "qi": 0,
    "requires": [
      "cauldron-heart"
    ],
    "timing": "Ten minutes · one batch, up to 1 kg",
    "effect": "Grind and sort supplied herbs, fungi, beast materials, minerals or spiritual substances into separate feed chambers under the master’s direction.",
    "limit": "Requires a powered puppet and installed grinders. It cannot judge compatibility. The master selects useful portions; mistaken combinations can ruin a batch.",
    "roll": "Mind for unfamiliar sorting; no roll for known safe material.",
    "manual": "Ten Thousand Venoms Cauldron-Puppet Scripture"
  },
  {
    "id": "venom-extraction",
    "name": "Venom-Essence Extraction",
    "chapter": 1,
    "qi": 2,
    "requires": [
      "ingredient-maw"
    ],
    "timing": "Ten minutes · one prepared batch",
    "effect": "Dissolve, separate and condense one chosen essence into liquid, powder, vapor or qi, keeping medicinal portions and waste separate.",
    "limit": "Consumes ingredients and requires suitable collection vessels. Yield and potency follow the ingredient; extraction does not invent a new poison effect.",
    "roll": "Mind: 10+ clean extraction; 7–9 reduced yield or impurities; 6− spoiled batch or furnace trouble.",
    "manual": "Ten Thousand Venoms Cauldron-Puppet Scripture"
  },
  {
    "id": "furnace-circulation",
    "name": "Golden Furnace Circulation",
    "chapter": 1,
    "qi": 1,
    "requires": [
      "cauldron-heart"
    ],
    "timing": "One minute · one hour of circulation",
    "effect": "Circulate furnace heat and toxic qi through resistant artificial channels, burning out unwanted impurities. Gain +1 when maintaining safe poison circulation.",
    "limit": "Needs properly refined spiritual-metal channels. Golden Furnace Physique provides insight into the same process; bonuses share the +2 cap. It does not grant the puppet the master’s physique or root.",
    "roll": "Flow when heat or toxicity is unstable.",
    "manual": "Ten Thousand Venoms Cauldron-Puppet Scripture"
  },
  {
    "id": "poison-sense",
    "name": "Poison Classification Sense",
    "chapter": 2,
    "qi": 1,
    "requires": [
      "venom-extraction"
    ],
    "timing": "One minute · one accessible sample",
    "effect": "Read toxicity, qi density, heat, moisture, corrosiveness and Yin/Yang tendency. With mastery, recognize patterns already engraved from earlier analyses.",
    "limit": "Requires installed sensors. Reports measurements and matches, never new recipes or independent judgment. Unknown samples still require the master’s interpretation.",
    "roll": "Mind to interpret an unfamiliar sample.",
    "manual": "Ten Thousand Venoms Cauldron-Puppet Scripture"
  },
  {
    "id": "venom-crucible",
    "name": "Thousand-Venom Crucible",
    "chapter": 2,
    "qi": 3,
    "requires": [
      "venom-extraction",
      "furnace-circulation"
    ],
    "timing": "Thirty minutes · up to three prepared essences",
    "effect": "Purify separately, introduce slowly, suppress premature reactions and condense a compound according to a recipe the master understands.",
    "limit": "Costs 3 Qi for combining; earlier extraction is separate. Consumes real essences. No automatic compatibility, arbitrary new effect or multiplication of poison supply.",
    "roll": "Mind: 10+ stable compound; 7–9 lower yield or shorter shelf life; 6− spoiled batch or toxic leak.",
    "manual": "Ten Thousand Venoms Cauldron-Puppet Scripture"
  },
  {
    "id": "yang-ignition",
    "name": "Yang-Venom Ignition",
    "chapter": 2,
    "qi": 2,
    "requires": [
      "venom-crucible"
    ],
    "timing": "Added during one refinement · additional cost",
    "effect": "Seed the furnace with the master’s 100%-pure Yang-polarized Poison qi. Choose a fitting expression: faster onset, feverish overstimulation, violent circulation or spasms.",
    "limit": "Requires a selected Poison root at 100% purity with Yang polarity. Adds 2 master Qi to the underlying refinement (5 total with Thousand-Venom Crucible). Alters an existing poison’s expression, not every effect at once or automatic success.",
    "roll": "Use the underlying refinement roll; on a complication, Yang saturation can destabilize the batch.",
    "manual": "Ten Thousand Venoms Cauldron-Puppet Scripture"
  },
  {
    "id": "walking-refinery",
    "name": "Walking Refinery",
    "chapter": 2,
    "qi": 1,
    "requires": [
      "furnace-circulation",
      "venom-extraction"
    ],
    "timing": "Additional cost · one batch while travelling",
    "effect": "Run compensating mechanisms to maintain a refinement while the puppet follows at walking pace over ordinary uneven ground.",
    "limit": "Pay the recipe’s cost plus 1 Qi. Delicate high-grade work still needs stillness; major impacts or violent movement can spoil it. This routine is not sentience.",
    "roll": "Flow only if movement threatens the ongoing process.",
    "manual": "Ten Thousand Venoms Cauldron-Puppet Scripture"
  },
  {
    "id": "venom-chambers",
    "name": "Sealed Venom Chambers",
    "chapter": 2,
    "qi": 1,
    "requires": [
      "furnace-circulation"
    ],
    "timing": "Action · seal or open one chamber",
    "effect": "Isolate and preserve up to six installed reservoirs, each holding one dose or sample; select a single chamber for controlled release into a vessel or delivery mechanism.",
    "limit": "Requires fabricated reservoirs. No free contents; incompatible substances stay separate. Active hostile qi and damage can breach seals. A release is not an automatic hit on an enemy.",
    "roll": "Flow if a volatile sample resists safe containment.",
    "manual": "Ten Thousand Venoms Cauldron-Puppet Scripture"
  },
  {
    "id": "venom-hand",
    "name": "Venom Master's Hand",
    "chapter": 3,
    "qi": 2,
    "requires": [
      "walking-refinery",
      "poison-sense"
    ],
    "timing": "Action · up to 30 m · ten minutes",
    "effect": "Control heat, pressure, grinding, circulation, separation and release through fine puppet threads. With mastery, maintain one familiar simple refinement while fighting with any suitable weapon.",
    "limit": "Recipe costs remain separate. Complex or unfamiliar alchemy occupies attention and cannot be safely combined with combat; severed control threads stop the process.",
    "roll": "Flow for contested control; Mind for recipe decisions.",
    "manual": "Ten Thousand Venoms Cauldron-Puppet Scripture"
  },
  {
    "id": "poison-fuel",
    "name": "Poison-Eating Furnace",
    "chapter": 3,
    "qi": 0,
    "requires": [
      "furnace-circulation",
      "venom-extraction"
    ],
    "timing": "Ten minutes · consume one safely refined dose",
    "effect": "Convert a suitable stored poison dose into fuel sufficient for one hour of ordinary puppet operation, replacing its usual spirit-stone fuel.",
    "limit": "The dose is consumed. Fuel powers movement and routine mechanisms, not a refund of master Qi or paid technique costs. Unsuitable toxins accumulate and can damage channels; the master must assess each fuel.",
    "roll": "Mind to assess unfamiliar fuel; Flow if conversion becomes unstable.",
    "manual": "Ten Thousand Venoms Cauldron-Puppet Scripture"
  },
  {
    "id": "emergency-refine",
    "name": "Emergency Venom Refinement",
    "chapter": 3,
    "qi": 4,
    "requires": [
      "venom-extraction"
    ],
    "timing": "One action · one available venom-bearing sample",
    "effect": "Rapidly produce one crude dose from a supplied ingredient, sacrificing purity and stability for immediate availability.",
    "limit": "Consumes the sample; retains only its existing poison effect. Dose spoils after the scene, cannot fuel the furnace, and is unsuitable for delicate cultivation. Applying it requires a separate action.",
    "roll": "Mind: 10+ usable crude dose; 7–9 usable with contamination or handling risk; 6− spoiled sample or leak.",
    "manual": "Ten Thousand Venoms Cauldron-Puppet Scripture"
  },
  {
    "id": "venom-archive",
    "name": "Ten Thousand Venoms Archive",
    "chapter": 3,
    "qi": 1,
    "requires": [
      "poison-sense",
      "venom-crucible"
    ],
    "timing": "One hour · engrave one successful recipe",
    "effect": "Record ingredients, proportions, heat, timing, qi needs and known failed combinations on a replaceable scripture plate. The powered puppet can repeat that exact procedure when ordered.",
    "limit": "Requires a plate and an actually tested recipe. Ingredients and technique costs still apply each run. Pattern execution gives no understanding or invention.",
    "roll": "Mind to record without errors; routine use follows the stored recipe’s resolution.",
    "manual": "Ten Thousand Venoms Cauldron-Puppet Scripture"
  },
  {
    "id": "adaptive-crucible",
    "name": "Adaptive Crucible",
    "chapter": 3,
    "qi": 2,
    "requires": [
      "venom-archive",
      "venom-hand"
    ],
    "timing": "Additional cost · one recorded recipe run",
    "effect": "Engrave and activate responses to known deviations: reduce heat, slow condensation or vent rising pressure. Gain +1 to keep that recorded process stable.",
    "limit": "Add 2 Qi to the recipe cost. Requires known response instructions and safe venting space. Unrecognized problems require the master; it cannot invent a solution.",
    "roll": "Use the underlying recipe roll.",
    "manual": "Ten Thousand Venoms Cauldron-Puppet Scripture"
  },
  {
    "id": "artisan-hands",
    "name": "Venom Artisan's Thousand Hands",
    "chapter": 4,
    "qi": 3,
    "requires": [
      "adaptive-crucible",
      "venom-chambers"
    ],
    "timing": "Additional cost · up to one hour",
    "effect": "Coordinate up to five installed processes at once: grinding, distilling, preserving, heating and bottling.",
    "limit": "Pay 3 Qi for coordination plus each paid process’s own cost. Needs separate mechanisms, ingredients and recipes. Five processes do not mean five free finished batches or independent judgment.",
    "roll": "Mind to schedule processes; Flow when simultaneous channels become unstable.",
    "manual": "Ten Thousand Venoms Cauldron-Puppet Scripture"
  },
  {
    "id": "cauldron-communion",
    "name": "Master-and-Cauldron Communion",
    "chapter": 4,
    "qi": 3,
    "requires": [
      "artisan-hands",
      "venom-hand"
    ],
    "timing": "Action · up to 30 m · ten minutes",
    "effect": "Feel furnace temperature, pressure, poison concentration and damaged components directly through synchronized spiritual sense. Gain +1 to diagnose or stabilize the connected furnace.",
    "limit": "Requires an intact bond and heart. Sensory feedback does not grant consciousness; dangerous furnace surges may distract or strain the master.",
    "roll": "Flow to sustain synchronization under pressure; Mind to interpret faults.",
    "manual": "Ten Thousand Venoms Cauldron-Puppet Scripture"
  },
  {
    "id": "vessel-spark",
    "name": "Spark Within the Empty Vessel",
    "chapter": 5,
    "qi": 5,
    "requires": [
      "cauldron-communion",
      "venom-archive"
    ],
    "timing": "One full cultivation session · awakening attempt",
    "effect": "Gather long-accumulated records, sensory patterns and spiritual contact around the Cauldron Heart to prepare a vessel in which a nascent self may emerge.",
    "limit": "Requires a mature intact core, extensive refinement experience and long spiritual contact established in play. Pay 5 Qi after any rest recovery; no guaranteed awakening. Learning or mastering the art does not declare the puppet alive.",
    "roll": "Heart to guide the attempt; the GM resolves whether a spark emerges, remains dormant, damages the core or becomes unstable.",
    "manual": "Ten Thousand Venoms Cauldron-Puppet Scripture"
  },
  {
    "id": "venoms-soul",
    "name": "Ten Thousand Venoms Gain a Soul",
    "chapter": 5,
    "qi": 6,
    "requires": [
      "vessel-spark"
    ],
    "timing": "One full cultivation session · final stabilization",
    "effect": "Nurture an actually emerged spirit toward stable independent consciousness and gradually loosen control. A successful awakening enables original alchemical judgment, learning and eventual self-cultivation.",
    "limit": "Requires a real emergent spark established in play, not merely a checked prerequisite. Pay 6 Qi after rest recovery. The awakened Puppet Alchemist may disagree, choose recipes and develop preferences; bonding is no longer ownership or automatic obedience.",
    "roll": "Heart to support stabilization; the GM determines lasting awakening or further work. No guaranteed success or instant mastery of unknown alchemy.",
    "manual": "Ten Thousand Venoms Cauldron-Puppet Scripture"
  },
  {
    "id": "ironroot",
    "name": "Ironroot Stance",
    "chapter": 1,
    "qi": 0,
    "requires": [],
    "timing": "Action · until you leave your footing",
    "effect": "Set feet, knees and hips so the whole frame supports weapon weight and incoming force. Gain +1 Body to resist being shoved or losing balance while braced.",
    "limit": "Requires solid footing. Ends when you move voluntarily, are displaced or fall; offers no universal damage reduction.",
    "roll": "Body to hold against a contested force.",
    "manual": "Ninefold Crushing Force Manual"
  },
  {
    "id": "whole-frame",
    "name": "Whole-Frame Strike",
    "chapter": 1,
    "qi": 1,
    "requires": [
      "ironroot"
    ],
    "timing": "Action · heavy weapon reach",
    "effect": "Drive one efficient blow from the ground through legs, hips and shoulders. Gain +1 Body for a strike made from stable footing.",
    "limit": "One ordinary weapon hit, no automatic armor penetration or extra attack. Needs room to swing and a weapon you can control.",
    "roll": "Body for the strike.",
    "manual": "Ninefold Crushing Force Manual"
  },
  {
    "id": "sweeping-gate",
    "name": "Sweeping Gate",
    "chapter": 1,
    "qi": 2,
    "requires": [
      "ironroot"
    ],
    "timing": "Action · up to two foes within weapon reach",
    "effect": "Sweep horizontally to control nearby space. On success force affected foes to give ground up to 2 m or halt their approach until your next turn.",
    "limit": "Control instead of weapon damage. Requires a clear arc; larger or stronger foes can resist. Cannot sweep through allies safely.",
    "roll": "Body: 10+ control both; 7–9 control one and expose your flank; 6− fail and face danger.",
    "manual": "Ninefold Crushing Force Manual"
  },
  {
    "id": "returning-momentum",
    "name": "Returning Momentum",
    "chapter": 1,
    "qi": 0,
    "requires": [],
    "timing": "After a swing · part of the same action",
    "effect": "Guide recoil and remaining motion into a ready path for the next blow without fully resetting the weapon.",
    "limit": "No extra attack, damage or automatic bonus. Requires space and retained grip; a jammed weapon or forced stop breaks the flow.",
    "roll": "No separate roll unless recovery is contested; then Body.",
    "manual": "Ninefold Crushing Force Manual"
  },
  {
    "id": "endless-pendulum",
    "name": "Endless Pendulum",
    "chapter": 2,
    "qi": 3,
    "requires": [
      "returning-momentum"
    ],
    "timing": "Action to begin · up to three consecutive turns",
    "effect": "Link rising, falling, horizontal and turning blows. Make one weapon strike on each turn you spend your action maintaining the sequence; gain +1 Body on the second and third strikes.",
    "limit": "Pay 3 Qi once; never gain extra actions. Pausing, losing grip, being restrained or lacking swing room ends it. Each strike resolves separately.",
    "roll": "Body for each strike.",
    "manual": "Ninefold Crushing Force Manual"
  },
  {
    "id": "iron-pillar",
    "name": "Iron Pillar Guard",
    "chapter": 2,
    "qi": 2,
    "requires": [
      "ironroot"
    ],
    "timing": "Reaction · one incoming direct attack",
    "effect": "Brace the weapon against your frame to absorb or halt a direct blow.",
    "limit": "Requires footing and an intact heavy weapon. Does not redirect the attack or stop area effects. At most one reaction per round.",
    "roll": "Body: 10+ halt a comparable direct blow; 7–9 lessen its harm by 1 but lose footing; 6− the blow lands. Superior-realm force may overwhelm the guard.",
    "manual": "Ninefold Crushing Force Manual"
  },
  {
    "id": "sky-lifting",
    "name": "Sky-Lifting Strike",
    "chapter": 2,
    "qi": 2,
    "requires": [
      "whole-frame"
    ],
    "timing": "Action · close weapon reach",
    "effect": "Drive upward from legs and hips to break a guard or lift a comparable opponent off balance, setting up a descending attack.",
    "limit": "On success choose a normal weapon hit OR an opening lasting until your next turn. The target can recover or move away before a follow-up. No automatic launch of huge foes.",
    "roll": "Body for the rising blow.",
    "manual": "Ninefold Crushing Force Manual"
  },
  {
    "id": "falling-mountain",
    "name": "Falling Mountain",
    "chapter": 3,
    "qi": 3,
    "requires": [
      "sky-lifting"
    ],
    "timing": "Action · following your successful Sky-Lifting Strike",
    "effect": "Turn the raised hammer into a descending blow driven by body weight and gravity. Gain +1 Body and, on a clean success, +1 weapon harm.",
    "limit": "Requires the previous turn’s rising strike and an opponent still in reach; costs 3 Qi separately (5 for both arts). Losing stance or being interrupted breaks setup.",
    "roll": "Body: 10+ strike with added harm; 7–9 normal hit with an exposed recovery; 6− miss and face danger.",
    "manual": "Ninefold Crushing Force Manual"
  },
  {
    "id": "mountain-breaking",
    "name": "Mountain-Breaking Blow",
    "chapter": 3,
    "qi": 4,
    "requires": [
      "whole-frame"
    ],
    "timing": "Action · single target at weapon reach",
    "effect": "Commit stance, weight and full strength to one maximum-power impact. On a clean success add 2 weapon harm or break one comparable mundane structural obstacle.",
    "limit": "Choose creature or obstacle. Cannot move as part of the action; no reaction until your next turn. Stronger spiritual defenses remain effective; the name does not grant literal mountain destruction.",
    "roll": "Body: 10+ full impact; 7–9 ordinary impact and lose footing; 6− fail and leave an opening.",
    "manual": "Ninefold Crushing Force Manual"
  },
  {
    "id": "measure-force",
    "name": "Measure of Force",
    "chapter": 3,
    "qi": 1,
    "requires": [
      "whole-frame",
      "returning-momentum"
    ],
    "timing": "Additional cost · one heavy weapon strike",
    "effect": "Precisely meter force so a successful strike can disable, disarm or spare an object instead of delivering its full destructive impact.",
    "limit": "Add 1 Qi to the chosen strike (1 total on an ordinary strike). Choose restraint before rolling; replace damage with the agreed disabling effect. Does not bypass defenses or guarantee a safe outcome on a failed roll.",
    "roll": "Use the strike’s Body roll; on a complication the intended degree of restraint is imperfect.",
    "manual": "Ninefold Crushing Force Manual"
  }
]);
manuals.push({name:"Ten Thousand Venoms Cauldron-Puppet Scripture",key:'venomPuppetChapter',chapters:['Forge the Empty Vessel','The Walking Cauldron','The Venom Workshop','One Master, Two Furnaces','Give the Cauldron a Spirit'],description:'A forged Cauldron-Core Automaton becomes a mobile poison workshop. Before the final awakening, every apparent decision is an engraved routine or a command. Needs a constructed, fuelled puppet, ingredients, tools and learned recipes. Listed Qi costs come from the master; spirit stones or suitable poison fuel power ordinary operation. Poison use remains subject to delivery, resistance and the actual ingredient. Golden Furnace Physique is compatible but not mandatory; Yang-Venom Ignition specifically needs 100%-pure Yang Poison.'},{name:"Ninefold Crushing Force Manual",key:'crushingForceChapter',chapters:['Stance and Momentum','Unbroken Weight','Measured Destruction'],description:'A strength-based manual for any controllable heavy hammer or similar heavy weapon. All combat rolls use Body. No named artifact, elemental root or physique is required. Qi costs represent cultivated bodily exertion, without adding elemental attacks. Each hit uses the weapon’s established harm; any listed additional harm is added only when stated.'});
function hasManual(c,name=manual){return [c.fields.manualPrimary,c.fields.manualSecondary].includes(name);}
function eligible(c,a,trail=[]){
 const m=manuals.find(m=>m.name===a.manual);
 return (a.id!=='yang-ignition'||(c.roots||[]).some(r=>r.name==='Poison'&&r.purity===100&&r.polarity==='Yang'))&&!trail.includes(a.id)&&hasManual(c,a.manual)&&a.chapter<=(c.manualStudy?.[m.key]||1)&&a.requires.every(id=>{const p=arts.find(x=>x.id===id);return p&&(c.learnedTechniques||[]).includes(id)&&(c.masteredTechniques||[]).includes(id)&&eligible(c,p,[...trail,a.id]);});
}
function available(c){return arts.filter(a=>eligible(c,a));}
function selected(c){return available(c).filter(a=>(c.learnedTechniques||[]).includes(a.id));}
const rest={brief:'One uninterrupted hour of safe cultivation restores half your maximum Qi, rounded up, without exceeding your maximum. Benefit once between full cultivation rests.',full:'Eight hours of rest including quiet cultivation restore all Qi and refresh once-per-full-rest arts. Benefit at most once per 24 hours.',limits:'Both require safety and a suitable qi source. Interrupted cultivation gives no recovery. These rules restore Qi only; they do not heal wounds or advance your realm.'};
const api={manual,manuals,chapters,arts,hasManual,available,selected,rest};root.BuilderTechniques=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);

