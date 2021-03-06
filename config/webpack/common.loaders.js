const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
    },
    {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        loader: 'url-loader?limit=100000'
    },
    {
        test: /\.(png|jp(e*)g)$/,
        use: [
            {
                loader: 'url-loader'
                // options: {
                //     limit: 8000, // Convert images < 8kb to base64 strings
                //     name: 'images/[hash]-[name].[ext]'
                // }
            }
        ]
    },
    {
        test: /\.(css|scss|sass)$/i,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    esModule: true,
                    hmr: false
                }
            },
            'css-loader',
            'sass-loader'
        ]
    }
];
