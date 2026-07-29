import { asStep, skipIf, skipUnless } from '../chain-step-logger';

interface TestContext {
  count: number;
  shouldSkip?: boolean;
  appLogger?: {
    info: jest.Mock;
    error: jest.Mock;
  };
}

describe('chain-step-logger utility', () => {
  let mockLogger: { info: jest.Mock; error: jest.Mock };

  beforeEach(() => {
    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
    };
  });

  describe('asStep wrapper logging', () => {
    it('should log start and completion of named step', async () => {
      const step = asStep(function myTestStep(ctx: TestContext): TestContext {
        ctx.count += 10;
        return ctx;
      });

      const context: TestContext = { count: 0, appLogger: mockLogger };
      const result = await step.handle(context);

      expect(result.count).toBe(10);
      expect(mockLogger.info).toHaveBeenCalledWith(
        'Starting myTestStep',
        expect.objectContaining({ operation: 'myTestStep' }),
      );
      expect(mockLogger.info).toHaveBeenCalledWith(
        'Completed myTestStep',
        expect.objectContaining({ operation: 'myTestStep' }),
      );
    });

    it('should log error when step throws an exception', async () => {
      const failingStep = asStep(function failingStep(
        _ctx: TestContext,
      ): TestContext {
        throw new Error('Step error');
      });

      const context: TestContext = { count: 0, appLogger: mockLogger };

      await expect(failingStep.handle(context)).rejects.toThrow('Step error');
      expect(mockLogger.error).toHaveBeenCalledWith(
        'failingStep failed',
        expect.objectContaining({ operation: 'failingStep' }),
      );
    });

    it('should execute safely if appLogger is missing from context', async () => {
      const step = asStep(function safeStep(ctx: TestContext): TestContext {
        ctx.count += 1;
        return ctx;
      });

      const result = await step.handle({ count: 5 });
      expect(result.count).toBe(6);
    });
  });

  describe('skipIf wrapper logging', () => {
    it('should skip step when predicate is true', async () => {
      const step = skipIf(
        (ctx: TestContext) => Boolean(ctx.shouldSkip),
        function stepToSkip(ctx: TestContext): TestContext {
          ctx.count += 100;
          return ctx;
        },
      );

      const context: TestContext = {
        count: 5,
        shouldSkip: true,
        appLogger: mockLogger,
      };

      const result = await step.handle(context);
      expect(result.count).toBe(5);
      expect(mockLogger.info).not.toHaveBeenCalled();
    });

    it('should execute step when predicate is false', async () => {
      const step = skipIf(
        (ctx: TestContext) => Boolean(ctx.shouldSkip),
        function stepToRun(ctx: TestContext): TestContext {
          ctx.count += 100;
          return ctx;
        },
      );

      const context: TestContext = {
        count: 5,
        shouldSkip: false,
        appLogger: mockLogger,
      };

      const result = await step.handle(context);
      expect(result.count).toBe(105);
      expect(mockLogger.info).toHaveBeenCalledWith(
        'Starting stepToRun',
        expect.anything(),
      );
    });
  });

  describe('skipUnless wrapper logging', () => {
    it('should execute step when predicate is true', async () => {
      const step = skipUnless(
        (ctx: TestContext) => ctx.count > 0,
        function stepUnless(ctx: TestContext): TestContext {
          ctx.count *= 2;
          return ctx;
        },
      );

      const context: TestContext = { count: 5, appLogger: mockLogger };
      const result = await step.handle(context);

      expect(result.count).toBe(10);
      expect(mockLogger.info).toHaveBeenCalledWith(
        'Starting stepUnless',
        expect.anything(),
      );
    });
  });
});
