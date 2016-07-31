var webpack=require("webpack");
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports={
	entry: {
		send_email : "./public/javascripts/router/app_router.jsx"
	},
	output: {
		path : __dirname + "/public/out/",
		filename : "[name].js",
		publicPath : "/out/"
	},
	module: {
	          loaders: [	
		     { 
		            	test: /\.js$/, 
		            	loader : "babel",
		            	query: {
		            		presets: ["es2015"]
		            	} 
		     },
		     { 
		            	test: /\.css$/, 
		            	loader: "style!css" 
		     },
		     { 
		            	test: /\.(jpg|png|otf)$/, 
		            	loader: "url?limit=8192" 
		     },
		     { 
		            	test: /\.scss$/, 
		            	loader : "style!css!sass" 
		     },
		     { 
		            	test: /\.jsx$/, 
		            	loader: "babel", 
		            	query: {
		            		presets: ["react", "es2015"]
		            	} 
		     }
	          ]
    	},
    	resolve: {
        		extensions: ["", ".js", ".jsx",".scss"]
    	},
    	plugins: [
		commonsPlugin
	]
}