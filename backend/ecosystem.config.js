const dotenv = require('dotenv');

dotenv.config({ path: '../.env.deploy' });

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master' } = process.env;

module.exports = {
  apps: [
    {
      name: 'api',
      script: 'dist/app.js',
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/Aniskano/nodejs-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy-local': `bash scripts/deployEnv.sh ${DEPLOY_USER}@${DEPLOY_HOST} ${DEPLOY_PATH}`,
      'post-deploy':
        'source ~/.nvm/nvm.sh && cd backend && npm ci && npm run build && pm2 reload ecosystem.config.js --update-env',
    },
  },
}; 