import { Injectable } from '@angular/core';

@Injectable()
export class AuthStateService {
  public password: string;
  public apiKey: string;

  constructor() { }
}
