const mongoose = require("mongoose");
const validator = require("validator"); //Importa o validator para trabalhar com validação de dados, como email.
const bcryptjs = require("bcryptjs"); //Importa o bcryptjs para trabalhar com senha

const LoginSchema = new mongoose.Schema({ //Modela como vai ser a classe no banco de dados com o mongoose
    email: {type: String, required: true},
    senha: {type: String, required: true}
});

const LoginModel = mongoose.model("Login", LoginSchema); //Cria o seu modelo com base no "schema" criado

class Login{
    constructor(body){
        this.body = body;
        this.msgErrors = []; //Usado para mostrar as mensagens de error.
        this.user = null; 
    }

    async registrar(){
        this.verificar();
        if(this.msgErrors.length > 0){
            return;
        }
        
        await this.userExists();
        
        if(this.msgErrors.length > 0){
            return;
        }
        
        try{
            const salt = bcryptjs.genSaltSync();
            this.body.senha = bcryptjs.hashSync(this.body.senha, salt); //Gera um hash da senha para ir para o BD

            this.user = await LoginModel.create(this.body);
        } catch(e){
            console.log(e);
        }
    }

    async userExists(){
        const user = await LoginModel.findOne({ email: this.body.email}) //Porcura um registro no BD com o email informando.

        if(user){
            this.msgErrors.push("Usuário já existe!");
        }
    }

    verificar(){
        this.cleanUp();

        //Verifica se o email é valido
        if(!validator.isEmail(this.body.email)) this.msgErrors.push("Email inválido!");

        //Verifica se o tamanho da senha é valida
        if(this.body.senha.length < 3 || this.body.senha.length > 50){
            this.msgErrors.push("Senha precisa ter no mín 3 caracteres e no máx 50 caracteres!");
        }
    }

    cleanUp(){
        for( let key in this.msgErrors){ //Verifica se todas as chaves é do tipo "String" e se não for, troca para "".
            if(typeof this.body[key] !== "string"){
                this.body[key] = "";
            }
        }

        this.body = {
            email: this.body.email,
            senha: this.body.senha
        };
    }

}

module.exports = Login;