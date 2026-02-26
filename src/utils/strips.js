import stripsData from '../data/strips.json';
import tagsData from '../data/tags.json';

// Ordered list: old strips 1-294, then new N1-N20
const strips = stripsData;

const stripMap = new Map(strips.map(s => [s.number, s]));

// Ordered index for prev/next navigation
const orderedIds = strips.map(s => s.number);
const indexMap = new Map(orderedIds.map((id, i) => [id, i]));

export function getStrip(number) {
  return stripMap.get(number) || null;
}

export function getNext(number) {
  const idx = indexMap.get(number);
  if (idx === undefined || idx >= orderedIds.length - 1) return null;
  return orderedIds[idx + 1];
}

export function getPrev(number) {
  const idx = indexMap.get(number);
  if (idx === undefined || idx <= 0) return null;
  return orderedIds[idx - 1];
}

export function getFirst() {
  return orderedIds[0];
}

export function getLast() {
  return orderedIds[orderedIds.length - 1];
}

export function getLastOld() {
  return '294';
}

export function getFirstNew() {
  return 'N1';
}

export function getAllStrips() {
  return strips;
}

export function getOldStrips() {
  return strips.filter(s => !s.isNew);
}

export function getNewStrips() {
  return strips.filter(s => s.isNew);
}

export function getByTag(tag) {
  const ids = tagsData[tag] || [];
  return ids.map(id => stripMap.get(id)).filter(Boolean);
}

export function getAllTags() {
  return Object.entries(tagsData)
    .map(([name, ids]) => ({ name, count: ids.length }))
    .sort((a, b) => b.count - a.count);
}

export function stripImagePath(number) {
  return `${import.meta.env.BASE_URL}strips/${number}.gif`;
}

export function stripThumbPath(number) {
  return `${import.meta.env.BASE_URL}strips/${number}_sm.gif`;
}

export function getRandom() {
  return orderedIds[Math.floor(Math.random() * orderedIds.length)];
}

export function isAtBoundary(number) {
  if (number === '294') return { type: 'end-old', nextSection: 'N1' };
  if (number === 'N1') return { type: 'start-new', prevSection: '294' };
  return null;
}
