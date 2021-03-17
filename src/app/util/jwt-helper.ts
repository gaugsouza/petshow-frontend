import { HttpHeaders } from '@angular/common/http';

export class JwtHelper {
  private urlBase64Decode = (str: string) => {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw new Error('Illegal base64url string!');
    }
    return decodeURIComponent((<any>window).escape(window.atob(output)));
  }

  public decodeToken = (token: string = '') => {
    if (token === null || token === '') {
      return { upn: '' };
    }
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }
    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }
    return JSON.parse(decoded);
  }

  public recuperaIdToken = (token:string) : number => this.decodeToken(token).id;

  public constroiHeaders = (token:string) => {
    const auth = `Bearer ${token}`;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: auth,
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'Content-Security-Policy': 'Content-Security-Policy: default-src https://petshow-backend.herokuapp.com; default-src http://localhost:4200',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-Content-Type-Options': 'nosniff always',
        'Referrer-Policy': 'no-referrer',
        'Permissions-Policy': 'geolocation=(self "https://petshow-backend.herokuapp.com" "http://localhost:4200")',
      }),
    };
    return httpOptions;
  }
}
