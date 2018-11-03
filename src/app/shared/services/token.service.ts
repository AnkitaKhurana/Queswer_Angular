import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() { }
  
  /// **********************************************************************
  //          Function to get token from localstorage 
  /// **********************************************************************
  getToken(): String {
    return window.localStorage.getItem('token');
  }

  /// **********************************************************************
  //          Function to save token in localstorage 
  /// **********************************************************************
  saveToken(token: String) {
    window.localStorage['token'] = token;
  }

  /// **********************************************************************
  //          Function to delete token from localstorage 
  /// **********************************************************************
  destroyToken() {
    window.localStorage.removeItem('token');
  }
}

