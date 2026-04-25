/* ===== Digital Structure With Dang - App Logic ===== */
(function(){
'use strict';

const STEEL_DB = {
  CCT34: { f: 21, fc: 32, fv: 12, E: 21000 },
  CCT38: { f: 23, fc: 33, fv: 13.5, E: 21000 },
  CCT42: { f: 25, fc: 36, fv: 14.5, E: 21000 },
  '09Mn2': { f: 29, fc: 40, fv: 17, E: 21000 }
};

const WIND_DB = { I: 55, II: 83, III: 110, IV: 155, V: 185 };

// === Cơ sở dữ liệu Bảng II.3: Số liệu cầu trục ===
const CRANE_DATA = [
  { q: 5, lk: 16.5, hk: 770, zmin: 130, bk: 3650, kk: 2700, g: 4.12, gxc: 0.45, pmax: 35.3, pmin: 10.3 },
  { q: 5, lk: 19.5, hk: 810, zmin: 160, bk: 3880, kk: 2900, g: 5.76, gxc: 0.45, pmax: 39.7, pmin: 14.1 },
  { q: 5, lk: 22.5, hk: 810, zmin: 160, bk: 3980, kk: 3200, g: 6.8, gxc: 0.45, pmax: 42.3, pmin: 16.7 },
  { q: 5, lk: 25.5, hk: 870, zmin: 180, bk: 4500, kk: 3800, g: 9.7, gxc: 0.495, pmax: 49.8, pmin: 23.7 },
  { q: 5, lk: 28, hk: 870, zmin: 180, bk: 5300, kk: 4600, g: 10.82, gxc: 0.495, pmax: 52.7, pmin: 26.4 },
  { q: 5, lk: 31, hk: 920, zmin: 180, bk: 5930, kk: 5100, g: 15.98, gxc: 0.495, pmax: 65.7, pmin: 39.2 },
  { q: 5, lk: 34, hk: 920, zmin: 180, bk: 5930, kk: 5100, g: 18.1, gxc: 0.495, pmax: 70.9, pmin: 44.6 },
  
  { q: 6.3, lk: 16.5, hk: 810, zmin: 160, bk: 3880, kk: 2900, g: 6.76, gxc: 0.59, pmax: 42.8, pmin: 11.6 },
  { q: 6.3, lk: 19.5, hk: 810, zmin: 160, bk: 3880, kk: 2900, g: 8.16, gxc: 0.59, pmax: 46.2, pmin: 14.4 },
  { q: 6.3, lk: 22.5, hk: 810, zmin: 160, bk: 3880, kk: 3200, g: 9.22, gxc: 0.59, pmax: 48.7, pmin: 16.7 },
  { q: 6.3, lk: 25.5, hk: 870, zmin: 180, bk: 4500, kk: 3800, g: 12.74, gxc: 0.605, pmax: 58, pmin: 26.3 },
  { q: 6.3, lk: 28, hk: 870, zmin: 180, bk: 5300, kk: 4600, g: 13.64, gxc: 0.605, pmax: 61.1, pmin: 29.2 },
  { q: 6.3, lk: 31, hk: 920, zmin: 180, bk: 5930, kk: 5100, g: 19.34, gxc: 0.605, pmax: 75.1, pmin: 42.7 },
  { q: 6.3, lk: 34, hk: 920, zmin: 180, bk: 5930, kk: 5100, g: 20.24, gxc: 0.605, pmax: 77.8, pmin: 45.4 },

  { q: 8, lk: 16.5, hk: 900, zmin: 160, bk: 3880, kk: 2900, g: 7.7, gxc: 0.59, pmax: 52.3, pmin: 13 },
  { q: 8, lk: 19.5, hk: 900, zmin: 160, bk: 3880, kk: 2900, g: 9.16, gxc: 0.59, pmax: 56.2, pmin: 16.1 },
  { q: 8, lk: 22.5, hk: 900, zmin: 160, bk: 3850, kk: 3200, g: 10.36, gxc: 0.59, pmax: 59, pmin: 18.6 },
  { q: 8, lk: 25.5, hk: 960, zmin: 180, bk: 4500, kk: 3800, g: 13, gxc: 0.605, pmax: 67.8, pmin: 27.4 },
  { q: 8, lk: 28, hk: 960, zmin: 180, bk: 5300, kk: 4600, g: 14.78, gxc: 0.605, pmax: 70.2, pmin: 29.5 },
  { q: 8, lk: 31, hk: 1010, zmin: 180, bk: 5930, kk: 5100, g: 19.62, gxc: 0.605, pmax: 84.7, pmin: 43.5 },
  { q: 8, lk: 34, hk: 1010, zmin: 180, bk: 5930, kk: 5100, g: 21.76, gxc: 0.605, pmax: 87, pmin: 45.7 },

  { q: 10, lk: 16.5, hk: 960, zmin: 180, bk: 3830, kk: 2900, g: 5.7, gxc: 0.803, pmax: 63.3, pmin: 15.2 },
  { q: 10, lk: 19.5, hk: 960, zmin: 180, bk: 3830, kk: 2900, g: 7.16, gxc: 0.803, pmax: 67.5, pmin: 18.3 },
  { q: 10, lk: 22.5, hk: 960, zmin: 180, bk: 3900, kk: 3200, g: 8.36, gxc: 0.803, pmax: 70.7, pmin: 21.1 },
  { q: 10, lk: 25.5, hk: 960, zmin: 180, bk: 4500, kk: 3800, g: 11, gxc: 0.833, pmax: 77.3, pmin: 27.7 },
  { q: 10, lk: 28, hk: 960, zmin: 180, bk: 5300, kk: 4600, g: 12.78, gxc: 0.833, pmax: 81.9, pmin: 32 },
  { q: 10, lk: 31, hk: 1010, zmin: 180, bk: 5930, kk: 5100, g: 17.62, gxc: 0.833, pmax: 94.3, pmin: 43.8 },
  { q: 10, lk: 34, hk: 1010, zmin: 180, bk: 6010, kk: 5100, g: 19.76, gxc: 0.833, pmax: 99.7, pmin: 49.1 },

  { q: 12.5, lk: 16.5, hk: 1090, zmin: 180, bk: 3830, kk: 2900, g: 6.54, gxc: 0.803, pmax: 78.3, pmin: 16.9 },
  { q: 12.5, lk: 19.5, hk: 1090, zmin: 180, bk: 3830, kk: 2900, g: 8.68, gxc: 0.803, pmax: 84.3, pmin: 21.6 },
  { q: 12.5, lk: 22.5, hk: 1090, zmin: 180, bk: 3900, kk: 3200, g: 9.94, gxc: 0.803, pmax: 87.7, pmin: 24.5 },
  { q: 12.5, lk: 25.5, hk: 1140, zmin: 180, bk: 4630, kk: 3800, g: 13.64, gxc: 0.833, pmax: 96.9, pmin: 33.8 },
  { q: 12.5, lk: 28, hk: 1140, zmin: 180, bk: 5030, kk: 4200, g: 15.38, gxc: 0.833, pmax: 102, pmin: 37.4 },
  { q: 12.5, lk: 31, hk: 1140, zmin: 180, bk: 6010, kk: 5100, g: 19.6, gxc: 0.833, pmax: 113, pmin: 47.5 },
  { q: 12.5, lk: 34, hk: 1190, zmin: 190, bk: 6110, kk: 5100, g: 22.36, gxc: 0.833, pmax: 120, pmin: 54.3 },

  { q: 16, lk: 16.5, hk: 1140, zmin: 180, bk: 3860, kk: 2900, g: 7.72, gxc: 1.19, pmax: 97.7, pmin: 20.9 },
  { q: 16, lk: 19.5, hk: 1140, zmin: 180, bk: 4230, kk: 3200, g: 10.24, gxc: 1.19, pmax: 105, pmin: 26.2 },
  { q: 16, lk: 22.5, hk: 1140, zmin: 180, bk: 4230, kk: 3200, g: 11.18, gxc: 1.236, pmax: 108, pmin: 27.9 },
  { q: 16, lk: 25.5, hk: 1140, zmin: 180, bk: 4630, kk: 3800, g: 14.1, gxc: 1.236, pmax: 115, pmin: 35.5 },
  { q: 16, lk: 28, hk: 1140, zmin: 180, bk: 5030, kk: 4200, g: 15.18, gxc: 1.301, pmax: 118, pmin: 37.9 },
  { q: 16, lk: 31, hk: 1190, zmin: 190, bk: 6110, kk: 5100, g: 21.26, gxc: 1.301, pmax: 134, pmin: 52.3 },
  { q: 16, lk: 34, hk: 1190, zmin: 190, bk: 6110, kk: 5100, g: 23.62, gxc: 1.301, pmax: 140, pmin: 58.1 },

  { q: 20, lk: 16.5, hk: 1330, zmin: 180, bk: 3930, kk: 2900, g: 8.54, gxc: 1.19, pmax: 119, pmin: 23.7 },
  { q: 20, lk: 19.5, hk: 1330, zmin: 180, bk: 4230, kk: 3200, g: 11.3, gxc: 1.19, pmax: 127, pmin: 29.5 },
  { q: 20, lk: 22.5, hk: 1330, zmin: 180, bk: 4230, kk: 3200, g: 12.46, gxc: 1.236, pmax: 130, pmin: 32.3 },
  { q: 20, lk: 25.5, hk: 1330, zmin: 180, bk: 4630, kk: 3800, g: 15.44, gxc: 1.236, pmax: 138, pmin: 39.2 },
  { q: 20, lk: 28, hk: 1380, zmin: 190, bk: 5030, kk: 4100, g: 18, gxc: 1.301, pmax: 145, pmin: 45 },
  { q: 20, lk: 31, hk: 1380, zmin: 190, bk: 6110, kk: 5100, g: 22.96, gxc: 1.301, pmax: 158, pmin: 56.8 },
  { q: 20, lk: 34, hk: 1380, zmin: 190, bk: 6110, kk: 5100, g: 24.14, gxc: 1.301, pmax: 161, pmin: 59.7 },

  { q: 25, lk: 16.5, hk: 1380, zmin: 190, bk: 4130, kk: 3200, g: 10, gxc: 1.508, pmax: 146, pmin: 29 },
  { q: 25, lk: 19.5, hk: 1380, zmin: 190, bk: 4130, kk: 3200, g: 12.26, gxc: 1.508, pmax: 153, pmin: 33.3 },
  { q: 25, lk: 22.5, hk: 1380, zmin: 190, bk: 4130, kk: 3200, g: 13.98, gxc: 1.573, pmax: 158, pmin: 36.9 },
  { q: 25, lk: 25.5, hk: 1380, zmin: 190, bk: 4730, kk: 3800, g: 17.06, gxc: 1.573, pmax: 166, pmin: 44.3 },
  { q: 25, lk: 28, hk: 1380, zmin: 190, bk: 5530, kk: 4600, g: 19.66, gxc: 1.667, pmax: 173, pmin: 50.3 },
  { q: 25, lk: 31, hk: 1380, zmin: 190, bk: 6110, kk: 5100, g: 24.3, gxc: 1.667, pmax: 185, pmin: 61.5 },
  { q: 25, lk: 34, hk: 1620, zmin: 300, bk: 6270, kk: 5100, g: 29.76, gxc: 1.667, pmax: 199, pmin: 74.8 },

  { q: 32, lk: 16.5, hk: 1460, zmin: 190, bk: 4530, kk: 3600, g: 12.12, gxc: 2.531, pmax: 184, pmin: 36.6 },
  { q: 32, lk: 19.5, hk: 1460, zmin: 190, bk: 4530, kk: 3600, g: 14.76, gxc: 2.531, pmax: 193, pmin: 40.8 },
  { q: 32, lk: 22.5, hk: 1460, zmin: 190, bk: 4530, kk: 3600, g: 16.46, gxc: 2.453, pmax: 198, pmin: 44.3 },
  { q: 32, lk: 25, hk: 1700, zmin: 300, bk: 5170, kk: 4000, g: 21.62, gxc: 2.453, pmax: 212, pmin: 56.1 },
  { q: 32, lk: 28, hk: 1700, zmin: 300, bk: 5770, kk: 4600, g: 24.36, gxc: 2.7, pmax: 219, pmin: 62.8 },
  { q: 32, lk: 31, hk: 1700, zmin: 300, bk: 6270, kk: 5100, g: 29.14, gxc: 2.7, pmax: 232, pmin: 73.7 },
  { q: 32, lk: 34, hk: 1700, zmin: 300, bk: 6270, kk: 5100, g: 34.04, gxc: 2.7, pmax: 245, pmin: 85.2 }
];

function updateCraneLookup() {
  const qIn = $('craneQ_Input');
  const lkIn = $('Lk_Input');
  if(!qIn || !lkIn) return;
  const q = parseFloat(qIn.value);
  const lk = parseFloat(lkIn.value);
  const found = CRANE_DATA.find(d => d.q === q && d.lk === lk);
  if (found) {
    if ($('Lk')) $('Lk').value = found.lk;
    if ($('Hk')) $('Hk').value = (found.hk/1000).toFixed(2);
    if ($('Bk')) $('Bk').value = (found.bk/1000).toFixed(2);
    if ($('gapLambda')) $('gapLambda').value = found.zmin;
    if ($('pmax_val')) $('pmax_val').value = found.pmax;
    if ($('pmin_val')) $('pmin_val').value = found.pmin;
    if ($('kk_val')) $('kk_val').value = found.kk;
    if ($('g_crane')) $('g_crane').value = found.g;
    if ($('g_trolley')) $('g_trolley').value = found.gxc;
    if ($('craneQ')) $('craneQ').value = found.q;

    // Calculate L1 based on L and Lk
    const L = parseFloat($('spanL')?.value || 24);
    const L1 = (L - found.lk) / 2;
    if ($('L1_val')) $('L1_val').value = L1.toFixed(3);

    renderLookupTable(q, lk);
  }
}

function renderLookupTable(selectedQ, selectedLk) {
  const body = $('craneLookupBody');
  if (!body) return;
  const filtered = CRANE_DATA.filter(d => d.q === selectedQ);
  body.innerHTML = filtered.map(d => `
    <tr class="${(d.lk === selectedLk) ? 'selected-row' : ''}">
      <td>${d.q}</td>
      <td>${d.lk}</td>
      <td>${d.hk}</td>
      <td>${d.zmin}</td>
      <td>${d.bk}</td>
      <td>${d.kk}</td>
      <td>${d.pmax}</td>
      <td>${d.pmin}</td>
    </tr>
  `).join('');
}

const $ = id => document.getElementById(id);
const sidebar = $('sidebar'), menuBtn = $('menuBtn');
const tabs = document.querySelectorAll('.tab-content');
const navItems = document.querySelectorAll('.nav-item');

// === Auto-calc: Số khung ===
function updateNumFrames() {
  const len = +$('buildingLength').value;
  const step = +$('stepB').value;
  if (step > 0) $('numFrames').value = Math.round(len / step) + 1;
}
$('buildingLength').addEventListener('input', updateNumFrames);
$('stepB').addEventListener('input', updateNumFrames);

// === Auto-calc: W0 từ vùng gió ===
$('windZone').addEventListener('change', function() {
  $('W0').value = WIND_DB[this.value] || 83;
});

// === Bảng thông số cầu trục (theo sức nâng Q) ===
const CRANE_DB = {
  5:  { Lk: 22.5, Hk: 0.8,  Bk: 4.0 },
  10: { Lk: 22.5, Hk: 1.0,  Bk: 4.4 },
  15: { Lk: 22.5, Hk: 1.2,  Bk: 4.8 },
  20: { Lk: 22.5, Hk: 1.4,  Bk: 5.2 },
  30: { Lk: 22.5, Hk: 1.6,  Bk: 5.6 },
  50: { Lk: 22.5, Hk: 2.0,  Bk: 6.3 }
};

// === Auto-calc: Kích thước chính khung ===
function updateFrameDimensions() {
  const Hdr = +$('craneRailElev').value;
  const L = +$('spanL').value;
  const i = +$('roofSlope').value / 100;
  const a = +$('aCol').value;
  const Q = $('craneCapacity').value;
  const crane = CRANE_DB[Q] || CRANE_DB[10];
  const hDCT = +$('hDCT').value / 1000;
  const hRail = 0.15; // chiều cao ray + đệm

  // Render lookup table
  const tbody = $('craneLookupBody');
  if (tbody) {
    let tableHtml = '';
    for (const [key, val] of Object.entries(CRANE_DB)) {
      const activeCls = key == Q ? 'class="active"' : '';
      tableHtml += `<tr ${activeCls}><td>${key}</td><td>${val.Lk}</td><td>${val.Hk}</td><td>${val.Bk}</td></tr>`;
    }
    tbody.innerHTML = tableHtml;
  }

  // Cập nhật thông số cầu trục lên form
  $('Lk').value = (L - 2 * a - 2 * 0.75).toFixed(1);
  $('Hk').value = crane.Hk;
  $('Bk').value = crane.Bk;

  // H1 = Hdr + hDCT + hRail
  const H1 = Hdr + hDCT + hRail;
  // H2 = Hk + lambda + hDCT  (khoảng an toàn)
  const lambda = +$('gapLambda').value / 1000;
  const H2 = crane.Hk + lambda + hDCT;
  const H = H1 + H2;
  // Chiều cao đỉnh mái
  const Hmm = (L / 2) * i;
  const Hdm = H + Hmm;

  $('Hdr').value = Hdr;
  $('H1col').value = H1.toFixed(2);
  $('H2col').value = H2.toFixed(2);
  $('Htotal').value = H.toFixed(2);
  $('Hmm').value = Hmm.toFixed(2);
  $('Hdm').value = Hdm.toFixed(2);
}

// Gắn event cho các input ảnh hưởng
['craneRailElev','spanL','roofSlope','aCol','craneCapacity','hDCT','gapLambda'].forEach(id => {
  $(id).addEventListener('input', updateFrameDimensions);
  $(id).addEventListener('change', updateFrameDimensions);
});
updateFrameDimensions(); // chạy lần đầu

// === Module Toolbar Switching ===
document.querySelectorAll('.mod-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mod-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.mod-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.mod).classList.add('active');
  });
});

