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

function hasManual(c){return [c.fields.manualPrimary,c.fields.manualSecondary].includes(manual);}
function available(c){return hasManual(c)?arts.filter(a=>a.chapter<=(c.manualStudy?.vaultRatChapter||1)):[];}
function selected(c){const ids=c.learnedTechniques||[];return available(c).filter(a=>ids.includes(a.id));}
const rest={brief:'One uninterrupted hour of safe cultivation restores half your maximum Qi, rounded up, without exceeding your maximum. Benefit once between full cultivation rests.',full:'Eight hours of rest including quiet cultivation restore all Qi and refresh once-per-full-rest arts. Benefit at most once per 24 hours.',limits:'Both require safety and a suitable qi source. Interrupted cultivation gives no recovery. These rules restore Qi only; they do not heal wounds or advance your realm.'};
const api={manual,chapters,arts,hasManual,available,selected,rest};root.BuilderTechniques=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
