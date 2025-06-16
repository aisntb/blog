import { NextConfig } from 'next';
import { build } from 'velite';
 
/** @type {import('next').NextConfig} */
export default {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  webpack: (config:NextConfig) => {
    config.plugins.push(new VeliteWebpackPlugin());
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
 
class VeliteWebpackPlugin {
  static started = false;
  constructor(/** @type {import('velite').Options} */ options = {}) {
    
  }
  apply(/** @type {import('webpack').Compiler} */ compiler: { hooks: { beforeCompile: { tapPromise: (arg0: string, arg1: () => Promise<void>) => void; }; }; options: { mode: string; }; }) {
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === 'development';
      await build();
    });
  }
}