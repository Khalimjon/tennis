import mongoose, { ConnectOptions, Mongoose } from 'mongoose';

export class Mongo {
  protected _url: string;
  protected _db: Mongoose;
  protected _options: ConnectOptions;

  setUrl(url: string): Mongo {
    this._url = url;
    return this;
  }

  setDB(v: Mongoose): Mongo {
    this._db = v;
    return this;
  }

  setOptions(v: ConnectOptions): Mongo {
    this._options = v;
    return this;
  }

  getUrl(): string {
    return this._url;
  }

  getDB(): Mongoose {
    return this._db;
  }

  getOptions(): ConnectOptions {
    return this._options;
  }

  async connect(): Promise<void> {
    try {
      mongoose.set('strictQuery', false);
      this.setDB(await mongoose.connect(this.getUrl(), this.getOptions()));
      console.log('Connected to mongodb successfully');
    } catch (error) {
      throw error;
    }
  }

  async disconnect() {
    try {
      await this.getDB().disconnect();
      console.log('Disconnected mongodb successfully');
    } catch (error) {
      throw error;
    }
  }
}
