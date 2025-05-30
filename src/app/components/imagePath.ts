export const withBasePath = (path: string) => {
  const basePath = process.env.NODE_ENV === 'production' ? '' : '';
  return `${basePath}${path}`;
};
