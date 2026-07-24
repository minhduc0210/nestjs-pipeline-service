export interface Handler<TContext> {
  setNext(handler: Handler<TContext>): Handler<TContext>;
  handle(request: TContext): Promise<TContext>;
}

export abstract class AbstractHandler<TContext> implements Handler<TContext> {
  protected nextHandler: Handler<TContext> | null = null;

  public setNext(handler: Handler<TContext>): Handler<TContext> {
    this.nextHandler = handler;
    return handler;
  }

  public async handle(request: TContext): Promise<TContext> {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return request;
  }
}
