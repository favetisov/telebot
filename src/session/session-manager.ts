export class SessionManager<SessionData> {
  data: SessionData;
  load: (key: string) => Promise<SessionData>;
  update: (data: Partial<SessionData>) => Promise<SessionData>;
}
