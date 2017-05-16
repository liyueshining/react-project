// Karma configuration
// Generated on Wed Mar 01 2017 15:49:18 GMT+0800 (CST)

module.exports = function (karma) {
    karma.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai'],

        plugins: ['karma-mocha', 'karma-chai', 'karma-webpack',
            'karma-junit-reporter', 'karma-coverage',
            'karma-sourcemap-loader', 'karma-phantomjs-launcher'],


        // list of files / patterns to load in the browser //all files including src and test
        files: [
            'actions/*.js',
            'reducers/*.js',
            'constants/*.js',
            'components/*.js',
            'test/*.js'
        ],


        // list of files to exclude //src files to exclude not to compile
        exclude: [
            'actions/*.js',
            'reducers/*.js',
            'constants/*.js',
            'components/*.js',
        ],

        /*client: {
         mocha: {
         opts: 'test/mocha.opts' // You can set opts to equal true then plugin will load opts from default location 'test/mocha.opts'
         }
         },*/


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '**/*spec.js': ["webpack", 'sourcemap'],
            '**/*(!spec).js': ["webpack", 'sourcemap', 'coverage']  //keep src files for coverage
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'junit', 'coverage'],

        junitReporter: {
            useBrowserName: false,
            outputFile: './reports/surefire-reports/karma-test-results.xml'
        },

        coverageReporter: {
            // specify a common output directory
            dir: './reports/coverage',
            reporters: [
                // reporters not supporting the `file` property
                {type: 'html', subdir: '.'},
                // reporters supporting the `file` property, use `subdir` to directly
                // output them in the `dir` directory
                {type: 'cobertura', subdir: 'cobertura', file: 'cobertura-coverage.xml'},
            ]
        },


        webpack: {
            devtool: 'source-map',
            module: {
                preLoaders: [{
                    test: [/\.js$/],
                    exclude: [/node_modules/, /test/],
                    loader: 'isparta-instrumenter-loader'
                }],
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: [/node_modules/],
                        loader: 'babel',

                        query: {
                            presets: ['es2015', 'react', 'stage-0','airbnb']
                        }
                    },
                ]
            },

            externals: {
                'cheerio': 'window',
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
            },
        },
        webpackServer: {
            noInfo: true // prevent console spamming when running in Karma!
        },




        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: karma.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
