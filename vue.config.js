module.exports = {
    devServer: {
        proxy: {
            '/ajax': {
                target: 'http://m.maoyan.com',
                changeOrigin: true
            },
            '/dianying': {
                target: 'http://m.maoyan.com',
                changeOrigin: true
            }
        }
    }
}