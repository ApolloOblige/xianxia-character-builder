'use strict';
const R = BuilderRules, KEY = 'xianxia-character-builder.v1';
const $ = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const signed = n => n === null || n === '' ? 'Not set' : (n >= 0 ? '+' : '') + n;
let character = R.empty(), storageBlocked = false;
try { const raw = localStorage.getItem(KEY); if (raw) character = R.validate(JSON.parse(raw)); }
catch { storageBlocked = true; $('notice').textContent = 'Your previous save could not be read. It has not been overwritten. Download your work before closing this page.'; }
const titles = ['Identity','Cultivation','Disciplines & gear','Techniques','Attributes','Story & bonds','Review'];
const labels = {name:'Character name',path:'Cultivation path',origin:'Origin',heritageCategory:'Heritage archetype',heritage:'Special Heritage',realm:'Cultivation realm',stage:'Stage',root:'Spiritual root',rootsDetail:'Your spiritual roots and proportions',purity:'Root purity',physique:'Physique',discipline:'Discipline',techniques:'Manual and technique notes',equipment:'Weapons and equipment',trade:'Additional trade and talent notes',dao:'Dao seed / conviction',flaw:'Flaw',bonds:'Bonds',reputation:'Reputation / face',karma:'Karmic debts, enmities and oaths',notes:'Other notes',manualPrimary:'Primary manual',manualSecondary:'Supporting manual',tradePrimary:'Primary trade',tradeSecondary:'Secondary trade',talent:'Natural talent'};
function save() {
  if (storageBlocked) { $('save-status').textContent='Automatic saving unavailable — download a save.'; return; }
  try { localStorage.setItem(KEY,JSON.stringify(character)); $('save-status').textContent='Saved in this browser'; }
  catch { $('save-status').textContent='Could not save in this browser — download a save.'; }
}
function field(key, help='', multiline=false) {
  const value=esc(character.fields[key]);
  return `<div class="field"><label for="f-${key}">${labels[key]}</label>${multiline ? `<textarea id="f-${key}" data-field="${key}" rows="3" maxlength="20000">${value}</textarea>` : `<input id="f-${key}" data-field="${key}" value="${value}" maxlength="20000" ${R.options[key]?`list="list-${key}"`:''}>`}${R.options[key]?`<datalist id="list-${key}">${R.options[key].map(v=>`<option value="${esc(v)}"></option>`).join('')}</datalist>`:''}${help?`<small>${help}</small>`:''}</div>`;
}
function pathSelector() {
  const current=character.fields.path;
  const choices=R.options.path.includes(current)||!current ? R.options.path : [...R.options.path,current];
  return '<div class="field"><label for="f-path">Cultivation path</label><select id="f-path" data-field="path"><option value="">Choose a path</option>'+choices.map(v=>'<option value="'+esc(v)+'" '+(v===current?'selected':'')+'>'+esc(v)+'</option>').join('')+'</select><small>Story context only; cultivation path gives no stat modifiers.</small><p id="path-context">'+esc(R.pathContext(current))+'</p></div>';
}
function selector(key,choices,prompt) {
  const value=character.fields[key];
  return '<div class="field"><label for="f-'+key+'">'+labels[key]+'</label><select id="f-'+key+'" data-field="'+key+'"><option value="">'+prompt+'</option>'+choices.map(v=>'<option value="'+esc(v)+'" '+(v===value?'selected':'')+'>'+esc(v)+'</option>').join('')+'</select></div>';
}
function originSelector() {
  const value=character.fields.origin, choices=[...R.options.origin];
  if(value && !choices.includes(value))choices.push(value);
  return selector('origin',choices,'Choose an origin')+'<small>Sets your starting money and supplies. It gives no stat modifiers.</small><div id="starting-package" aria-live="polite">'+packageSummary()+'</div>';
}
function packageSummary(expanded=false) {
  const pack=R.startingPackage(character);
  if(!pack)return '<p>Choose an origin to see your starting money and supplies.</p>';
  return '<div class="starting-kit"><h3>Starting package · '+esc(pack.origin)+'</h3><p>'+esc(pack.description)+'</p><p class="purse"><strong>'+pack.spiritStones+' low-grade spirit stones</strong> · <strong>'+pack.silverTaels+' silver taels</strong></p><details'+(expanded?' open':'')+'><summary>View starting supplies</summary><ul>'+pack.items.map(i=>'<li><strong>'+i.quantity+' × '+esc(i.name)+'</strong>'+(i.note?'<small>'+esc(i.note)+'</small>':'')+'</li>').join('')+'</ul></details></div>';
}
function heritageEffect() {
  const trait=R.heritageTraits[character.fields.heritageCategory];
  if(!trait || !R.hasHeritage(character))return '';
  return '<div class="starting-kit"><h3>'+esc(trait.name)+' · +1 '+esc(trait.stat)+'</h3><p>'+esc(trait.description)+'</p><small>Your archetype grants this bonus once. Your special heritage shapes your appearance and story.</small></div>';
}
function refinedHeritage() {
  const group=character.fields.heritageCategory;
  if(!group)return '<p>Choose a heritage archetype.</p>';
  const list=R.heritageGroups[group];
  return heritageEffect()+(Array.isArray(list)?selector('heritage',list,'Choose your special heritage'):field('heritage','Describe your original form.'));
}
function heritageSelector() {
  return selector('heritageCategory',R.heritageCategories,'Choose a heritage archetype')+'<div id="heritage-choice">'+refinedHeritage()+'</div>';
}
function modifierList(edit=false) {
  return character.modifiers.length ? `<ul class="ledger">${character.modifiers.map((m,i)=>`<li><strong>${signed(m.amount)} ${esc(m.stat)}</strong> — ${esc(m.source)} <span class="tag">Additional modifier</span><p>${m.condition ? `Only when: ${esc(m.condition)}. Excluded from permanent total.`:'Included in permanent total.'}</p>${edit?`<button data-remove="${i}" aria-label="Remove modifier ${i+1}">Remove</button>`:''}</li>`).join('')}</ul>` : '<p>No additional modifiers.</p>';
}
function statTable(c) {
  return `<div class="table-wrap"><table><caption>Attributes</caption><thead><tr><th>Attribute</th><th>Base</th><th>Added</th><th>Total</th><th>Sources</th></tr></thead><tbody>${R.attributes.map(s=>`<tr><th scope="row">${s}</th><td>${signed(character.attributes[s])}</td><td>${signed(c.contributions[s].reduce((a,m)=>a+m.amount,0))}</td><td><strong>${signed(c.totals[s])}</strong></td><td>${c.contributions[s].map(m=>`${esc(m.source)} (${signed(m.amount)})`).join('; ')||'—'}</td></tr>`).join('')}</tbody></table></div>`;
}
function resourceSummary(c) {
  const x=c.cultivation;
  return ['vitality','qi'].map(k=>{
    const realm=k==='qi'?x.realmQi:x.realmVitality, physique=k==='qi'?x.physiqueQi:x.physiqueVitality;
    return '<p><strong>'+(k==='qi'?'Qi':'Vitality')+':</strong> '+(c[k]===null?'Choose a realm and stage, then enter your base attribute':c[k])+'<small>'+(k==='qi'?'3 + total Flow':'6 + total Body')+' + realm/stage '+(realm===null?'(not set)':realm)+' + physique '+physique+' + additional adjustment '+(character.resourceBonuses[k]||0)+'.</small></p>';
  }).join('');
}
function knownSelector(key,choices,prompt){
  const current=character.fields[key];return selector(key,current&&!choices.includes(current)?[...choices,current]:choices,prompt);
}
function realmDetails(){
  const c=R.cultivation.effects(character),r=c.realm;
  if(!r)return '<p>Choose a realm to see its lifespan and breakthrough.</p>';
  return '<div class="starting-kit"><h3>'+esc(character.fields.realm)+'</h3><p>'+esc(r.description)+'</p><p><strong>Typical lifespan:</strong> '+esc(r.lifespan)+'</p><small>Baseline for a stable human cultivator; species, injuries and treasures can change longevity.</small><p><strong>Final-stage breakthrough:</strong> '+esc(r.threshold)+'</p><p>'+(c.realmVitality===null?'Choose a stage to calculate resource bonuses.':'Realm and stage: +'+c.realmVitality+' Vitality · +'+c.realmQi+' Qi')+'</p></div>';
}
function purityRate(p){return p===''?null:p<20?0.5:p<40?0.75:p<60?1:p<80?1.25:1.5;}
function polaritySelector(chosen){
  return '<label>'+esc(chosen.name)+' polarity<select data-root-polarity="'+chosen.name+'">'+['None','Yin','Yang'].map(v=>'<option '+((chosen.polarity||'None')===v?'selected':'')+'>'+v+'</option>').join('')+'</select></label>';
}
function polarityEffect(x){
  if(!['Yin','Yang'].includes(x.polarity))return '';
  return '<p><strong>'+x.polarity+' '+esc(x.name)+':</strong> '+esc(R.cultivation.polarities[x.name][x.polarity==='Yin'?0:1])+'</p><p>+1 when a technique expresses these '+x.polarity+' qualities through this root. This boosts the attached root only and counts toward the combined +2 cultivation bonus limit.</p>';
}
function rootCards(){
  return Object.entries(R.cultivation.roots).map(([name,r])=>{
    const chosen=character.roots?.find(x=>x.name===name);
    return '<div class="root-card"><label class="root-toggle"><input type="checkbox" data-root-toggle="'+name+'" '+(chosen?'checked':'')+'> '+esc(name)+' '+r.symbol+' <span class="tag">'+r.kind+'</span></label><p>'+esc(r.description)+'</p><small>Resonance: '+esc(r.resonance)+' · Suppressed by: '+esc(r.weakness)+'</small>'+(chosen?'<label> '+esc(name)+' purity (%)<input aria-label="'+name+' purity" type="number" min="1" max="100" step="1" data-root-purity="'+name+'" value="'+chosen.purity+'"></label>'+polaritySelector(chosen):'')+'</div>';
  }).join('');
}
function rootEffects(){
  const roots=character.roots||[];
  if(!roots.length)return '<p>No elemental roots selected.</p>';
  return '<ul class="ledger">'+roots.map(x=>{const r=R.cultivation.roots[x.name],rate=purityRate(x.purity);return '<li><strong>'+esc(x.name)+' '+(x.purity===''?'— purity not set':x.purity+'%')+'</strong><p>'+(rate===null?'Set purity to determine cultivation efficiency and affinity.':(x.purity>=20?'+1 when '+esc(r.condition)+'.':'Below 20% purity: affinity is present, with no roll bonus.')+' Cultivation progress with this element: ×'+rate+'.')+'</p><small>Resonance: '+esc(r.resonance)+' · Suppressed by: '+esc(r.weakness)+'</small>'+polarityEffect(x)+'</li>';}).join('')+'</ul><p>Apply at most one root bonus (+1) per roll. Purities are independent and do not need to total 100%. For a method requiring multiple roots, use their lowest efficiency multiplier.</p><p>When a supplied resonant element supports your technique, gain +1; when an opposing element actively suppresses it, take −1. Use at most one interaction adjustment per roll; if both apply, they cancel. An overwhelming realm difference takes precedence.</p>';
}
function physiqueDetails(){
  const p=R.cultivation.effects(character).physique;
  return p?'<div class="starting-kit"><h3>'+esc(character.fields.physique)+'</h3><p>+'+p.vitality+' Vitality · +'+p.qi+' Qi</p><p><strong>+1</strong> when '+esc(p.condition)+'.</p><p>'+esc(p.drawback)+'</p><small>A physique changes how your body handles qi; it does not grant a new elemental root.</small></div>':'<p>Choose a physique to see its benefits and limitations.</p>';
}
function cultivationSummary(){return realmDetails()+rootEffects()+physiqueDetails()+'<p>Root, polarity, resonance, physique and training effects are situational. Their combined positive adjustment is limited to +2 per roll; apply drawbacks afterward. They do not change permanent attributes.</p>';}
function cultivationPage(){
  const r=R.cultivation.effects(character).realm;
  return '<p>Shape your foundation, elemental affinities and constitution. All paths share this realm ladder.</p><h3>Realm & stage</h3><div class="grid">'+knownSelector('realm',Object.keys(R.cultivation.realms),'Choose a realm')+'<div id="stage-selector">'+(r?.stages.length?knownSelector('stage',r.stages,'Choose a stage'):r?'':'Select a realm first.')+'</div></div><div id="realm-details" aria-live="polite">'+realmDetails()+'</div><p>Ascension follows Heavenly Gate; it is a transition into Earth Immortal. Divine authority is separate from cultivation rank.</p><h3>Spiritual roots</h3><p>Choose up to five elemental roots. Yin and Yang attach to a root and shape its expression; they do not occupy root slots. New selections begin at 50% purity; adjust each to suit your character.</p><p id="root-limit" role="status"></p><div id="root-cards" class="root-grid">'+rootCards()+'</div><div id="root-effects" aria-live="polite">'+rootEffects()+'</div><details><summary>Additional root notes</summary>'+field('rootsDetail','Describe unusual combinations or proportions.',true)+(character.fields.root?field('root','Your recorded root description.'):'')+(character.fields.purity?field('purity','Your recorded purity description.'):'')+'<p id="root-note">'+esc(character.roots===null?(R.rootNotes[character.fields.root]||''):'')+'</p></details><h3>Body physique</h3>'+knownSelector('physique',Object.keys(R.cultivation.physiques),'Choose a physique')+'<div id="physique-details" aria-live="polite">'+physiqueDetails()+'</div><p>On a roll, combine applicable root, polarity, resonance, physique and training bonuses up to +2 total, then apply any drawbacks.</p>';
}

