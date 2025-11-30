/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
    stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-links",
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    typescript: {
        check: false,
        reactDocgen: "react-docgen-typescript",
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
        },
    },
    viteFinal: async (config) => {
        const { mergeConfig } = await import("vite");
        return mergeConfig(config, {
            resolve: {
                alias: {
                    "@": path.resolve(__dirname, "../src"),
                    "next/navigation": path.resolve(__dirname, "./mocks/next-navigation.ts"),
                },
            },
        });
    },
};

module.exports = config;

