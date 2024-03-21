module.exports = {
    presets: ["module:metro-react-native-babel-preset"],
    env: {
        production: {
            plugins: ["react-native-paper/babel"],
        },
    },
    plugins: [
        ["module-resolver", {
            root: ["."],
            extensions: [".js", ".ts", ".tsx", ".json"],
            alias: {
                "@api": "./src/api",
                "@components": "./src/components",
                "@hooks": "./src/hooks",
                "@locale": "./src/locale",
                "@router": "./src/router",
                "@screens": "./src/screens",
                "@services": "./src/services",
            },
        }],
        ["module:react-native-dotenv", {
            allowUndefined: false,
        }],
        "react-native-reanimated/plugin",
    ],
}
