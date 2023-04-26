export class HttpStatusCodes {
  static readonly ACCEPTED = 202;
  static readonly BAD_GATEWAY = 502;
  static readonly BAD_REQUEST = 400;
  static readonly CONFLICT = 409;
  static readonly EXPECTATION_FAILED = 417;
  static readonly FORBIDDEN = 403;
  static readonly GATEWAY_TIMEOUT = 504;
  static readonly GONE = 410;
  static readonly HTTP_VERSION_NOT_SUPPORTED = 505;
  static readonly INSUFFICIENT_SPACE_ON_RESOURCE = 419;
  static readonly INSUFFICIENT_STORAGE = 507;
  static readonly INTERNAL_SERVER_ERROR = 500;
  static readonly LENGTH_REQUIRED = 411;
  static readonly LOCKED = 423;
  static readonly METHOD_FAILURE = 420;
  static readonly METHOD_NOT_ALLOWED = 405;
  static readonly MOVED_PERMANENTLY = 301;
  static readonly MOVED_TEMPORARILY = 302;
  static readonly MULTIPLE_CHOICES = 300;
  static readonly NO_CONTENT = 204;
  static readonly NON_AUTHORITATIVE_INFORMATION = 203;
  static readonly NOT_ACCEPTABLE = 406;
  static readonly NOT_FOUND = 404;
  static readonly NOT_IMPLEMENTED = 501;
  static readonly NOT_MODIFIED = 304;
  static readonly OK = 200;
  static readonly PARTIAL_CONTENT = 206;
  static readonly PAYMENT_REQUIRED = 402;
  static readonly REQUEST_HEADER_FIELDS_TOO_LARGE = 431;
  static readonly REQUEST_TIMEOUT = 408;
  static readonly REQUEST_TOO_LONG = 413;
  static readonly REQUEST_URI_TOO_LONG = 414;
  static readonly SERVICE_UNAVAILABLE = 503;
  static readonly TOO_MANY_REQUESTS = 429;
  static readonly UNAUTHORIZED = 401;
  static readonly UNSUPPORTED_MEDIA_TYPE = 415;

  private static map: Map<number, string> = new Map<number, string>([
    [HttpStatusCodes.ACCEPTED, 'Accepted'],
    [HttpStatusCodes.BAD_REQUEST, 'Bad Request'],
    [HttpStatusCodes.CONFLICT, 'Conflict'],
    [HttpStatusCodes.ACCEPTED, 'Accepted'],
    [HttpStatusCodes.BAD_GATEWAY, 'Bad Gateway'],
    [HttpStatusCodes.EXPECTATION_FAILED, 'Expectation Failed'],
    [HttpStatusCodes.FORBIDDEN, 'Action Is Not Allowed'],
    [HttpStatusCodes.GATEWAY_TIMEOUT, 'Gateway Timeout'],
    [HttpStatusCodes.GONE, 'Gone'],
    [HttpStatusCodes.HTTP_VERSION_NOT_SUPPORTED, 'HTTP Version Not Supported'],
    [HttpStatusCodes.INSUFFICIENT_SPACE_ON_RESOURCE, 'Insufficient Space on Resource'],
    [HttpStatusCodes.INSUFFICIENT_STORAGE, 'Insufficient Storage'],
    [HttpStatusCodes.INTERNAL_SERVER_ERROR, 'Server Error'],
    [HttpStatusCodes.LENGTH_REQUIRED, 'Length Required'],
    [HttpStatusCodes.LOCKED, 'Locked'],
    [HttpStatusCodes.METHOD_FAILURE, 'Method Failure'],
    [HttpStatusCodes.METHOD_NOT_ALLOWED, 'Method Not Allowed'],
    [HttpStatusCodes.MOVED_PERMANENTLY, 'Moved Permanently'],
    [HttpStatusCodes.MOVED_TEMPORARILY, 'Moved Temporarily'],
    [HttpStatusCodes.MULTIPLE_CHOICES, 'Multiple Choices'],
    [HttpStatusCodes.NO_CONTENT, 'No Content'],
    [HttpStatusCodes.NON_AUTHORITATIVE_INFORMATION, 'Non Authoritative Information'],
    [HttpStatusCodes.NOT_ACCEPTABLE, 'Not Acceptable'],
    [HttpStatusCodes.NOT_FOUND, 'Not Found'],
    [HttpStatusCodes.NOT_IMPLEMENTED, 'Not Implemented'],
    [HttpStatusCodes.NOT_MODIFIED, 'Not Modified'],
    [HttpStatusCodes.OK, 'OK'],
    [HttpStatusCodes.PARTIAL_CONTENT, 'Partial Content'],
    [HttpStatusCodes.PAYMENT_REQUIRED, 'Payment Required'],
    [HttpStatusCodes.REQUEST_HEADER_FIELDS_TOO_LARGE, 'Request Header Fields Too Large'],
    [HttpStatusCodes.REQUEST_TIMEOUT, 'Request Timeout'],
    [HttpStatusCodes.REQUEST_TOO_LONG, 'Request Entity Too Large'],
    [HttpStatusCodes.REQUEST_URI_TOO_LONG, 'Request-URI Too Long'],
    [HttpStatusCodes.SERVICE_UNAVAILABLE, 'Service Unavailable'],
    [HttpStatusCodes.TOO_MANY_REQUESTS, 'Too Many Requests'],
    [HttpStatusCodes.UNAUTHORIZED, 'Unauthorized'],
    [HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE, 'Unsupported Media Type']
  ]);

  public static getStatusText(statusCode: number): string {
    if (HttpStatusCodes.map.has(statusCode)) {
      // @ts-ignore
      return HttpStatusCodes.map.get(statusCode);
    }
    throw new Error(`Status code does not exist: ${statusCode}`);
  }
}
