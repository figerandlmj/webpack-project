var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
	entry:{
		a:'./src/js/a.js',
		b:'./src/js/b.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'js/[name].js'
	},
	module:{
		rules:[
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
			// {
			// 	test:/\.(png|jpg|gif|svg)$/i,
			// 	loaders:[
			// 		'url-loader?limit=20000&name=assets/[name]-[hash:5].[ext]',
			// 		'image-webpack-loader'
			// 	]
			// }
		]
	},
	plugins:[
		new htmlWebpackPlugin({
			filename:'a.html',
			template:'./src/a.html',
			chunks:['common','a'],
			inject:'body',
			// title:'wabpack is good'
		}),
		new htmlWebpackPlugin({
			filename:'b.html',
			template:'./src/b.html',
			chunks:['common','b'],
			inject:'body',
			// title:'wabpack is good'
		})
	]
}