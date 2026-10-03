import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import ts from 'typescript'
const source=await readFile(new URL('../src/components/companionDirector.ts',import.meta.url),'utf8')
const js=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText
const {CompanionDirector}=await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`)
const d=new CompanionDirector(()=>0)
assert.equal(d.advance(4999),'idle')
assert.equal(d.advance(1),'67','Six-seven appears five seconds after opening')
d.setSection('skills')
d.trigger('thinking')
assert.equal(d.advance(5999),'67','Section and hover reactions cannot interrupt six-seven')
assert.equal(d.advance(1),'gear5','Return to current section after full six-second animation')
assert.equal(d.advance(18000),'67','Six-seven repeats even while staying in Skills')
assert.equal(d.advance(6000),'gear5')
const scroll=new CompanionDirector(()=>0)
for(let i=0;i<5;i++){scroll.setSection(i%2?'projects':'about');scroll.trigger('thinking');scroll.advance(1000)}
assert.equal(scroll.mode,'67','Rapid navigation and other reactions never reset the timer')
const modes=new Set()
const rotation=new CompanionDirector(()=>0)
for(let i=0;i<1800;i++)modes.add(rotation.advance(100))
assert.ok(modes.has('67')&&modes.has('dance')&&modes.has('thinking')&&modes.has('idle'))
const dialogue=new CompanionDirector(()=>0)
dialogue.trigger('sleepy');const line=dialogue.message;dialogue.trigger('sleepy');assert.notEqual(dialogue.message,line)
console.log('Passed: first appearance, repeated six-seven, scroll/hover interruption protection, Skills return, other emotes and dialogue.')
