import app from './app';
import { env } from './helpers/env';

const server = app.listen(env.PORT, () => {
  console.log(`Server started on port ${env.PORT}`);
});

export default server;
