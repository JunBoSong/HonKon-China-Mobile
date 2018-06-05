'use strict'

module.exports = {
    plugins: [{
            name: 'vux-ui'
        },
        'inline-manifest', 'progress-bar', 'duplicate-style',
        {
            name: 'less-theme',
            path: 'src/assets/less/theme.less'
        }

    ]
}