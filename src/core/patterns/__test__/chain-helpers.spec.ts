import { ChainBuilder } from '../chain-builder';
import { skipIf, skipUnless } from '../chain-helpers';

interface TestContext {
  count: number;
  tags: string[];
  shouldSkip?: boolean;
}

describe('Chain Helpers (skipIf & skipUnless)', () => {
  describe('skipIf', () => {
    it('should skip step execution when condition is true', async () => {
      const step = skipIf(
        (ctx: TestContext) => Boolean(ctx.shouldSkip),
        (ctx: TestContext) => {
          ctx.count += 100;
          return ctx;
        },
      );

      const chain = new ChainBuilder<TestContext>().add(step).build();

      const resultSkipped = await chain.handle({
        count: 5,
        tags: [],
        shouldSkip: true,
      });
      expect(resultSkipped.count).toBe(5);

      const resultExecuted = await chain.handle({
        count: 5,
        tags: [],
        shouldSkip: false,
      });
      expect(resultExecuted.count).toBe(105);
    });
  });

  describe('skipUnless', () => {
    it('should skip step execution when condition is false', async () => {
      const step = skipUnless(
        (ctx: TestContext) => ctx.count > 10,
        (ctx: TestContext) => {
          ctx.tags.push('passed');
          return ctx;
        },
      );

      const chain = new ChainBuilder<TestContext>().add(step).build();

      const resultSkipped = await chain.handle({ count: 5, tags: [] });
      expect(resultSkipped.tags).toEqual([]);

      const resultExecuted = await chain.handle({ count: 20, tags: [] });
      expect(resultExecuted.tags).toEqual(['passed']);
    });
  });
});
