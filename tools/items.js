// Immagini dei singoli elementi per il sito: una piccola scena del gioco vero per ogni edificio, strada, veicolo, coltura, animale
const { chromium } = require('playwright');
const fs = require('fs');
const OUT = '/home/claude/supplyville-web/img/items/';
fs.mkdirSync(OUT, { recursive: true });
const W = 600, H = 400;
const ONLY = process.argv[2] ? process.argv[2].split(',') : null;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: W, height: H } });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file:///home/claude/city-builder-repo/index.html'); await p.waitForTimeout(700);
  await p.evaluate(() => {
    ACCIDENT.maxChance = 0; WATER.required = false;
    newGame(5, 128); game.started = true; enterGame(); unlockAll(); game.money = 1e9;
    window.oilAt = () => 1; window.groundwaterAt = () => 1;
    drawWorkerIcons = () => {};
    for (const id of ['topbar', 'toolbar', 'help', 'toolname', 'toast', 'submenu', 'rotate-btn', 'panel', 'menu', 'fieldbar', 'subpanel']) { const e = document.getElementById(id); if (e) e.style.display = 'none'; }
    const C = 64, N = game.size;
    const rnd = (x, y, k) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
    window.SC = {
      C,
      reset(trees = true) {
        clearVehicles();
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const t = game.map[y][x];
          Object.assign(t, { type: T.GRASS, elev: 2, path: null, building: null, bridge: null, field: false, farm: null, main: false, rb: null, pipe: false });
          const d = Math.max(Math.abs(x - C), Math.abs(y - C));
          if (trees && d >= 5 && rnd(x, y, 1) < 0.4) t.type = T.FOREST;
        }
        game.pathKeys = new Set(); game.pipes = new Set(); resetBridges(); game.buildings = new Map(); game.fields = 0;
        game.underground = false; game.entries = []; game.fieldMode = null; game.rotation = 0; game.pathDir = 1;
        game.maxElev = 7;
      },
      grass(x0, y0, x1, y1) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const t = game.map[y][x]; t.type = T.GRASS; t.elev = 2; } },
      water(x0, y0, x1, y1) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const t = game.map[y][x]; t.type = T.WATER; t.elev = 0; } },
      road(kind, x0, y0, x1, y1) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { game.map[y][x].type = T.GRASS; useTool(kind, x, y); } },
      place(kind, x, y, needRoad = true) {
        for (let r = 0; r < 4; r++) {
          game.rotation = r;
          const res = useTool(kind, x, y);
          if (!res || !res.ok) continue;
          const bd = game.map[y][x].building, e = entranceOf(bd);
          if (!needRoad || !e || game.map[e.ry][e.rx].path) return bd;
          useTool('demolish', x, y);
        }
        return null;
      },
      house(x, y) {
        for (let d = 0; d < 4; d++) { const D = DIRS[d]; if (game.map[y + D.dy][x + D.dx].path) { game.rotation = (d + 2) % 4; return useTool('house', x, y).ok; } }
        return false;
      },
      vehicle(kind, tiles, at, extra) {
        const pts = kind === 'ship' ? shipPoints(tiles) : routePoints(tiles, false);
        const v = spawnVehicle(Object.assign({ kind, tiles, pts, speed: 1, arrive() {}, cancel() {} }, extra || {}));
        v.seg = Math.max(0, Math.min(pts.length - 2, Math.round(pts.length * at))); v.s = 0;
        return v;
      },
      finish() { recount(); game.elecVer = (game.elecVer || 0) + 1; for (let i = 0; i < 6; i++) { animT += 0.1; economyUpdate(0.1); } },
      look(cx, cy, lift, zi) {
        cam.zi = zi || 3; const z = zoomLevel();
        const wx = (cx - cy) * TW / 2, wy = (cx + cy) * TH / 2 - 2 * STEP - lift;
        cam.x = innerWidth / 2 - wx * z; cam.y = innerHeight / 2 - wy * z;
        game.hover = null; setTool('hand'); requestDraw(); drawFrame();
      },
    };
  });

  const scenes = {};
  const C = 64;
  // strade
  for (const k of ['road', 'oneway', 'highway', 'dirt']) scenes[k] = `SC.reset(); game.rotation = 0; SC.road('${k}', C - 7, C, C + 7, C); SC.road('${k === 'oneway' ? 'road' : k}', C, C - 6, C, C - 1); SC.road('${k === 'oneway' ? 'road' : k}', C, C + 1, C, C + 6);
    for (const [x, y] of [[C - 2, C - 1], [C - 3, C - 1], [C + 2, C + 1], [C + 3, C + 1], [C - 2, C + 1], [C + 2, C - 1]]) SC.house(x, y);
    SC.finish(); SC.look(C + 0.5, C + 0.5, 0, 3);`;
  for (const [k, path] of [['bridge', 'road'], ['hwBridge', 'highway']]) scenes[k] = `SC.reset(); SC.water(C - 8, C - 1, C + 8, C + 1); for (let x = C - 8; x <= C + 8; x++) { game.map[C - 2][x].type = T.SAND; game.map[C + 2][x].type = T.SAND; }
    SC.road('${path}', C, C - 7, C, C - 2); SC.road('${path}', C, C + 2, C, C + 7);
    const pl = planBridge({ x: C, y: C - 2 }, { x: C, y: C + 2 }, '${path}'); const r = buildBridge(pl, { free: true }); if (!r.ok) console.log('bridge', JSON.stringify(r));
    SC.finish(); SC.look(C + 0.5, C + 0.5, 16, 3);`;
  scenes.tunnel = `SC.reset(); for (let y = C - 4; y <= C + 4; y++) for (let x = C - 4; x <= C + 4; x++) { const t = game.map[y][x]; t.elev = 2 + Math.min(4, 1 + Math.min(x - (C - 4), C + 4 - x, y - (C - 4), C + 4 - y) * 2); t.type = t.elev >= 6 ? T.ROCK : T.FOREST; }
    SC.road('road', C, C + 5, C, C + 9); const pl = planTunnel({ x: C, y: C + 5 }, 0); const r = buildBridge(pl, { free: true }); if (!r.ok) console.log('tunnel', JSON.stringify(pl.msg)); SC.road('road', C, C - 9, C, C - 5);
    SC.vehicle('car', [[C, C + 9, 0], [C, C + 8, 0], [C, C + 7, 0], [C, C + 6, 0], [C, C + 5, 0]], 0.5, { color: '#d94141' });
    SC.finish(); SC.look(C + 0.5, C + 4.5, 14, 4);`;
  // edifici: strada davanti (y = C+2), edificio dietro, qualche casa ai lati
  const std = (k, two, extra = '', lift = 30) => `SC.reset(); SC.road('road', C - 7, C + 2, C + 7, C + 2);
    const bd = SC.place('${k}', ${two ? 'C - 1, C' : 'C, C + 1'}); if (!bd) console.log('noplace ${k}');
    ${extra}
    SC.finish(); SC.look(${two ? 'C, C + 1' : 'C + 0.5, C + 1.5'}, ${lift}, ${BIG.includes(k) ? 3 : 4});`;
  const BIG = ['windPlant', 'coalPlant', 'refinery', 'forestry'];
  const two = k => BUILDINGS_W[k] === 2;
  const BUILDINGS_W = await p.evaluate(() => { const o = {}; for (const k in BUILDINGS) o[k] = BUILDINGS[k].w; return o; });
  for (const k of ['factory', 'bakery', 'dairy', 'slaughterhouse', 'sawmill', 'furnitureFactory', 'textileMill', 'clothingFactory', 'charcoalKiln', 'refinery', 'supermarket', 'furnitureStore', 'clothingStore', 'gasStation', 'warehouse', 'goodsWarehouse', 'busDepot', 'waterWell', 'solarPlant', 'coalPlant', 'oilWell'])
    scenes[k] = std(k, two(k), `SC.house(C - 4, C + 3); SC.house(C + 3, C + 3);`, BUILDINGS_H[k] / 2);
  // altezze
  function BUILDINGS_H() {}
  const BH = await p.evaluate(() => { const o = {}; for (const k in BUILDINGS) o[k] = BUILDINGS[k].height; return o; });
  for (const k of Object.keys(scenes)) if (BH[k]) scenes[k] = std(k, two(k), `SC.house(C - 4, C + 3); SC.house(C + 3, C + 3);`, Math.min(40, BH[k] / 2 + 4));
  scenes.windPlant = std('windPlant', true, `SC.place('windPlant', C - 4, C - 1, false);`, 40);
  scenes.forestry = std('forestry', true, `for (let y = C - 5; y <= C - 1; y++) for (let x = C - 5; x <= C + 4; x++) if (!game.map[y][x].building) game.map[y][x].type = T.FOREST;`, 14);
  scenes.house = `SC.reset(); SC.road('road', C - 7, C + 1, C + 7, C + 1); for (const x of [C - 3, C - 2, C - 1, C, C + 1, C + 2, C + 3]) { SC.house(x, C); SC.house(x, C + 2); }
    SC.vehicle('car', [[C - 7, C + 1, 0], [C - 6, C + 1, 0], [C - 5, C + 1, 0], [C - 4, C + 1, 0], [C - 3, C + 1, 0], [C - 2, C + 1, 0], [C - 1, C + 1, 0], [C, C + 1, 0], [C + 1, C + 1, 0]], 0.7, { color: '#d94141' });
    SC.finish(); SC.look(C + 0.5, C + 1.5, 10, 3);`;
  scenes.busStop = `SC.reset(); SC.road('road', C - 7, C + 1, C + 7, C + 1); SC.place('busStop', C, C, false); for (const x of [C - 3, C - 2, C + 2, C + 3]) { SC.house(x, C); SC.house(x, C + 2); }
    const T1 = []; for (let x = C + 7; x >= C - 7; x--) T1.push([x, C + 1, 0]); SC.vehicle('bus', T1, 0.42);
    SC.finish(); SC.look(C + 0.5, C + 1.5, 10, 3);`;
  // fattoria con i campi
  const farm = (crop, look) => `SC.reset(); SC.road('road', C - 7, C + 2, C + 7, C + 2); const f = SC.place('farm', C - 1, C);
    for (let y = C - 4; y <= C + 1; y++) for (let x = C - 7; x <= C - 2; x++) useTool('field', x, y); for (let y = C - 4; y <= C - 1; y++) for (let x = C - 1; x <= C + 2; x++) useTool('field', x, y);
    exitFieldMode(); f.crop = '${crop}'; f.growth = 0.95; SC.finish(); f.growth = 0.95; SC.look(${look}, 3);`;
  scenes.farm = farm('wheat', 'C - 1.5, C - 0.5, 14');
  for (const c of ['wheat', 'carrot', 'potato', 'corn', 'tomato', 'cabbage', 'cotton']) scenes['crop_' + c] = farm(c, 'C - 4, C - 1.5, 4');
  // allevamento
  for (const a of ['cowFarm', 'chickenFarm', 'pigFarm', 'sheepFarm']) scenes['animal_' + a] = std('livestock', true, `bd.animal = '${a}'; bd.level = 2;`, 12);
  scenes.livestock = scenes.animal_cowFarm;
  // costa
  for (const k of ['port', 'waterPlant', 'sewage']) scenes[k] = `SC.reset(false); SC.water(C - 9, C - 9, C + 9, C - 1); SC.road('road', C - 7, C + 2, C + 7, C + 2);
    const bd = SC.place('${k}', C - 1, C, ${k !== 'sewage'}); if (!bd) console.log('noplace ${k}'); SC.house(C - 4, C + 3); SC.house(C + 3, C + 3);
    for (let y = C + 3; y <= C + 9; y++) for (let x = C - 9; x <= C + 9; x++) if (!game.map[y][x].building && !game.map[y][x].path && Math.random() < 0.3) game.map[y][x].type = T.FOREST;
    SC.finish(); SC.look(C, C + 0.5, 16, 3);`;
  scenes.oilPlatform = `SC.reset(false); SC.water(0, 0, 127, 127); const bd = SC.place('oilPlatform', C - 1, C, false); if (!bd) console.log('noplace platform'); SC.finish(); SC.look(C, C + 1, 30, 3);`;
  // energia
  scenes.pylon = `SC.reset(); for (const x of [C - 9, C - 4, C + 1, C + 6, C + 11]) useTool('pylon', x, C); SC.road('road', C - 7, C + 3, C + 7, C + 3);
    SC.place('substation', C, C + 2); SC.finish(); SC.look(C + 0.5, C + 1, 26, 3);`;
  scenes.pole = `SC.reset(); SC.road('road', C - 7, C + 2, C + 7, C + 2); for (const x of [C - 4, C, C + 4]) useTool('pole', x, C + 1); for (const x of [C - 2, C + 2]) SC.house(x, C + 1); for (const x of [C - 3, C - 1, C + 1, C + 3]) SC.house(x, C + 3);
    SC.finish(); SC.look(C + 0.5, C + 2, 12, 3);`;
  scenes.substation = `SC.reset(); for (const x of [C - 9, C - 4, C + 1, C + 6]) useTool('pylon', x, C - 1); SC.road('road', C - 7, C + 2, C + 7, C + 2); SC.place('substation', C, C + 1);
    SC.house(C - 2, C + 1); SC.house(C + 2, C + 1); SC.finish(); SC.look(C + 0.5, C + 1, 18, 3);`;
  // acqua
  scenes.pipe = `SC.reset(); SC.road('road', C - 7, C + 2, C + 7, C + 2); for (const x of [C - 3, C - 2, C - 1, C + 1, C + 2, C + 3]) { SC.house(x, C + 1); SC.house(x, C + 3); }
    for (let y = C - 3; y <= C + 1; y++) useTool('pipe', C, y); SC.place('waterWell', C - 1, C - 3); game.underground = true; SC.finish(); setTool('pipe'); game.hover = null; SC.look(C + 0.5, C + 1, 6, 3);`;
  scenes.underground = `SC.reset(); SC.road('road', C - 7, C + 2, C + 7, C + 2); SC.road('road', C, C - 6, C, C + 1); for (const x of [C - 3, C - 2, C - 1, C + 1, C + 2, C + 3]) { SC.house(x, C + 1); SC.house(x, C + 3); SC.house(x, C - 1); }
    for (let x = C - 3; x <= C - 1; x++) useTool('pipe', x, C - 2); game.underground = true; SC.finish(); SC.look(C + 0.5, C + 1, 6, 3);`;
  // veicoli
  const line = (y, x0, x1) => { const t = []; for (let x = x0; x <= x1; x++) t.push(`[${x}, ${y}, 0]`); return '[' + t.join(',') + ']'; };
  scenes.car = `SC.reset(); SC.road('road', C - 8, C, C + 8, C); for (const x of [C - 3, C - 1, C + 1, C + 3]) { SC.house(x, C - 1); SC.house(x, C + 1); }
    SC.vehicle('car', ${line(C, C - 8, C + 8)}, 0.47, { color: '#d94141' }); SC.vehicle('car', ${line(C, C - 8, C + 8)}.reverse(), 0.4, { color: '#3f6fd9' }); SC.vehicle('car', ${line(C, C - 8, C + 8)}, 0.62, { color: '#e8c23a' });
    SC.finish(); SC.look(C + 0.5, C + 0.5, 4, 4);`;
  scenes.van = `SC.reset(); SC.road('road', C - 8, C, C + 8, C); SC.vehicle('van', ${line(C, C - 8, C + 8)}, 0.47, { stripe: '#3fa34d', cargo: { wheat: 10 } }); SC.vehicle('van', ${line(C, C - 8, C + 8)}.reverse(), 0.43, { stripe: '#e07b39', cargo: { flour: 10 } });
    SC.finish(); SC.look(C + 0.5, C + 0.5, 4, 4);`;
  scenes.bus = `SC.reset(); SC.road('road', C - 8, C, C + 8, C); SC.place('busStop', C - 1, C - 1, false); SC.vehicle('bus', ${line(C, C - 8, C + 8)}, 0.5); SC.house(C + 2, C - 1); SC.house(C - 3, C - 1);
    SC.finish(); SC.look(C + 0.5, C + 0.5, 4, 4);`;
  for (const [k, type] of [['tanker', 'tanker'], ['cargo', 'cargo']]) scenes[k] = `SC.reset(false); SC.water(0, 0, 127, 127); const tl = []; for (let x = C - 10; x <= C + 10; x++) tl.push([x, C]);
    SC.vehicle('ship', tl, 0.5, { shipType: '${type}' }); SC.finish(); for (let i = 0; i < 4; i++) { animT += 0.1; } SC.look(C + 0.5, C + 0.5, 8, 4);`;

  const keys = ONLY || Object.keys(scenes);
  for (const k of keys) {
    const code = scenes[k];
    if (!code) { console.log('no scene', k); continue; }
    await p.evaluate(src => { const C = SC.C; eval(src); }, code).catch(e => console.log('FAIL', k, e.message.split('\n')[0]));
    await p.waitForTimeout(60);
    await p.screenshot({ path: OUT + k + '.jpg', type: 'jpeg', quality: 82 });
  }
  console.log('done', keys.length);
  await b.close();
})();
