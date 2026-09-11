/* Source-derived draft options. No implied numerical bonuses. */
(function (root) {
  const attributes = ['Body', 'Flow', 'Mind', 'Heart', 'Presence'];
  const descriptions = ['Strength, endurance, weapons, physical resistance', 'Qi control, movement arts, spiritual techniques', 'Investigation, formations, medicine, knowledge', 'Willpower, emotions, Dao conviction, resisting corruption', 'Intimidation, persuasion, sect etiquette, commanding spirits'];
  const options = {
    path: ['Righteous Path', 'Demonic Path', 'Beast / Plant Spirit Path', 'Ghost Path'],
    origin: ['Sect Disciple', 'Rogue Cultivator', 'Clan Heir', 'Wandering Doctor', 'Spirit Beast in Human Form', 'Demonic Cultivator', 'Mortal Scholar', 'Fallen Young Master'],
    discipline: ['Sword Cultivator', 'Body Cultivator', 'Formation Master', 'Alchemist', 'Talisman Master', 'Beast Tamer', 'Gu Cultivator', 'Demonic Cultivator', 'Music Cultivator', 'Ghost Cultivator'],
    root: ['Fire Root', 'Wood Root', 'Dual Water/Ice Root', 'Heavenly Spiritual Root', 'Mutated Root'],
    flaw: ['Unstable meridians', 'Arrogant', 'Heavenly curse', 'Demonic qi', 'Weak constitution', 'Karmic debt', 'Damaged spiritual root']
  };
  const rootNotes = {
    'Fire Root': '+1 when aggressively manipulating fire qi. Conditional roll bonus; does not increase a core attribute.',
    'Wood Root': 'Improved healing and plant techniques. Numerical effect unspecified.',
    'Dual Water/Ice Root': 'Greater versatility, slower cultivation. Numerical effects unspecified.',
    'Heavenly Spiritual Root': 'Cultivates rapidly but attracts attention. Numerical effects unspecified.',
    'Mutated Root': 'Unique advantages and problems. Details unspecified.'
  };
  const fields = ['name','path','origin','heritage','realm','stage','root','rootsDetail','purity','physique','discipline','techniques','equipment','trade','dao','flaw','bonds','reputation','karma','notes'];
  function empty() { return {version:1, step:0, fields:Object.fromEntries(fields.map(k=>[k,''])), attributes:Object.fromEntries(attributes.map(k=>[k,''])), modifiers:[], resourceBonuses:{vitality:'',qi:''}}; }
  function number(value) { return value !== '' && value != null && Number.isFinite(Number(value)) ? Number(value) : null; }
  function validate(data) {
    if (!data || data.version !== 1 || !data.fields || !data.attributes || !Array.isArray(data.modifiers) || data.modifiers.length > 100) throw Error('This is not a supported character save. Your current character has been kept.');
    const clean = empty();
    for (const key of fields) { if (typeof data.fields[key] !== 'string' || data.fields[key].length > 20000) throw Error('A saved field is invalid.'); clean.fields[key] = data.fields[key]; }
    for (const key of attributes) { const v = data.attributes[key]; if (v !== '' && (typeof v !== 'number' || !Number.isFinite(v) || Math.abs(v)>10000)) throw Error('A saved attribute is invalid.'); clean.attributes[key]=v; }
    for (const m of data.modifiers) {
      if (!m || !attributes.includes(m.stat) || typeof m.amount !== 'number' || !Number.isFinite(m.amount) || Math.abs(m.amount)>10000 || typeof m.source !== 'string' || !m.source.trim() || m.source.length>500 || typeof m.condition !== 'string' || m.condition.length>500) throw Error('A saved modifier is invalid.');
      clean.modifiers.push({stat:m.stat,amount:m.amount,source:m.source,condition:m.condition});
    }
    for (const k of ['vitality','qi']) { const v=data.resourceBonuses?.[k]; if (v !== '' && (typeof v !== 'number' || !Number.isFinite(v) || Math.abs(v)>10000)) throw Error('A saved resource bonus is invalid.'); clean.resourceBonuses[k]=v; }
    clean.step=Number.isInteger(data.step) && data.step>=0 && data.step<6 ? data.step:0;
    return clean;
  }
  function compile(c) {
    const totals = {}, contributions = {};
    for (const stat of attributes) {
      contributions[stat]=c.modifiers.filter(m=>m.stat===stat && !m.condition.trim());
      const base=number(c.attributes[stat]);
      totals[stat]=base===null ? null : base+contributions[stat].reduce((sum,m)=>sum+m.amount,0);
    }
    const derived=(base,stat,key)=>totals[stat]===null || number(c.resourceBonuses[key])===null ? null : base+totals[stat]+Number(c.resourceBonuses[key]);
    return {totals,contributions,vitality:derived(6,'Body','vitality'),qi:derived(3,'Flow','qi'),conditional:c.modifiers.filter(m=>m.condition.trim()),fire:c.fields.root==='Fire Root'};
  }
  const api={attributes,descriptions,options,rootNotes,fields,empty,validate,compile};
  root.BuilderRules=api;
  if (typeof module!=='undefined') module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
