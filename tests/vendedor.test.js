const request = require('supertest');
const app = require('../src/app');

describe('🔹 Registro de Vendedor Universitario (TDD)', () => {
  it('✅ Permite registro válido con código y correo institucional', async () => {
    const res = await request(app)
      .post('/api/vendedores/register')
      .send({ codigo: 'U2025001', correo: 'u2025001@universidad.edu' });

    expect(res.statusCode).toBe(201);
    expect(res.body.mensaje).toBe('Registro exitoso');
  });

  it('🚫 Rechaza registro con correo no institucional', async () => {
    const res = await request(app)
      .post('/api/vendedores/register')
      .send({ codigo: 'U2025002', correo: 'usuario@gmail.com' });

    expect(res.statusCode).toBe(400);
    expect(res.body.mensaje).toMatch(/dominio institucional/i);
  });

  it('🚫 Evita duplicar códigos de estudiante', async () => {
    await request(app)
      .post('/api/vendedores/register')
      .send({ codigo: 'U2025003', correo: 'u2025003@universidad.edu' });

    const res = await request(app)
      .post('/api/vendedores/register')
      .send({ codigo: 'U2025003', correo: 'otro@universidad.edu' });

    expect(res.statusCode).toBe(400);
    expect(res.body.mensaje).toMatch(/ya registrado/i);
  });
});
