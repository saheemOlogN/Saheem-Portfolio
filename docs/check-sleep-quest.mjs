import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import ts from 'typescript'
const source=await readFile(new URL('../src/components/sleepQuestEngine.ts',import.meta.url),'utf8')
const js=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText
const {createGame,step,maze,walkable,start,key,directions}=await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`)
assert.ok(maze.every(row=>row.length===17))
const queue=[start],seen=new Set([key(start)])
for(let i=0;i<queue.length;i++)for(const d of Object.values(directions)){const p={x:queue[i].x+d.x,y:queue[i].y+d.y};if(walkable(p)&&!seen.has(key(p))){seen.add(key(p));queue.push(p)}}
for(const pellet of createGame().pellets)assert.ok(seen.has(pellet),`Unreachable pellet ${pellet}`)
let g={...createGame(),status:'playing',grace:999}
g=step({...g,queued:'up'})
assert.deepEqual(g.player,start,'Walls block movement')
g=step({...g,queued:'left'})
assert.deepEqual(g.player,{x:7,y:5})
assert.equal(g.score,10)
assert.ok(!g.pellets.has('7,5'))
const paused={...g,status:'paused'};assert.equal(step(paused),paused)
const power=step({...createGame(),status:'playing',player:{x:2,y:1},queued:'left',grace:0})
assert.equal(power.power,40);assert.equal(power.lives,3);assert.ok(power.score>=50)
const hit=step({...createGame(),status:'playing',player:{x:2,y:1},queued:'right',enemies:[{x:3,y:1},{x:15,y:9}],grace:0})
assert.equal(hit.lives,2);assert.deepEqual(hit.player,start);assert.ok(hit.grace>0)
const lost=step({...createGame(),status:'playing',lives:1,player:{x:2,y:1},queued:'right',enemies:[{x:3,y:1},{x:15,y:9}],grace:0})
assert.equal(lost.status,'lost')
const won=step({...createGame(),status:'playing',pellets:new Set(['7,5']),queued:'left'})
assert.equal(won.status,'won')
let roam={...createGame(),status:'playing',grace:10000}
for(let i=0;i<200;i++){roam=step(roam,()=>.5);assert.ok(roam.enemies.every(walkable))}
assert.equal(createGame().score,0);assert.equal(createGame().lives,3)
console.log(`Passed: ${seen.size} reachable tiles, all collectibles reachable, wall blocking, collection, power, collisions, lives, win/loss, pause, enemy movement and reset.`)
