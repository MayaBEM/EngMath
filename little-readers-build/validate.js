const fs=require('fs');
const content=fs.readFileSync('src/content.js','utf8');
const illus=fs.readFileSync('src/illustrations.js','utf8');
// expose globals
const ctx={window:{},document:{}};
const code = content + "\n" + illus + "\n module.exports={STORIES,BADGES,SKILLS,SKILL_GROUP,ICON_PATHS,BADGE_PATHS,HERO,heroScene,icon};";
const m={exports:{}};
new Function('module','exports','window',code)(m,m.exports,{});
const {STORIES,BADGES,SKILLS,SKILL_GROUP,ICON_PATHS,BADGE_PATHS,HERO}=m.exports;
let errors=[], qcount=0, typeCount={};
if(STORIES.length!==12) errors.push("Expected 12 stories, got "+STORIES.length);
const iconNames=new Set(Object.keys(ICON_PATHS));
STORIES.forEach(s=>{
  if(!HERO[s.hero]) errors.push(s.id+": missing hero scene "+s.hero);
  s.vocab.forEach(v=>{ if(!iconNames.has(v.icon)) errors.push(s.id+" vocab '"+v.word+"' bad icon "+v.icon); });
  const n=s.sentences.length;
  // level sentence counts
  if(s.level===1 && (n<5||n>6)) errors.push(s.id+" L1 sentence count "+n);
  if(s.level===2 && (n<7||n>9)) errors.push(s.id+" L2 sentence count "+n);
  if(s.level===3 && (n<9||n>12)) errors.push(s.id+" L3 sentence count "+n);
  if(s.questions.length!==6) errors.push(s.id+" has "+s.questions.length+" questions");
  s.questions.forEach((q,qi)=>{
    qcount++; typeCount[q.type]=(typeCount[q.type]||0)+1;
    if(!q.skill) errors.push(s.id+"#"+qi+" no skill");
    if(!q.explain) errors.push(s.id+"#"+qi+" no explanation");
    if(!SKILL_GROUP[q.skill]) errors.push(s.id+"#"+qi+" skill '"+q.skill+"' not grouped");
    if(["mc","picture","listen"].includes(q.type)){
      if(typeof q.answer!=="number"||q.answer<0||q.answer>=q.options.length) errors.push(s.id+"#"+qi+" bad answer index");
      if(q.options.length<3) errors.push(s.id+"#"+qi+" <3 options");
    }
    if(q.type==="picture") q.options.forEach(o=>{ if(!iconNames.has(o.icon)) errors.push(s.id+"#"+qi+" bad option icon "+o.icon); });
    if(q.type==="tf" && typeof q.answer!=="boolean") errors.push(s.id+"#"+qi+" tf answer not boolean");
    if(q.type==="evidence" && (q.answer<0||q.answer>=n)) errors.push(s.id+"#"+qi+" evidence index out of range");
    if(q.type==="match") q.pairs.forEach(p=>{ if(!iconNames.has(p.icon)) errors.push(s.id+"#"+qi+" match icon "+p.icon); });
    if(q.type==="sequence" && q.items.length<3) errors.push(s.id+"#"+qi+" seq <3");
    if(q.type==="sort"){ q.items.forEach(it=>{ if(!q.categories.includes(it.cat)) errors.push(s.id+"#"+qi+" sort cat bad"); }); }
    if(q.evidence!=null && (q.evidence<0||q.evidence>=n)) errors.push(s.id+"#"+qi+" evidence hint out of range");
  });
});
console.log("Stories:",STORIES.length,"Questions:",qcount);
console.log("Question types:",JSON.stringify(typeCount));
console.log("Badges:",BADGES.length,"Skill groups:",SKILLS.join(", "));
if(errors.length){ console.log("\nERRORS ("+errors.length+"):"); errors.forEach(e=>console.log("  - "+e)); process.exit(1); }
else console.log("\nALL CONTENT VALID ✓");
