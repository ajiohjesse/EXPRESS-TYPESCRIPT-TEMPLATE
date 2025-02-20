import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/server.ts'],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: 'dist/index.cjs',
  external: ['swagger-ui-express'],
  loader: {
    '.html': 'copy',
    '.css': 'copy',
  },
  minify: true,
});
