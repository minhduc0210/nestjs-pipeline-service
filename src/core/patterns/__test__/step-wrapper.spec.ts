import { asStep, FunctionHandler } from '../step-wrapper';

interface TestContext {
  tags: string[];
}

describe('FunctionHandler & asStep', () => {
  it('should wrap step function into FunctionHandler using asStep', async () => {
    const stepFn = (ctx: TestContext): TestContext => {
      ctx.tags.push('step1');
      return ctx;
    };

    const handler = asStep(stepFn);
    expect(handler).toBeInstanceOf(FunctionHandler);

    const result = await handler.handle({ tags: [] });
    expect(result.tags).toEqual(['step1']);
  });
});
