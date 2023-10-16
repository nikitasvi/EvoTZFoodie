import { Injectable } from '@angular/core';
import { ApiClient } from './api.client';
import { IUser } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
    constructor(
        private readonly apiClient: ApiClient) {}

    public getUsers() {
        return this.apiClient.get<IUser[]>('users');
    }
}