function disciplineDetails(){
 const d=R.training.effects(character).discipline;
 return d?'<div class="starting-kit"><p>'+esc(d.description)+'</p><small>Your discipline defines your training focus. It does not change your cultivation path or realm.</small></div>':'';
}
function trainingChoice(key,table,prompt,other){
 let choices=Object.keys(table).filter(name=>!other||name!==character.fields[other]);
 if(key.startsWith('manual')){
   const recommended=R.training.effects(character).discipline?.manual;
   choices=choices.sort((a,b)=>(a===recommended?-1:b===recommended?1:0));
 }
 return selector(key,choices,prompt);
}
function trainingDetails(name,table){
 const item=Object.hasOwn(table,name)?table[name]:null;
 return item?'<div class="starting-kit"><h4>'+esc(name)+'</h4><p>'+esc(item.description)+'</p><p><strong>+1</strong> when '+esc(item.condition)+'.</p></div>':'';
}
function manualChoices(){return '<div class="grid">'+trainingChoice('manualPrimary',R.training.manuals,'Choose a primary manual','manualSecondary')+trainingChoice('manualSecondary',R.training.manuals,'Optional supporting manual','manualPrimary')+'</div><div id="manual-details">'+manualDetails()+'</div>';}
function manualDetails(){return ['manualPrimary','manualSecondary'].map(k=>trainingDetails(character.fields[k],R.training.manuals)).join('');}
function tradeChoices(){return '<div class="grid">'+trainingChoice('tradePrimary',R.training.trades,'Choose a trade','tradeSecondary')+trainingChoice('tradeSecondary',R.training.trades,'Optional second trade','tradePrimary')+'</div><div id="trade-details">'+tradeDetails()+'</div>';}
function tradeDetails(){return ['tradePrimary','tradeSecondary'].map(k=>trainingDetails(character.fields[k],R.training.trades)).join('');}
function disciplineEquipment(){
 const weapon=R.training.effects(character).weapon;if(!weapon)return '<p>No weapon is supplied by this discipline.</p>';
 const items=R.startingPackage(character)?.items||[];
 const existing=items.find(i=>weapon==='Sword'?/sword/i.test(i.name):weapon==='Staff'?/staff/i.test(i.name):i.name.toLowerCase()===weapon.toLowerCase());
 return '<ul class="ledger"><li><strong>'+esc(weapon)+'</strong> — '+esc(character.fields.discipline)+(existing?' <small>Uses your origin’s '+esc(existing.name)+'.</small>':' <small>Included in your equipment. A serviceable starting implement; no innate attack bonus or autonomous powers.</small>')+'</li></ul>';
}

