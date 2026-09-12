/* World-specific cultivation catalogue and house-rule effects. */
(function(root){
  const realms={};
  const rows=[
    ['Mortal',0,'70–100 years','An ordinary being before cultivation.','Begin strengthening the body.'],
    ['Body Tempering',5,'100–130 years','Strengthen flesh, blood, organs, bones and meridians.','Impurity Purge: wash away the expelled toxins promptly.'],
    ['Qi Refining',7,'150–200 years','Sense, absorb, purify and circulate spiritual qi.','Minor Heavenly Tribulation: withstand heavenly lightning.'],
    ['Foundation Establishment',7,'250–350 years','Stabilize the dantian and meridians into a lasting foundation.','Self-Sustaining Foundation: unresolved flaws carry into later realms.'],
    ['Golden Core',5,'600–900 years','Condense and purify cultivation into a Golden Core.','Core Cracking: fracture the outer core without collapsing it.'],
    ['Nascent Soul',5,'1,500–2,500 years','Nurture an independent spiritual reflection of yourself.','First Soul Emergence: sustain the exposed soul outside the body.'],
    ['Spirit Transformation',4,'4,000–6,000 years','Bring body, qi and soul into one spiritual existence.','Threefold Convergence: harmonize body, cultivation and soul.'],
    ['Dao Integration',3,'10,000–15,000 years','Comprehend and embody a personal Dao.','Dao Manifestation: express your Dao beyond your own body.'],
    ['Heavenly Gate',3,'25,000–40,000 years','Refine your mortal existence to its natural limit.','Great Heavenly Tribulation: lightning, Heart Demons and Heavenly Law test you before ascension.'],
    ['Earth Immortal',3,'100,000–250,000 years','Reconstruct the body around immortal qi and an Immortal Foundation.','Immortal Soul Baptism: permeate and refine the soul with immortal qi.'],
    ['Spirit Immortal',3,'500,000–1,000,000 years','Sustain the immortal soul independently of a physical vessel.','Celestial Anchoring: bind your immortal soul to your Dao.'],
    ['Celestial Immortal',3,'5,000,000–10,000,000 years','Anchor existence to the Dao beyond a single body or soul.','Severing of Mortality: rebuild the foundation beyond natural death.'],
    ['True Immortal',3,'Ageless','Body, soul and Dao express an enduring immortal existence.','True Immortal Origin: perfect the foundations that sustain your existence.']
  ];
  rows.forEach(([name,count,lifespan,description,threshold],rank)=>{realms[name]={rank,lifespan,description,threshold,stages:count===0?[]:rank>=7?['Early','Middle','Late']:Array.from({length:count},(_,i)=>'Stage '+(i+1))};});
  const roots={};
  [
    ['Metal','金','Ordinary','Refinement, sharpness and precision.','Earth','Fire','refining metals, controlling weapon qi or severing with Metal qi'],
    ['Wood','木','Ordinary','Growth, vitality and regeneration.','Water','Metal','healing with Wood qi or guiding plant growth'],
    ['Water','水','Ordinary','Flow, adaptation and accumulation.','Metal','Earth','redirecting currents or adapting a Water technique'],
    ['Fire','火','Ordinary','Heat, consumption and transformation.','Wood','Water','aggressively manipulating fire qi'],
    ['Earth','土','Ordinary','Stability, endurance and containment.','Fire','Wood','raising earthen defenses or grounding unstable qi'],
    ['Ice','冰','Mutated','Water refined through extreme Yin; cold and restriction.','Water / Yin','Fire / Yang','freezing, preserving or restricting with Ice qi'],
    ['Lightning','雷','Mutated','Wood expressed through extreme Yang; speed and sudden force.','Wood / Yang','Earth','channeling Lightning into a sudden strike or burst of movement'],
    ['Wind','風','Mutated','Mutated Wood; movement, pressure and freedom.','Wood','Earth','guiding Wind through movement or pressure techniques'],
    ['Poison','毒','Mutated','Wood and Yin corruption; contamination and decay.','Wood / Yin','Fire / Yang','identifying, refining or controlling Poison qi'],
    ['Light','光','Mutated','Yang-dominant radiance, revelation and purification.','Yang / Fire','Yin / Shadow','revealing concealment or purifying with Light qi'],
    ['Shadow','影','Mutated','Yin-dominant concealment, silence and obscurity.','Yin / Water','Yang / Light','concealing yourself or suppressing a qi signature with Shadow'],
  ].forEach(([name,symbol,kind,description,resonance,weakness,condition])=>roots[name]={symbol,kind,description,resonance,weakness,condition});
  const polarities={
  "Metal": [
    "Silent, precise severing; qi contracts into fine threads.",
    "Explosive, radiant weapon qi; forceful cutting waves."
  ],
  "Wood": [
    "Slow rooting, preserved vitality and quiet regeneration.",
    "Rapid growth, vigorous regeneration and erupting vines."
  ],
  "Water": [
    "Deep, cold, still water that absorbs and contains.",
    "Rushing torrents, crashing waves and forceful currents."
  ],
  "Fire": [
    "Ghost flame, cold flame and hidden embers that suppress spiritual activity.",
    "Blazing solar flame, radiant heat and explosive combustion."
  ],
  "Earth": [
    "Deep, dense earth that contains, seals and absorbs vibration.",
    "Rising stone, upheaval and outward bursts of crushing force."
  ],
  "Ice": [
    "Still, preserving frost and deep, binding cold.",
    "Rapid crystallization, erupting ice spikes and forceful shattering."
  ],
  "Lightning": [
    "Quiet, concentrated pulses that numb and suppress.",
    "Thunderous arcs, explosive speed and stimulating surges."
  ],
  "Wind": [
    "Silent drafts, concealing currents and inward-drawing vortices.",
    "Roaring gales, driving pressure and outward gusts."
  ],
  "Poison": [
    "Slow, hidden toxins that stagnate qi and suppress vitality.",
    "Fast-acting, agitating toxins that accelerate corrosive breakdown."
  ],
  "Light": [
    "Soft, contained illumination, reflective veils and inward revelation.",
    "Dazzling radiance, exposing beams and outward purification."
  ],
  "Shadow": [
    "Deep concealment, quiet qi and stable fields of absence.",
    "Moving silhouettes, projected doubles and forceful shadow tendrils; overt motion sacrifices concealment."
  ]
};
  const physiques={};
  [
    ['Balanced Physique',0,0,'maintaining balance during a cultivation or breakthrough roll','No innate elemental specialization.'],
    ['Broad Meridian Physique',0,2,'controlling a large burst of qi','Rapid absorption demands resources; uncontrolled surges strain the meridians.'],
    ['Fine Meridian Physique',0,0,'performing delicate qi work in alchemy, formations or healing','−1 when forcing a large explosive qi surge through the meridians.'],
    ['Clear Dantian Physique',0,1,'purifying absorbed qi during cultivation','Provides no additional attack bonus.'],
    ['Iron-Bone Physique',2,0,'resisting impact or physical backlash','−1 on contortion or flexibility checks.'],
    ['Jade-Bone Physique',1,1,'recovering from cultivation strain','Offers no innate armor.'],
    ['Vigorous Blood Physique',2,0,'resisting exhaustion or blood loss','−1 resisting a blood-borne poison once it enters circulation.'],
    ['Spirit-Sensitive Physique',0,1,'detecting spiritual fluctuations','−1 resisting overwhelming spiritual interference.'],
    ['Yin-Rich Physique',0,1,'stabilizing Water, Ice, Shadow or Yin techniques','−1 tolerating extreme Fire or Yang qi.'],
    ['Yang-Rich Physique',1,0,'stabilizing Fire, Lightning, Light or Yang techniques','−1 tolerating extreme Yin qi.'],
    ['Wood-Vital Physique',2,0,'recovering from injury through rest or healing','−1 on recovery rolls for injuries inflicted by Metal qi.'],
    ['Fire-Vessel Physique',0,1,'containing spiritual fire or alchemical heat','−1 resisting circulation disruption by Water or extreme Yin.'],
    ['Earthbound Physique',2,0,'resisting knockback or qi disruption','−1 on rapid repositioning rolls.'],
    ['Metal-Sinew Physique',1,0,'reinforcing a weapon or body with Metal qi','−1 on natural recovery rolls without treatment.'],
    ['Water-Flow Physique',0,1,'flowing around an obstruction with a movement technique','−1 when forcing a rigid, explosive qi technique.'],
    ['Pure Yin Body',0,2,'refining or stabilizing Yin qi','−1 tolerating extreme Yang; excess Yin needs balancing.'],
    ['Body of the Moon / Taiyin Body',0,2,'cultivating in moonlight or stabilizing lunar and Yin qi','−1 tolerating extreme Yang; balance Lightning surges with deliberate circulation.'],
    ['Body of the Sun / Taiyang Body',1,1,'cultivating in sunlight or stabilizing solar and Yang qi','−1 tolerating extreme Yin; uncontrolled heat agitates the meridians.'],
    ['Hundred-Poison Body',2,0,'identifying or resisting poison','Poison resistance is not immunity; unfamiliar toxins remain dangerous.'],
    ['Heavenly Sword Bones',1,1,'controlling sword qi with precision','The bonus requires a sword technique.'],
    ['Heavenly Molting Physique',2,0,'recovering from bodily cultivation strain','Once per session, a safe hour of molting restores 2 Vitality; interruption prevents recovery.'],
    ['Heaven-Devouring Meridian Physique',0,3,'absorbing ambient qi during cultivation','−1 stabilizing unfamiliar or contaminated qi.']
  ].forEach(([name,vitality,qi,condition,drawback])=>physiques[name]={vitality,qi,condition,drawback});
  const get=(table,key)=>Object.prototype.hasOwnProperty.call(table,key)?table[key]:null;
  function effects(c){
    const realm=get(realms,c.fields.realm), physique=get(physiques,c.fields.physique);
    const stage=realm?realm.stages.indexOf(c.fields.stage):-1;
    const complete=!!realm && (!realm.stages.length || stage>=0);
    const stageBoost=stage<0?0:realm.rank>=7?stage*2:Math.floor(stage/2);
    const vitality=complete?realm.rank*2+stageBoost:null;
    const qi=complete?Math.max(0,(realm.rank-1)*3)+stageBoost:null;
    const selected=c.roots||[];
    return {realm,physique,realmVitality:vitality,realmQi:qi,physiqueVitality:physique?.vitality||0,physiqueQi:physique?.qi||0,roots:selected.map(r=>({...r,...get(roots,r.name)}))};
  }
  const api={realms,roots,polarities,physiques,effects};root.BuilderCultivation=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
