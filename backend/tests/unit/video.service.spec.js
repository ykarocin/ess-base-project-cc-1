const VideoService = require('../../src/services/video.service');
const { HttpNotFoundError } = require('../../src/utils/errors/http.error');
const db = require('../../src/database');

describe('VideoService (Unit)', () => {
  let service;

  beforeEach(async () => {
    await db.connect();
    await db.initialize();
    await db.seed();
    service = new VideoService();
  });

  it('getVideo - retorna dados se video existe (101)', async () => {
    const result = await service.getVideo('101');
    expect(result.code).toBe(200);
    expect(result.data.videoId).toBe('101');
    expect(result.data.titulo).toBe('Stranger Things - Piloto');
  });

  it('getVideo - gera 404 se video não existe', async () => {
    await expect(service.getVideo('999')).rejects.toThrow(HttpNotFoundError);
  });

  it('registerView - se vídeo não existe => HttpNotFoundError', async () => {
    await expect(service.registerView('XZY', '1')).rejects.toThrow(HttpNotFoundError);
  });

  it('registerView - incrementa views e retorna 201', async () => {
    const before = await service.getVideo('101');
    const oldViews = before.data.views || 0;
    const result = await service.registerView('101', '1');
    expect(result.code).toBe(201);
    expect(result.msg).toBe('Visualização registrada com sucesso');
    const after = await service.getVideo('101');
    expect(after.data.views).toBe(oldViews + 1);
  });
});
