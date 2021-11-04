module.exports = {
    entry: ['@babel/polyfill','./src/main.js'], // Esta na raiz, agora não está com esta configuração
    output: { // O output aqui não vou mais jogar pra dentro da raiz, vou jogar para dentro de uma pasta chamada public.(Joga o arquivo bundle.js dentro pasta public.).
        path: __dirname + '/public', 
        filename: 'bundle.js',

    },
    devServer: {
        static: __dirname + '/public'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ],
    }, 
};