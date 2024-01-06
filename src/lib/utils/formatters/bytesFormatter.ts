export function bytesFormatter(bytes: number) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'kB', 'MB', 'GB'] as const;

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const size = sizes[i];

  return `${parseFloat(
    (bytes / Math.pow(k, i)).toFixed(size !== 'Bytes' && size !== 'kB' ? 2 : 0)
  )} ${size}`;
}
