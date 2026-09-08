const STATUS_VALIDOS = ['disponivel', 'em_uso', 'manutencao'];
function podeRetirar(item, quantidade) {
    if (!STATUS_VALIDOS.includes(item.status)) return false;
    if (item.status !== 'disponivel') return false;
    if (!Number.isInteger(quantidade) || quantidade <= 0) return false;
    if (quantidade > item.quantidade) return false;
    return true;
}
module.exports = { podeRetirar, STATUS_VALIDOS };