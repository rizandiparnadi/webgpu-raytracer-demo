const HtmlWebpackPlugin = require("html-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");
// const WebpackObfuscator = require('webpack-obfuscator');
const webpack = require('webpack');
const path = require('path');



module.exports = {
	entry: "./index.js",
	output: {
		filename: "./bundle.js",
		publicPath: '/',
		clean: true
	},
	mode: "development",
	resolve: {
		// Add these as resolvable extensions.
		extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
		alias: {
			lib: path.resolve(__dirname, 'lib'),
		}
	},
	module: {
		rules: [
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ test: /\.js$/, loader: "source-map-loader" },
			// Assets that are loaded are handled as Asset Modules. Make sure the output path, filenames & urls match gltf-loader's (below).
			{ test: /\.(png|svg|jpg|jpeg|gif|hdr|bin|basis|ktx|ktx2|glb|exr)$/, type: "asset/resource", generator: { filename: "assets/[hash][ext][query]" } },
			// Non-standalone GLTF files are handled by 'gltf-loader' because a single GLTF file can refer to multiple external files.
			{ test: /\.gltf$/, loader: "gltf-loader", options: { filePath: "assets", fileName: "[hash].[ext][query]" } }
		],
	},
	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",
	plugins: [
		new webpack.ProvidePlugin({
			process: 'process/browser',
		}),
		new HtmlWebpackPlugin({
			filename: "./index.html",
			template: "./template.html",
			inject: false
		}),
	],
	devServer: {
		host: '0.0.0.0',
		port: 8080,
		static: './dist',
		liveReload: true
	}
};