const mongoose = require("mongoose");
const validator = require("validator"); //Importa o validator para trabalhar com validação de dados, como email.
const bcryptjs = require("bcryptjs"); //Importa o bcryptjs para trabalhar com senha

const ContatosSchema = new mongoose.Schema({ //Modela como vai ser a classe no banco de dados com o mongoose
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: ""},
    email: { type: String, required: false, default: ""},
    telefone: { type: String, required: false, default: ""},
    dataCriacao: { type: Date, default: Date.now }
});

const ContatosModel = mongoose.model("Contatos", ContatosSchema); //Cria o seu modelo com base no "schema" criado

class Contatos {
    constructor(body) {
        this.body = body;
        this.msgErrors = []; //Usado para mostrar as mensagens de error.
        this.contatos = null;
    }

    static async buscarPorID(id){
        if(typeof id !== "string") return;
        const contato = await ContatosModel.findById(id);
        return contato;
    }

    static async buscarTodosContatos(){
        const contatos = await ContatosModel.find()
        .sort({dataCriacao: -1}); //Busca todos os contatos e retorna em ordem decrescente de data
        return contatos;
    }

    static async deletar(id){
        const contatos = await ContatosModel.findByIdAndDelete(id); //Busca  por um contato pelo id e deleta ele. 
        return contatos;
    }

    async editar(id){
        if(typeof id !== "string") return;

        this.verificar();
        if (this.msgErrors.length > 0) {
            return;
        }

        this.contatos = await ContatosModel.findByIdAndUpdate(id, this.body, {new: true}); //Ele encontra o contato pelo id e atualiza o objeto pelo body. new:true retorna o contato atualizado

        //ContatosModel.findByIdAndDelete(id);


        console.log(this.contatos);
    }

    async registrar() {
        this.verificar();
        if (this.msgErrors.length > 0) {
            return;
        }

        this.contatos = await ContatosModel.create(this.body);
    }

    verificar() {
        this.cleanUp();

        //Verifica se o email é valido
        if (this.body.email && !validator.isEmail(this.body.email)) this.msgErrors.push("Email inválido!");
        if (!this.body.nome) this.msgErrors.push("Nome é um campo obrigatório");
        if (!this.body.email && !this.body.telefone){
            this.msgErrors.push("Precisa enviar pelo menos o seu email ou telefone!");
        }
    }

    cleanUp() {
        for (let key in this.msgErrors) { //Verifica se todas as chaves é do tipo "String" e se não for, troca para "".
            if (typeof this.body[key] !== "string") {
                this.body[key] = "";
            }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        };
    }

}

module.exports = Contatos;