import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
// (optional) add later: import tsconfigPaths from 'vite-tsconfig-paths';

export default {
  stories: ['../src/**/*.stories.@(ts|tsx)', '../src/**/*.mdx'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-vitest',
  ],
  framework: { name: '@storybook/react-vite', options: {} },
  async viteFinal(cfg) {
    // If you need TS path aliases, uncomment the next two lines:
    // const { default: tsconfigPaths } = await import('vite-tsconfig-paths');
    // cfg.plugins = [...(cfg.plugins ?? []), tsconfigPaths()];

    cfg.plugins = [...(cfg.plugins ?? []), tailwindcss()];

    cfg.resolve = {
      ...(cfg.resolve ?? {}),
      alias: {
        ...(cfg.resolve?.alias ?? {}),
        '@': path.resolve(process.cwd(), 'src'),
        '@components': path.resolve(process.cwd(), 'src/components'),
      },
    };
    return cfg;
  },
};
