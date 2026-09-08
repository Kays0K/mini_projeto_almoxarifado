const { podeRetirar } = require('./estoque');

const furadeira = {
    id: 1,
    nome: 'Furadeira de bancada',
    quantidade: 5,
    status: 'disponivel',
    categoriaId: 2
};

test('libera retirada de quantidade menor que o saldo', () => {
    expect(podeRetirar(furadeira, 3)).toBe(true);
});

test('libera retirada da quantidade exata do saldo', () => {
    expect(podeRetirar(furadeira, 5)).toBe(true);
});

test('bloqueia retirada acima do saldo', () => {
    expect(podeRetirar(furadeira, 6)).toBe(false);
});

test('bloqueia retirada de item em manutencao', () => {
    const torno = { ...furadeira, id: 2, nome: 'Torno mecanico', status: 'manutencao' };
    expect(podeRetirar(torno, 1)).toBe(false);
});

test('bloqueia quantidade zero ou negativa', () => {
    expect(podeRetirar(furadeira, 0)).toBe(false);
    expect(podeRetirar(furadeira, -2)).toBe(false);
});
