import { AbstractHandler } from '../handler.interface';

interface TestContext {
  count: number;
}

class ConcreteTestHandler extends AbstractHandler<TestContext> {
  public override async handle(request: TestContext): Promise<TestContext> {
    request.count += 1;
    return super.handle(request);
  }
}

describe('AbstractHandler', () => {
  it('should link handlers via setNext and execute sequentially', async () => {
    const handler1 = new ConcreteTestHandler();
    const handler2 = new ConcreteTestHandler();

    handler1.setNext(handler2);

    const result = await handler1.handle({ count: 0 });
    expect(result.count).toBe(2);
  });

  it('should return context when nextHandler is null', async () => {
    const handler = new ConcreteTestHandler();
    const result = await handler.handle({ count: 5 });
    expect(result.count).toBe(6);
  });
});
