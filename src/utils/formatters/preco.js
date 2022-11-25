export default function formatarPreco(preco) {
    preco = preco.replace(/\D/g,'');
    preco = (preco/100).toFixed(2) + '';
    preco = preco.replace(".", ",");
    preco = preco.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return preco;
  }