// === Sidebar Toggle ===
menuBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
document.addEventListener('click', e => {
  if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !menuBtn.contains(e.target))
    sidebar.classList.remove('open');
});

// === Tab Navigation ===
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const tab = item.dataset.tab;
    navItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    tabs.forEach(t => t.classList.remove('active'));
    $('tab-' + tab).classList.add('active');
    $('pageTitle').textContent = item.querySelector('span').textContent;
    sidebar.classList.remove('open');
  });
});

// === Steel Grade Change ===
$('steelGrade').addEventListener('change', function() {
  const d = STEEL_DB[this.value];
  if (d) { $('fy').value = d.f; $('fc').value = d.fc; $('fv').value = d.fv; $('E').value = d.E; }
});

// === Draw Section (sẽ hoạt động khi có module tiết diện) ===
function drawSection() {
  if (!$('H') || !$('B') || !$('tw') || !$('tf')) return;
  const c = $('sectionCanvas'), ctx = c.getContext('2d');
  const H = +$('H').value, B = +$('B').value, tw = +$('tw').value, tf = +$('tf').value;
  ctx.clearRect(0, 0, c.width, c.height);
  const pad = 40, scale = Math.min((c.width - pad * 2) / B, (c.height - pad * 2) / H);
  const sx = (c.width - B * scale) / 2, sy = (c.height - H * scale) / 2;
  const bS = B * scale, hS = H * scale, twS = tw * scale, tfS = tf * scale;
  ctx.fillStyle = 'rgba(96,165,250,0.15)'; ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.rect(sx, sy, bS, tfS);
  ctx.rect(sx, sy + hS - tfS, bS, tfS);
  ctx.rect(sx + (bS - twS) / 2, sy + tfS, twS, hS - 2 * tfS);
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#94a3b8'; ctx.font = '11px Inter'; ctx.textAlign = 'center';
  ctx.save(); ctx.translate(sx - 12, sy + hS / 2); ctx.rotate(-Math.PI / 2);
  ctx.fillText('H=' + H, 0, 0); ctx.restore();
  ctx.fillText('B=' + B, sx + bS / 2, sy + hS + 18);
  ctx.fillText('tw=' + tw, sx + bS / 2 + 30, sy + hS / 2);
  ctx.fillText('tf=' + tf, sx + bS - 10, sy + tfS + 14);
  ctx.setLineDash([4, 4]); ctx.strokeStyle = 'rgba(148,163,184,0.3)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(sx + bS / 2, sy - 10); ctx.lineTo(sx + bS / 2, sy + hS + 10); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(sx - 10, sy + hS / 2); ctx.lineTo(sx + bS + 10, sy + hS / 2); ctx.stroke();
  ctx.setLineDash([]);
}
// Chỉ bind khi có element
['H', 'B', 'tw', 'tf', 'sectionType'].forEach(id => { if ($(id)) $(id).addEventListener('input', drawSection); });
drawSection();

// === Section Properties ===
function calcSectionProps() {
  if (!$('H') || !$('B') || !$('tw') || !$('tf')) return null;
  const H = +$('H').value, B = +$('B').value, tw = +$('tw').value, tf = +$('tf').value;
  const hw = H - 2 * tf;
  const A = 2 * B * tf + hw * tw;
  const Ix = (B * H * H * H - (B - tw) * hw * hw * hw) / 12;
  const Wx = 2 * Ix / H;
  const Sx = B * tf * (H - tf) / 2 + tw * hw * hw / 8;
  const ix = Math.sqrt(Ix / A);
  const Iy = (2 * tf * B * B * B + hw * tw * tw * tw) / 12;
  const Wy = 2 * Iy / B;
  const iy = Math.sqrt(Iy / A);
  return { A, Ix, Wx, Sx, ix, Iy, Wy, iy, H, B, tw, tf, hw };
}

// === Render KaTeX ===
function renderMath(el) {
  if (typeof renderMathInElement === 'function') {
    renderMathInElement(el, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false
    });
  }
}

// === Main Calculation ===
function calculate() {
  const sec = calcSectionProps();
  if (!sec) return; // chưa có module tiết diện
  const f = +$('fy').value, fc_val = +$('fc').value, fv_val = +$('fv').value;
  const gc = +$('gammaC').value, E_val = +$('E').value;
  const M = +$('M').value * 1e6, V = +$('V').value * 1e3;
  const N_force = +$('N').value * 1e3, L = +$('L').value;

  const sigma_b = M / sec.Wx;
  const sigma_b_ratio = sigma_b / (f * gc);
  const tau = V * sec.Sx / (sec.Ix * sec.tw);
  const tau_ratio = tau / (fv_val * gc);
  const sigma_n = N_force / sec.A;
  const sigma_n_ratio = N_force > 0 ? sigma_n / (f * gc) : 0;
  const lambda_x = L / sec.ix;
  const lambda_limit = 150;
  const hw_tw = sec.hw / sec.tw;
  const hw_tw_limit = 5.5 * Math.sqrt(E_val / f);

  const checks = [sigma_b_ratio <= 1, tau_ratio <= 1, sigma_n_ratio <= 1, lambda_x <= lambda_limit, hw_tw <= hw_tw_limit];
  const passCount = checks.filter(Boolean).length;
  const failCount = checks.filter(c => !c).length;
  const ratios = [sigma_b_ratio, tau_ratio, sigma_n_ratio, lambda_x / lambda_limit, hw_tw / hw_tw_limit];
  const warnCount = checks.filter((c, i) => c && ratios[i] > 0.85).length;

  $('statMembers').textContent = '1';
  $('statPass').textContent = passCount - warnCount;
  $('statFail').textContent = failCount;
  $('statWarn').textContent = warnCount;

  // Render dashboard results
  const results = [
    { label: 'Ứng suất uốn σ', value: sigma_b.toFixed(1) + ' MPa', ratio: sigma_b_ratio, limit: (f * gc).toFixed(0) + ' MPa', pass: sigma_b_ratio <= 1 },
    { label: 'Ứng suất cắt τ', value: tau.toFixed(1) + ' MPa', ratio: tau_ratio, limit: (fv_val * gc).toFixed(0) + ' MPa', pass: tau_ratio <= 1 },
    { label: 'Ứng suất nén σ_n', value: sigma_n.toFixed(1) + ' MPa', ratio: sigma_n_ratio, limit: (f * gc).toFixed(0) + ' MPa', pass: sigma_n_ratio <= 1 },
    { label: 'Độ mảnh λ_x', value: lambda_x.toFixed(1), ratio: lambda_x / lambda_limit, limit: lambda_limit.toString(), pass: lambda_x <= lambda_limit },
    { label: 'Ổn định bụng h_w/t_w', value: hw_tw.toFixed(1), ratio: hw_tw / hw_tw_limit, limit: hw_tw_limit.toFixed(1), pass: hw_tw <= hw_tw_limit }
  ];
  let html = '';
  results.forEach(r => {
    const cls = !r.pass ? 'r-fail' : r.ratio > 0.85 ? 'r-warn' : 'r-pass';
    const pct = Math.min(r.ratio * 100, 100).toFixed(0);
    const barColor = !r.pass ? 'var(--red)' : r.ratio > 0.85 ? 'var(--yellow)' : 'var(--green)';
    html += `<div class="result-item"><div><div class="r-label">${r.label}</div><div class="result-bar"><div class="result-bar-fill" style="width:${pct}%;background:${barColor}"></div></div></div><div class="r-value ${cls}">${r.value} / ${r.limit}</div></div>`;
  });
  html += `<div style="margin-top:16px;padding-top:12px;border-top:1px solid rgba(255,255,255,.08)"><div class="r-label" style="margin-bottom:8px;font-weight:600;color:var(--text)">Đặc trưng tiết diện</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 16px;font-size:.82rem;color:var(--text2)"><span>A = ${(sec.A / 100).toFixed(1)} cm²</span><span>Ix = ${(sec.Ix / 1e4).toFixed(0)} cm⁴</span><span>Wx = ${(sec.Wx / 1e3).toFixed(0)} cm³</span><span>ix = ${sec.ix.toFixed(1)} mm</span><span>Iy = ${(sec.Iy / 1e4).toFixed(0)} cm⁴</span><span>iy = ${sec.iy.toFixed(1)} mm</span></div></div>`;
  $('resultPanel').innerHTML = html;

}

// === Report Generator — Thông Số Đầu Vào ===
function reportInput() {
  const L = $('spanL').value, B = $('stepB').value, len = $('buildingLength').value;
  const slope = $('roofSlope').value, Hdr = $('craneRailElev').value;
  const Q = $('craneCapacity').value, nCrane = $('craneCount').value;
  const modeText = $('craneMode').selectedOptions[0].text;
  
  const locMap = {
    'hanoi': 'thành phố Hà Nội',
    'hcm': 'thành phố Hồ Chí Minh',
    'danang': 'thành phố Đà Nẵng',
    'haiphong': 'thành phố Hải Phòng',
    'hue': 'thành phố Huế'
  };
  const locationText = locMap[$('location').value] || $('location').selectedOptions[0].text;
  
  const grade = $('steelGrade').selectedOptions[0].text;
  const f = $('fy').value, fv = $('fv').value, fc = $('fc').value;
  const weld = $('weldMethod').selectedOptions[0].text, rod = $('weldRod').value;

  // Exact reproduction of image text and layout
  const html = `
    <h3>3.1. SỐ LIỆU THIẾT KẾ</h3>
    <p>Thiết kế khung ngang chịu lực của nhà công nghiệp một tầng, một nhịp với các số liệu cho trước như sau:</p>
    <div style="margin-bottom: 15px;">
      <p>&nbsp;&nbsp; - Nhịp khung ngang: L = ${L}m</p>
      <p>&nbsp;&nbsp; - Bước khung: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; B = ${B}m</p>
      <p>&nbsp;&nbsp; - Sức nâng cầu trục: Q = ${Q} T (nhà có ${nCrane} cầu trục hoạt động, chế độ làm việc ${modeText.toLowerCase()})</p>
      <p>&nbsp;&nbsp; - Cao trình đỉnh ray: +${parseFloat(Hdr).toFixed(3)} m</p>
      <p>&nbsp;&nbsp; - Độ dốc của mái: &nbsp;&nbsp; i = ${slope}%</p>
      <p>&nbsp;&nbsp; - Chiều dài nhà: &nbsp;&nbsp;&nbsp;&nbsp; ${len} m</p>
      <p>&nbsp;&nbsp; - Phân vùng gió: &nbsp;&nbsp;&nbsp;&nbsp; II-B (địa điểm xây dựng: ${locationText})</p>
    </div>
    <p>Vật liệu thép mác ${grade} có cường độ:</p>
    <div style="margin-left: 140px; margin-bottom: 15px;">
      <p>f = ${f} kN/cm²</p>
      <p>f<sub>v</sub> = ${fv} kN/cm²</p>
      <p>f<sub>c</sub> = ${fc} kN/cm²</p>
    </div>
    <p>${weld}, dùng que hàn ${rod}.</p>
  `;
  
  // Custom append to skip KaTeX rendering for this section to maintain plain text look
  const paper = $('reportPaper');
  const empty = paper.querySelector('.report-empty');
  if (empty) empty.remove();
  const old = document.getElementById('report-input');
  if (old) old.remove();

  const section = document.createElement('div');
  section.id = 'report-input';
  section.className = 'report-section';
  section.innerHTML = html;
  paper.appendChild(section);

  // Jump to report tab
  navItems.forEach(n => n.classList.remove('active'));
  $('nav-report').classList.add('active');
  tabs.forEach(t => t.classList.remove('active'));
  $('tab-report').classList.add('active');
  $('pageTitle').textContent = 'Thuyết Minh';
  section.scrollIntoView({ behavior: 'smooth' });
}

// === SVG Drawing for Frame ===
function drawFrameSVG(p) {
  const w = 800, h = 500;
  const margin = 60;
  const drawW = w - 2 * margin;
  const drawH = h - 2 * margin;
  
  // Scale factor (pixels per meter)
  const scale = Math.min(drawW / p.L, drawH / (p.H + 3)); 
  
  const ctx = {
    x0: margin + (drawW - p.L * scale) / 2,
    y0: h - margin,
    sc: scale
  };

  const xL = ctx.x0;
  const xR = ctx.x0 + p.L * scale;
  const yBase = ctx.y0;
  const yTop = yBase - p.H * scale;
  const yRail = yBase - p.H1_val * scale;
  const yPeak = yTop - (p.L / 2 * (p.slope/100)) * scale;

  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#fff; font-family:'Times New Roman';">`;
  
  // Styles
  svg += `<style>
    line, polyline, path { stroke: #000; fill: none; stroke-width: 1.5; }
    .dim-line { stroke-width: 0.8; }
    text { fill: #000; font-size: 12px; }
    .level-text { font-size: 11px; font-weight: bold; }
    .dashed { stroke-dasharray: 4 2; }
  </style>`;

  // Ground line
  svg += `<line x1="${xL - 20}" y1="${yBase}" x2="${xR + 20}" y2="${yBase}" />`;

  // Columns
  svg += `<line x1="${xL}" y1="${yBase}" x2="${xL}" y2="${yTop}" />`;
  svg += `<line x1="${xR}" y1="${yBase}" x2="${xR}" y2="${yTop}" />`;
  
  // Rafters
  svg += `<polyline points="${xL},${yTop} ${w/2},${yPeak} ${xR},${yTop}" />`;

  // Crane components (Dashed box)
  const lk_px = p.Lk * scale;
  const hk_px = p.Hk * scale;
  const xLk = w/2 - lk_px/2;
  const xRk = w/2 + lk_px/2;
  svg += `<rect x="${xLk}" y="${yRail - hk_px}" width="${lk_px}" height="${hk_px}" class="dashed" />`;
  
  // Bracket/Crane beam indicator
  svg += `<rect x="${xL}" y="${yRail}" width="15" height="10" />`;
  svg += `<rect x="${xR - 15}" y="${yRail}" width="15" height="10" />`;

  // Level Symbols
  const drawLevel = (x, y, txt) => {
    svg += `<path d="M ${x} ${y} l -8 -8 h 16 l -8 8 v 15 h 10" />`;
    svg += `<text x="${x + 15}" y="${y - 5}" class="level-text">${txt}</text>`;
  };
  drawLevel(xR + 40, yBase, "±0.000");
  drawLevel(xR + 40, yRail, `+${p.H1_val.toFixed(3)}`);
  drawLevel(xR + 40, yTop, `+${p.H.toFixed(3)}`);

  // Dimensions - Vertical
  const drawDimV = (x, y1, y2, txt) => {
    svg += `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" class="dim-line" />`;
    svg += `<line x1="${x-5}" y1="${y1}" x2="${x+5}" y2="${y1}" class="dim-line" />`;
    svg += `<line x1="${x-5}" y1="${y2}" x2="${x+5}" y2="${y2}" class="dim-line" />`;
    svg += `<text x="${x - 10}" y="${(y1+y2)/2}" transform="rotate(-90 ${x-10} ${(y1+y2)/2})" text-anchor="middle">${txt}</text>`;
  };
  drawDimV(xR + 25, yBase, yRail, (p.Hd * 1000).toFixed(0));
  drawDimV(xR + 25, yRail, yTop, (p.Ht * 1000).toFixed(0));
  drawDimV(xR + 60, yBase, yTop, (p.H * 1000).toFixed(0));

  // Dimensions - Horizontal
  const drawDimH = (x1, x2, y, txt) => {
    svg += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" class="dim-line" />`;
    svg += `<line x1="${x1}" y1="${y-5}" x2="${x1}" y2="${y+5}" class="dim-line" />`;
    svg += `<line x1="${x2}" y1="${y-5}" x2="${x2}" y2="${y+5}" class="dim-line" />`;
    svg += `<text x="${(x1+x2)/2}" y="${y - 8}" text-anchor="middle">${txt}</text>`;
  };
  drawDimH(xLk, xRk, yRail + 30, (p.Lk * 1000).toFixed(0));
  drawDimH(xL, xR, yBase + 40, (p.L * 1000).toFixed(0));

  svg += `</svg>`;
  return svg;
}

function drawModelSVG(p) {
  const w = 800, h = 400;
  const margin = 50;
  const scale = (w - 2 * margin) / p.L;
  const x0 = margin;
  const yBase = h - margin;
  
  const d1 = Math.round(p.L / 6); // Vị trí thay đổi tiết diện
  const d2 = p.L / 2 - d1;
  
  const xL = x0;
  const x1 = x0 + d1 * scale;
  const xM = x0 + (p.L / 2) * scale;
  const x2 = x0 + (p.L/2 + d2) * scale;
  const xR = x0 + p.L * scale;
  
  const yTop = yBase - p.H * scale;
  const yPeak = yTop - (p.L/2 * (p.slope/100)) * scale;

  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#fff; font-family:'Times New Roman';">`;
  svg += `<style>line, polyline, path { stroke: #333; fill: none; stroke-width: 2; } .dim { stroke-width: 0.8; font-size: 11px; } .support { stroke-width: 2; }</style>`;

  // Frame lines
  svg += `<line x1="${xL}" y1="${yBase}" x2="${xL}" y2="${yTop}" />`;
  svg += `<line x1="${xR}" y1="${yBase}" x2="${xR}" y2="${yTop}" />`;
  svg += `<polyline points="${xL},${yTop} ${x1},${yTop + (yPeak-yTop)*(d1/(p.L/2))} ${xM},${yPeak} ${x2},${yTop + (yPeak-yTop)*(d1/(p.L/2))} ${xR},${yTop}" />`;

  // Supports (Fixed)
  const drawFixed = (x, y) => {
    svg += `<line x1="${x-15}" y1="${y}" x2="${x+15}" y2="${y}" class="support" />`;
    for(let i=-15; i<=10; i+=5) svg += `<line x1="${x+i}" y1="${y}" x2="${x+i-5}" y2="${y+8}" stroke-width="1" />`;
  };
  drawFixed(xL, yBase);
  drawFixed(xR, yBase);

  // Labels I1, I2
  svg += `<text x="${xL - 25}" y="${(yBase+yTop)/2}">I₁</text>`;
  svg += `<text x="${xL + 15}" y="${yTop - 15}">I₁</text>`;
  svg += `<text x="${x1 + 20}" y="${yTop + (yPeak-yTop)*0.3 - 15}">I₂</text>`;
  svg += `<text x="${xM}" y="${yPeak - 15}" text-anchor="middle">I₂</text>`;

  // Dimensions
  const dimY = yBase + 30;
  const drawDim = (xa, xb, txt) => {
    svg += `<line x1="${xa}" y1="${dimY}" x2="${xb}" y2="${dimY}" class="dim" />`;
    svg += `<line x1="${xa}" y1="${dimY-5}" x2="${xa}" y2="${dimY+5}" class="dim" />`;
    svg += `<line x1="${xb}" y1="${dimY-5}" x2="${xb}" y2="${dimY+5}" class="dim" />`;
    svg += `<text x="${(xa+xb)/2}" y="${dimY+15}" text-anchor="middle" class="dim">${txt}</text>`;
  };
  drawDim(xL, x1, (d1*1000));
  drawDim(x1, xM, (d2*1000));
  drawDim(xM, x2, (d2*1000));
  drawDim(x2, xR, (d1*1000));
  
  svg += `<text x="${(xL+xR)/2}" y="${dimY + 35}" text-anchor="middle" font-weight="bold">${(p.L*1000)}</text>`;

  svg += `</svg>`;
  return svg;
}

