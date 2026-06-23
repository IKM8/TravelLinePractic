export function updateData(obj, path, value) {
  const copy = JSON.parse(JSON.stringify(obj));
  let target = copy;
  for (let i = 0; i < path.length - 1; i++) target = target[path[i]];
  target[path[path.length - 1]] = value;
  return copy;
}
