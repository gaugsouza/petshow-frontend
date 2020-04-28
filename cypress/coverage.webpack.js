module.exports = {
    module: {
      rules: [
        {
          test: /\.(js|ts|feature|features)$/,
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true },
          enforce: 'post',
          include: require('path').join(__dirname, '..', 'src'),
          exclude: [
            /\.(e2e|spec)\.ts$/,
            /node_modules/,
            /(ngfactory|ngstyle)\.js/
          ]
        }
      ]
    }
  };