function drawLoadSVG(p) {
  const w = 800, h = 500;
  const margin = 60;
  const scale = (w - 2 * margin) / p.L;
  const x0 = margin + (w - 2 * margin - p.L * scale) / 2;
  const yBase = h - margin;
  
  const xL = x0;
  const xR = x0 + p.L * scale;
  const yTop = yBase - p.H * scale;
  const yPeak = yTop - (p.L/2 * (p.slope/100)) * scale;
  const yRail = yBase - p.H1 * scale;

  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#fff; font-family:'Times New Roman';">`;
  svg += `<style>line, polyline, path { stroke: #333; fill: none; stroke-width: 1.5; } .load-q { stroke: #ef4444; } .load-p { stroke: #3b82f6; stroke-width: 2.5; } text { fill: #000; font-size: 14px; }</style>`;

  // Frame
  svg += `<line x1="${xL}" y1="${yBase}" x2="${xL}" y2="${yTop}" />`;
  svg += `<line x1="${xR}" y1="${yBase}" x2="${xR}" y2="${yTop}" />`;
  svg += `<polyline points="${xL},${yTop} ${w/2},${yPeak} ${xR},${yTop}" />`;

  // Distributed Load q (arrows)
  const qY = yTop - 40;
  svg += `<line x1="${xL}" y1="${qY}" x2="${xR}" y2="${qY}" class="load-q" />`;
  for(let i=0; i<=10; i++) {
    const x = xL + (xR-xL)*(i/10);
    const y = yTop - (Math.abs(i-5)/5)* (yTop-yPeak); // Approximate slope
    svg += `<line x1="${x}" y1="${qY}" x2="${x}" y2="${y - 5}" class="load-q" marker-end="url(#arrow-red)" />`;
  }
  svg += `<text x="${w/2}" y="${qY - 10}" text-anchor="middle" fill="#ef4444" font-weight="bold">${p.q.toFixed(2)} kN/m</text>`;

  // Concentrated Loads (Wall weight) at top
  const drawP = (x, y, txt, side) => {
    svg += `<line x1="${x}" y1="${y-40}" x2="${x}" y2="${y-5}" class="load-p" />`;
    svg += `<text x="${x + (side*10)}" y="${y-45}" text-anchor="${side>0?'start':'end'}" fill="#3b82f6" font-weight="bold">${txt} kN</text>`;
  };
  drawP(xL, yTop, p.Gwall.toFixed(2), -1);
  drawP(xR, yTop, p.Gwall.toFixed(2), 1);

  // Concentrated Loads (Crane beam) at bracket
  const drawBracketLoad = (x, y, P, M, side) => {
    svg += `<line x1="${x}" y1="${y-30}" x2="${x}" y2="${y}" class="load-p" />`;
    svg += `<text x="${x + (side*10)}" y="${y-15}" text-anchor="${side>0?'start':'end'}" fill="#3b82f6">${P.toFixed(1)} kN</text>`;
    // Moment arc
    const arcPath = side > 0 ? `M ${x-10} ${y+10} A 15 15 0 0 1 ${x-10} ${y-10}` : `M ${x+10} ${y+10} A 15 15 0 0 0 ${x+10} ${y-10}`;
    svg += `<path d="${arcPath}" stroke="#f59e0b" stroke-width="2" />`;
    svg += `<text x="${x - (side*25)}" y="${y + 5}" text-anchor="middle" fill="#f59e0b" font-weight="bold">${M.toFixed(2)} kNm</text>`;
  };
  drawBracketLoad(xL, yRail, p.Gdct, p.Mdct, 1);
  drawBracketLoad(xR, yRail, p.Gdct, p.Mdct, -1);

  // Definitions for arrows
  svg += `<defs><marker id="arrow-red" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" /></marker></defs>`;

  svg += `</svg>`;
  return svg;
}
function drawLiveLoadSVG(p) {
  const w = 800, h = 300;
  const scale = (w/2 - 60) / p.L;
  
  const drawFrame = (ox, oy, loadSide) => {
    const xL = ox;
    const xR = ox + p.L * scale;
    const yBase = oy;
    const yTop = yBase - p.H * scale;
    const yPeak = yTop - (p.L/2 * (p.slope/100)) * scale;
    
    let s = `<line x1="${xL}" y1="${yBase}" x2="${xL}" y2="${yTop}" />`;
    s += `<line x1="${xR}" y1="${yBase}" x2="${xR}" y2="${yTop}" />`;
    s += `<polyline points="${xL},${yTop} ${ox + (p.L/2)*scale},${yPeak} ${xR},${yTop}" />`;
    
    // Supports
    s += `<line x1="${xL-10}" y1="${yBase}" x2="${xL+10}" y2="${yBase}" stroke-width="2" />`;
    s += `<line x1="${xR-10}" y1="${yBase}" x2="${xR+10}" y2="${yBase}" stroke-width="2" />`;

    // Loads
    const qY = yPeak - 30;
    const xStart = loadSide === 'left' ? xL : ox + (p.L/2)*scale;
    const xEnd = loadSide === 'left' ? ox + (p.L/2)*scale : xR;
    
    s += `<line x1="${xStart}" y1="${qY}" x2="${xEnd}" y2="${qY}" stroke="#ef4444" stroke-width="1" />`;
    for(let i=0; i<=5; i++) {
      const x = xStart + (xEnd - xStart)*(i/5);
      s += `<line x1="${x}" y1="${qY}" x2="${x}" y2="${qY + 15}" stroke="#ef4444" marker-end="url(#arrow-red)" />`;
    }
    s += `<text x="${(xStart+xEnd)/2}" y="${qY - 5}" text-anchor="middle" font-size="10" fill="#ef4444">${p.q.toFixed(2)} kN/m</text>`;
    s += `<text x="${ox + (p.L/2)*scale}" y="${yBase + 20}" text-anchor="middle" font-style="italic">${loadSide === 'left' ? 'a)' : 'b)'}</text>`;
    return s;
  };

  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#fff; font-family:'Times New Roman';">`;
  svg += `<style>line, polyline { stroke: #333; fill: none; stroke-width: 1.2; } text { fill: #000; font-size: 14px; }</style>`;
  svg += `<defs><marker id="arrow-red" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" /></marker></defs>`;
  
  svg += drawFrame(40, h - 50, 'left');
  svg += drawFrame(w/2 + 20, h - 50, 'right');
  
  svg += `</svg>`;
  return svg;
}

function drawCraneInfluenceSVG(p) {
  const w = 800, h = 450;
  const sc = (w - 200) / (p.B * 2);
  const ox = w / 2;
  const oy = 280;
  // Placement based on user image: P3 at Peak. P2 at -gap, P1 at -(K+gap). P4 at +K.
  const y3 = 1.0;
  const y2 = 1 - p.gap/p.B;
  const y1 = 1 - (p.K + p.gap)/p.B;
  const y4 = 1 - p.K/p.B;
  let s = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#fff; font-family:'Times New Roman';">`;
  s += `<style>line, polyline, path { stroke: #000; fill: none; stroke-width: 1.2; } text { fill: #000; font-size: 14px; }</style>`;
  const yBeam = oy - 180;
  s += `<line x1="${ox - p.B*sc}" y1="${yBeam}" x2="${ox + p.B*sc}" y2="${yBeam}" stroke-width="2" />`;
  const drawSup = (x, y) => {
    s += `<polyline points="${x-8},${y+10} ${x},${y} ${x+8},${y+10} ${x-8},${y+10}" />`;
    s += `<line x1="${x-10}" y1="${y+12}" x2="${x+10}" y2="${y+12}" />`;
  };
  drawSup(ox - p.B*sc, yBeam); drawSup(ox, yBeam); drawSup(ox + p.B*sc, yBeam);
  s += `<polyline points="${ox - p.B*sc},${oy} ${ox},${oy-150} ${ox + p.B*sc},${oy}" />`;
  s += `<line x1="${ox - p.B*sc - 20}" y1="${oy}" x2="${ox + p.B*sc + 20}" y2="${oy}" />`;
  const drawW = (dist, val) => {
    const x = ox + dist*sc; const y = oy - (val * 150);
    s += `<line x1="${x}" y1="${oy}" x2="${x}" y2="${y}" stroke-dasharray="3,2" />`;
    s += `<circle cx="${x}" cy="${yBeam}" r="6" fill="#fff" stroke="#000" />`;
    s += `<line x1="${x}" y1="${yBeam-25}" x2="${x}" y2="${yBeam-5}" marker-end="url(#arr-b)" />`;
    s += `<text x="${x}" y="${yBeam-30}" text-anchor="middle" font-weight="bold">P</text>`;
    s += `<text x="${x+3}" y="${oy - (val*150/2)}" font-weight="bold" font-size="11">${val.toFixed(3)}</text>`;
    return x;
  };
  const x1 = drawW(-(p.K + p.gap), y1);
  const x2 = drawW(-p.gap, y2);
  const x3 = drawW(0, y3);
  const x4 = drawW(p.K, y4);
  s += `<text x="${(x1+x2)/2}" y="${yBeam+15}" text-anchor="middle">CT-2</text>`;
  s += `<text x="${(x3+x4)/2}" y="${yBeam+15}" text-anchor="middle">CT-1</text>`;
  const dy = oy + 40;
  const drawDim = (xa, xb, txt) => {
    s += `<line x1="${xa}" y1="${dy}" x2="${xb}" y2="${dy}" />`;
    s += `<line x1="${xa}" y1="${dy-5}" x2="${xa}" y2="${dy+5}" />`;
    s += `<line x1="${xb}" y1="${dy-5}" x2="${xb}" y2="${dy+5}" />`;
    s += `<text x="${(xa+xb)/2}" y="${dy-5}" text-anchor="middle">${txt}</text>`;
  };
  drawDim(ox - p.B*sc, x1, Math.round((p.B - p.K - p.gap)*1000));
  drawDim(x1, x2, Math.round(p.K*1000));
  drawDim(x2, x3, Math.round(p.gap*1000));
  drawDim(x3, x4, Math.round(p.K*1000));
  drawDim(x4, ox + p.B*sc, Math.round((p.B - p.K)*1000));
  s += `<line x1="${ox-p.B*sc}" y1="${dy+40}" x2="${ox}" y2="${dy+40}" />`;
  s += `<text x="${ox - p.B*sc/2}" y="${dy+55}" text-anchor="middle">B = ${p.B*1000} mm</text>`;
  s += `<line x1="${ox}" y1="${dy+40}" x2="${ox + p.B*sc}" y2="${dy+40}" />`;
  s += `<text x="${ox + p.B*sc/2}" y="${dy+55}" text-anchor="middle">B = ${p.B*1000} mm</text>`;
  s += `<defs><marker id="arr-b" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#000" /></marker></defs>`;
  s += `</svg>`;
  return s;
}

function drawCraneLoadFrameSVG(p) {
  const w = 900, h = 450;
  const Ht_mm = Math.round(p.Ht * 1000);
  const Hd_mm = Math.round(p.Hd * 1000);
  
  let s = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#fff; font-family:'Times New Roman';">`;
  s += `<style>line, polyline, path { stroke: #000; fill: none; stroke-width: 1.2; } text { fill: #000; font-size: 14px; }</style>`;
  s += `<defs><marker id="arr-red" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="red" /></marker></defs>`;

  const drawFrame = (ox, oy, isLeft) => {
    const fw = 200, fh = 180;
    const x1 = ox, x2 = ox + fw, xm = ox + fw/2;
    const yb = oy, yt = oy - fh, yp = yt - 40;
    const yc = yt + 50; // Vai cột

    let f = "";
    // Cột và xà
    f += `<line x1="${x1}" y1="${yb}" x2="${x1}" y2="${yt}" />`;
    f += `<line x1="${x2}" y1="${yb}" x2="${x2}" y2="${yt}" />`;
    f += `<polyline points="${x1},${yt} ${xm},${yp} ${x2},${yt}" />`;

    // Ngàm
    const ng = (x, y) => {
      f += `<line x1="${x-20}" y1="${y}" x2="${x+20}" y2="${y}" stroke-width="2" />`;
      for(let i=-20; i<=15; i+=5) f += `<line x1="${x+i}" y1="${y}" x2="${x+i-5}" y2="${y+10}" stroke-width="0.8" />`;
    };
    ng(x1, yb); ng(x2, yb);

    // Lực
    const dL = isLeft ? p.Dmax : p.Dmin;
    const dR = isLeft ? p.Dmin : p.Dmax;
    const mL = isLeft ? p.Mmax : p.Mmin;
    const mR = isLeft ? p.Mmin : p.Mmax;

    // Cột trái
    f += `<line x1="${x1}" y1="${yc-40}" x2="${x1}" y2="${yc}" stroke="red" stroke-width="2" marker-end="url(#arr-red)" />`;
    f += `<text x="${x1+15}" y="${yc-20}" fill="red" font-weight="bold">${dL.toFixed(1)} kN</text>`;
    f += `<path d="M ${x1+20} ${yc} A 15 15 0 1 1 20 ${yc+30}" transform="translate(${x1},0)" stroke="red" marker-end="url(#arr-red)" />`;
    f += `<text x="${x1+45}" y="${yc+20}" fill="red" font-weight="bold">${mL.toFixed(2)}</text>`;

    // Cột phải
    f += `<line x1="${x2}" y1="${yc-40}" x2="${x2}" y2="${yc}" stroke="red" stroke-width="2" marker-end="url(#arr-red)" />`;
    f += `<text x="${x2-15}" y="${yc-20}" text-anchor="end" fill="red" font-weight="bold">${dR.toFixed(1)} kN</text>`;
    f += `<path d="M ${x2-20} ${yc} A 15 15 0 1 0 ${x2-20} ${yc+30}" stroke="red" marker-end="url(#arr-red)" />`;
    f += `<text x="${x2-45}" y="${yc+20}" text-anchor="end" fill="red" font-weight="bold">${mR.toFixed(2)}</text>`;

    // Kích thước
    const dx = x2 + 50;
    f += `<line x1="${dx}" y1="${yb}" x2="${dx}" y2="${yt}" />`;
    f += `<line x1="${dx-5}" y1="${yb}" x2="${dx+5}" y2="${yb}" />`;
    f += `<line x1="${dx-5}" y1="${yc}" x2="${dx+5}" y2="${yc}" />`;
    f += `<line x1="${dx-5}" y1="${yt}" x2="${dx+5}" y2="${yt}" />`;
    f += `<text x="${dx+15}" y="${(yb+yc)/2}" text-anchor="middle" style="writing-mode:tb">${Hd_mm}</text>`;
    f += `<text x="${dx+15}" y="${(yc+yt)/2}" text-anchor="middle" style="writing-mode:tb">${Ht_mm}</text>`;
    
    return f;
  };

  s += drawFrame(100, 320, true);
  s += `<text x="200" y="420" text-anchor="middle" font-style="italic">a) $D_{max}$ lên cột trái</text>`;
  
  s += drawFrame(550, 320, false);
  s += `<text x="650" y="420" text-anchor="middle" font-style="italic">b) $D_{max}$ lên cột phải</text>`;
  
  s += `</svg>`;
  return s;
}

function drawCraneBrakingSVG(p) {
  const w = 900, h = 450;
  const Ht_mm = Math.round(p.Ht * 1000);
  const Hd_mm = Math.round(p.Hd * 1000);
  
  let s = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#fff; font-family:'Times New Roman';">`;
  s += `<style>line, polyline, path { stroke: #000; fill: none; stroke-width: 1.2; } text { fill: #000; font-size: 14px; }</style>`;
  s += `<defs><marker id="arr-red" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="red" /></marker></defs>`;

  const drawF = (ox, oy, isLeft) => {
    const fw = 200, fh = 180;
    const x1 = ox, x2 = ox + fw, xm = ox + fw/2;
    const yb = oy, yt = oy - fh, yp = yt - 40;
    const yc = yt + 50; 

    let f = "";
    f += `<line x1="${x1}" y1="${yb}" x2="${x1}" y2="${yt}" />`;
    f += `<line x1="${x2}" y1="${yb}" x2="${x2}" y2="${yt}" />`;
    f += `<polyline points="${x1},${yt} ${xm},${yp} ${x2},${yt}" />`;

    const ng = (x, y) => {
      f += `<line x1="${x-20}" y1="${y}" x2="${x+20}" y2="${y}" stroke-width="2" />`;
      for(let i=-20; i<=15; i+=5) f += `<line x1="${x+i}" y1="${y}" x2="${x+i-5}" y2="${y+10}" stroke-width="0.8" />`;
    };
    ng(x1, yb); ng(x2, yb);

    // Lực hãm T
    const tx = isLeft ? x1 : x2;
    f += `<line x1="${tx-50}" y1="${yc}" x2="${tx-5}" y2="${yc}" stroke="red" stroke-width="2" marker-end="url(#arr-red)" />`;
    f += `<text x="${tx-30}" y="${yc-10}" text-anchor="middle" fill="red" font-weight="bold">${p.T.toFixed(2)} kN</text>`;

    const dx = x2 + 50;
    f += `<line x1="${dx}" y1="${yb}" x2="${dx}" y2="${yt}" />`;
    f += `<line x1="${dx-5}" y1="${yb}" x2="${dx+5}" y2="${yb}" />`;
    f += `<line x1="${dx-5}" y1="${yc}" x2="${dx+5}" y2="${yc}" />`;
    f += `<line x1="${dx-5}" y1="${yt}" x2="${dx+5}" y2="${yt}" />`;
    f += `<text x="${dx+15}" y="${(yb+yc)/2}" text-anchor="middle" style="writing-mode:tb">${Hd_mm}</text>`;
    f += `<text x="${dx+15}" y="${(yc+yt)/2}" text-anchor="middle" style="writing-mode:tb">${Ht_mm}</text>`;
    
    return f;
  };

  s += drawF(100, 320, true);
  s += `<text x="200" y="420" text-anchor="middle" font-style="italic">a) Lực hãm lên cột trái</text>`;
  s += drawF(550, 320, false);
  s += `<text x="650" y="420" text-anchor="middle" font-style="italic">b) Lực hãm lên cột phải</text>`;
  s += `</svg>`;
  return s;
}

