var webpack=require("webpack");

module.exports={
	entry: {
		send_email : "./public/javascripts/router/app_router.jsx",
		vendor: ['react', 'react-dom', 'react-router']
	},
	output: {
		path: __dirname + '/public/out/',
	    	filename: "[name].js",
	    	publicPath: "/out/",
	    	chunkFilename: "[name].js"
	},
	module: {
	    loaders: [	
		{ test: /\.js$/, loader : "babel", query: { presets: ["es2015"] } },
		{ test: /\.css$/, loader: "style!css" },
		{ test: /\.(jpg|png|otf)$/, loader: "url?limit=8192" },
		{ test: /\.scss$/, loader : "style!css!sass" },
		{ test: /\.jsx$/, loader: "babel", query: { presets: ["react", "es2015"] } }
	    ]
    },
    resolve: {
        extensions: ["", ".js", ".jsx",".scss"]
    },
    plugins: [
	new webpack.optimize.CommonsChunkPlugin({
		names: ['vendor', 'manifest']
	}),
	new webpack.DefinePlugin({
	    	'process.env' : {
	        	'NODE_ENV' : JSON.stringify('production')
	      	}
	}),
	new webpack.optimize.UglifyJsPlugin({
      		compress : {
        		warnings: false
      		}
    	})
    ]
}
