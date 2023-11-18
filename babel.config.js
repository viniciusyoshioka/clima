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
                "@router": "./src/router",
                "@screens": "./src/screens",
                "@services": "./src/services",
            },
        } ],
        "react-native-reanimated/plugin",
    ],
}
