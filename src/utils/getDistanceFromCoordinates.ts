interface Coordinate {
  latitude: number;
  longitude: number;
}

export function getDistanceFromCoordinates(
  base: Coordinate,
  target: Coordinate,
): number {
  const { latitude: baseLat, longitude: baseLng } = base;
  const { latitude: targetLat, longitude: targetLng } = target;
  if (baseLat === targetLat && baseLng === targetLng) return 0;

  const radBaseLat = (Math.PI * baseLat) / 180;
  const radTargetLat = (Math.PI * targetLat) / 180;
  const theta = baseLng - targetLng;
  const radTheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radBaseLat) * Math.sin(radTargetLat) +
    Math.cos(radBaseLat) * Math.cos(radTargetLat) * Math.cos(radTheta);
  if (dist > 1) dist = 1;

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515 * 1.609344 * 1000;
  if (dist < 100) dist = Math.round(dist / 10) * 10;
  else dist = Math.round(dist / 100) * 100;

  return dist / 1000;
}
