export default function formatarValor(cpf) {
  cpf = cpf.replace(/\D/g, '');
  switch (cpf.length) {
    case 4:
    case 5:
    case 6:
      cpf = cpf.replace(/(\d{3})(.*)/, '$1.$2');
      break;
    case 7:
    case 8:
    case 9:
      cpf = cpf.replace(/(\d{3})(\d{3})(.*)/, '$1.$2.$3');
      break;
    case 10:
    case 11:
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(.*)/, '$1.$2.$3-$4');
      break;
    default:
      break;
  }
  return cpf;
}