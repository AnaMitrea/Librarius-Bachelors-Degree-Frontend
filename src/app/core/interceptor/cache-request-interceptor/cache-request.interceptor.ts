import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {INTERCEPT_PATHS} from "@app-core/interceptor/cache-request-interceptor/const";
import {CACHE_REQUEST} from "@app-core/interceptor/cache-request-interceptor/tokens";

@Injectable()
export class CacheRequestInterceptor implements HttpInterceptor {
  private requestCache: Map<string, Observable<HttpEvent<any>>> = new Map();
  private cache: Map<string, HttpEvent<any>> = new Map();

  private cacheRequestSubject(req: HttpRequest<any>, next: HttpHandler) {
    const subject = new Subject<HttpEvent<any>>();
    next.handle(req).subscribe((event) => {
      subject.next(event);
      this.cache.set(req.url, event);
      subject.complete();
    });

    return subject;
  }

  validPath(req: HttpRequest<any>) {
    return !!INTERCEPT_PATHS.find(({ method, url, partial }) => {
      return req.method === method && (partial ? req.url.includes(url) : url === req.url);
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.validPath(req)) return next.handle(req);
    if (!req.context.get(CACHE_REQUEST)) return next.handle(req);
    const cachedResponse = this.cache.get(req.url);

    if (cachedResponse) {
      return of(cachedResponse);
    } else {
      const requestCache = this.requestCache.get(req.url);
      if (requestCache) return requestCache;
      this.requestCache.set(req.url, this.cacheRequestSubject(req, next));
      return this.requestCache.get(req.url)!;
    }
  }
}

export const CacheRequestProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: CacheRequestInterceptor,
  multi: true
}
