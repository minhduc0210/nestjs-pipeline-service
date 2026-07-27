import type { Handler } from './handler.interface';

export class ChainBuilder<TContext> {
  private firstHandler: Handler<TContext> | null = null;
  private lastHandler: Handler<TContext> | null = null;

  public add(handler: Handler<TContext>): this {
    if (this.firstHandler && this.lastHandler) {
      this.lastHandler = this.lastHandler.setNext(handler);
    } else {
      this.firstHandler = handler;
      this.lastHandler = handler;
    }
    return this;
  }

  public build(): Handler<TContext> {
    if (!this.firstHandler) {
      throw new Error('Cannot build chain if there is no steps!');
    }
    return this.firstHandler;
  }
}
