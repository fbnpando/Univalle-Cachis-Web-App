const request = require('supertest');
const app = require('../../src/app');

describe('🔹 Integración: Registro y listado de vendedores', () => {
  it('✅ Registra un nuevo vendedor y lo devuelve en la lista', async () => {
    const registro = await request(app)
      .post('/api/vendedores/register')
      .send({ codigo: 'U2025004', correo: 'u2025004@universidad.edu' });

    expect(registro.statusCode).toBe(201);

    const lista = await request(app).get('/api/vendedores');
    const vendedorExiste = lista.body.some(v => v.codigo === 'U2025004');

    expect(lista.statusCode).toBe(200);
    expect(vendedorExiste).toBe(true);
  });

  it('🚫 No debe registrar un vendedor sin correo', async () => {
    const res = await request(app)
      .post('/api/vendedores/register')
      .send({ codigo: 'U2025005' });

    expect(res.statusCode).toBe(400);
  });
});
s