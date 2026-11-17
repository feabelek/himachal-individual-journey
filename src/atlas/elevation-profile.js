export const ELEVATION_PROFILE_DATA = {
  summer: [
    { id: 'darcha', label: 'Darcha', distance: -100, elevation: 3400 },
    { id: 'tandi', label: 'Tandi', distance: -67, elevation: 2900 },
    { id: 'kugti-jot', label: 'Kugti Pass', distance: -39, elevation: 4800 },
    { id: 'kartik-swami-temple', label: 'Kartik Swami Temple', distance: -27, elevation: 3100 },
    { id: 'kugti', label: 'Kugti', distance: -23, elevation: 2500 },
    { id: 'hadsar', label: 'Hadsar', distance: -11, elevation: 2100 },
    { id: 'bharmour', label: 'Bharmour', distance: 0, elevation: 2000 }
  ],
  winter: [
    { id: 'bharmour', label: 'Bharmour', distance: 0, elevation: 2000 },
    { id: 'jalsu-pass', label: 'Jalsu Pass', distance: 65, elevation: 3400 },
    { id: 'sokhru-galua-tikkar', label: 'Sokhru', distance: 77, elevation: 1600 },
    { id: 'sokhru-galua-tikkar', label: 'Galua Tikkar', distance: 83, elevation: 1600 },
    { id: 'sullah-dheeral-thural', label: 'Sullah', distance: 102, elevation: 1500 },
    { id: 'sullah-dheeral-thural', label: 'Dheera', distance: 108, elevation: 1500 },
    { id: 'sullah-dheeral-thural', label: 'Thural', distance: 116, elevation: 1500 },
    { id: 'kalapani', label: 'Kalapani', distance: 146, elevation: 700 },
    { id: 'dehra-gopipur', label: 'Dehra Gopipur', distance: 167, elevation: 500 },
    { id: 'ambota-shiv-bari', label: 'Ambota', distance: 203, elevation: 475, range: [450, 500] },
    { id: 'ambota-shiv-bari', label: 'Shiv Bari', distance: 226, elevation: 475, range: [450, 500] },
    { id: 'ispur', label: 'Ispur', distance: 237, elevation: 400 }
  ]
};

const MIN_DISTANCE = -100;
const MAX_DISTANCE = 237;
const MIN_ELEVATION = 400;
const MAX_ELEVATION = 4800;

export function createElevationProfile(svg, { onSelect } = {}) {
  if (!svg) return { setJourneyState() {} };
  const width = 320;
  const height = 90;
  const chartBottom = 64;
  const plotLeft = 38;
  const plotRight = width - 2;
  const x = (distance) => plotLeft + ((distance - MIN_DISTANCE) / (MAX_DISTANCE - MIN_DISTANCE)) * (plotRight - plotLeft);
  const y = (elevation) => chartBottom - ((elevation - MIN_ELEVATION) / (MAX_ELEVATION - MIN_ELEVATION)) * 48;
  const summer = ELEVATION_PROFILE_DATA.summer;
  const winter = ELEVATION_PROFILE_DATA.winter;
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.innerHTML = '';

  const makePath = (data, color) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', 'profile-route');
    path.setAttribute('d', data.map((point, index) => `${index ? 'L' : 'M'}${x(point.distance)},${y(point.elevation)}`).join(' '));
    path.style.setProperty('--profile-color', color);
    svg.appendChild(path);
  };
  makePath(summer, '#f18700');
  makePath(winter, '#55aadd');

  const axis = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  axis.setAttribute('class', 'profile-axis');
  axis.setAttribute('d', `M${plotLeft} ${chartBottom}V${y(MAX_ELEVATION)}M${plotLeft} ${chartBottom}H${plotRight}`);
  svg.appendChild(axis);

  [400, 1000, 2000, 3000, 4000, 4800].forEach((elevation) => {
    const tick = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    tick.setAttribute('class', 'profile-tick');
    tick.setAttribute('d', `M${plotLeft} ${y(elevation)}h4`);
    svg.appendChild(tick);
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('class', 'profile-axis-label');
    label.setAttribute('x', String(plotLeft - 5));
    label.setAttribute('y', y(elevation) + 2.5);
    label.setAttribute('text-anchor', 'end');
    label.textContent = `${elevation}m`;
    svg.appendChild(label);
  });

  const currentElevation = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  currentElevation.id = 'profile-current-elevation';
  currentElevation.setAttribute('class', 'profile-current-elevation');
  currentElevation.setAttribute('x', width - 2);
  currentElevation.setAttribute('y', '10');
  currentElevation.setAttribute('text-anchor', 'end');
  currentElevation.textContent = '—';
  svg.appendChild(currentElevation);

  [...summer, ...winter].forEach((point, index) => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('class', 'profile-point');
    circle.dataset.locationId = point.id;
    circle.dataset.distance = point.distance;
    circle.setAttribute('cx', x(point.distance));
    circle.setAttribute('cy', y(point.elevation));
    circle.setAttribute('r', point.range ? 3.5 : 2.5);
    circle.style.setProperty('--profile-color', point.distance < 0 ? '#f18700' : '#55aadd');
    svg.appendChild(circle);
  });

  const position = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  position.id = 'profile-position';
  position.setAttribute('class', 'profile-position');
  position.setAttribute('r', '4');
  svg.appendChild(position);

  return {
    setJourneyState({ chapterId, season } = {}) {
      const route = season === 'winter' ? winter : summer;
      const current = route.find((point) => point.id === chapterId) || route[route.length - 1];
      position.setAttribute('cx', x(current.distance));
      position.setAttribute('cy', y(current.elevation));
      currentElevation.textContent = `${current.label} · ${current.elevation}m`;
      svg.querySelectorAll('.profile-point').forEach((point) => point.classList.toggle('active', point.dataset.locationId === chapterId));
    }
  };
}
