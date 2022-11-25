function Servico(id, descricao, detalhe, estado, tempo, valor){

    this.id = id;
    this.descricao = descricao;
    this.detalhe = detalhe;
    this.estado = estado;
    this.tempo = tempo;
    this.valor = valor;

    return {
        descricao: descricao,
        detalhe: detalhe,
        estado: estado,
        tempo: tempo,
        valor: valor,
    };

}

export default Servico;