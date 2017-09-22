var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var cleanPlugin = require('clean-webpack-plugin'); // 文件夹清除工具
var extractTextPlugin = require('extract-text-webpack-plugin');//将你的行内样式提取到单独的css文件里

var webpackConfig = {
    /* 一些webpack基础配置 */   
    entry:{
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		publicPath:'http://localhost/webpack-project/dist/',
		filename:'js/[name]-[chunkhash].js'
	},
	module:{
		rules:[
			{
			  	test: require.resolve('jquery'),  // 此loader配置项的目标是NPM中的jquery
			  	loader: 'expose-loader?$!expose-loader?jQuery' // 先把jQuery对象声明成为全局变量`jQuery`，再通过管道进一步又声明成为全局变量`$`
			},
			{
				test:/\.js$/,
				loader:'babel-loader',
				exclude:path.resolve(__dirname,'/node_modules/'),
				include:path.resolve(__dirname,'/src/'),
				query:{
					presets:['latest']
				}
			},
			{
				test:/\.css$/,
				exclude: /node_modules/,
				use:extractTextPlugin.extract({
					fallback: "style-loader", // 编译后用什么loader来提取css文件
          			use: "css-loader?importLoaders=1!postcss-loader" // 指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
				})
			},
			{
				test:/\.less$/,
				loader:'style-loader!css-loader!postcss-loader!less-loader'
			},
			// {
			// 	test:/\.html$/,
			// 	loader:'html-loader'
			// },
			{
				test:/\.tpl$/,
				loader:'ejs-loader'
			},
			{
				test:/\.(png|jpg|gif|svg)$/i,
				loaders:[
					'url-loader?limit=30720&name=img/[name]-[hash:5].[ext]',
					'image-webpack-loader'
				]
			}
		]
	},
	plugins:[
		new webpack.ProvidePlugin({
	      	$: 'jquery',
		    jQuery: 'jquery',
		    'window.jQuery': 'jquery',
		    'window.$': 'jquery',
	    }),
	    new cleanPlugin(['dist']),// 清空dist文件夹
	    new extractTextPlugin( "css/[name]-[hash:5].css"), //提取CSS行内样式,转化为link引入
	]
};

var entries = getEntries('src/*.js');
Object.keys(entries).forEach(function(name) {
    // 每个页面生成一个entry，如果需要HotUpdate，在这里修改entry
    webpackConfig.entry[name] = entries[name];
    
    // 每个页面生成一个html
    var plugin = new htmlWebpackPlugin({
        // 生成出来的html文件名
        filename: name + '.html',
        // 每个html的模版，这里多个页面使用同一个模版
        template: './src/view/'+name+'.html',
        // 自动将引用插入html
        inject: 'body',
        // 每个html引用的js模块，也可以在这里加上vendor等公用模块
        chunks: [name]
    });
    webpackConfig.plugins.push(plugin);
})

// 获取指定路径下的入口文件
function getEntries(globPath) {
    var files = glob.sync(globPath),
       	entries = {};
    files.forEach(function(filepath) {
        // 取倒数第1层(view下面的文件夹)做包名
        var split = filepath.split('/');
        var name = split[split.length - 1].replace(".js","");
        entries[name] = './' + filepath;
    });
    return entries;
}

module.exports = webpackConfig;