import { ChainBuilder } from '../chain-builder';
import { asStep } from '../step-wrapper';

interface TestContext {
  count: number;
}

describe('ChainBuilder', () => {
  it('should throw an error when building an empty chain', () => {
    const builder = new ChainBuilder<TestContext>();
    expect(() => builder.build()).toThrow(
      'Cannot build chain if there is no steps!',
    );
  });

  it('should build and execute a single-step chain', async () => {
    const step = asStep((ctx: TestContext): TestContext => {
      ctx.count += 5;
      return ctx;
    });

    const chain = new ChainBuilder<TestContext>().add(step).build();
    const result = await chain.handle({ count: 10 });
    expect(result.count).toBe(15);
  });

  it('should build and execute a multi-step chain in order', async () => {
    const step1 = asStep((ctx: TestContext): TestContext => {
      ctx.count += 2;
      return ctx;
    });

    const step2 = asStep((ctx: TestContext): TestContext => {
      ctx.count *= 3;
      return ctx;
    });

    const chain = new ChainBuilder<TestContext>()
      .add(step1)
      .add(step2)
      .build();

    const result = await chain.handle({ count: 3 });
    expect(result.count).toBe(15); // (3 + 2) * 3
  });
});