function companionSelect(key,label,values,placeholder){return '<label for="beast-'+key+'">'+esc(label)+'</label><select id="beast-'+key+'" data-beast="'+key+'">'+(placeholder?'<option value="">'+esc(placeholder)+'</option>':'')+values.map(v=>'<option value="'+esc(v)+'" '+(character.companion[key]===v?'selected':'')+'>'+esc(v)+'</option>').join('')+'</select>';}
function companionReference(){
 const b=R.training.companion(character);if(!b)return '';
 const signed=v=>v>0?'+'+v:String(v);
 return '<article class="starting-kit"><h3>'+esc(b.name||b.species)+'</h3><img class="companion-portrait" src="vault-devouring-rat.png" alt="Vault-Devouring Rat formed from curling black shadow, with luminous eyes and silver whiskers"><p><strong>'+esc(b.species)+' · '+esc(b.realm)+'</strong><br>'+esc(b.size)+' (tail excluded). Growth follows the beast’s cultivation, never age or its master’s realm.</p><p>A living body of condensed shadow, with a tangible core, teeth and claws. It can be struck, restrained and injured; its smoky silhouette does not grant passage through sealed walls.</p><dl class="sheet-fields">'+Object.entries(b.attributes).map(([k,v])=>'<div><dt>'+k+'</dt><dd>'+signed(v)+'</dd></div>').join('')+'<div><dt>Vitality</dt><dd>'+b.vitality+'</dd></div><div><dt>Qi</dt><dd>'+b.qi+'</dd></div><div><dt>Movement per action</dt><dd>'+b.speed+' m · climb '+Math.floor(b.speed/2)+' m</dd></div></dl><p><strong>Shadowborn:</strong> +1 Flow to hide in dim light or suppress footfalls. Direct observation and bright light prevent this bonus; no automatic invisibility. <strong>Quick paws:</strong> +1 Flow to escape or cross unstable footing. <strong>Treasure scent:</strong> +1 Mind to notice exposed metal or artifact residue within 10 m. Wards may block the scent.</p><p><strong>Shadow bite · 0 Qi:</strong> close reach, roll Flow; 10+ deal 1 Vitality harm, 7–9 deal 1 and face retaliation, 6− miss and face danger. Reinforced armor or superior-realm defenses can prevent harm. <strong>Shadow dash · 1 beast Qi:</strong> one action moves up to twice its speed on an open route; no attack included.</p><p><strong>Devouring cultivation:</strong> consume a safe, unattended metal fragment during one hour of cultivation. It nourishes growth but grants no immediate realm increase, copied artifact powers or bonus Qi recovery. Dangerous artifacts require assessment and learned manual arts.</p><p><strong>Elemental infusion:</strong> '+(b.infusion?esc(b.infusion.name)+(b.infusion.polarity&&b.infusion.polarity!=='None'?' · '+esc(b.infusion.polarity):'')+'. '+esc(b.infusion.effect):'Native Shadow only; no active infusion from the master.')+'</p>'+(b.infusion?.polarity&&b.infusion.polarity!=='None'?'<p>Infused manifestation: '+esc(R.cultivation.polarities[b.infusion.name][b.infusion.polarity==='Yin'?0:1])+' Polarity adds no separate companion bonus.</p>':'')+'<p>Transfer one selected root during an uninterrupted hour of cultivation, spending 1 master Qi. The beast integrates that element into its own cultivation; it remains made of shadow. One infusion at a time, no copied purity, free breakthrough or instant root switching in combat. Infusion bonuses cost no extra Qi and share the +2 situational cap.</p><p><strong>Companion turns:</strong> one action per round; directing a complex attack or technique uses the master’s action, while simple movement or hiding does not. Use one roll for a joint attempt. Personal traits and infusion bonuses belong to the beast, not the master. Silent Vault-Rat Scripture arts retain their listed rolls and use the master’s Qi; never charge both pools. At 0 Vitality the beast is incapacitated and needs rescue; its shadow body does not grant automatic revival. Its Qi follows the same cultivation-rest rules as the master.</p></article>';
}
function companionEditor(){
 if(character.fields.discipline!=='Beast Tamer')return '';
 const b=character.companion,roots=(character.roots||[]).map(r=>r.name);
 return '<h3>Bonded spirit beast</h3>'+companionSelect('category','Beast category',Object.keys(R.training.beastGroups),'Choose a category')+(b.category?companionSelect('species','Spirit beast',R.training.beastGroups[b.category]||[],'Choose a beast'):'')+(b.species?'<label for="beast-name">Companion name (optional)</label><input id="beast-name" data-beast="name" maxlength="200" value="'+esc(b.name)+'">'+companionSelect('realm','Beast cultivation realm',Object.keys(R.cultivation.realms))+companionSelect('infusion','Root infused by the master',roots,'Native Shadow only')+(!roots.length?'<p>Select the master’s roots on Cultivation to offer elemental infusions.</p>':'')+(b.infusion&&!roots.includes(b.infusion)?'<p>The saved '+esc(b.infusion)+' infusion is inactive because the master no longer has that root.</p>':'')+companionReference():'');
}
function trainingSummary(){
 const t=R.training.effects(character);
 return '<h3>Disciplines & training</h3>'+disciplineDetails()+t.manuals.map(x=>trainingDetails(x.name,R.training.manuals)).join('')+t.trades.map(x=>trainingDetails(x.name,R.training.trades)).join('')+(t.talent?trainingDetails(t.talent.name,R.training.talents):'')+'<p>Use at most one +1 training bonus from manuals, trades or talents on a roll. Combined positive training, root, polarity, resonance and physique adjustments are capped at +2; apply drawbacks afterward.</p><h3>Discipline equipment</h3>'+disciplineEquipment();
}
function trainingPage(){
 return '<h3>1 · Discipline</h3><p>Choose your primary approach to cultivation. A profession can be studied alongside any combat discipline.</p>'+knownSelector('discipline',Object.keys(R.training.disciplines),'Choose a discipline')+'<div id="discipline-details">'+disciplineDetails()+'</div><div id="companion-editor">'+companionEditor()+'</div><h3>2 · Cultivation manuals</h3><p>Choose up to two manuals. The recommended manual for your discipline appears first; you may study other approaches. Each describes a body of training rather than a single attack.</p><div id="manual-choices">'+manualChoices()+'</div><p>These are introductory teachings. Practice and your realm determine what you can perform. Elemental methods need the named root or a suitable external source; weapons, ingredients, tools and bonded creatures must be available.</p>'+field('techniques','Add personal manuals, teachers or techniques you have developed.',true)+'<h3>3 · Trades & talents</h3><p>Choose up to two apprentice trades and one natural talent. Training provides expertise; crafting still requires time, tools and materials.</p><div id="trade-choices">'+tradeChoices()+'</div>'+trainingChoice('talent',R.training.talents,'Optional natural talent')+'<div id="talent-details">'+trainingDetails(character.fields.talent,R.training.talents)+'</div>'+field('trade','Record other experience or specializations.',true)+'<p>Use only one +1 bonus from manuals, trades or talents per roll. Together with root, polarity, resonance and physique benefits, positive situational adjustments are capped at +2 before drawbacks.</p><h3>4 · Weapons & equipment</h3><div id="discipline-equipment" aria-live="polite">'+disciplineEquipment()+'</div>'+field('equipment','Record additional weapons, equipment and personal belongings. Discipline equipment and origin supplies are included separately below and on your sheet.',true)+packageSummary();
}


