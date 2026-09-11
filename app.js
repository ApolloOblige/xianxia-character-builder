'use strict';
const R = BuilderRules, KEY = 'xianxia-character-builder.v1';
const $ = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const signed = n => n === null || n === '' ? 'Not set' : (n >= 0 ? '+' : '') + n;
let character = R.empty(), storageBlocked = false;
try { const raw = localStorage.getItem(KEY); if (raw) character = R.validate(JSON.parse(raw)); }
catch { storageBlocked = true; $('notice').textContent = 'Your previous save could not be read. It has not been overwritten. Download your work before closing this page.'; }
const titles = ['Identity','Cultivation','Disciplines & gear','Attributes','Story & bonds','Review'];
const labels = {name:'Character name',path:'Cultivation path',origin:'Origin',heritageCategory:'Heritage archetype',heritage:'Special Heritage',realm:'Cultivation realm',stage:'Stage',root:'Spiritual root',rootsDetail:'Your spiritual roots and proportions',purity:'Root purity',physique:'Physique',discipline:'Discipline',techniques:'Techniques',equipment:'Weapons and equipment',trade:'Trades and talents',dao:'Dao seed / conviction',flaw:'Flaw',bonds:'Bonds',reputation:'Reputation / face',karma:'Karmic debts, enmities and oaths',notes:'Other notes'};
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
function resourceSummary(c) { return `<p><strong>Vitality:</strong> ${c.vitality===null?'Enter Body and a realm bonus':c.vitality} <small>6 + total Body + entered realm bonus (${esc(character.resourceBonuses.vitality)||'not set'}).</small></p><p><strong>Qi:</strong> ${c.qi===null?'Enter Flow and a cultivation bonus':c.qi} <small>3 + total Flow + entered cultivation bonus (${esc(character.resourceBonuses.qi)||'not set'}).</small></p>`; }
function review() {
  const c=R.compile(character);
  return `<div class="sheet-heading"><h2 tabindex="-1">〔${esc(character.fields.name)||'Unnamed character'}〕</h2><button id="print">Print sheet</button></div>
  <dl class="sheet-fields">${R.fields.filter(k=>k!=='name' && (!['heritage','heritageCategory'].includes(k) || R.hasHeritage(character))).map(k=>`<div><dt>${labels[k]}</dt><dd>${esc(character.fields[k])||'Not set'}</dd></div>`).join('')}</dl>
  <h3>Identity context</h3><p>${esc(R.pathContext(character.fields.path))}</p>${packageSummary(true)}${statTable(c)}<h3>Modifiers and conditions</h3>${heritageEffect()}${modifierList()}${c.fire?'<p><strong>+1 — Fire Root</strong>: only when aggressively manipulating fire qi. Does not increase a core attribute.</p>':''}${R.rootNotes[character.fields.root]?`<p>${esc(R.rootNotes[character.fields.root])}</p>`:''}
  <h3>Vitality and Qi</h3>${resourceSummary(c)}<h3>Quick reference</h3><p>Roll 2d6 + attribute. 10+: success; 7–9: success with a consequence; 6 or less: failure and a GM move. Difficulty adjustments: trivial +1, equal cultivation 0, dangerous −1, superior −2, overwhelming −3. Apply to the roll only.</p><p>Bonds range from −2 to +3. At +2 or higher, gain +1 once per session when directly protecting or supporting that NPC. Reputation ranges from −3 (hated) to +3 (revered). Neither is a permanent attribute increase.</p>`;
}
function render(focus=false) {
  const n=character.step;
  $('steps').innerHTML=titles.map((t,i)=>`<button data-step="${i}" ${i===n?'aria-current="step"':''}><span>${i+1}</span> ${t}</button>`).join('');
  let body='';
  if(n===0) body='<p>Choose your path and origin. Blank fields can be completed later.</p>'+field('name')+pathSelector()+originSelector()+'<div id="heritage-field" '+(R.hasHeritage(character)?'':'hidden')+'><h3>Special Heritage</h3>'+heritageSelector()+'</div>';
  if(n===1) body='<p>Record your cultivation realm, spiritual roots and physique.</p>'+field('realm')+field('stage')+field('root','Choose your spiritual root or enter its name.')+`<p id="root-note">${esc(R.rootNotes[character.fields.root]||'Describe your root’s nature and affinities below.')}</p>`+field('rootsDetail','Record your elements and their proportions.',true)+field('purity','Record your spiritual root purity.')+field('physique','Name your physique and describe its qualities.');
  if(n===2) body='<p>Record your techniques and additional belongings. Your origin package is listed separately below.</p>'+field('discipline','Choose your cultivation discipline.')+field('trade','Write any trades or talents.')+field('techniques','Include type, rank, Qi cost, roll and outcomes when known.',true)+field('equipment','Additional belongings and changes only; do not copy the origin package here.',true)+packageSummary();
  if(n===3) body=`<p class="draft">Distribute +2, +1, +1, 0, −1 among your base attributes. Your heritage bonus is added automatically.</p><div class="attribute-inputs">${R.attributes.map((s,i)=>`<div class="field"><label for="a-${s}">${s}</label><input id="a-${s}" type="number" min="-10000" max="10000" step="any" data-stat="${s}" value="${esc(character.attributes[s])}"><small>${R.descriptions[i]}</small></div>`).join('')}</div><h3>Add a modifier you have agreed with your GM</h3><p>Only unconditional entries add to totals. Always name the source; use a condition for situational effects.</p><form id="modifier-form" class="modifier-form"><label>Attribute<select name="stat">${R.attributes.map(s=>`<option>${s}</option>`).join('')}</select></label><label>Amount<input name="amount" type="number" min="-10000" max="10000" step="any" required></label><label>Source<input name="source" placeholder="Rule or item granting this bonus" maxlength="500" required></label><label>Condition (optional)<input name="condition" placeholder="Only when…" maxlength="500"></label><button class="primary">Add modifier</button></form>${modifierList(true)}<div id="live-totals" aria-live="polite">${statTable(R.compile(character))}</div><h3>Vitality and Qi</h3><p>Leave bonuses blank if unknown. Enter 0 only if you have agreed that no bonus applies.</p><div class="grid">${['vitality','qi'].map(k=>`<label>${k==='vitality'?'Vitality realm bonus':'Qi cultivation bonus'}<input type="number" min="-10000" max="10000" step="any" data-resource="${k}" value="${esc(character.resourceBonuses[k])}"></label>`).join('')}</div><div id="live-resources">${resourceSummary(R.compile(character))}</div>`;
  if(n===4) body=field('dao','A belief, question or obsession that may become your Dao.',true)+field('flaw','Choose a flaw that can complicate your journey.')+field('bonds','NPC, relationship and bond rating. Range: −2 to +3.',true)+field('reputation','Track standing separately for each faction. Range: −3 to +3.',true)+field('karma','Record debts, enmities and oaths; karma is distinct from morality.',true)+field('notes','Record resources, wounds and advancement.',true);
  $('panel').innerHTML='<section>'+(n===5?review():`<h2 tabindex="-1">〔${titles[n]}〕</h2>${body}`)+'</section>';
  $('back').disabled=n===0; $('next').hidden=n===5; $('progress').textContent=`Step ${n+1} of 6`;
  if(focus) $('panel').querySelector('h2').focus();
}
document.addEventListener('input', e=>{
  const t=e.target;
  if(t.dataset.field){character.fields[t.dataset.field]=t.value; if(t.dataset.field==='origin'){R.setOrigin(character,t.value); $('starting-package').innerHTML=packageSummary();} if(t.dataset.field==='heritageCategory'){R.setHeritageCategory(character,t.value); $('heritage-choice').innerHTML=refinedHeritage();} if(t.dataset.field==='path'){ $('heritage-field').hidden=!R.hasHeritage(character); $('heritage-choice').innerHTML=refinedHeritage(); $('path-context').textContent=R.pathContext(t.value); } if(t.dataset.field==='root') $('root-note').textContent=R.rootNotes[t.value]||'Describe your root’s nature and affinities below.';}
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
$('next').onclick=()=>{character.step=Math.min(5,character.step+1);save();render(true);};
$('export').onclick=()=>{const blob=new Blob([JSON.stringify(character,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='xianxia-character.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
$('import').onchange=async e=>{
  const file=e.target.files[0];if(!file)return;
  try {if(file.size>1000000)throw Error('This save is too large (maximum 1 MB).');const incoming=R.validate(JSON.parse(await file.text()));if(!window.confirm('Open this save and replace the character currently in this browser? Download your current save first if you want to keep it.'))return;character=incoming;storageBlocked=false;save();render();$('notice').textContent='Character save opened.';}catch(err){$('notice').textContent=err instanceof SyntaxError?'This file is not valid JSON. Your current character has been kept.':err.message;}finally{e.target.value='';}
};
render();
if(storageBlocked)$('save-status').textContent='Automatic saving unavailable — download a save.';
