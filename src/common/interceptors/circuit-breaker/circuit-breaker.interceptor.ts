import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CircuitBreaker } from './circuit-breaker';

@Injectable()
export class CircuitBreakerInterceptor implements NestInterceptor {
  private readonly circuitBreakerByHandler = new WeakMap<
    Function,
    CircuitBreaker
  >();
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const routeHandler = context.getHandler();
    let circuitBreaker: CircuitBreaker;
    if (this.circuitBreakerByHandler.has(routeHandler)) {
      circuitBreaker = this.circuitBreakerByHandler.get(routeHandler)!;
    } else {
      circuitBreaker = new CircuitBreaker();
      this.circuitBreakerByHandler.set(routeHandler, circuitBreaker);
    }
    return circuitBreaker.exec(next);
  }
}
