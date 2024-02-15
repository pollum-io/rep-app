/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ["ui"],
	experimental: {
		appDir: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
