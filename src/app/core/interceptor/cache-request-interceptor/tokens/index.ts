import { HttpContextToken } from '@angular/common/http';

export const CACHE_REQUEST = new HttpContextToken<boolean>(() => false);