function drawWindLoadSVG(p) {
  const w = 800, h = 1150;
  const sc = (w - 400) / p.L;
  const drawSingle = (ox, oy, mode) => {
    const xL = ox, xR = ox + p.L*sc;
    const yB = oy, yT = yB - p.H*sc, yP = yT - (p.L/2 * (p.slope/100))*sc;
    const xM = ox + (p.L/2)*sc;
    let s = `<line x1="${xL}" y1="${yB}" x2="${xL}" y2="${yT}" />`;
    s += `<line x1="${xR}" y1="${yB}" x2="${xR}" y2="${yT}" />`;
    s += `<polyline points="${xL},${yT} ${xM},${yP} ${xR},${yT}" />`;
    const qCol1 = p.gw * p.w0 * p.k * p.ce * p.B;
    const qCol2 = p.gw * p.w0 * p.k * Math.abs(p.ce3) * p.B;
    const qRoof1 = p.gw * p.w0 * p.k * Math.abs(p.ce1) * p.B;
    const qRoof2 = p.gw * p.w0 * p.k * Math.abs(p.ce2) * p.B;
    if (mode === 'ce') {
      s += `<text x="${xL-60}" y="${(yB+yT)/2}" text-anchor="end" font-weight="bold">c_e=+${p.ce}</text>`;
      s += `<text x="${xL+30}" y="${yT-45}">c_{e1}=${p.ce1}</text>`;
      s += `<text x="${xR-30}" y="${yT-45}" text-anchor="end">c_{e2}=${p.ce2}</text>`;
      s += `<text x="${xR+120}" y="${(yB+yT)/2}" font-weight="bold">c_{e3}=${p.ce3}</text>`;
      const drawInd = (x, y, dir, isOut) => {
        const l = 30;
        const x1 = isOut ? x : x - dir*l;
        const x2 = isOut ? x + dir*l : x;
        s += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke-width="1" marker-end="url(#arrow-black)" />`;
      };
      for(let i=0; i<=6; i++) {
        const ty = yT + (yB-yT)*(i/6);
        drawInd(xL, ty, 1, false);
        drawInd(xR, ty, 1, true);
      }
      s += `<line x1="${xL}" y1="${yB+50}" x2="${xR}" y2="${yB+50}" stroke-width="0.5" />`;
      s += `<text x="${xM}" y="${yB+70}" text-anchor="middle">L = ${(p.L*1000)}</text>`;
    } else {
      const isLeft = mode === 'left';
      const c1 = isLeft ? qCol1 : qCol2;
      const c2 = isLeft ? qCol2 : qCol1;
      const r1 = isLeft ? qRoof1 : qRoof2;
      const r2 = isLeft ? qRoof2 : qRoof1;
      const drawPerp = (xa, ya, xb, yb, val, count) => {
        const dx = xb - xa, dy = yb - ya;
        const len = Math.sqrt(dx*dx + dy*dy);
        const nx = -dy/len, ny = dx/len; 
        const arrowLen = 35;
        s += `<path d="M ${xa + nx*arrowLen} ${ya + ny*arrowLen} L ${xb + nx*arrowLen} ${yb + ny*arrowLen}" stroke="#3b82f6" stroke-width="0.8" />`;
        for(let i=0; i<=count; i++){
          const px = xa + (dx*i/count), py = ya + (dy*i/count);
          s += `<line x1="${px}" y1="${py}" x2="${px + nx*arrowLen}" y2="${py + ny*arrowLen}" stroke="#3b82f6" marker-end="url(#arrow-blue)" />`;
        }
        s += `<text x="${(xa+xb)/2 + nx*(arrowLen+25)}" y="${(ya+yb)/2 + ny*(arrowLen+25)}" text-anchor="middle" fill="#3b82f6" font-size="10">${val.toFixed(2)}kN/m</text>`;
      };
      const drawColArrows = (x, y1, y2, val, side, isSuction) => {
        const arrowLen = 40;
        const dir = side * (isSuction ? 1 : -1);
        const xOuter = x + dir * arrowLen;
        s += `<line x1="${xOuter}" y1="${y1}" x2="${xOuter}" y2="${y2}" stroke="#3b82f6" stroke-width="0.8" />`;
        for(let i=0; i<=6; i++){
          const ty = y1 + (y2-y1)*(i/6);
          const xStart = isSuction ? x : xOuter;
          const xEnd = isSuction ? xOuter : x;
          s += `<line x1="${xStart}" y1="${ty}" x2="${xEnd}" y2="${ty}" stroke="#3b82f6" marker-end="url(#arrow-blue)" />`;
        }
        s += `<text x="${xOuter + dir*15}" y="${(y1+y2)/2}" text-anchor="${dir>0?'start':'end'}" fill="#3b82f6" font-weight="bold">${val.toFixed(2)}kN/m</text>`;
      };
      drawColArrows(xL, yB, yT, c1, isLeft ? -1 : 1, !isLeft);
      drawColArrows(xR, yB, yT, c2, isLeft ? 1 : -1, isLeft);
      drawPerp(xL, yT, xM, yP, r1, 6);
      drawPerp(xM, yP, xR, yT, r2, 6);
      s += `<line x1="${xL}" y1="${yB+40}" x2="${xR}" y2="${yB+40}" stroke-width="0.5" />`;
    }
    return s;
  };
  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#fff; font-family:'Times New Roman';">`;
  svg += `<style>line, polyline { stroke: #000; fill: none; stroke-width: 1.5; } text { fill: #000; font-size: 13px; }</style>`;
  svg += `<defs>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" /></marker>
    <marker id="arrow-black" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#000" /></marker>
  </defs>`;
  svg += `<g transform="translate(80, 60)">${drawSingle(120, 180, 'ce')}</g>`;
  svg += `<text x="${w/2}" y="320" text-anchor="middle" font-style="italic" font-weight="bold">a) Sơ đồ xác định hệ số khí động</text>`;
  svg += `<g transform="translate(80, 420)">${drawSingle(120, 180, 'left')}</g>`;
  svg += `<text x="${w/2}" y="680" text-anchor="middle" font-style="italic" font-weight="bold">b) Gió trái sang</text>`;
  svg += `<g transform="translate(80, 780)">${drawSingle(120, 180, 'right')}</g>`;
  svg += `<text x="${w/2}" y="1040" text-anchor="middle" font-style="italic" font-weight="bold">c) Gió phải sang</text>`;
  svg += `</svg>`;
  return svg;
}

// === Report Generator — Tải Trọng ===
function reportLoad() {
  const L = parseFloat($('spanL').value);
  const B = parseFloat($('stepB').value);
  const slope_pct = parseFloat($('roofSlope').value);
  const alpha_rad = Math.atan(slope_pct / 100);
  const cos_alpha = Math.cos(alpha_rad);
  const sin_alpha = Math.sin(alpha_rad);
  
  // Safe Crane Capacity Fallback
  const q_input = $('craneCapacity') || $('craneQ');
  const Q_val = q_input ? parseFloat(q_input.value) : 10;

  // Get Loads safely
  const g_mai = parseFloat($('loadRoof')?.value || '0.15');
  const g_tuong = parseFloat($('loadWall')?.value || '0.15');
  const g_xn = parseFloat($('loadRafter')?.value || '1.0');
  const g_dct = parseFloat($('loadDCT')?.value || '1.0');
  const gf1 = parseFloat($('gammaF1')?.value || '1.1');
  const gf2 = parseFloat($('gammaF2')?.value || '1.05');

  // Wind
  const w0 = parseFloat($('loadWindW0')?.value || '83');
  const gf_w = parseFloat($('gammaW')?.value || '1.2');
  const k = parseFloat($('loadWindK')?.value || '1.0');
  const ce_push = parseFloat($('ce_push')?.value || '0.8');
  const ce_roof1 = parseFloat($('ce_roof1')?.value || '-0.6');
  const ce_roof2 = parseFloat($('ce_roof2')?.value || '-0.4');
  const ce_pull = parseFloat($('ce_pull')?.value || '-0.5');

  // Crane
  const Pmax = parseFloat($('pmax_val')?.value || '70.7');
  const Pmin = parseFloat($('pmin_val')?.value || '21.1');
  const Kk = (parseFloat($('kk_val')?.value || '3200')) / 1000;
  const nc = parseFloat($('gammaNC')?.value || '0.85');
  const gp_crane = parseFloat($('gammaP_Crane')?.value || '1.1');
  const d_gap = parseFloat($('craneGap')?.value || '0.7');
  const Gxc_val = parseFloat($('g_trolley')?.value || '0.803');
  
  const L1 = parseFloat($('L1_val')?.value || '0.75');
  const h_col = (parseFloat($('hCol')?.value || '500')) / 1000;
  const ecc = L1 - 0.5 * h_col;

  const y1 = 1.0;
  const y2 = Math.max(0, 1 - Kk/B);
  const y3 = Math.max(0, 1 - d_gap/B);
  const y4 = Math.max(0, 1 - (Kk + d_gap)/B);
  const SumYi = y1 + y2 + y3 + y4;
  const YiText = `${y1} + ${y2.toFixed(3)} + ${y3.toFixed(3)} + ${y4.toFixed(3)}`;
  
  const Dmax = nc * gp_crane * Pmax * SumYi;
  const Dmin = nc * gp_crane * Pmin * SumYi;
  const Mmax_crane = Dmax * ecc;
  const Mmin_crane = Dmin * ecc;

  // Geometry
  const Hdr = parseFloat($('craneRailElev')?.value || '7.0');
  const Hk = parseFloat($('Hk')?.value || '1.0');
  const bk = (parseFloat($('gapLambda')?.value || '60')) / 1000;
  const H2 = Math.ceil((Hk + bk) * 10) / 10;
  const H = Hdr + H2;
  
  const hCol_m = (parseFloat($('hCol')?.value || '500')) / 1000;
  const hDCT = (parseFloat($('hDCT')?.value || '800')) / 1000;
  const Hr = 0.2; 
  const Ht = H2 + hDCT + Hr;
  const Hd = H - Ht;

  // Calculation
  const q_static = (gf1 * g_mai * B) / cos_alpha + gf2 * g_xn;
  const Gwall = gf1 * g_tuong * B * H;
  const Gdct = gf2 * g_dct * B;
  const Mdct = Gdct * ecc;

  const html = `
    <h3>3.3. TẢI TRỌNG TÁC DỤNG LÊN KHUNG NGANG</h3>
    <h4>3.3.1. Tải trọng thường xuyên (tĩnh tải)</h4>
    <p>Độ dốc mái i = ${slope_pct}% &rarr; &alpha; = ${(alpha_rad * 180 / Math.PI).toFixed(2)}&deg; (sin&alpha; = ${sin_alpha.toFixed(3)}; cos&alpha; = ${cos_alpha.toFixed(3)}).</p>
    <p>Tải trọng thường xuyên (tĩnh tải) tác dụng lên khung ngang bao gồm trọng lượng của các lớp mái, trọng lượng bản thân xà gồ, trọng lượng bản thân khung ngang và dầm cầu trục.</p>
    <p>Trọng lượng bản thân các tấm lợp, lớp cách nhiệt và xà gồ mái lấy ${g_mai} kN/m². Trọng lượng bản thân xà ngang chọn sơ bộ ${g_xn} kN/m. Tổng tĩnh tải phân bố tác dụng lên xà ngang:</p>
    
    <div class="formula-center">
      $$\\frac{${gf1} \\cdot ${g_mai} \\cdot ${B}}{${cos_alpha.toFixed(3)}} + ${gf2} \\cdot ${g_xn} = ${q_static.toFixed(2)} (kN/m).$$
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <div style="max-width: 650px; margin: 0 auto; border: 1px solid #eee; padding: 10px;">
        ${drawLoadSVG({
          L: L, H: H, H1: Hdr, slope: slope_pct,
          q: q_static, Gwall: Gwall, Gdct: Gdct, Mdct: Mdct
        })}
      </div>
      <p style="font-style: italic; margin-top: 10px;">Hình 3.3. Sơ đồ tính khung với tải trọng thường xuyên (tĩnh tải)</p>
    </div>

    <p>Trọng lượng bản thân của tôn tường và xà gồ tường lấy tương tự như với mái là ${g_tuong} kN/m². Quy thành tải tập trung đặt tại đỉnh cột:</p>
    <div class="formula-center">
      $$${gf1} \\cdot ${g_tuong} \\cdot ${B} \\cdot ${H.toFixed(1)} = ${Gwall.toFixed(2)} (kN).$$
    </div>

    <p>Trọng lượng bản thân dầm cầu trục chọn sơ bộ là ${g_dct} kN/m. Quy thành tải tập trung và mô men lệch tâm đặt tại cao trình vai cột:</p>
    <div class="formula-center">
      $$${gf2} \\cdot ${g_dct} \\cdot ${B} = ${Gdct.toFixed(1)} (kN);$$
      $$${Gdct.toFixed(1)} \\cdot (${L1.toFixed(2)} - 0,5 \\cdot ${h_col}) \\approx ${Gdct.toFixed(1)} \\cdot ${ecc.toFixed(2)} = ${Mdct.toFixed(2)} (kNm).$$
    </div>

    <h4>3.3.2. Hoạt tải mái</h4>
    <p>Theo TCVN 2737-1995 [2], trị số tiêu chuẩn của hoạt tải thi công hoặc sửa chữa mái (mái lợp tôn) là ${parseFloat($('loadLiveRoof').value)} kN/m², hệ số vượt tải là ${parseFloat($('gammaL').value)}.</p>
    <p>Quy đổi về tải trọng phân bố đều trên xà ngang (hình 3.4):</p>
    <div class="formula-center">
      $$\\frac{${parseFloat($('gammaL').value)} \\cdot ${parseFloat($('loadLiveRoof').value)} \\cdot ${B}}{${cos_alpha.toFixed(3)}} = ${ ((parseFloat($('gammaL').value) * parseFloat($('loadLiveRoof').value) * B) / cos_alpha).toFixed(2) } (kN/m).$$
    </div>

    <div style="text-align: center; margin-top: 30px;">
      <div style="max-width: 650px; margin: 0 auto; border: 1px solid #eee; padding: 10px;">
        ${drawLiveLoadSVG({
          L: L, H: H, slope: slope_pct,
          q: (parseFloat($('gammaL').value) * parseFloat($('loadLiveRoof').value) * B) / cos_alpha
        })}
      </div>
      <p style="font-style: italic; margin-top: 10px;">Hình 3.4. Sơ đồ tính khung với hoạt tải mái;</p>
      <p style="font-style: italic; font-size: 0.9rem;">a) Hoạt tải mái nửa trái; b) Hoạt tải mái nửa phải</p>
    </div>

    <h3>3.3.3. Tải trọng gió</h3>
    <p>Tải trọng gió tác dụng vào khung ngang gồm hai thành phần là gió tác dụng vào cột và gió tác dụng trên mái. Theo TCVN 2737-1995 [2], Hà Nội thuộc phân vùng gió II-B, có áp lực gió tiêu chuẩn w<sub>0</sub> = ${parseFloat($('loadWindW0').value)} kN/m², hệ số vượt tải là ${parseFloat($('gammaW').value)}.</p>
    <p>Căn cứ vào hình dạng mặt bằng nhà và góc dốc của mái, các hệ số khí động có thể xác định theo sơ đồ trong bảng III.3 phụ lục (xem hình 2.5). Nội suy ta có:</p>
    <p style="text-align: center;">c<sub>e1</sub> = ${$('ce_roof1').value}; c<sub>e2</sub> = ${$('ce_roof2').value}; c<sub>e3</sub> = ${$('ce_pull').value}</p>
    
    <p>- Tải trọng gió tác dụng lên cột:</p>
    <p>+ Phía đón gió:</p>
    <div class="formula-center">
      ${gf_w} . ${w0} . ${k} . ${ce_push} . ${B} = ${(gf_w * w0 * k * ce_push * B).toFixed(2)} (kN/m)
    </div>
    <p>+ Phía khuất gió:</p>
    <div class="formula-center">
      ${gf_w} . ${w0} . ${k} . ${Math.abs(ce_pull)} . ${B} = ${(gf_w * w0 * k * Math.abs(ce_pull) * B).toFixed(2)} (kN/m)
    </div>

    <p>- Tải trọng gió tác dụng trên mái:</p>
    <p>+ Phía đón gió:</p>
    <div class="formula-center">
      ${gf_w} . ${w0} . ${k} . ${Math.abs(ce_roof1)} . ${B} = ${(gf_w * w0 * k * Math.abs(ce_roof1) * B).toFixed(2)} (kN/m)
    </div>
    <p>+ Phía khuất gió:</p>
    <div class="formula-center">
      ${gf_w} . ${w0} . ${k} . ${Math.abs(ce_roof2)} . ${B} = ${(gf_w * w0 * k * Math.abs(ce_roof2) * B).toFixed(2)} (kN/m)
    </div>

    <div style="text-align: center; margin-top: 30px;">
      <div style="max-width: 650px; margin: 0 auto; border: 1px solid #eee; padding: 10px;">
        ${drawWindLoadSVG({
          L: L, H: H, slope: slope_pct, B: B,
          w0: w0, gw: gf_w, k: k,
          ce: ce_push, ce1: ce_roof1, ce2: ce_roof2, ce3: ce_pull
        })}
      </div>
      <p style="font-style: italic; margin-top: 10px; font-weight: bold;">Hình 3.5. Sơ đồ tính khung với tải trọng gió</p>
      <p style="font-style: italic; font-size: 0.9rem;">a) Sơ đồ xác định hệ số khí động; b) Gió trái sang; c) Gió phải sang</p>
    </div>

    <h3>3.3.4. Hoạt tải cầu trục</h3>
    <p>Theo bảng II.3 phụ lục, các thông số cầu trục sức nâng ${$('craneCapacity')?.value || '10'} tấn như sau:</p>
    <table class="report-table">
      <thead>
        <tr>
          <th>Nhịp L<sub>k</sub> (m)</th>
          <th>H<sub>k</sub> (mm)</th>
          <th>Z<sub>min</sub> (mm)</th>
          <th>B<sub>k</sub> (mm)</th>
          <th>K<sub>k</sub> (mm)</th>
          <th>G (T)</th>
          <th>G<sub>xc</sub> (T)</th>
          <th>P<sub>max</sub> (kN)</th>
          <th>P<sub>min</sub> (kN)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${$('Lk')?.value || '22.5'}</td>
          <td>${$('Hk')?.value || '1.0'}</td>
          <td>${$('gapLambda')?.value || '60'}</td>
          <td>${$('Bk')?.value || '4400'}</td>
          <td>${$('kk_val')?.value || '3200'}</td>
          <td>${$('g_crane')?.value || '8.36'}</td>
          <td>${$('g_trolley')?.value || '0.803'}</td>
          <td>${$('pmax_val')?.value || '70.7'}</td>
          <td>${$('pmin_val')?.value || '21.1'}</td>
        </tr>
      </tbody>
    </table>

    <p>Tải trọng cầu trục tác dụng lên khung ngang bao gồm áp lực đứng và lực hãm ngang, xác định như sau:</p>
    <h4>a) Áp lực đứng của cầu trục</h4>
    <p>Tải trọng thẳng đứng của bánh xe cầu trục tác dụng lên cột thông qua dầm cầu trục được xác định bằng cách dùng đường ảnh hưởng phản lực gối tựa của dầm và xếp các bánh xe của 2 cầu trục sát nhau vào vị trí bất lợi nhất (Hình 3.6), xác định được các tung độ $y_i$ của đường ảnh hưởng, từ đó xác định được áp lực thẳng đứng lớn nhất và nhỏ nhất của các bánh xe cầu trục lên cột:</p>
    
    <div class="formula-center">
      <p>$$D_{max} = n_c \\cdot \\gamma_P \\cdot \\sum P_{max} \\cdot y_i = ${nc} \\cdot ${gp_crane} \\cdot ${Pmax} \\cdot (${YiText}) = ${Dmax.toFixed(1)} \\text{ (kN)};$$</p>
      <p>$$D_{min} = n_c \\cdot \\gamma_P \\cdot \\sum P_{min} \\cdot y_i = ${nc} \\cdot ${gp_crane} \\cdot ${Pmin} \\cdot (${YiText}) = ${Dmin.toFixed(1)} \\text{ (kN)}.$$</p>
    </div>
    
    <p>Ở trên: $\\sum y_i = ${SumYi.toFixed(3)}$.</p>

    <div style="text-align: center; margin: 30px 0;">
      <div style="max-width: 650px; margin: 0 auto; border: 1px solid #eee; padding: 10px;">
        ${drawCraneInfluenceSVG({ B: B, K: Kk, gap: d_gap })}
      </div>
      <p style="font-style: italic; margin-top: 10px;">Hình 3.6. Đường ảnh hưởng để xác định $D_{max}, D_{min}$</p>
    </div>

    <p>Các lực $D_{max}$ và $D_{min}$ thông qua ray và dầm cầu trục sẽ truyền vào vai cột, do đó sẽ lệch tâm so với trục cột là $e = L_1 - 0.5h \\approx ${ecc.toFixed(2)} \\text{ m}$. Trị số của các mômen lệch tâm tương ứng:</p>
    
    <div class="formula-center">
      <p>$$M_{max} = D_{max} \\cdot e = ${Dmax.toFixed(1)} \\cdot ${ecc.toFixed(2)} = ${Mmax_crane.toFixed(2)} \\text{ (kNm)};$$</p>
      <p>$$M_{min} = D_{min} \\cdot e = ${Dmin.toFixed(1)} \\cdot ${ecc.toFixed(2)} = ${Mmin_crane.toFixed(2)} \\text{ (kNm)}.$$</p>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <div style="max-width: 750px; margin: 0 auto; border: 1px solid #eee; padding: 10px;">
        ${drawCraneLoadFrameSVG({ Dmax, Dmin, Mmax: Mmax_crane, Mmin: Mmin_crane, Ht, Hd })}
      </div>
      <p style="font-style: italic; margin-top: 10px;">Hình 3.7. Sơ đồ tính khung với áp lực đứng của cầu trục</p>
    </div>

    <h4>b) Lực hãm ngang của cầu trục</h4>
    <p>Lực hãm ngang tiêu chuẩn của một bánh xe cầu trục lên ray được xác định theo công thức:</p>
    <div class="formula-center">
      $$T_1^{tc} = \\frac{0,05(Q + G_{xc})}{n_0}$$
    </div>
    <p>Trong đó:</p>
    <ul>
      <li>$Q = ${Q_val * 10} \\text{ kN}$ (sức nâng cầu trục).</li>
      <li>$G_{xc} = ${(Gxc_val * 10).toFixed(2)} \\text{ kN}$ (trọng lượng xe con).</li>
      <li>$n_0 = 2$ (số bánh xe một bên ray).</li>
    </ul>
    <p>&rarr; $T_1^{tc} = \\frac{0,05(${Q_val * 10} + ${(Gxc_val * 10).toFixed(2)})}{2} = ${ (0.05 * (Q_val * 10 + Gxc_val * 10) / 2).toFixed(2) } \\text{ (kN)}$.</p>
    
    <p>Lực hãm ngang của toàn cầu trục truyền lên cột đặt vào cao trình dầm hãm (giả thiết tại cao trình vai cột):</p>
    <div class="formula-center">
      $$T = n_c \\cdot \\gamma_P \\cdot \\sum T_1^{tc} \\cdot y_i = ${nc} \\cdot ${gp_crane} \\cdot ${ (0.05 * (Q_val * 10 + Gxc_val * 10) / 2).toFixed(2) } \\cdot ${SumYi.toFixed(3)} = ${ (nc * gp_crane * (0.05 * (Q_val * 10 + Gxc_val * 10) / 2) * SumYi).toFixed(2) } \\text{ (kN)}.$$
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <div style="max-width: 750px; margin: 0 auto; border: 1px solid #eee; padding: 10px;">
        ${drawCraneBrakingSVG({ 
          Ht: Ht, 
          Hd: Hd, 
          T: nc * gp_crane * (0.05 * (Q_val * 10 + Gxc_val * 10) / 2) * SumYi
        })}
      </div>
      <p style="font-style: italic; margin-top: 10px;">Hình 3.8. Sơ đồ tính khung với lực hãm ngang của cầu trục</p>
    </div>
  `;

  appendToReport(html, 'report-load');
}

// === Report Generator — Kích Thước Khung ===
function reportFrame() {
  updateFrameDimensions();
  const L = $('spanL').value;
  const Hdr = parseFloat($('craneRailElev').value);
  const Hk = parseFloat($('Hk').value);
  const bk = parseFloat($('gapLambda').value) / 1000;
  const H2_calc = Hk + bk;
  const H2 = Math.ceil(H2_calc * 10) / 10; // Rounded like "Chọn H2 = 1,3m"
  
  const H3 = 0; // Giả thiết móng ở cốt 0
  const H = Hdr + H2 + H3;
  
  const hDCT = parseFloat($('hDCT').value) / 1000;
  const Hr = 0.2; // Chiều cao ray + đệm (theo ảnh mẫu)
  const Ht = H2 + hDCT + Hr;
  const Hd = H - Ht;

  const html = `
    <h3>3.2. XÁC ĐỊNH CÁC KÍCH THƯỚC CHÍNH CỦA KHUNG NGANG</h3>
    <h4>3.2.1. Theo phương đứng</h4>
    <p>Chiều cao từ mặt ray cầu trục đến đáy xà ngang:</p>
    <div class="formula-center">
      $$H_2 = H_k + b_k = ${Hk} + ${bk} = ${H2_calc.toFixed(2)} (m).$$
    </div>
    <p>Với: H<sub>k</sub> = ${Hk} m - tra catalo cầu trục (bảng II.3 phụ lục);</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; b<sub>k</sub> = ${bk} m - khe hở an toàn giữa cầu trục và xà ngang.</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &rarr; Chọn H<sub>2</sub> = ${H2} m.</p>

    <p>Chiều cao của cột khung, tính từ mặt móng đến đáy xà ngang:</p>
    <div class="formula-center">
      $$H = H_1 + H_2 + H_3 = ${Hdr} + ${H2} + ${H3} = ${H.toFixed(1)} (m).$$
    </div>
    <p>trong đó: H<sub>1</sub> - cao trình đỉnh ray, H<sub>1</sub> = ${Hdr} m;</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; H<sub>3</sub> - phần cột chôn dưới nền, coi mặt móng ở cốt &plusmn;0.000 (H<sub>3</sub> = 0).</p>

    <p>Chiều cao của phần cột tính từ vai cột đỡ dầm cầu trục đến đáy xà ngang:</p>
    <div class="formula-center">
      $$H_t = H_2 + H_{dct} + H_r = ${H2} + ${hDCT} + ${Hr} = ${Ht.toFixed(1)} (m).$$
    </div>

    <p>Chiều cao của phần cột tính từ mặt móng đến mặt trên của vai cột:</p>
    <div class="formula-center">
      $$H_d = H - H_t = ${H.toFixed(1)} - ${Ht.toFixed(1)} = ${Hd.toFixed(1)} (m).$$
    </div>

    <h4>3.2.2. Theo phương ngang</h4>
    <p>Coi trục định vị trùng với mép ngoài của cột (a = 0). Khoảng cách từ trục định vị đến trục ray cầu trục:</p>
    <div class="formula-center">
      <p>$$L_1 = \\frac{L - L_k}{2} = \\frac{${L} - ${$('Lk').value}}{2} = ${( (L - $('Lk').value) / 2 ).toFixed(2)} (m).$$</p>
    </div>
    
    <p>Chiều cao tiết diện cột chọn theo yêu cầu độ cứng:</p>
    <div class="formula-center">
      <p>$$h = \\left( \\frac{1}{15} \\div \\frac{1}{20} \\right)H = \\left( \\frac{1}{15} \\div \\frac{1}{20} \\right)${H.toFixed(1)} = (${(H/15).toFixed(2)} \\div ${(H/20).toFixed(2)}) \\text{ m}.$$</p>
    </div>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &rarr; Chọn h = ${$('hCol').value / 10} cm.</p>

    <p>Kiểm tra khe hở giữa cầu trục và cột khung:</p>
    <div class="formula-center">
      <p>$$z = L_1 - h = ${( (L - $('Lk').value) / 2 ).toFixed(2)} - ${($('hCol').value / 1000).toFixed(2)} = ${( (L - $('Lk').value) / 2 - ($('hCol').value / 1000) ).toFixed(2)} (m) > z_{min} = 0,18 \\text{ m}.$$</p>
    </div>

    <div style="text-align: center; margin-top: 30px;">
      <div style="max-width: 650px; margin: 0 auto; border: 1px solid #eee; padding: 10px;">
        ${drawFrameSVG({
          L: parseFloat(L),
          H: H,
          H1_val: Hdr,
          Hd: Hd,
          Ht: Ht,
          Lk: parseFloat($('Lk').value),
          Hk: Hk,
          slope: parseFloat($('roofSlope').value)
        })}
      </div>
      <p style="font-style: italic; margin-top: 10px;">Hình 3.1. Các kích thước chính của khung ngang</p>
    </div>

    <h3>3.2.3. Sơ đồ tính khung ngang</h3>
    <p>Do sức nâng cầu trục không lớn nên chọn phương án cột tiết diện không đổi, với độ cứng là I<sub>1</sub>.</p>
    <p>Vì nhịp khung là ${L} m nên chọn phương án xà ngang có tiết diện thay đổi hình nêm, dự kiến vị trí thay đổi tiết diện cách đầu xà ${Math.round(L/6)} m. Với đoạn xà dài ${Math.round(L/6)} m, độ cứng ở đầu và cuối xà là I<sub>1</sub> và I<sub>2</sub> tương ứng (giả thiết độ cứng của xà và cột tại chỗ liên kết xà-cột như nhau).</p>
    <p>Với đoạn xà dài ${ (L/2 - Math.round(L/6)).toFixed(1) } m, độ cứng ở đầu và cuối xà giả thiết bằng I<sub>2</sub> (tiết diện không đổi). Giả thiết sơ bộ tỷ số độ cứng I<sub>1</sub>/I<sub>2</sub> = 2,818.</p>
    <p>Do nhà có cầu trục nên chọn kiểu liên kết giữa cột khung với móng là ngàm tại mặt móng (cốt &plusmn;0.000). Liên kết giữa cột với xà ngang và liên kết tại đỉnh xà ngang là cứng.</p>
    <p>Trục cột khung lấy trùng với trục định vị để đơn giản hoá tính toán và thiên về an toàn. Sơ đồ tính khung ngang như hình 3.2.</p>
    
    <div style="text-align: center; margin-top: 30px;">
      <div style="max-width: 650px; margin: 0 auto; border: 1px solid #eee; padding: 10px;">
        ${drawModelSVG({
          L: parseFloat(L),
          H: H,
          slope: parseFloat($('roofSlope').value)
        })}
      </div>
      <p style="font-style: italic; margin-top: 10px;">Hình 3.2. Sơ đồ tính khung ngang</p>
    </div>
  `;
  
  // Custom append to match style
  const paper = $('reportPaper');
  const empty = paper.querySelector('.report-empty');
  if (empty) empty.remove();
  
  const old = document.getElementById('report-frame');
  if (old) old.remove();

  const section = document.createElement('div');
  section.id = 'report-frame';
  section.className = 'report-section';
  section.innerHTML = html;
  paper.appendChild(section);

  renderMath(section);
  
  navItems.forEach(n => n.classList.remove('active'));
  $('nav-report').classList.add('active');
  tabs.forEach(t => t.classList.remove('active'));
  $('tab-report').classList.add('active');
  $('pageTitle').textContent = 'Thuyết Minh';
  section.scrollIntoView({ behavior: 'smooth' });
}

// === Append HTML to report paper ===
function appendToReport(html, sectionId) {
  const paper = $('reportPaper');
  // Xóa placeholder nếu còn
  const empty = paper.querySelector('.report-empty');
  if (empty) empty.remove();

  // Xóa section cũ nếu đã tồn tại (để cập nhật)
  const old = document.getElementById(sectionId);
  if (old) old.remove();

  // Thêm section mới
  const section = document.createElement('div');
  section.id = sectionId;
  section.className = 'report-section';
  section.innerHTML = html;
  paper.appendChild(section);

  // Render KaTeX
  renderMath(section);

  // Chuyển sang tab Thuyết Minh
  navItems.forEach(n => n.classList.remove('active'));
  $('nav-report').classList.add('active');
  tabs.forEach(t => t.classList.remove('active'));
  $('tab-report').classList.add('active');
  $('pageTitle').textContent = 'Thuyết Minh';

  // Scroll to section
  section.scrollIntoView({ behavior: 'smooth' });
}

// === Word Export ===
function exportWord() {
  const content = $('reportPaper').innerHTML;
  if (!content || $('reportPaper').querySelector('.report-empty')) {
    alert('Chưa có nội dung thuyết minh!');
    return;
  }
  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
    <head><meta charset="utf-8"><style>body{font-family:'Times New Roman';font-size:13pt}table{border-collapse:collapse;width:100%}th,td{border:1px solid #000;padding:6px 10px}h2{color:#1a365d;font-size:16pt}h3{font-size:14pt}h4{font-size:13pt;font-style:italic}.formula-block{background:#f0f4ff;border-left:3px solid #3b82f6;padding:12px 16px;margin:10px 0}</style></head>
    <body>${content}</body></html>`;
  const blob = new Blob([html], { type: 'application/msword' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'ThuvetMinh_KetCauThep.doc';
  a.click();
  URL.revokeObjectURL(a.href);
}

// === Event Bindings ===
$('btnCalc').addEventListener('click', calculate);
$('btnCalcMain').addEventListener('click', calculate);
$('btnReportInput').addEventListener('click', reportInput);
$('btnReportFrame').addEventListener('click', reportFrame);
$('btnReportLoad').addEventListener('click', reportLoad);
$('btnPrint').addEventListener('click', () => window.print());
$('btnExport').addEventListener('click', () => alert('Chức năng xuất HTML sẽ được cập nhật sau.'));
$('btnWord').addEventListener('click', exportWord);

// Crane lookup bindings
const syncCraneQ = (e) => {
  const val = e.target.value;
  if ($('craneQ_Input')) $('craneQ_Input').value = val;
  if ($('craneQ')) $('craneQ').value = val;
  updateCraneLookup();
};

$('craneCapacity')?.addEventListener('change', syncCraneQ);
$('craneQ_Input')?.addEventListener('change', (e) => {
  if ($('craneCapacity')) $('craneCapacity').value = e.target.value;
  if ($('craneQ')) $('craneQ').value = e.target.value;
  updateCraneLookup();
});
$('Lk_Input')?.addEventListener('change', updateCraneLookup);
// Trigger lookup if L changes (L1 might change)
$('spanL')?.addEventListener('change', updateCraneLookup);

updateCraneLookup(); 

// === Report Generator — Thiết Kế Tiết Diện ===
function reportSectionDesign() {
  const L = parseFloat($('spanL')?.value || 24);
  const Hdr = parseFloat($('craneRailElev')?.value || 7.0);
  const Hk = parseFloat($('Hk')?.value || 1.0);
  const bk = (parseFloat($('gapLambda')?.value || 60)) / 1000;
  const H2 = Math.ceil((Hk + bk) * 10) / 10;
  const H3 = 0;
  const H = Hdr + H2 + H3;

  const I_ratio = parseFloat($('stiffnessRatio')?.value || 1.0);
  const ly = parseFloat($('lyVal')?.value || 3.5);

  const n = I_ratio * (H / L);
  const mu = Math.sqrt((n + 0.56) / (n + 0.14));
  const lx = mu * H;

  let html = `
    <h3>3.5. THIẾT KẾ TIẾT DIỆN CẤU KIỆN</h3>
    <h4>3.5.1. Thiết kế tiết diện cột</h4>
    <p><em>a) Xác định chiều dài tính toán</em></p>
    <p>Chọn phương án cột tiết diện không đổi. Với tỷ số độ cứng của xà và cột đã giả thiết là bằng nhau (mục 3.2.3), ta có:</p>
    <div class="formula-center">
      $$n = \\left( \\frac{I_{xa}}{L} \\right) : \\left( \\frac{I_{cot}}{H} \\right) = ${I_ratio} \\cdot \\frac{${H.toFixed(1)}}{${L}} = ${n.toFixed(3)}$$
    </div>
    <p>Theo (2.25) có:</p>
    <div class="formula-center">
      $$\\mu = \\sqrt{\\frac{n + 0.56}{n + 0.14}} = \\sqrt{\\frac{${n.toFixed(3)} + 0.56}{${n.toFixed(3)} + 0.14}} = ${mu.toFixed(3)}$$
    </div>
    <p>Vậy chiều dài tính toán trong mặt phẳng khung của cột xác định theo công thức (2.23):</p>
    <div class="formula-center">
      $$l_x = \\mu H = ${mu.toFixed(3)} \\cdot ${H.toFixed(1)} = ${lx.toFixed(2)} \\text{ (m)}.$$
    </div>
    <p>Chiều dài tính toán của cột theo phương ngoài mặt phẳng khung ($l_y$) lấy bằng khoảng cách giữa các điểm cố định không cho cột chuyển vị theo phương dọc nhà (dầm cầu trục, giằng cột, xà ngang...). Giả thiết bố trí giằng cột dọc nhà bằng thép hình chữ C tại cao trình +3.500, tức là khoảng giữa phần cột tính từ mặt móng đến dầm hãm, nên $l_y = ${ly.toFixed(1)} \\text{ m}$.</p>
  `;

  // === Phần b) Chọn và kiểm tra tiết diện ===
  const N_val = parseFloat($('designN')?.value || '-224.83');
  const M_val = parseFloat($('designM')?.value || '-156.17');
  const V_val = parseFloat($('designV')?.value || '-44.8');
  
  const absN = Math.abs(N_val);
  const absM = Math.abs(M_val);

  const h_assumed_mm = parseFloat($('sec_h')?.value || 400);
  const bf_assumed_mm = parseFloat($('sec_bf')?.value || 200);
  const tw_assumed_mm = parseFloat($('sec_tw')?.value || 8);
  const tf_assumed_mm = parseFloat($('sec_tf')?.value || 12);
  
  const h_cm = h_assumed_mm / 10;
  const bf_cm = bf_assumed_mm / 10;
  const tw_cm = tw_assumed_mm / 10;
  const tf_cm = tf_assumed_mm / 10;

  const hw_cm = h_cm - 2 * tf_cm;
  const A_cm2 = tw_cm * hw_cm + 2 * (tf_cm * bf_cm);
  
  // Ix = bf*h^3/12 - 2 * [0.5*(bf-tw)*hw^3/12] = bf*h^3/12 - (bf-tw)*hw^3/12
  const Ix_cm4 = (bf_cm * Math.pow(h_cm, 3)) / 12 - ((bf_cm - tw_cm) * Math.pow(hw_cm, 3)) / 12;
  const Iy_cm4 = (Math.pow(tw_cm, 3) * hw_cm) / 12 + 2 * (tf_cm * Math.pow(bf_cm, 3)) / 12;
  const Wx_cm3 = Ix_cm4 * 2 / h_cm;
  
  const ix_cm = Math.sqrt(Ix_cm4 / A_cm2);
  const iy_cm = Math.sqrt(Iy_cm4 / A_cm2);
  
  const lambda_x = (lx * 100) / ix_cm;
  const lambda_y = (ly * 100) / iy_cm;
  
  const fy = parseFloat($('fy')?.value || 21.1);
  const E_val = parseFloat($('E')?.value || 21000);
  
  const lambda_bar_x = lambda_x * Math.sqrt(fy / E_val);
  const lambda_bar_y = lambda_y * Math.sqrt(fy / E_val);
  
  const mx = (absM * 100 / absN) * (A_cm2 / Wx_cm3);

  const H_cm = H * 100;
  const ly_cm = ly * 100;

  const h_min1 = (1/15) * H_cm;
  const h_min2 = (1/20) * H_cm;

  const bf_min1 = 0.3 * h_cm;
  const bf_min2 = 0.5 * h_cm;
  const bf_min3 = (1/20) * ly_cm;
  const bf_min4 = (1/30) * ly_cm;

  const Ayc_1 = (absN / fy) * (1.25 + 2.2 * (absM * 100) / (h_cm * absN));
  const Ayc_2 = (absN / fy) * (1.25 + 2.8 * (absM * 100) / (h_cm * absN));

  const tw_min1 = (1/70) * h_cm;
  const tw_min2 = (1/100) * h_cm;

  html += `
    <p><em>b) Chọn và kiểm tra tiết diện</em></p>
    <p>Từ bảng tổ hợp nội lực chọn cặp nội lực tính toán:</p>
    <div style="margin-left: 40px; margin-bottom: 10px;">
      <p>N = ${N_val} kN</p>
      <p>M = ${M_val} kNm</p>
      <p>V = ${V_val} kN</p>
    </div>
    <p>Đây là cặp nội lực tại tiết diện dưới vai, trong tổ hợp nội lực do các trường hợp tải trọng gây ra.</p>
    
    <p>Chiều cao tiết diện cột chọn từ điều kiện độ cứng:</p>
    <div class="formula-center">
      $$h = \\left(\\frac{1}{15} \\div \\frac{1}{20}\\right)H = (${h_min1.toFixed(1)} \\div ${h_min2.toFixed(1)}) \\text{ cm} \\rightarrow \\text{Chọn } h = ${h_cm} \\text{ cm}.$$
    </div>
    
    <p>Bề rộng tiết diện cột chọn theo các điều kiện cấu tạo và độ cứng:</p>
    <div class="formula-center">
      <p>$$b_f = (0.3 \\div 0.5)h = (${bf_min1.toFixed(1)} \\div ${bf_min2.toFixed(1)}) \\text{ cm};$$</p>
      <p>$$b_f = \\left(\\frac{1}{20} \\div \\frac{1}{30}\\right)l_y = (${bf_min3.toFixed(1)} \\div ${bf_min4.toFixed(1)}) \\text{ cm} \\rightarrow \\text{Chọn } b_f = ${bf_cm} \\text{ cm}.$$</p>
    </div>

    <p>Diện tích tiết diện cần thiết của cột xác định sơ bộ theo (2.29):</p>
    <div class="formula-center">
      $$A_{yc} = \\frac{${absN}}{${fy}} \\left[ 1.25 + (2.2 \\div 2.8) \\frac{${absM} \\cdot 10^2}{${h_cm} \\cdot ${absN}} \\right] = (${Ayc_1.toFixed(1)} \\div ${Ayc_2.toFixed(1)}) \\text{ (cm}^2\\text{)}.$$
    </div>

    <p>Bề dày bản bụng:</p>
    <div class="formula-center">
      $$t_w = \\left(\\frac{1}{70} \\div \\frac{1}{100}\\right)h \\geq 0.6 \\text{ cm} \\rightarrow \\text{Chọn } t_w = ${tw_cm} \\text{ cm}.$$
    </div>
  `;

  // --- SVG DRAWING FOR H-SECTION ---
  const svg_W = h_assumed_mm; 
  const svg_H = bf_assumed_mm; 
  const draw_tw = Math.max(tw_assumed_mm, svg_W * 0.015);
  const draw_tf = Math.max(tf_assumed_mm, svg_W * 0.025);
  const hw_mm = h_assumed_mm - 2 * tf_assumed_mm;
  const pad_x = 80;
  const pad_y = 70;

  const svg_html = `
    <p>Tiết diện cột chọn như sau (hình 3.20):</p>
    <div style="text-align: center; margin: 25px 0;">
      <svg viewBox="-${svg_W/2 + pad_x} -${svg_H/2 + pad_y} ${svg_W + 2*pad_x} ${svg_H + 2*pad_y}" width="100%" style="max-width: 500px; height: auto;">
        <style>
          .dim-line { stroke: #333; stroke-width: 1.5; }
          .dim-text { font-family: 'Times New Roman', serif; font-size: 16px; fill: #333; text-anchor: middle; font-style: italic; }
          .sec-line { fill: #f8fafc; stroke: #0f172a; stroke-width: 3; stroke-linejoin: round; }
          .axis-line { stroke: #64748b; stroke-width: 1; stroke-dasharray: 10,5,3,5; }
        </style>
        
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#333" />
          </marker>
          <marker id="arrow-rev" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#333" />
          </marker>
        </defs>

        <!-- Y Axis -->
        <line x1="-${svg_W/2 + 50}" y1="0" x2="${svg_W/2 + 50}" y2="0" class="axis-line" />
        <text x="-${svg_W/2 + 60}" y="5" class="dim-text">y</text>
        <text x="${svg_W/2 + 60}" y="5" class="dim-text">y</text>
        
        <!-- X Axis -->
        <line x1="0" y1="-${svg_H/2 + 40}" x2="0" y2="${svg_H/2 + 40}" class="axis-line" />
        <text x="0" y="-${svg_H/2 + 50}" class="dim-text">x</text>
        <text x="0" y="${svg_H/2 + 60}" class="dim-text">x</text>
        
        <!-- Profile -->
        <path d="
          M -${svg_W/2},-${svg_H/2} 
          L -${svg_W/2 - draw_tf},-${svg_H/2} 
          L -${svg_W/2 - draw_tf},-${draw_tw/2} 
          L ${svg_W/2 - draw_tf},-${draw_tw/2} 
          L ${svg_W/2 - draw_tf},-${svg_H/2} 
          L ${svg_W/2},-${svg_H/2} 
          L ${svg_W/2},${svg_H/2} 
          L ${svg_W/2 - draw_tf},${svg_H/2} 
          L ${svg_W/2 - draw_tf},${draw_tw/2} 
          L -${svg_W/2 - draw_tf},${draw_tw/2} 
          L -${svg_W/2 - draw_tf},${svg_H/2} 
          L -${svg_W/2},${svg_H/2} Z" class="sec-line" />
          
        <!-- Total Width (Bottom) -->
        <line x1="-${svg_W/2}" y1="${svg_H/2 + 20}" x2="-${svg_W/2}" y2="${svg_H/2 + 40}" class="dim-line" />
        <line x1="${svg_W/2}" y1="${svg_H/2 + 20}" x2="${svg_W/2}" y2="${svg_H/2 + 40}" class="dim-line" />
        <line x1="-${svg_W/2}" y1="${svg_H/2 + 30}" x2="${svg_W/2}" y2="${svg_H/2 + 30}" class="dim-line" marker-start="url(#arrow)" marker-end="url(#arrow)" />
        <text x="0" y="${svg_H/2 + 25}" class="dim-text">${h_assumed_mm}</text>

        <!-- Flange Width (Right) -->
        <line x1="${svg_W/2 + 20}" y1="-${svg_H/2}" x2="${svg_W/2 + 40}" y2="-${svg_H/2}" class="dim-line" />
        <line x1="${svg_W/2 + 20}" y1="${svg_H/2}" x2="${svg_W/2 + 40}" y2="${svg_H/2}" class="dim-line" />
        <line x1="${svg_W/2 + 30}" y1="-${svg_H/2}" x2="${svg_W/2 + 30}" y2="${svg_H/2}" class="dim-line" marker-start="url(#arrow)" marker-end="url(#arrow)" />
        <text x="${svg_W/2 + 45}" y="5" class="dim-text" transform="rotate(-90, ${svg_W/2 + 45}, 5)">${bf_assumed_mm}</text>

        <!-- Top Dimensions (tf, hw, tf) -->
        <line x1="-${svg_W/2}" y1="-${svg_H/2 + 20}" x2="-${svg_W/2}" y2="-${svg_H/2 + 40}" class="dim-line" />
        <line x1="-${svg_W/2 - draw_tf}" y1="-${svg_H/2 + 20}" x2="-${svg_W/2 - draw_tf}" y2="-${svg_H/2 + 40}" class="dim-line" />
        <line x1="${svg_W/2 - draw_tf}" y1="-${svg_H/2 + 20}" x2="${svg_W/2 - draw_tf}" y2="-${svg_H/2 + 40}" class="dim-line" />
        <line x1="${svg_W/2}" y1="-${svg_H/2 + 20}" x2="${svg_W/2}" y2="-${svg_H/2 + 40}" class="dim-line" />
        
        <!-- Left tf -->
        <line x1="-${svg_W/2 + 30}" y1="-${svg_H/2 + 30}" x2="-${svg_W/2}" y2="-${svg_H/2 + 30}" class="dim-line" marker-end="url(#arrow)" />
        <line x1="-${svg_W/2 - draw_tf}" y1="-${svg_H/2 + 30}" x2="-${svg_W/2 - draw_tf + 30}" y2="-${svg_H/2 + 30}" class="dim-line" marker-start="url(#arrow-rev)" />
        <text x="-${svg_W/2 - draw_tf/2}" y="-${svg_H/2 + 40}" class="dim-text">${tf_assumed_mm}</text>

        <!-- Center hw -->
        <line x1="-${svg_W/2 - draw_tf}" y1="-${svg_H/2 + 30}" x2="${svg_W/2 - draw_tf}" y2="-${svg_H/2 + 30}" class="dim-line" marker-start="url(#arrow)" marker-end="url(#arrow)" />
        <text x="0" y="-${svg_H/2 + 40}" class="dim-text">${hw_mm}</text>

        <!-- Right tf -->
        <line x1="${svg_W/2 - draw_tf - 30}" y1="-${svg_H/2 + 30}" x2="${svg_W/2 - draw_tf}" y2="-${svg_H/2 + 30}" class="dim-line" marker-end="url(#arrow)" />
        <line x1="${svg_W/2}" y1="-${svg_H/2 + 30}" x2="${svg_W/2 + 30}" y2="-${svg_H/2 + 30}" class="dim-line" marker-start="url(#arrow-rev)" />
        <text x="${svg_W/2 - draw_tf/2}" y="-${svg_H/2 + 40}" class="dim-text">${tf_assumed_mm}</text>
        
        <!-- Web Thickness tw -->
        <text x="15" y="-15" class="dim-text">${tw_assumed_mm}</text>
        <line x1="15" y1="-12" x2="0" y2="-${draw_tw/2}" class="dim-line" marker-end="url(#arrow)" />
        <line x1="15" y1="12" x2="0" y2="${draw_tw/2}" class="dim-line" marker-end="url(#arrow)" />
      </svg>
      <div style="font-style: italic; margin-top: 10px; font-weight: bold; color: #1e293b;">Hình 3.20. Tiết diện cột</div>
    </div>
    <div style="margin-left: 40px; margin-bottom: 10px;">
      <p>+ Bản cánh: (${tf_cm} × ${bf_cm}) cm.</p>
      <p>+ Bản bụng: (${tw_cm} × ${hw_cm}) cm.</p>
    </div>
  `;
  html += svg_html;

  html += `
    <p>Tính các đặc trưng hình học của tiết diện đã chọn:</p>
    <div class="formula-center">
      <p>$$A = ${tw_cm} \\cdot ${hw_cm} + 2 \\cdot (${tf_cm} \\cdot ${bf_cm}) = ${A_cm2.toFixed(1)} \\text{ (cm}^2\\text{)};$$</p>
      <p>$$I_x = \\frac{${bf_cm} \\cdot ${h_cm}^3}{12} - 2 \\cdot \\left[ \\frac{0,5 \\cdot (${bf_cm} - ${tw_cm}) \\cdot ${hw_cm}^3}{12} \\right] = ${Math.round(Ix_cm4)} \\text{ (cm}^4\\text{)};$$</p>
      <p>$$I_y = \\frac{${tw_cm}^3 \\cdot ${hw_cm}}{12} + 2 \\cdot \\frac{${tf_cm} \\cdot ${bf_cm}^3}{12} = ${Math.round(Iy_cm4)} \\text{ (cm}^4\\text{)}; \\quad W_x = ${Math.round(Ix_cm4)} \\cdot 2 / ${h_cm} = ${Math.round(Wx_cm3)} \\text{ (cm}^3\\text{)};$$</p>
      <p>$$i_x = \\sqrt{\\frac{${Math.round(Ix_cm4)}}{${A_cm2.toFixed(1)}}} = ${ix_cm.toFixed(2)} \\text{ (cm)}; \\quad i_y = \\sqrt{\\frac{${Math.round(Iy_cm4)}}{${A_cm2.toFixed(1)}}} = ${iy_cm.toFixed(2)} \\text{ (cm)};$$</p>
      <p>$$\\lambda_x = \\frac{l_x}{i_x} = \\frac{${lx.toFixed(2)} \\cdot 10^2}{${ix_cm.toFixed(2)}} = ${Math.round(lambda_x)} < [\\lambda] = 120; \\quad \\lambda_y = \\frac{l_y}{i_y} = \\frac{${ly.toFixed(2)} \\cdot 10^2}{${iy_cm.toFixed(2)}} = ${Math.round(lambda_y)} < [\\lambda] = 120;$$</p>
      <p>$$\\overline{\\lambda_x} = \\lambda_x \\sqrt{\\frac{f}{E}} = ${Math.round(lambda_x)} \\cdot \\sqrt{\\frac{${fy}}{${(E_val/10000).toFixed(1)} \\cdot 10^4}} = ${lambda_bar_x.toFixed(2)}; \\quad \\overline{\\lambda_y} = \\lambda_y \\sqrt{\\frac{f}{E}} = ${Math.round(lambda_y)} \\cdot \\sqrt{\\frac{${fy}}{${(E_val/10000).toFixed(1)} \\cdot 10^4}} = ${lambda_bar_y.toFixed(2)};$$</p>
      <p>$$m_x = \\frac{M}{N} \\frac{A}{W_x} = \\frac{${absM} \\cdot 10^2}{${absN}} \\frac{${A_cm2.toFixed(1)}}{${Math.round(Wx_cm3)}} = ${mx.toFixed(2)}.$$</p>
    </div>
  `;

  const R_aw = (tf_cm * bf_cm) / (tw_cm * hw_cm);

  // --- Bảng IV.5 TCVN 5575 ---
  let effective_m = Math.min(mx, 5);
  let effective_lambda = Math.min(lambda_bar_x, 5);
  
  // Các mốc nội suy cho tiết diện loại 5 (chữ I uốn trong mặt phẳng)
  const eta_025 = (1.45 - 0.05 * effective_m) - 0.01 * (5 - effective_m) * effective_lambda;
  const eta_050 = (1.75 - 0.10 * effective_m) - 0.02 * (5 - effective_m) * effective_lambda;
  const eta_100 = (1.90 - 0.10 * effective_m) - 0.02 * (6 - effective_m) * effective_lambda;
  
  let eta = 0;
  let formula_html = '';

  if (R_aw <= 0.25) {
    eta = eta_025;
    formula_html = `
      <p>Với $A_f / A_w = 0,25$: $\\eta = (1,45 - 0,05 m_x) - 0,01(5 - m_x)\\overline{\\lambda_x} =$</p>
      <p>$\\quad = (1,45 - 0,05 \\cdot ${effective_m.toFixed(2)}) - 0,01(5 - ${effective_m.toFixed(2)}) \\cdot ${effective_lambda.toFixed(2)} = ${eta_025.toFixed(3)}.$</p>
    `;
  } else if (R_aw >= 1.0) {
    eta = eta_100;
    formula_html = `
      <p>Với $A_f / A_w \\geq 1$: $\\eta = (1,9 - 0,1 m_x) - 0,02(6 - m_x)\\overline{\\lambda_x} =$</p>
      <p>$\\quad = (1,9 - 0,1 \\cdot ${effective_m.toFixed(2)}) - 0,02(6 - ${effective_m.toFixed(2)}) \\cdot ${effective_lambda.toFixed(2)} = ${eta_100.toFixed(3)}.$</p>
    `;
  } else if (R_aw <= 0.5) {
    eta = eta_025 + (eta_050 - eta_025) * ((R_aw - 0.25) / 0.25);
    formula_html = `
      <p>Với $A_f / A_w = 0,25$: $\\eta_1 = (1,45 - 0,05 m_x) - 0,01(5 - m_x)\\overline{\\lambda_x} = ${eta_025.toFixed(3)}.$</p>
      <br>
      <p>Với $A_f / A_w = 0,5$: $\\eta_2 = (1,75 - 0,1 m_x) - 0,02(5 - m_x)\\overline{\\lambda_x} = ${eta_050.toFixed(3)}.$</p>
    `;
  } else {
    eta = eta_050 + (eta_100 - eta_050) * ((R_aw - 0.5) / 0.5);
    formula_html = `
      <p>Với $A_f / A_w = 0,5$: $\\eta_1 = (1,75 - 0,1 m_x) - 0,02(5 - m_x)\\overline{\\lambda_x} = ${eta_050.toFixed(3)}.$</p>
      <br>
      <p>Với $A_f / A_w \\geq 1$: $\\eta_2 = (1,9 - 0,1 m_x) - 0,02(6 - m_x)\\overline{\\lambda_x} = ${eta_100.toFixed(3)}.$</p>
    `;
  }
  
  const me = eta * mx;
  const isSafe = me < 20 ? "Không cần kiểm tra bền." : "Cần kiểm tra bền.";

  html += `
    <p>Tra bảng IV.5 phụ lục - với loại tiết diện số 5, ta có:</p>
    <div class="formula-center">
      ${formula_html}
    </div>

    <p>Với:</p>
    <div class="formula-center">
      $$\\frac{A_f}{A_w} = \\frac{${tf_cm} \\cdot ${bf_cm}}{${tw_cm} \\cdot ${hw_cm}} = ${R_aw.toFixed(3)} \\rightarrow \\text{nội suy có } \\eta = ${eta.toFixed(3)}.$$
    </div>

    <p>Từ đó:</p>
    <div class="formula-center">
      $$m_e = \\eta m_x = ${eta.toFixed(3)} \\cdot ${mx.toFixed(2)} = ${me.toFixed(2)} ${me < 20 ? '<' : '\\geq'} 20 \\rightarrow \\text{${isSafe}}$$
    </div>
  `;

  // === Tính toán Ổn định tổng thể ===
  const auto_phi_e = (typeof lookupPhiE === 'function') ? lookupPhiE(lambda_bar_x, me) : 0.178;
  if ($('phi_e')) $('phi_e').value = auto_phi_e.toFixed(3);
  const phi_e = auto_phi_e;

  const gamma_c = parseFloat($('gamma_c')?.value || 1.0);
  
  const sigma_x = absN / (phi_e * A_cm2);
  const isSigmaSafe = sigma_x <= (fy * gamma_c) ? "<" : ">";
  
  const M_chan = parseFloat($('designM_chan')?.value || 126.06);
  const M_vai = parseFloat($('designM')?.value || -156.17); // Dùng dấu thật
  
  const M_bar = M_vai + (M_chan - M_vai) / 3;
  const abs_M_bar = Math.abs(M_bar);
  const abs_M_half = Math.abs(M_vai / 2);
  const M_prime_abs = Math.max(abs_M_bar, abs_M_half);
  
  const mx_prime = (M_prime_abs * 100 * A_cm2) / (absN * Wx_cm3);
  const lambda_c = 3.14 * Math.sqrt(E_val / fy);

  html += `
    <p>Với $\\overline{\\lambda_x} = ${lambda_bar_x.toFixed(2)}$ và $m_e = ${me.toFixed(2)}$, tra bảng IV.3 phụ lục, nội suy có $\\phi_e = ${phi_e}$.</p>
    <p>Điều kiện ổn định tổng thể của cột trong mặt phẳng khung được kiểm tra theo công thức (2.42):</p>
    <div class="formula-center">
      $$\\sigma_x = \\frac{N}{\\phi_e A} = \\frac{${absN.toFixed(2)}}{${phi_e} \\cdot ${A_cm2.toFixed(1)}} = ${sigma_x.toFixed(1)} \\text{ (kN/cm}^2\\text{)} ${isSigmaSafe} f\\gamma_c = ${fy} \\text{ (kN/cm}^2\\text{)}.$$
    </div>

    <p>Để kiểm tra ổn định tổng thể của cột theo phương ngoài mặt phẳng khung cần tính trị số mô men ở 1/3 chiều cao của cột dưới kể từ phía có mô men lớn hơn. Vì cặp nội lực dùng để tính toán cột là tại tiết diện dưới vai cột, giả sử trị số của mô men uốn tại tiết diện chân cột tương ứng là: $M_{chân} = ${M_chan} \\text{ (kNm)}$.</p>
    <p>Vậy trị số của mô men tại 1/3 chiều cao cột dưới, kể từ tiết diện vai cột:</p>
    <div class="formula-center">
      $$\\overline{M} = ${M_vai} + \\frac{[${M_chan} - (${M_vai})]}{3} = ${M_bar.toFixed(1)} \\text{ (kNm)}.$$
    </div>
    <p>Do đó, lấy giá trị mô men thiết kế lớn nhất theo trị tuyệt đối:</p>
    <div class="formula-center">
      $$M' = \\max\\left(|\\overline{M}|; \\left|\\frac{M_{vai}}{2}\\right|\\right) = \\max\\left(|${M_bar.toFixed(1)}|; \\left|\\frac{${M_vai}}{2}\\right|\\right) = ${M_prime_abs.toFixed(2)} \\text{ (kNm)}.$$
    </div>
    <p>Tính độ lệch tâm tương đối theo $M'$:</p>
    <div class="formula-center">
      $$m_x' = \\frac{M' A}{N W_x} = \\frac{${M_prime_abs.toFixed(2)} \\cdot 10^2 \\cdot ${A_cm2.toFixed(1)}}{${absN.toFixed(2)} \\cdot ${Math.round(Wx_cm3)}} = ${mx_prime.toFixed(2)}.$$
    </div>
    <p>Do $m_x' = ${mx_prime.toFixed(2)} ${mx_prime < 5 ? '<' : '\\geq'} 5$ nên theo (2.44) ta có $c = \\frac{\\beta}{1 + \\alpha m_x'}$.</p>
    <p>Ở trên: $\\beta = 1$ vì:</p>
    <div class="formula-center">
      $$\\lambda_c = \\pi \\sqrt{\\frac{E}{f}} = 3,14 \\sqrt{\\frac{${(E_val/10000).toFixed(1)} \\cdot 10^4}{${fy}}} = ${Math.round(lambda_c)} > \\lambda_y = ${Math.round(lambda_y)}.$$
    </div>
  `;

  const alpha = 0.65 + 0.05 * mx_prime; // Hệ số alpha theo TCVN 5575
  const beta_val = 1; // Do lambda_y < lambda_c
  const c = beta_val / (1 + alpha * mx_prime);
  
  const f_mpa = fy * 10; // Đổi kN/cm2 sang N/mm2 (MPa)
  const auto_phi_y = (typeof lookupPhiY === 'function') ? lookupPhiY(lambda_y, f_mpa) : 0.743;
  if ($('phi_y')) $('phi_y').value = auto_phi_y.toFixed(3);
  const phi_y = auto_phi_y;

  const sigma_y = absN / (c * phi_y * A_cm2);
  const isSigmaYSafe = sigma_y <= (fy * gamma_c) ? "<" : ">";

  html += `
    <p>Theo bảng 2.1 (TCVN 5575) ta có:</p>
    <div class="formula-center">
      $$\\alpha = 0,65 + 0,05 m_x' = 0,65 + 0,05 \\cdot ${mx_prime.toFixed(2)} = ${alpha.toFixed(3)}.$$
    </div>
    <p>Từ đó:</p>
    <div class="formula-center">
      $$c = \\frac{${beta_val}}{1 + ${alpha.toFixed(3)} \\cdot ${mx_prime.toFixed(2)}} = ${c.toFixed(3)}.$$
    </div>
    <p>Với $\\lambda_y = ${Math.round(lambda_y)}$ và cường độ $f = ${f_mpa} \\text{ (MPa)}$, tra bảng IV.2 phụ lục, nội suy có $\\phi_y = ${phi_y.toFixed(3)}$.</p>
    <p>Do vậy điều kiện ổn định tổng thể của cột theo phương ngoài mặt phẳng được kiểm tra theo công thức (2.43):</p>
    <div class="formula-center">
      $$\\sigma_y = \\frac{N}{c \\phi_y A} = \\frac{${absN.toFixed(2)}}{${c.toFixed(3)} \\cdot ${phi_y.toFixed(3)} \\cdot ${A_cm2.toFixed(1)}} = ${sigma_y.toFixed(2)} \\text{ (kN/cm}^2\\text{)} ${isSigmaYSafe} f\\gamma_c = ${fy} \\text{ (kN/cm}^2\\text{)}.$$
    </div>
  `;

  // === Ổn định cục bộ ===
  const b0 = 0.5 * (bf_cm - tw_cm);
  const b0_tf = b0 / tf_cm;
  const limit_b0_tf = (0.36 + 0.1 * lambda_bar_x) * Math.sqrt(E_val / fy);
  const isFlangeSafe = b0_tf <= limit_b0_tf ? "<" : ">";

  const hw_tw = hw_cm / tw_cm;
  const limit_hw_tw = (1.2 + 0.35 * lambda_bar_x) * Math.sqrt(E_val / fy);
  
  let web_html = '';
  if (hw_tw <= limit_hw_tw) {
    web_html = `
      <p>Ta có: $\\frac{h_w}{t_w} = \\frac{${hw_cm}}{${tw_cm}} = ${hw_tw.toFixed(1)} \\leq \\left[\\frac{h_w}{t_w}\\right] = ${limit_hw_tw.toFixed(1)}$</p>
      <p>$\\rightarrow$ Bản bụng đảm bảo ổn định cục bộ.</p>
    `;
  } else {
    const limit_vach_cung = 2.3 * Math.sqrt(E_val / fy);
    const need_vach_cung = hw_tw > limit_vach_cung ? "Phải đặt vách cứng" : "Không phải đặt vách cứng";
    const C1 = 0.85 * tw_cm * limit_hw_tw; 
    const A_prime = 2 * tw_cm * C1 + 2 * (tf_cm * bf_cm);
    const isA_prime_safe = A_prime > A_cm2 ? ">" : "<=";
    const final_conclusion = A_prime > A_cm2 ? "Không cần kiểm tra lại các điều kiện ổn định tổng thể." : "Cần kiểm tra lại điều kiện ổn định tổng thể với tiết diện $A'$.";
    const check_3_1 = 3.1 * Math.sqrt(E_val / fy);
    
    web_html = `
      <p>Ta có: </p>
      <div class="formula-center">
        $$\\frac{h_w}{t_w} = \\frac{${hw_cm}}{${tw_cm}} = ${hw_tw.toFixed(1)} ${hw_tw < check_3_1 ? '<' : '>'} 3,1\\sqrt{\\frac{${(E_val/10000).toFixed(1)} \\cdot 10^4}{${fy}}} = ${check_3_1.toFixed(0)}$$
      </div>
      <div class="formula-center">
        $$\\frac{h_w}{t_w} = ${hw_tw.toFixed(1)} ${hw_tw < limit_vach_cung ? '<' : '>'} 2,3\\sqrt{\\frac{${(E_val/10000).toFixed(1)} \\cdot 10^4}{${fy}}} = ${limit_vach_cung.toFixed(0)} \\rightarrow \\text{${need_vach_cung}}.$$
      </div>
      <p>Tuy nhiên: $\\frac{h_w}{t_w} = ${hw_tw.toFixed(1)} > \\left[\\frac{h_w}{t_w}\\right] = ${limit_hw_tw.toFixed(1)}$, do vậy bản bụng cột bị mất ổn định cục bộ, coi như chỉ có phần bản bụng cột tiếp giáp với 2 bản cánh còn làm việc. Bề rộng của phần bụng cột này là:</p>
      <div class="formula-center">
        $$C_1 = 0,85 t_w \\left[\\frac{h_w}{t_w}\\right] = 0,85 \\cdot ${tw_cm} \\cdot ${limit_hw_tw.toFixed(1)} = ${C1.toFixed(1)} \\text{ (cm)}.$$
      </div>
      <p>Diện tích tiết diện cột, không kể đến phần bản bụng bị mất ổn định cục bộ:</p>
      <div class="formula-center">
        $$A' = 2 \\cdot ${tw_cm} \\cdot ${C1.toFixed(1)} + 2 \\cdot (${tf_cm} \\cdot ${bf_cm}) = ${A_prime.toFixed(1)} \\text{ (cm}^2\\text{)} ${isA_prime_safe} A = ${A_cm2.toFixed(1)} \\text{ cm}^2$$
      </div>
      <p>$\\rightarrow$ ${final_conclusion}</p>
    `;
  }

  html += `
    <p>Điều kiện ổn định cục bộ của các bản cánh và bản bụng cột được kiểm tra theo các công thức (2.47) và (2.50).</p>
    <p>+ Với bản cánh cột:</p>
    <div class="formula-center">
      $$\\frac{b_0}{t_f} = \\frac{0,5(${bf_cm} - ${tw_cm})}{${tf_cm}} = ${b0_tf.toFixed(1)} ${isFlangeSafe} \\left[\\frac{b_0}{t_f}\\right] = (0,36 + 0,1 \\cdot ${lambda_bar_x.toFixed(2)}) \\sqrt{\\frac{${(E_val/10000).toFixed(1)} \\cdot 10^4}{${fy}}} = ${limit_b0_tf.toFixed(1)}.$$
    </div>
    <p>Ở trên, vì $0,8 < \\overline{\\lambda_x} = ${lambda_bar_x.toFixed(2)} < 4$ nên $[b_0 / t_f]$ xác định theo (2.49).</p>

    <p>+ Với bản bụng cột: do $m_x = ${mx.toFixed(2)} > 1; \\overline{\\lambda_x} = ${lambda_bar_x.toFixed(2)} > 2$ và khả năng chịu lực của cột được quyết định bởi điều kiện ổn định tổng thể trong mặt phẳng uốn (do $\\sigma_x > \\sigma_y$) nên theo bảng 2.2 ta có:</p>
    <div class="formula-center">
      $$\\left[\\frac{h_w}{t_w}\\right] = (1,2 + 0,35 \\overline{\\lambda_x}) \\sqrt{\\frac{E}{f}} = (1,2 + 0,35 \\cdot ${lambda_bar_x.toFixed(2)}) \\sqrt{\\frac{${(E_val/10000).toFixed(1)} \\cdot 10^4}{${fy}}} = ${limit_hw_tw.toFixed(1)}.$$
    </div>
    ${web_html}
  `;

  appendToReport(html, 'report-design');
}

function reportRafterDesign() {
  const M = parseFloat($('raftM').value);
  const N = parseFloat($('raftN').value);
  const V = parseFloat($('raftV').value);
  const h_mm = parseFloat($('raft_h').value);
  const bf_mm = parseFloat($('raft_bf').value);
  const tw_mm = parseFloat($('raft_tw').value);
  const tf_mm = parseFloat($('raft_tf').value);
  const lx = parseFloat($('raftLx').value);
  const ly = parseFloat($('raftLy').value);
  const gc = parseFloat($('raft_gamma_c').value);
  const fy = parseFloat($('fy').value);
  const fv = parseFloat($('fv').value);
  const E_val = parseFloat($('E').value);
  
  const h_cm = h_mm / 10;
  const bf_cm = bf_mm / 10;
  const tw_cm = tw_mm / 10;
  const tf_cm = tf_mm / 10;
  const hw_cm = h_cm - 2 * tf_cm;
  const h_flange_center = h_cm - tf_cm;
  
  const absM = Math.abs(M);
  const absN = Math.abs(N);
  const absV = Math.abs(V);
  
  // 1. Tính Wx_yc
  const Wx_yc = (absM * 100) / (fy * gc);
  
  // 2. Tính h_opt
  const h_min = 1.15 * Math.sqrt(Wx_yc / tw_cm);
  const h_max = 1.2 * Math.sqrt(Wx_yc / tw_cm);
  
  // 3. Kiểm tra tw từ điều kiện cắt
  const tw_req = (1.5 * absV) / (h_cm * fv * gc);
  
  // 4. Tính Af_yc
  const Af_yc = (Wx_yc * (h_cm / 2) - (tw_cm * Math.pow(hw_cm, 3)) / 12) * (2 / Math.pow(h_flange_center, 2));
  
  // 5. Đặc trưng thực tế
  const A = 2 * bf_cm * tf_cm + hw_cm * tw_cm;
  const Ix = (bf_cm * Math.pow(h_cm, 3) - (bf_cm - tw_cm) * Math.pow(hw_cm, 3)) / 12;
  const Wx = 2 * Ix / h_cm;
  const ix = Math.sqrt(Ix / A);
  const Iy = (2 * tf_cm * Math.pow(bf_cm, 3) + hw_cm * Math.pow(tw_cm, 3)) / 12;
  const iy = Math.sqrt(Iy / A);
  
  const lambda_x = (lx * 100) / ix;
  const lambda_y = (ly * 100) / iy;

  const draw_tw = Math.max(tw_mm, h_mm * 0.02);
  const draw_tf = Math.max(tf_mm, h_mm * 0.03);
  const pad_x = 80;
  const pad_y = 60;
  
  const svg_html = `
    <div style="text-align: center; margin: 25px 0; display: flex; justify-content: center; align-items: flex-end; gap: 20px;">
      <svg viewBox="-${h_mm/2 + pad_x} -${bf_mm/2 + pad_y} ${h_mm + 2*pad_x} ${bf_mm + 2*pad_y}" width="280">
        <style>
          .dim-line { stroke: #333; stroke-width: 1.2; }
          .dim-text { font-family: 'Times New Roman', serif; font-size: 18px; fill: #333; text-anchor: middle; }
          .sec-line { fill: none; stroke: #000; stroke-width: 2.5; }
          .axis-line { stroke: #000; stroke-width: 1; stroke-dasharray: 10,5,2,5; }
        </style>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#000" /></marker>
        </defs>
        <!-- Trục -->
        <line x1="-${h_mm/2 + 40}" y1="0" x2="${h_mm/2 + 40}" y2="0" class="axis-line" />
        <text x="-${h_mm/2 + 50}" y="5" class="dim-text">y</text>
        <text x="${h_mm/2 + 50}" y="5" class="dim-text">y</text>
        <line x1="0" y1="-${bf_mm/2 + 30}" x2="0" y2="${bf_mm/2 + 30}" class="axis-line" />
        <text x="0" y="-${bf_mm/2 + 40}" class="dim-text">x</text>
        <text x="0" y="${bf_mm/2 + 50}" class="dim-text">x</text>
        
        <!-- Mặt cắt -->
        <path d="M -${h_mm/2},-${bf_mm/2} L -${h_mm/2 - draw_tf},-${bf_mm/2} L -${h_mm/2 - draw_tf},-${draw_tw/2} L ${h_mm/2 - draw_tf},-${draw_tw/2} L ${h_mm/2 - draw_tf},-${bf_mm/2} L ${h_mm/2},-${bf_mm/2} L ${h_mm/2},${bf_mm/2} L ${h_mm/2 - draw_tf},${bf_mm/2} L ${h_mm/2 - draw_tf},${draw_tw/2} L -${h_mm/2 - draw_tf},${draw_tw/2} L -${h_mm/2 - draw_tf},${bf_mm/2} L -${h_mm/2},${bf_mm/2} Z" class="sec-line" />
        
        <!-- Kích thước -->
        <line x1="-${h_mm/2}" y1="${bf_mm/2 + 15}" x2="-${h_mm/2}" y2="${bf_mm/2 + 35}" class="dim-line" />
        <line x1="${h_mm/2}" y1="${bf_mm/2 + 15}" x2="${h_mm/2}" y2="${bf_mm/2 + 35}" class="dim-line" />
        <line x1="-${h_mm/2}" y1="${bf_mm/2 + 25}" x2="${h_mm/2}" y2="${bf_mm/2 + 25}" class="dim-line" marker-start="url(#arrow)" marker-end="url(#arrow)" />
        <text x="0" y="${bf_mm/2 + 20}" class="dim-text">${h_mm}</text>

        <line x1="${h_mm/2 + 15}" y1="-${bf_mm/2}" x2="${h_mm/2 + 35}" y2="-${bf_mm/2}" class="dim-line" />
        <line x1="${h_mm/2 + 15}" y1="${bf_mm/2}" x2="${h_mm/2 + 35}" y2="${bf_mm/2}" class="dim-line" />
        <line x1="${h_mm/2 + 25}" y1="-${bf_mm/2}" x2="${h_mm/2 + 25}" y2="${bf_mm/2}" class="dim-line" marker-start="url(#arrow)" marker-end="url(#arrow)" />
        <text x="${h_mm/2 + 35}" y="5" class="dim-text" transform="rotate(-90, ${h_mm/2 + 35}, 5)">${bf_mm}</text>
        
        <text x="15" y="-15" class="dim-text">${tw_mm}</text>
        <line x1="15" y1="-12" x2="0" y2="-${draw_tw/2}" class="dim-line" marker-end="url(#arrow)" />
        <line x1="15" y1="12" x2="0" y2="${draw_tw/2}" class="dim-line" marker-end="url(#arrow)" />
      </svg>
      <div style="font-style: italic; font-weight: bold; font-size: 0.9rem;">Hình 3.21. Tiết diện xà ngang</div>
    </div>
  `;

  const mx = (absM * 100 * A) / (absN * Wx);
  const sigma_x = absN / A + (absM * 100) / Wx;
  const isSafe = sigma_x <= (fy * gc) ? "<" : ">";

  // Equivalent Stress
  const Sf = (bf_cm * tf_cm) * (h_cm - tf_cm) / 2;
  const sigma_1 = (absM * 100 / Wx) * (hw_cm / h_cm);
  const tau_1 = (absV * Sf) / (Ix * tw_cm);
  const sigma_td = Math.sqrt(Math.pow(sigma_1, 2) + 3 * Math.pow(tau_1, 2));
  const limit_sigma_td = 1.15 * fy * gc;

  // Local Stability
  const b0 = 0.5 * (bf_cm - tw_cm);
  const b0_tf = b0 / tf_cm;
  const limit_flange_local = 0.5 * Math.sqrt(E_val / (fy * 10)); // fy in kN/cm2, E in MPa? Wait. 
  // Let's use consistent units. E = 2.1e4 kN/cm2.
  const limit_flange_local_val = 0.5 * Math.sqrt(21000 / fy);
  
  const hw_tw = hw_cm / tw_cm;
  const limit_web_comp = 5.5 * Math.sqrt(21000 / fy);
  const limit_web_shear = 3.2 * Math.sqrt(21000 / fy);
  const limit_web_combined = 2.5 * Math.sqrt(21000 / fy);

  const html = `
    <h3>3.5.2. Thiết kế tiết diện xà ngang</h3>
    <p>a) Đoạn xà (tiết diện thay đổi)</p>
    <p>Từ bảng tổ hợp nội lực chọn cặp nội lực tính toán:</p>
    <div style="margin-left: 200px; margin-bottom: 15px;">
      <p>$N = ${N} \\text{ kN}$</p>
      <p>$M = ${M} \\text{ kNm}$</p>
      <p>$V = ${V} \\text{ kN}$</p>
    </div>
    <p>Đây là cặp nội lực tại tiết diện đầu xà (nách khung), trong tổ hợp nội lực do các trường hợp tải trọng gây ra.</p>
    <p>Mô men chống uốn cần thiết của tiết diện xà ngang xác định theo công thức (2.53):</p>
    <div class="formula-center">
      $$W_x^{yc} = \\frac{M}{f\\gamma_c} = \\frac{${absM} \\cdot 10^2}{${fy} \\cdot ${gc}} = ${Wx_yc.toFixed(1)} \\text{ (cm}^3\\text{)}.$$
    </div>
    
    <p>Chiều cao của tiết diện xà xác định từ điều kiện tối ưu về chi phí vật liệu theo công thức (2.54), với bề dày bản bụng xà chọn sơ bộ là ${tw_cm} cm:</p>
    <div class="formula-center">
      $$h = k \\sqrt{\\frac{W_x^{yc}}{t_w}} = (1,15 \\div 1,2) \\sqrt{\\frac{${Wx_yc.toFixed(1)}}{${tw_cm}}} = (${h_min.toFixed(1)} \\div ${h_max.toFixed(1)}) \\text{ (cm)}.$$
    </div>
    <p>$\\rightarrow$ Chọn $h = ${h_cm} \\text{ cm}$.</p>
    
    <p>Kiểm tra lại bề dày bản bụng từ điều kiện chịu cắt (2.55):</p>
    <div class="formula-center">
      $$t_w = ${tw_cm} \\text{ cm} ${tw_cm >= tw_req ? '>' : '<'} \\frac{3}{2} \\frac{${absV}}{${h_cm} \\cdot ${fv} \\cdot ${gc}} = ${tw_req.toFixed(2)} \\text{ (cm)}.$$
    </div>
    
    <p>Diện tích tiết diện cần thiết của bản cánh xà ngang xác định theo công thức (2.56):</p>
    <div class="formula-center">
      $$A_f^{yc} = (b_f t_f)^{yc} = \\left( W_x^{yc} \\frac{h}{2} - \\frac{t_w h_w^3}{12} \\right) \\frac{2}{(h-t_f)^2}$$
      $$A_f^{yc} = \\left( ${Wx_yc.toFixed(1)} \\cdot \\frac{${h_cm}}{2} - \\frac{${tw_cm} \\cdot ${hw_cm.toFixed(1)}^3}{12} \\right) \\frac{2}{${h_flange_center.toFixed(1)}^2} = ${Af_yc.toFixed(1)} \\text{ (cm}^2\\text{)}.$$
    </div>
    
    <p>Theo các yêu cầu cấu tạo và ổn định cục bộ, kích thước tiết diện của bản cánh được chọn là: $t_f = ${tf_cm} \\text{ cm}; b_f = ${bf_cm} \\text{ cm}$.</p>
    
    ${svg_html}
    
    <p>Tính lại các đặc trưng hình học:</p>
    <div class="formula-center">
      <p>$$A = ${tw_cm} \\cdot ${hw_cm} + 2 \\cdot (${tf_cm} \\cdot ${bf_cm}) = ${A.toFixed(1)} \\text{ (cm}^2\\text{)};$$</p>
      <p>$$I_x = \\frac{${bf_cm} \\cdot ${h_cm}^3}{12} - 2 \\cdot \\left[ \\frac{0,5 \\cdot (${bf_cm} - ${tw_cm}) \\cdot ${hw_cm}^3}{12} \\right] = ${Math.round(Ix)} \\text{ (cm}^4\\text{)};$$</p>
      <p>$$W_x = ${Math.round(Ix)} / (${h_cm}/2) = ${Math.round(Wx)} \\text{ (cm}^3\\text{)};$$</p>
      <p>$$m_x = \\frac{M}{N} \\frac{A}{W_x} = \\frac{${absM} \\cdot 10^2}{${absN}} \\cdot \\frac{${A.toFixed(1)}}{${Math.round(Wx)}} = ${mx.toFixed(2)}.$$</p>
    </div>
    
    <p>Do $m_x = ${mx.toFixed(2)} ${mx > 20 ? '>' : '\\leq'} 20 \\rightarrow m_e = \\eta m_x ${mx > 20 ? '>' : '\\leq'} 20$ nên tiết diện xà ngang được tính toán kiểm tra theo điều kiện bền (2.41):</p>
    <div class="formula-center">
      $$\\sigma_x = \\frac{N}{A_n} + \\frac{M}{W_{xn}} = \\frac{${absN}}{${A.toFixed(1)}} + \\frac{${absM} \\cdot 10^2}{${Math.round(Wx)}} = ${sigma_x.toFixed(1)} \\text{ (kN/cm}^2\\text{)} ${isSafe} f\\gamma_c = ${fy} \\text{ (kN/cm}^2\\text{)}.$$
    </div>
    <p>Kết luận: Tiết diện xà ngang ${sigma_x <= (fy * gc) ? 'ĐẠT' : 'KHÔNG ĐẠT'} điều kiện cường độ.</p>
    
    <p>Tại tiết diện đầu xà có mô men uốn và lực cắt cùng tác dụng nên cần kiểm tra ứng suất tương đương tại chỗ tiếp xúc giữa bản cánh và bản bụng theo (2.57):</p>
    <div class="formula-center">
      $$\\sigma_{td} = \\sqrt{\\sigma_1^2 + 3\\tau_1^2} \\leq 1,15 f\\gamma_c.$$
    </div>
    <p>Trong đó:</p>
    <div class="formula-center">
      $$\\sigma_1 = \\frac{M}{W_x} \\frac{h_w}{h} = \\frac{${absM} \\cdot 10^2}{${Math.round(Wx)}} \\cdot \\frac{${hw_cm.toFixed(1)}}{${h_cm}} = ${sigma_1.toFixed(2)} \\text{ (kN/cm}^2\\text{)};$$
      $$\\tau_1 = \\frac{V S_f}{I_x t_w} = \\frac{${absV} \\cdot ${Sf.toFixed(0)}}{${Math.round(Ix)} \\cdot ${tw_cm}} = ${tau_1.toFixed(2)} \\text{ (kN/cm}^2\\text{)}.$$
    </div>
    <p>Ở trên: $S_f$ - mô men tĩnh của một cánh dầm đối với trục trung hòa x-x:</p>
    <div class="formula-center">
      $$S_f = (b_f t_f) \\frac{h - t_f}{2} = (${bf_cm} \\cdot ${tf_cm}) \\cdot \\frac{${h_cm} - ${tf_cm}}{2} = ${Sf.toFixed(0)} \\text{ (cm}^3\\text{)}.$$
    </div>
    <p>Vậy:</p>
    <div class="formula-center">
      $$\\sigma_{td} = \\sqrt{ ${sigma_1.toFixed(2)}^2 + 3 \\cdot ${tau_1.toFixed(2)}^2 } = ${sigma_td.toFixed(2)} \\text{ (kN/cm}^2\\text{)} < 1,15 f\\gamma_c = ${limit_sigma_td.toFixed(2)} \\text{ (kN/cm}^2\\text{)}.$$
    </div>
    
    <p>Kiểm tra ổn định cục bộ của bản cánh và bản bụng:</p>
    <div class="formula-center">
      <p>$$\\frac{b_0}{t_f} = \\frac{0,5(${bf_cm} - ${tw_cm})}{${tf_cm}} = ${b0_tf.toFixed(1)} < \\frac{1}{2} \\sqrt{\\frac{E}{f}} = ${limit_flange_local_val.toFixed(1)};$$</p>
      <p>$$\\frac{h_w}{t_w} = \\frac{${hw_cm.toFixed(1)}}{${tw_cm}} = ${hw_tw.toFixed(1)} < 5,5 \\sqrt{\\frac{E}{f}} = ${limit_web_comp.toFixed(0)} \\rightarrow \\text{Bản bụng ổn định cục bộ (ứng suất pháp nén).}$$</p>
      <p>$$\\frac{h_w}{t_w} = ${hw_tw.toFixed(1)} < 3,2 \\sqrt{\\frac{E}{f}} = ${limit_web_shear.toFixed(0)} \\rightarrow \\text{Bản bụng ổn định cục bộ (ứng suất tiếp).}$$</p>
    </div>
    <div class="formula-center">
      <p>$$\\frac{h_w}{t_w} = ${hw_tw.toFixed(1)} < 2,5 \\sqrt{\\frac{E}{f}} = 2,5 \\sqrt{\\frac{${(E_val/10).toFixed(1)} \\cdot 10^4}{${fy}}} = ${limit_web_combined.toFixed(0)}$$</p>
    </div>
    <p>$\\rightarrow$ Bản bụng không bị mất ổn định cục bộ dưới tác dụng của ứng suất pháp và ứng suất tiếp (không phải kiểm tra các ô bụng).</p>
    <p>Vậy tiết diện xà đã chọn là đạt yêu cầu. Tỷ số độ cứng của tiết diện xà (ở chỗ tiếp giáp với cột) và cột đã chọn phù hợp với giả thiết ban đầu là bằng nhau.</p>
  `;
  
  appendToReport(html, 'report-rafter');
}

$('btnReportRafter')?.addEventListener('click', reportRafterDesign);

$('btnReportDesign')?.addEventListener('click', reportSectionDesign);

function renderPhiETable() {
  const t = $('phiETable');
  if(!t || typeof PHI_E_DATA === 'undefined') return;
  let html = '<thead><tr><th>λ&#772; \\ m</th>';
  PHI_E_DATA.m.forEach(m => { html += `<th>${m}</th>`; });
  html += '</tr></thead><tbody>';
  PHI_E_DATA.lambda.forEach((lam, i) => {
    html += `<tr><th>${lam.toFixed(1)}</th>`;
    PHI_E_DATA.values[i].forEach(v => {
      let vStr = v.toString().padStart(3, '0');
      html += `<td>${vStr}</td>`;
    });
    html += '</tr>';
  });
  html += '</tbody>';
  t.innerHTML = html;
}

function renderPhiYTable() {
  const t = $('phiYTable');
  if(!t || typeof PHI_Y_DATA === 'undefined') return;
  let html = '<thead><tr><th>λ \\ f (MPa)</th>';
  PHI_Y_DATA.f.forEach(f => { html += `<th>${f}</th>`; });
  html += '</tr></thead><tbody>';
  PHI_Y_DATA.lambda.forEach((lam, i) => {
    html += `<tr><th>${lam}</th>`;
    PHI_Y_DATA.values[i].forEach(v => {
      let vStr = v.toString().padStart(3, '0');
      html += `<td>${vStr}</td>`;
    });
    html += '</tr>';
  });
  html += '</tbody>';
  t.innerHTML = html;
}

renderPhiETable();
renderPhiYTable();

})();
