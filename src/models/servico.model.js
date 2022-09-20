function Servico(descricao, detalhe, estado, tempo, valor){

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