function qiRestReference(){
 const qi=R.compile(character).qi;
 return '<div class="starting-kit"><h3>Qi & cultivation rests</h3><p><strong>Maximum Qi: '+(qi===null?'Complete your realm and attributes':qi)+'</strong>. Pay the listed cost from your remaining Qi whenever you use an art. 0-Qi arts are repeatable; paid arts require enough Qi. Companion arts use the tamer’s reserve.</p><p><strong>Brief cultivation:</strong> '+esc(R.techniques.rest.brief)+(qi!==null?' Recover '+Math.ceil(Math.max(0,qi)/2)+' Qi.':'')+'</p><p><strong>Full cultivation:</strong> '+esc(R.techniques.rest.full)+'</p><small>'+esc(R.techniques.rest.limits)+'</small></div>';
}
function techniqueCard(a,editable=false){
 const A=R.techniques,unlocked=A.available(character).some(x=>x.id===a.id),checked=character.learnedTechniques.includes(a.id),mastered=character.masteredTechniques.includes(a.id);
 const prerequisites=a.requires.map(id=>A.arts.find(x=>x.id===id).name).join(', ');
 return '<article class="technique-card"><h4>'+(editable?'<label><input type="checkbox" data-art="'+a.id+'" '+(checked?'checked ':'')+(!unlocked&&!checked?'disabled ':'')+'>'+esc(a.name)+'</label>':esc(a.name))+'</h4><small>'+esc(a.manual)+' · Chapter '+a.chapter+'</small><p><strong>'+a.qi+' Qi'+(a.qi===0?' · repeatable':'')+(a.id==='quiet-devouring'?' additional':'')+'</strong> · '+esc(a.timing)+'</p><p>'+esc(a.effect)+'</p><small><strong>Limits:</strong> '+esc(a.limit)+'</small><small><strong>Resolution:</strong> '+esc(a.roll)+'</small>'+(a.yin?'<p><strong>Yin · +1 Qi ('+(a.qi+1)+' total):</strong> '+esc(a.yin)+'</p>':'')+(prerequisites?'<p><strong>Master first:</strong> '+esc(prerequisites)+'.</p>':'')+(a.id==='yang-ignition'?'<p><strong>Root required:</strong> Poison · 100% purity · Yang polarity.</p>':'')+(editable?'<label><input type="checkbox" data-mastery="'+a.id+'" '+(mastered?'checked ':'')+(!checked||!unlocked?'disabled ':'')+'> Mastered</label>':mastered?'<p>Mastered</p>':'')+(!unlocked&&editable?'<small>Inactive: reach Chapter '+a.chapter+' and satisfy all mastery and root prerequisites. Saved selections remain, but inactive arts do not appear on your sheet.</small>':'')+'</article>';
}
function techniquesPage(){
 const A=R.techniques,manuals=A.manuals.filter(m=>A.hasManual(character,m.name));
 let body='<p>Select learned arts, then mark mastery earned through training and play. Learning alone does not grant mastery. Advanced arts require all listed leading arts to be mastered. Changing chapters or mastery can make later arts inactive without erasing saved choices.</p>'+qiRestReference();
 if(!manuals.length)return body+'<p>Select one of the expanded manuals on Disciplines & Gear: Silent Vault-Rat Scripture, Shadow-Splitting Thunder Chain Art, Ten Thousand Venoms Cauldron-Puppet Scripture, or Ninefold Crushing Force Manual.</p>';
 body+='<p id="technique-count" role="status">'+A.selected(character).length+' learned arts on your sheet.</p>';
 for(const m of manuals){body+='<h3>'+esc(m.name)+'</h3><p>'+esc(m.description)+'</p><label for="study-'+m.key+'">Chapter reached through study</label><select id="study-'+m.key+'" data-study="'+m.key+'">'+m.chapters.map((name,i)=>'<option value="'+(i+1)+'" '+(character.manualStudy[m.key]===i+1?'selected':'')+'>Chapter '+(i+1)+' · '+esc(name)+'</option>').join('')+'</select>';
 body+=m.chapters.map((chapter,i)=>'<h3>Chapter '+(i+1)+' · '+esc(chapter)+'</h3><div class="technique-grid">'+A.arts.filter(a=>a.manual===m.name&&a.chapter===i+1).map(a=>techniqueCard(a,true)).join('')+'</div>').join('');}
 return body+'<p>Pay Qi when used, even on a failed roll. An action takes your main turn; a reaction is an immediate response, at most once per round. A scene is one continuous encounter. All positive situational bonuses share the +2 limit. Selecting or mastering an art does not spend Qi. Mastery is recorded after training agreed with your GM.</p>';
}
function techniqueSheet(){
 const A=R.techniques,arts=A.selected(character);
 return '<h3>Learned techniques</h3>'+(arts.length?A.manuals.filter(m=>arts.some(a=>a.manual===m.name)).map(m=>'<h3>'+esc(m.name)+'</h3><p>Chapter '+character.manualStudy[m.key]+' · '+esc(m.description)+'</p>'+arts.filter(a=>a.manual===m.name).map(a=>techniqueCard(a)).join('')).join(''):'<p>No active learned techniques selected.</p>')+'<p>Pay Qi on use, including failed rolls. All positive situational bonuses share the +2 limit. At most one reaction per round.</p>'+qiRestReference();
}

  function review() {
  const c=R.compile(character);
  return `<div class="sheet-heading"><h2 tabindex="-1">〔${esc(character.fields.name)||'Unnamed character'}〕</h2><button id="print">Print sheet</button></div>
  <dl class="sheet-fields">${R.fields.filter(k=>!['name','manualPrimary','manualSecondary','tradePrimary','tradeSecondary','talent'].includes(k) && (!['heritage','heritageCategory'].includes(k) || R.hasHeritage(character))).map(k=>`<div><dt>${labels[k]}</dt><dd>${esc(character.fields[k])||'Not set'}</dd></div>`).join('')}</dl>
  ${trainingSummary()}${companionReference()}${techniqueSheet()}<h3>Cultivation reference</h3>${cultivationSummary()}<h3>Identity context</h3><p>${esc(R.pathContext(character.fields.path))}</p>${packageSummary(true)}${statTable(c)}<h3>Modifiers and conditions</h3>${heritageEffect()}${modifierList()}${c.fire?'<p><strong>+1 — Fire Root</strong>: only when aggressively manipulating fire qi. Does not increase a core attribute.</p>':''}${character.roots===null && R.rootNotes[character.fields.root]?`<p>${esc(R.rootNotes[character.fields.root])}</p>`:''}
  <h3>Vitality and Qi</h3>${resourceSummary(c)}<h3>Quick reference</h3><p>Roll 2d6 + attribute. 10+: success; 7–9: success with a consequence; 6 or less: failure and a GM move. Difficulty adjustments: trivial +1, equal cultivation 0, dangerous −1, superior −2, overwhelming −3. Apply to the roll only.</p><p>Bonds range from −2 to +3. At +2 or higher, gain +1 once per session when directly protecting or supporting that NPC. Reputation ranges from −3 (hated) to +3 (revered). Neither is a permanent attribute increase.</p>`;
}
function render(focus=false) {
  const n=character.step;
  $('steps').innerHTML=titles.map((t,i)=>`<button data-step="${i}" ${i===n?'aria-current="step"':''}><span>${i+1}</span> ${t}</button>`).join('');
  let body='';
  if(n===0) body='<p>Choose your path and origin. Blank fields can be completed later.</p>'+field('name')+pathSelector()+originSelector()+'<div id="heritage-field" '+(R.hasHeritage(character)?'':'hidden')+'><h3>Special Heritage</h3>'+heritageSelector()+'</div>';
  if(n===1) body=cultivationPage();
  if(n===2) body=trainingPage();
  if(n===3) body=techniquesPage();
  if(n===4) body=`<p class="draft">Distribute +2, +1, +1, 0, −1 among your base attributes. Your heritage bonus is added automatically.</p><div class="attribute-inputs">${R.attributes.map((s,i)=>`<div class="field"><label for="a-${s}">${s}</label><input id="a-${s}" type="number" min="-10000" max="10000" step="any" data-stat="${s}" value="${esc(character.attributes[s])}"><small>${R.descriptions[i]}</small></div>`).join('')}</div><h3>Add a modifier you have agreed with your GM</h3><p>Only unconditional entries add to totals. Always name the source; use a condition for situational effects.</p><form id="modifier-form" class="modifier-form"><label>Attribute<select name="stat">${R.attributes.map(s=>`<option>${s}</option>`).join('')}</select></label><label>Amount<input name="amount" type="number" min="-10000" max="10000" step="any" required></label><label>Source<input name="source" placeholder="Rule or item granting this bonus" maxlength="500" required></label><label>Condition (optional)<input name="condition" placeholder="Only when…" maxlength="500"></label><button class="primary">Add modifier</button></form>${modifierList(true)}<div id="live-totals" aria-live="polite">${statTable(R.compile(character))}</div><h3>Vitality and Qi</h3><p>Realm, stage and physique bonuses are included automatically. Use these optional adjustments for other resource effects.</p><div class="grid">${['vitality','qi'].map(k=>`<label>${k==='vitality'?'Additional Vitality adjustment':'Additional Qi adjustment'}<input type="number" min="-10000" max="10000" step="any" data-resource="${k}" value="${esc(character.resourceBonuses[k])}"></label>`).join('')}</div><div id="live-resources">${resourceSummary(R.compile(character))}</div>`;
  if(n===5) body=field('dao','A belief, question or obsession that may become your Dao.',true)+field('flaw','Choose a flaw that can complicate your journey.')+field('bonds','NPC, relationship and bond rating. Range: −2 to +3.',true)+field('reputation','Track standing separately for each faction. Range: −3 to +3.',true)+field('karma','Record debts, enmities and oaths; karma is distinct from morality.',true)+field('notes','Record resources, wounds and advancement.',true);
  $('panel').innerHTML='<section>'+(n===6?review():`<h2 tabindex="-1">〔${titles[n]}〕</h2>${body}`)+'</section>';
  $('back').disabled=n===0; $('next').hidden=n===6; $('progress').textContent=`Step ${n+1} of 7`;
  if(focus) $('panel').querySelector('h2').focus();
}
document.addEventListener('input', e=>{
  const t=e.target;
  if(t.dataset.beast){
    const k=t.dataset.beast,v=t.value,b=character.companion;
    if(k==='name'){b.name=v.slice(0,200);save();return;}
    if(k==='category'&&(v===''||Object.hasOwn(R.training.beastGroups,v))){b.category=v;b.species='';}
    else if(k==='species'&&(v===''||R.training.beastGroups[b.category]?.includes(v)))b.species=v;
    else if(k==='realm'&&Object.hasOwn(R.cultivation.realms,v))b.realm=v;
    else if(k==='infusion'&&(v===''||(character.roots||[]).some(r=>r.name===v)))b.infusion=v;
    else return;
    save();$('companion-editor').innerHTML=companionEditor();return;
  }
  if(t.dataset.study){
    const m=R.techniques.manuals.find(m=>m.key===t.dataset.study),chapter=Number(t.value);if(!m||!Number.isInteger(chapter)||chapter<1||chapter>m.chapters.length)return;
    character.manualStudy[m.key]=chapter;save();render();return;
  }
  if(t.dataset.mastery){
    const id=t.dataset.mastery;if(!character.learnedTechniques.includes(id)||!R.techniques.available(character).some(a=>a.id===id))return;
    character.masteredTechniques=t.checked?[...new Set([...character.masteredTechniques,id])]:character.masteredTechniques.filter(x=>x!==id);save();render();return;
  }
  if(t.dataset.art){
    const id=t.dataset.art;if(t.checked&&!R.techniques.available(character).some(a=>a.id===id))return;
    character.learnedTechniques=t.checked?[...new Set([...character.learnedTechniques,id])]:character.learnedTechniques.filter(x=>x!==id);
    if(!t.checked)character.masteredTechniques=character.masteredTechniques.filter(x=>x!==id);
    save();render();return;
  }
  if(t.dataset.rootToggle){
    const name=t.dataset.rootToggle;if(!Object.hasOwn(R.cultivation.roots,name))return;
    const selected=character.roots||[];
    if(t.checked && selected.length>=5){t.checked=false;$('root-limit').textContent='Choose at most five roots. Remove one before adding another.';return;}
    character.roots=t.checked?[...selected.filter(r=>r.name!==name),{name,purity:50}]:selected.filter(r=>r.name!==name);
    $('root-limit').textContent='';$('root-cards').innerHTML=rootCards();$('root-effects').innerHTML=rootEffects();save();return;
  }
  if(t.dataset.rootPolarity){
    const chosen=character.roots?.find(r=>r.name===t.dataset.rootPolarity);if(!chosen||!['None','Yin','Yang'].includes(t.value))return;
    chosen.polarity=t.value;$('root-effects').innerHTML=rootEffects();save();return;
  }
  if(t.dataset.rootPurity){
    if(!t.validity.valid)return;const chosen=character.roots?.find(r=>r.name===t.dataset.rootPurity);if(!chosen)return;
    chosen.purity=t.value===''?'':t.valueAsNumber;$('root-effects').innerHTML=rootEffects();save();return;
  }
  if(t.dataset.field){character.fields[t.dataset.field]=t.value;
    if(t.dataset.field==='discipline'){
      $('companion-editor').innerHTML=companionEditor();$('discipline-details').innerHTML=disciplineDetails();$('discipline-equipment').innerHTML=disciplineEquipment();$('manual-choices').innerHTML=manualChoices();
    }
    if(['manualPrimary','manualSecondary'].includes(t.dataset.field))$('manual-choices').innerHTML=manualChoices();
    if(['tradePrimary','tradeSecondary'].includes(t.dataset.field))$('trade-choices').innerHTML=tradeChoices();
    if(t.dataset.field==='talent')$('talent-details').innerHTML=trainingDetails(t.value,R.training.talents);
    if(t.dataset.field==='realm'){
      character.fields.stage='';const realm=R.cultivation.effects(character).realm;
      $('stage-selector').innerHTML=realm?.stages.length?selector('stage',realm.stages,'Choose a stage'):'';
      $('realm-details').innerHTML=realmDetails();
    }
    if(t.dataset.field==='stage')$('realm-details').innerHTML=realmDetails();
    if(t.dataset.field==='physique')$('physique-details').innerHTML=physiqueDetails(); if(t.dataset.field==='origin'){R.setOrigin(character,t.value); $('starting-package').innerHTML=packageSummary();} if(t.dataset.field==='heritageCategory'){R.setHeritageCategory(character,t.value); $('heritage-choice').innerHTML=refinedHeritage();} if(t.dataset.field==='path'){ $('heritage-field').hidden=!R.hasHeritage(character); $('heritage-choice').innerHTML=refinedHeritage(); $('path-context').textContent=R.pathContext(t.value); } if(t.dataset.field==='root') $('root-note').textContent=R.rootNotes[t.value]||'Describe your root’s nature and affinities below.';}
  else if(t.dataset.stat || t.dataset.resource){
    if(!t.validity.valid || (t.value!=='' && !Number.isFinite(t.valueAsNumber))) return;
    const map=t.dataset.stat?character.attributes:character.resourceBonuses;
    map[t.dataset.stat||t.dataset.resource]=t.value===''?'':t.valueAsNumber;
    $('live-totals').innerHTML=statTable(R.compile(character)); $('live-resources').innerHTML=resourceSummary(R.compile(character));
  } else return;
  save();
});
document.addEventListener('click',e=>{
  const b=e.target.closest('button'); if(!b) return;
  if(b.dataset.step!==undefined){character.step=Number(b.dataset.step);save();render(true);}
  if(b.dataset.remove!==undefined){character.modifiers.splice(Number(b.dataset.remove),1);save();render();}
  if(b.id==='print')window.print();
});
document.addEventListener('submit',e=>{
  if(e.target.id!=='modifier-form')return; e.preventDefault();
  const f=new FormData(e.target), source=String(f.get('source')).trim();
  if(!source || character.modifiers.length>=100){$('notice').textContent='Enter a source. A character can hold up to 100 manual modifiers.';return;}
  character.modifiers.push({stat:f.get('stat'),amount:Number(f.get('amount')),source,condition:String(f.get('condition')).trim()});save();render();
});
$('back').onclick=()=>{character.step=Math.max(0,character.step-1);save();render(true);};
$('next').onclick=()=>{character.step=Math.min(6,character.step+1);save();render(true);};
$('export').onclick=()=>{const blob=new Blob([JSON.stringify(character,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='xianxia-character.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
$('import').onchange=async e=>{
  const file=e.target.files[0];if(!file)return;
  try {if(file.size>1000000)throw Error('This save is too large (maximum 1 MB).');const incoming=R.validate(JSON.parse(await file.text()));if(!window.confirm('Open this save and replace the character currently in this browser? Download your current save first if you want to keep it.'))return;character=incoming;storageBlocked=false;save();render();$('notice').textContent='Character save opened.';}catch(err){$('notice').textContent=err instanceof SyntaxError?'This file is not valid JSON. Your current character has been kept.':err.message;}finally{e.target.value='';}
};
render();
if(storageBlocked)$('save-status').textContent='Automatic saving unavailable — download a save.';
