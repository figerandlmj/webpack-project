var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
	entry:{
		a:'./src/a.js',
		b:'./src/b.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'js/[name].js'
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
				use:[
					'style-loader',
					{
						loader:'css-loader',
						options:{
							importLoaders:1
						}
					},
					{
						loader:'postcss-loader'
					}
				]
			},
			// {
			// 	test:/\.less$/,
			// 	loader:'style-loader!css-loader!postcss-loader!less-loader'
			// },
			// {
			// 	test:/\.html$/,
			// 	loader:'html-loader'
			// },
			// {
			// 	test:/\.tpl$/,
			// 	loader:'ejs-loader'
			// },
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
		new htmlWebpackPlugin({
			filename:'a.html',
			template:'./src/view/a.html',
			chunks:['a'],
			inject:'body',
			// title:'wabpack is good'
		}),
		new htmlWebpackPlugin({
			filename:'b.html',
			template:'./src/view/b.html',
			chunks:['b'],
			inject:'body',
			// title:'wabpack is good'
		}),
		new webpack.ProvidePlugin({
	      	$: 'jquery',
		    jQuery: 'jquery',
		    'window.jQuery': 'jquery',
		    'window.$': 'jquery',
	    })
	]
}