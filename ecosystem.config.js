module.exports = {
    apps : [{
        script: 'index.js',
        watch: '.'
    }, {
        script: './service-worker/',
        watch: ['./service-worker']
    }],

    deploy : {
        production : {
            user : 'ec2-user',
            host : '18.222.139.141',
            ref  : 'origin/master',
            repo: 'git@github.com:doctorrweb/portfolio.git',
            path : '/home/ubuntu',
            'pre-deploy-local': 'npm run build',
            'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
            'pre-setup': ''
        }
    }
}
