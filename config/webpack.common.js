var webpack = require('webpack');
var helpers = require('./helpers');

/**
 * Webpack Plugins
 */

const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

/**
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
  title: 'Флапер',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = (options) => {
  var isProd = options.env === 'production';
  return {
    entry: {
      'main_css': './src/chunks/main_css.ts',
      'polyfills': './src/chunks/polyfills.ts',
      'global': './src/chunks/global.ts',
      'vendor': './src/chunks/vendor.ts',
      'angular': './src/chunks/angular.ts',
      'angular_vendor': './src/chunks/angular_vendor.ts',
      'main': './src/main.browser.ts'

    },

    // Options affecting the resolving of modules.
    //
    // See: http://webpack.github.io/docs/configuration.html#resolve
    resolve: {
      //alias: {
      //  'moment$': 'moment/min/moment.min.js'
      //},
      // An array of extensions that should be used to resolve modules.
      //
      // See: http://webpack.github.io/docs/configuration.html#resolve-extensions
      extensions: ['.ts', '.js', '.json'],

      //An array of directory names to be resolved to the current directory
      modules: [helpers.root('src'), 'node_modules'],
    },
    // Options affecting the normal modules.
    //
    // See: http://webpack.github.io/docs/configuration.html#module
    module: {

      rules: [
         /*
         * Typescript loader support for .ts and Angular 2 async routes via .async.ts
         * Replace templateUrl and stylesUrl with require()
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader
         * See: https://github.com/TheLarkInn/angular2-template-loader
         */
        {
          test: /\.ts$/,
          loaders: [
            '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
            'awesome-typescript-loader',
            'angular2-template-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
          /*
          * Json loader support for *.json files.
          *
          * See: https://github.com/webpack/json-loader
          */
        {
          test: /\.json$/,
          loader: 'json-loader'
         },
         // support for global scss in src/app folder
         {
           test: /css\/.*\.scss$/,
           loader: 'style!css!sass'
         },


         //Support scss for angular components
         {
           test: /app\/.*\.scss$/,
           loader: 'raw!sass'
         },

         // Raw loader support for *.html
         // Returns file content as string
         //
         // See: https://github.com/webpack/raw-loader
         {
           test: /\.html$/,
           loader: 'raw-loader',
           exclude: [helpers.root('src/index.html')]
         },
         /* File loader for supporting images, for example, in CSS files.
          */
         {
           test: /\.(jpg|png|gif)$/,
          loader: 'file'
         },
      ],

    },

    // Add additional plugins to the compiler.
    //
    // See: http://webpack.github.io/docs/configuration.html#plugins
    plugins: [
      //new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
      new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(ru)$/),
      // Plugin: ForkCheckerPlugin
      // Description: Do type checking in a separate process, so webpack don't need to wait.
      //
      // See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
      new ForkCheckerPlugin(),


      // Plugin: CommonsChunkPlugin
      // Description: Shares common code between the pages.
      // It identifies common modules and put them into a commons chunk.
      //
      // See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
      // See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
      new CommonsChunkPlugin({
        name: ['polyfills', 'global', 'main.css', 'vendor', 'angular', 'angular_vendor', 'main'].reverse(),
      }),

      /**
       * Plugin: ContextReplacementPlugin
       * Description: Provides context to Angular's use of System.import
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
       * See: https://github.com/angular/angular/issues/11580
       */
      new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('src') // location of your src
      ),

      // Plugin: CopyWebpackPlugin
      // Description: Copy files and directories in webpack.
      //
      // Copies project static assets.
      //
      // See: https://www.npmjs.com/package/copy-webpack-plugin
      new CopyWebpackPlugin([{
        from: 'src/assets',
        to: 'assets'
      }, {
        from: 'src/root',
        to: '.'
      }]),

      // Plugin: HtmlWebpackPlugin
      // Description: Simplifies creation of HTML files to serve your webpack bundles.
      // This is especially useful for webpack bundles that include a hash in the filename
      // which changes every compilation.
      //
      // See: https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        title: METADATA.title,
        chunksSortMode: 'dependency',
        metadata: METADATA,
        inject: 'head'
      })

    ],

    // Include polyfills or mocks for various node stuff
    // Description: Node configuration
    //
    // See: https://webpack.github.io/docs/configuration.html#node
    node: {
      global: 'window',
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    },
  };
};
