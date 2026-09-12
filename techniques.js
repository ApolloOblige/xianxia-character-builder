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
function hasManual(c,name=manual){return [c.fields.manualPrimary,c.fields.manualSecondary].includes(name);}
function eligible(c,a,trail=[]){
 const m=manuals.find(m=>m.name===a.manual);
 return !trail.includes(a.id)&&hasManual(c,a.manual)&&a.chapter<=(c.manualStudy?.[m.key]||1)&&a.requires.every(id=>{const p=arts.find(x=>x.id===id);return p&&(c.learnedTechniques||[]).includes(id)&&(c.masteredTechniques||[]).includes(id)&&eligible(c,p,[...trail,a.id]);});
}
function available(c){return arts.filter(a=>eligible(c,a));}
function selected(c){return available(c).filter(a=>(c.learnedTechniques||[]).includes(a.id));}
const rest={brief:'One uninterrupted hour of safe cultivation restores half your maximum Qi, rounded up, without exceeding your maximum. Benefit once between full cultivation rests.',full:'Eight hours of rest including quiet cultivation restore all Qi and refresh once-per-full-rest arts. Benefit at most once per 24 hours.',limits:'Both require safety and a suitable qi source. Interrupted cultivation gives no recovery. These rules restore Qi only; they do not heal wounds or advance your realm.'};
const api={manual,manuals,chapters,arts,hasManual,available,selected,rest};root.BuilderTechniques=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
