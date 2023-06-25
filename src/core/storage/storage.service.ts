import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements Storage {
  constructor(@Inject(PLATFORM_ID) private platformId: string) {}

  get length(): number {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.length;
    }
    return 0;
  }

  public clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.clear();
    }
  }

  public getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(key);
    }
    return null;
  }

  public key(index: number): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.key(index);
    }
    return null;
  }

  public removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.removeItem(key);
    }
  }

  public setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(key, value);
    }
  }
}