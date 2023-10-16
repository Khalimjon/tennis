import { sign, verify, JwtPayload } from 'jsonwebtoken';

export class TokenService {
  protected _secret: string;
  protected _expiresIn: number;
  protected _payload: string | JwtPayload;
  protected _token: string;

  constructor() {
    this.setSecret(process.env.JWT_SECRET);
    this.setExpiresIn(Number(process.env.JWT_EXPIRES));
  }

  setSecret(secret: string): TokenService {
    this._secret = secret;
    return this;
  }

  setExpiresIn(expiresIn: number): TokenService {
    this._expiresIn = expiresIn;
    return this;
  }

  setPayload(payload: string | JwtPayload): TokenService {
    this._payload = payload;
    return this;
  }

  setToken(token: string): TokenService {
    this._token = token;
    return this;
  }

  getSecret() {
    return this._secret;
  }

  getExpiresIn() {
    return this._expiresIn;
  }

  getPayload() {
    return this._payload;
  }

  getToken() {
    return this._token;
  }

  sign() {
    this.setToken(sign(this.getPayload(), this.getSecret(), { expiresIn: this.getExpiresIn() }));
    return this.getToken();
  }

  verify() {
    this._payload = verify(this.getToken(), this.getSecret());
    return this.getPayload();
  }
}
