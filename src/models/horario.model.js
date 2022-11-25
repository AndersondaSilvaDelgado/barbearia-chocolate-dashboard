function Horario(id, descricao, horario_inicial, horario_final){

    this.id = id;
    this.descricao = descricao;
    this.horario_inicial = horario_inicial;
    this.horario_final = horario_final;

    return {
        id: id,
        descricao: descricao,
        horario_inicial: horario_inicial,
        horario_final: horario_final
    };

}

export default Horario;