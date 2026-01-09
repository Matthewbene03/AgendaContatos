//Arquivo de configuração do webpack

const path = require("path"); //Cria uma variável para trabalhar com caminhos

module.exports = { //Vai exportar para usar fora desse arquivo para utilizar fora dele. A configuração do webpack

    mode: "development", //Mode de trabalho no projeto. Tem o modo production que é o modo de produção para "simplicar" os códigos.
    entry: "./frontend/index.js", //O arquivo de entrada
    output: {
        path: path.resolve(__dirname, "public", "assets", "js"), //O arquivo de saida. O caminho é encontrado com o path.resolve(). __dirname é para identificar aonde se encontra o arquivo atual no projeto.
        filename: "bundle.js" //Nome do arquivo de saida
    },
    module: {
        rules: [
            { //Regras para a execução do webpack
                exclude: /node_modules/,
                test: /\.js/, //Testa qual o arquivo vai ser analisado, qual extensão.
                use: { //O que o webpack vai usar
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/env"]
                    }
                }
            },
            {
                test: /\.css/, //Testa qual o arquivo vai ser analisado, qual extensão.
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    devtool: "source-map" //Serve para mapear um erro ou aonde teve um log no arquivo de entrada.

};