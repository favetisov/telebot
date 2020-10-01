import { appendFileSync, existsSync, readFile, writeFile } from 'fs';
import { SessionManager } from './session-manager';

export class FilesystemSessionManager<SessionData> implements SessionManager<SessionData> {
  data: SessionData;
  key: string;

  constructor(private dbFilename: string, private initialData: SessionData) {
    if (!existsSync(dbFilename)) {
      appendFileSync(dbFilename, '{}');
    }
  }

  async load(key: string): Promise<SessionData> {
    this.key = key;
    const users = await this.loadAll();
    users[key] ??= await this.update(this.initialData);
    this.data = users[key];
    return this.data;
  }

  async update(data: Partial<SessionData>): Promise<SessionData> {
    if (!this.key) throw new Error('Trying to update session data before initialization');
    return new Promise(async (resolve, reject) => {
      const users = await this.loadAll();
      users[this.key] ??= Object.assign(this.initialData, {});
      for (const k in data) {
        users[this.key][k] = data[k]!;
      }
      writeFile(this.dbFilename, JSON.stringify(users), (err) => {
        if (err) return reject(err);
        resolve(users[this.key]);
      });
    });
  }

  private async loadAll(): Promise<Record<string, SessionData>> {
    return new Promise((resolve, reject) => {
      readFile(this.dbFilename, (err, data) => {
        if (err) return reject(err);
        resolve(JSON.parse(data.toString()));
      });
    });
  }
}
