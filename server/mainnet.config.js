module.exports = {
    apps : [
      {
        name: 'proton-cron-mainnet',
        script: 'dist/index.js',
        node_args : '-r dotenv/config',
        watch: false,
        env: {
          'CHAIN': 'proton'
        }
      }
    ]
};