module.exports =
{
  entry: ['babel-polyfill','./src/index.js' ],
  output: {
            path: __dirname,
            publicPath: '/',
            filename: 'bundle.js'
          },
  module: {
            loaders: [{
                        exclude: /node_modules/,
                        loader: 'babel',
                        query: {
                          presets: ['react', 'es2015', 'stage-1'],
                          plugins: ['transform-decorators-legacy']
                        }
                      },
                      {
                        include: /\.json$/, loaders: ["json-loader"]
                      },
                      {
                        test: /\.scss$/,
                        loaders: ['style','css','sass']
                      }
                    ]
          },
  resolve:{
            extensions: ['', '.js', '.jsx']
          },
  devServer:
          {
            historyApiFallback: true,
            contentBase: './'
          }
};
