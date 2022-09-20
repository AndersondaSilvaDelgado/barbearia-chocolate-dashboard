function Usuario(id, nome, senha){

    this.id = id;
    this.nome = nome;
    this.senha = senha;

    return {
        id: id,
        nome: nome,
        senha: senha
    };

}

export default Usuario;