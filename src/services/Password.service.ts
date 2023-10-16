import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export class PasswordService {
  protected _password: string;
  protected _hash: string;

  setPassword(password: string): PasswordService {
    this._password = password;
    return this;
  }

  setHash(hash: string): PasswordService {
    this._hash = hash;
    return this;
  }

  getPassword(): string {
    return this._password;
  }

  getHash(): string {
    return this._hash;
  }

  hash() {
    this.setHash(hashSync(this.getPassword(), genSaltSync(10)));
    return this.getHash();
  }

  compare(): boolean {
    return compareSync(this.getPassword(), this.getHash());
  }
}
