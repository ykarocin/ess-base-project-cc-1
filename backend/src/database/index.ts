class Database {
  public data: { [key: string]: any[] };

  private static instance: Database;

  private constructor() {
    this.data = { videos: [], histories: [] };
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public static reset(): void {
    Database.instance = new Database();
  }

  public static seed(): void {
    const db = Database.getInstance();
    db.data.videos = [
      new (require('../entities/video.entity').default)({
        videoId: '101',
        titulo: 'Stranger Things - Piloto',
        duracao: '45 minutos',
        views: 0,
        likes: 0,
        imageUrl: 'https://exemplo.com/thumb101.jpg',
      }),
      new (require('../entities/video.entity').default)({
        videoId: '102',
        titulo: 'Breaking Bad - Piloto',
        duracao: '60 minutos',
        views: 0,
        likes: 0,
        imageUrl: 'https://exemplo.com/thumb102.jpg',
      }),
    ];
    const now = new Date().toISOString();
    db.data.histories = [
      new (require('../entities/history.item.entity').default)({
        userId: '1',
        videoId: '101',
        ultimaVisualizacao: now,
      }),
      new (require('../entities/history.item.entity').default)({
        userId: '1',
        videoId: '102',
        ultimaVisualizacao: now,
      }),
    ];
  }
}

export default Database;
