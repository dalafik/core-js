const fs = require('fs')
const UglifyJS = require('uglify-js')

require('core-js-builder')({
    modules: [
        'es.symbol',
        'es.map',
        'es.object.is',
        'es.object.assign',
    ],
})
.then(code => {
    const result = UglifyJS.minify(code, {
        mangle: {
          keep_fnames: true,
        },
        compress: {
          keep_fnames: true,
          pure_getters: true,
        },
        output: {
          max_line_len: 32000,
        },
        ie8: false,
        sourceMap: false,
    });
    if (result.error)
    {
        console.log(result.error)
    }
    else
    {
        fs.writeFileSync('core-polyfill.min.js', result.code, {encoding: 'utf8'})
    }
    console.log('Done')
})
.catch(console.log)