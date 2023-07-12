/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
    "storybook-code-panel/register",
    "@storybook/addon-notes/register-panel",
    "@whitespace/storybook-addon-html"
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },previewHead: (head) => `
    ${head}
    <style>
      .docs-story .css-1wjen9k{margin:0;padding:0}
      .docs-story .css-1wjen9k .innerZoomElementWrapper > *{border:none !important}
    </style>
  `,
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
};
export default config;
