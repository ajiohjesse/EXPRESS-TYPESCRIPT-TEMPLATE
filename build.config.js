import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/server.ts'],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: 'dist/index.js',
  external: ['swagger-ui-express'],
  copyFiles: true,
  loader: {
    '.html': 'copy',
    '.css': 'copy',
  },
});
