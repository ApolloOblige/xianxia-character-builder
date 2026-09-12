/* Source-derived draft options. No implied numerical bonuses. */
(function (root) {
  const A=root.BuilderTechniques || (typeof require!=='undefined' ? require('./techniques.js') : null);
  const T=root.BuilderTraining || (typeof require!=='undefined' ? require('./training.js') : null);
  const C=root.BuilderCultivation || (typeof require!=='undefined' ? require('./cultivation.js') : null);
  const H=root.BuilderHeritages || (typeof require!=='undefined' ? require('./heritages.js') : null);
  const O=root.BuilderOrigins || (typeof require!=='undefined' ? require('./origins.js') : null);
  const own=(table,key)=>Object.prototype.hasOwnProperty.call(table,key);
  const heritageCategories=[...Object.keys(H.groups),'Plant Spirit','Custom heritage'];
  const heritageTraits={
    'Mammal':{stat:'Body',name:'Primal Vigor',description:'A vigorous body and enduring physical instincts.'},
    'Bird':{stat:'Flow',name:'Skyborne Grace',description:'Light, balanced movement and a natural feel for flowing qi.'},
    'Reptile':{stat:'Heart',name:'Patient Resolve',description:'Stillness and patience steady your will.'},
    'Amphibian':{stat:'Flow',name:'Fluid Adaptation',description:'Your qi shifts smoothly between changing conditions.'},
    'Fish':{stat:'Flow',name:'River Rhythm',description:'Your movement and qi follow the rhythm of a current.'},
    'Marine Beast':{stat:'Body',name:'Ocean Vigor',description:'Deep reserves of physical strength and endurance.'},
    'Mollusk':{stat:'Mind',name:'Subtle Awareness',description:'A sensitive, observant mind notices small changes.'},
    'Crustacean':{stat:'Body',name:'Armored Foundation',description:'Your cultivated body inherits a sturdy foundation.'},
    'Insect':{stat:'Mind',name:'Pattern Instinct',description:'Fine patterns and coordinated actions come naturally.'},
    'Arachnid':{stat:'Mind',name:'Webwise Perception',description:'You notice connections, movement and small disturbances.'},
    'Myriapod':{stat:'Body',name:'Unbroken Motion',description:'Persistent strength carries you through sustained exertion.'},
    'Other Invertebrate':{stat:'Heart',name:'Quiet Persistence',description:'An unusual inner resilience steadies your spirit.'},
    'Deep-Sea / Unusual Heritage':{stat:'Heart',name:'Abyssal Resolve',description:'Your spirit remains steady under isolation and pressure.'},
    'Mythic Beast':{stat:'Presence',name:'Ancestral Bearing',description:'A trace of your legendary ancestry lends weight to your presence.'},
    'Tree Spirit':{stat:'Heart',name:'Deep Roots',description:'A deeply rooted spirit withstands fear and distraction.'},
    'Flower Spirit':{stat:'Presence',name:'Blossoming Presence',description:'Your spirit draws attention with a natural poise.'},
    'Bamboo / Grass Spirit':{stat:'Body',name:'Supple Strength',description:'Resilience and flexibility strengthen your physical foundation.'},
    'Vine Spirit':{stat:'Flow',name:'Coiling Current',description:'Your qi moves with a vine’s winding flexibility.'},
    'Medicinal Plant Spirit':{stat:'Mind',name:'Herbal Insight',description:'A perceptive mind recognizes subtle qualities and imbalances.'},
    'Fungus Spirit':{stat:'Heart',name:'Patient Renewal',description:'Slow, persistent growth shapes a resilient will.'},
    'Plant Spirit':{stat:'Heart',name:'Rooted Spirit',description:'Patient growth anchors your inner resolve.'},
    'Custom heritage':{stat:'Heart',name:'Awakened Resolve',description:'Your singular journey to awareness has tempered your will.'}
  };
  function heritageBonus(c) {
    const trait=own(heritageTraits,c.fields.heritageCategory)?heritageTraits[c.fields.heritageCategory]:null;
    return hasHeritage(c) && trait ? {stat:trait.stat,amount:1,source:c.fields.heritageCategory+' — '+trait.name,condition:'',description:trait.description} : null;
  }
  function inferHeritageCategory(value) {
    return Object.keys(H.groups).find(k=>H.groups[k].includes(value)) || (value?'Custom heritage':'');
  }
  function setHeritageCategory(c,category) {
    if(category && !heritageCategories.includes(category)) return;
    c.fields.heritageCategory=category;
    // Switching category clears the child so an incompatible old choice cannot survive.
    c.fields.heritage='';
  }
  function createPackage(origin) {
    return own(O.packages,origin) ? JSON.parse(JSON.stringify({origin,version:O.version,...O.packages[origin]})) : null;
  }
  function startingPackage(c) {
    return c.startingPackage?.origin===c.fields.origin ? c.startingPackage : createPackage(c.fields.origin);
  }
  function setOrigin(c,origin) { c.fields.origin=origin; c.startingPackage=createPackage(origin); }
  const attributes = ['Body', 'Flow', 'Mind', 'Heart', 'Presence'];
  const descriptions = ['Strength, endurance, weapons, physical resistance', 'Qi control, movement arts, spiritual techniques', 'Investigation, formations, medicine, knowledge', 'Willpower, emotions, Dao conviction, resisting corruption', 'Intimidation, persuasion, sect etiquette, commanding spirits'];
  const options = {
    path: ['Righteous Path', 'Demonic Path', 'Beast / Plant Spirit Path', 'Ghost Path'],
    origin: ['Sect Disciple', 'Rogue Cultivator', 'Clan Heir', 'Wandering Doctor', 'Spirit Beast in Human Form', 'Demonic Cultivator', 'Mortal Scholar', 'Fallen Young Master'],
    discipline: Object.keys(T.disciplines),
    root: ['Fire Root', 'Wood Root', 'Dual Water/Ice Root', 'Heavenly Spiritual Root', 'Mutated Root'],
    flaw: ['Unstable meridians', 'Arrogant', 'Heavenly curse', 'Demonic qi', 'Weak constitution', 'Karmic debt', 'Damaged spiritual root']
  };
  // Identity rules confirmed by the user. Keep the legacy heritage save key.
  function hasHeritage(c) { return c.fields.path === 'Beast / Plant Spirit Path'; }
  function pathContext(path) {
    if (path === 'Demonic Path') return 'Demonic cultivators are more likely to experience qi deviation or face harsher heavenly tribulations. This is story context, with no numerical modifier.';
    return path ? 'This path provides context for later story elements. It does not change stats.' : 'Choose a cultivation path to establish your story context.';
  }
  const rootNotes = {
    'Fire Root': '+1 when aggressively manipulating fire qi. Conditional roll bonus; does not increase a core attribute.',
    'Wood Root': 'Improved healing and plant techniques. ',
    'Dual Water/Ice Root': 'Greater versatility, slower cultivation. ',
    'Heavenly Spiritual Root': 'Cultivates rapidly but attracts attention. ',
    'Mutated Root': 'An unusual affinity expressed through your techniques.'
  };
  const fields = ['name','path','origin','heritageCategory','heritage','realm','stage','root','rootsDetail','purity','physique','discipline','techniques','equipment','trade','dao','flaw','bonds','reputation','karma','notes','manualPrimary','manualSecondary','tradePrimary','tradeSecondary','talent'];
  function empty() { return {version:1, layoutVersion:2, companion:{category:"",species:"",name:"",realm:"Mortal",infusion:""}, learnedTechniques:[], masteredTechniques:[], manualStudy:{vaultRatChapter:1,thunderChainChapter:1}, step:0, fields:Object.fromEntries(fields.map(k=>[k,''])), attributes:Object.fromEntries(attributes.map(k=>[k,''])), modifiers:[], resourceBonuses:{vitality:'',qi:''},startingPackage:null,roots:null}; }
  function number(value) { return value !== '' && value != null && Number.isFinite(Number(value)) ? Number(value) : null; }
  function validate(data) {
    if (!data || data.version !== 1 || !data.fields || !data.attributes || !Array.isArray(data.modifiers) || data.modifiers.length > 100) throw Error('This is not a supported character save. Your current character has been kept.');
    const clean = empty();
    if(data.companion!==undefined){
      const b=data.companion;
      if(!b||['category','species','name','realm','infusion'].some(k=>typeof b[k]!=='string'||b[k].length>200)|| (b.category&&!own(T.beastGroups,b.category)) || (b.species&&!T.beastGroups[b.category]?.includes(b.species)) || !own(C.realms,b.realm) || (b.infusion&&!own(C.roots,b.infusion)))throw Error('The saved companion is invalid.');
      clean.companion=Object.fromEntries(['category','species','name','realm','infusion'].map(k=>[k,b[k]]));
    }
    if(data.layoutVersion!==undefined && data.layoutVersion!==2)throw Error('This save uses an unsupported page layout.');
    if(data.learnedTechniques!==undefined){
      const ids=data.learnedTechniques;
      if(!Array.isArray(ids)||ids.length>A.arts.length||new Set(ids).size!==ids.length||ids.some(id=>!A.arts.some(a=>a.id===id)))throw Error('The saved technique selections are invalid.');
      clean.learnedTechniques=[...ids];
    }
    if(data.masteredTechniques!==undefined){
      const ids=data.masteredTechniques;
      if(!Array.isArray(ids)||new Set(ids).size!==ids.length||ids.some(id=>!clean.learnedTechniques.includes(id)))throw Error('Mastered arts must also be learned.');
      clean.masteredTechniques=[...ids];
    }
    if(data.manualStudy!==undefined){
      for(const m of A.manuals){const chapter=data.manualStudy?.[m.key]??1;if(!Number.isInteger(chapter)||chapter<1||chapter>m.chapters.length)throw Error('The saved manual chapter is invalid.');clean.manualStudy[m.key]=chapter;}
    }
    if(data.roots!=null){
      if(!Array.isArray(data.roots)||data.roots.length>5||new Set(data.roots.map(r=>r?.name)).size!==data.roots.length||data.roots.some(r=>!r||(!own(C.roots,r.name)&&!['Yin','Yang'].includes(r.name))||(r.polarity!==undefined&&!['None','Yin','Yang'].includes(r.polarity))||(r.purity!==''&&(!Number.isInteger(r.purity)||r.purity<1||r.purity>100))))throw Error('Choose up to five different roots, each with purity from 1 to 100.');
      clean.roots=data.roots.filter(r=>!['Yin','Yang'].includes(r.name)).map(r=>({name:r.name,purity:r.purity,...(r.polarity!==undefined?{polarity:r.polarity}:{})}));
    }
    for (const key of fields) { if(['heritageCategory','manualPrimary','manualSecondary','tradePrimary','tradeSecondary','talent'].includes(key) && data.fields[key]===undefined) continue; if (typeof data.fields[key] !== 'string' || data.fields[key].length > 20000) throw Error('A saved field is invalid.'); clean.fields[key] = data.fields[key]; }
    for(const [keys,table] of [[['manualPrimary','manualSecondary'],T.manuals],[['tradePrimary','tradeSecondary'],T.trades],[['talent'],T.talents]]){
      const values=keys.map(k=>clean.fields[k]).filter(Boolean);
      if(values.some(v=>!own(table,v))||new Set(values).size!==values.length)throw Error('A saved training selection is invalid or repeated.');
    }
    const oldPolarities=(data.roots||[]).filter(r=>['Yin','Yang'].includes(r.name));
    if(oldPolarities.length)clean.fields.rootsDetail+=(clean.fields.rootsDetail?'\n':'')+'Unassigned polarity: '+oldPolarities.map(r=>r.name+' ('+(r.purity===''?'purity not set':r.purity+'%')+')').join(', ')+'. Choose which elemental root each polarity belongs to.';
    if(clean.fields.heritageCategory==='Plant Spirit (custom)') clean.fields.heritageCategory='Plant Spirit';
    if(!clean.fields.heritageCategory)clean.fields.heritageCategory=inferHeritageCategory(clean.fields.heritage);
    if(clean.fields.heritageCategory && !heritageCategories.includes(clean.fields.heritageCategory))throw Error('A saved heritage category is invalid.');
    if(own(H.groups,clean.fields.heritageCategory) && clean.fields.heritage && !H.groups[clean.fields.heritageCategory].includes(clean.fields.heritage))throw Error('The saved heritage does not belong to its category.');
    const pack=data.startingPackage;
    if(pack!=null) {
      const textOk=(v,max)=>typeof v==='string' && v.length<=max;
      const amountOk=v=>Number.isSafeInteger(v) && v>=0 && v<=1000000;
      if(pack.origin!==clean.fields.origin || pack.version!==1 || !textOk(pack.description,1000) || !amountOk(pack.spiritStones) || !amountOk(pack.silverTaels) || !Array.isArray(pack.items) || pack.items.length>100 || pack.items.some(i=>!i || !textOk(i.name,500) || !i.name.trim() || !amountOk(i.quantity) || i.quantity<1 || !textOk(i.note,1000)))throw Error('The saved starting package is invalid.');
      clean.startingPackage={origin:pack.origin,version:pack.version,description:pack.description,spiritStones:pack.spiritStones,silverTaels:pack.silverTaels,items:pack.items.map(i=>({name:i.name,quantity:i.quantity,note:i.note}))};
    } else clean.startingPackage=createPackage(clean.fields.origin);
    for (const key of attributes) { const v = data.attributes[key]; if (v !== '' && (typeof v !== 'number' || !Number.isFinite(v) || Math.abs(v)>10000)) throw Error('A saved attribute is invalid.'); clean.attributes[key]=v; }
    for (const m of data.modifiers) {
      if (!m || !attributes.includes(m.stat) || typeof m.amount !== 'number' || !Number.isFinite(m.amount) || Math.abs(m.amount)>10000 || typeof m.source !== 'string' || !m.source.trim() || m.source.length>500 || typeof m.condition !== 'string' || m.condition.length>500) throw Error('A saved modifier is invalid.');
      clean.modifiers.push({stat:m.stat,amount:m.amount,source:m.source,condition:m.condition});
    }
    for (const k of ['vitality','qi']) { const v=data.resourceBonuses?.[k]; if (v !== '' && (typeof v !== 'number' || !Number.isFinite(v) || Math.abs(v)>10000)) throw Error('A saved resource bonus is invalid.'); clean.resourceBonuses[k]=v; }
    const oldLayout=data.layoutVersion===undefined;
    clean.step=Number.isInteger(data.step) && data.step>=0 && data.step<(oldLayout?6:7) ? data.step+(oldLayout&&data.step>=3?1:0):0;
    return clean;
  }
  function compile(c) {
    const totals = {}, contributions = {};
    const heritage=heritageBonus(c);
    const cultivation=C.effects(c);
    for (const stat of attributes) {
      contributions[stat]=c.modifiers.filter(m=>m.stat===stat && !m.condition.trim());
      if(heritage?.stat===stat) contributions[stat]=[heritage,...contributions[stat]];
      const base=number(c.attributes[stat]);
      totals[stat]=base===null ? null : base+contributions[stat].reduce((sum,m)=>sum+m.amount,0);
    }
    const derived=(base,stat,key)=>{
      const automatic=key==='vitality'?cultivation.realmVitality:cultivation.realmQi;
      const physique=key==='vitality'?cultivation.physiqueVitality:cultivation.physiqueQi;
      const extra=number(c.resourceBonuses[key]);
      if(totals[stat]===null || (automatic===null && extra===null))return null;
      return base+totals[stat]+(automatic||0)+physique+(extra||0);
    };
    return {techniques:A.selected(c),totals,contributions,heritage,cultivation,training:T.effects(c),vitality:derived(6,'Body','vitality'),qi:derived(3,'Flow','qi'),conditional:c.modifiers.filter(m=>m.condition.trim()),fire:c.roots===null && c.fields.root==='Fire Root'};
  }
  const api={techniques:A,training:T,cultivation:C,heritageTraits,heritageBonus,heritageCategories,heritageGroups:H.groups,originSources:O.sources,inferHeritageCategory,setHeritageCategory,startingPackage,setOrigin,hasHeritage,pathContext,attributes,descriptions,options,rootNotes,fields,empty,validate,compile};
  root.BuilderRules=api;
  if (typeof module!=='undefined') module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
