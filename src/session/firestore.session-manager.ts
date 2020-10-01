import { CollectionReference, DocumentReference, Firestore } from '@google-cloud/firestore';
import { SessionManager } from './session-manager';

export class FirestoreSessionManager<SessionData> implements SessionManager<SessionData> {
  data: SessionData;
  key: string;
  private docRef: DocumentReference;
  private collection: CollectionReference;

  constructor(projectId: string, collectionPath: string, private initialData: SessionData) {
    this.collection = new Firestore({ projectId }).collection(collectionPath);
  }

  async load(key: string): Promise<SessionData> {
    this.key = key;
    this.docRef = await this.collection.doc(key);
    this.data = Object.assign(this.initialData, (await this.docRef.get()).data());
    await this.update(this.data);
    return this.data;
  }

  async update(data: Partial<SessionData>): Promise<SessionData> {
    await this.docRef.update(data);
    for (const key in data) {
      this.data[key] = data[key]!;
    }
    return this.data;
  }
}
