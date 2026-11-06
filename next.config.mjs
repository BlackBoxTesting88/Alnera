const pagesBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

/** @type {import('next').NextConfig} */
const config = pagesBasePath
  ? { basePath: pagesBasePath, output: 'export', trailingSlash: true }
  : {};

export default config;
