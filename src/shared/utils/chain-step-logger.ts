import { LogContextEvent } from 'src/core/logging/core/interfaces';
import {
  asStep as baseAsStep,
  skipIf as baseSkipIf,
  skipUnless as baseSkipUnless,
  type StepFn,
} from 'src/core/patterns';

type StepLogger = {
  info(message: string, context?: Record<string, unknown>): void;
  error(message: string, context?: Record<string, unknown>): void;
};

type StepContextWithLogger = {
  appLogger?: StepLogger;
};

export function asStep<TContext>(
  handler: StepFn<TContext>,
): ReturnType<typeof baseAsStep<TContext>> {
  return baseAsStep<TContext>(wrapWithStepLogging(handler.name, handler));
}

export function skipIf<TContext>(
  predicate: (context: TContext) => boolean,
  handler: StepFn<TContext>,
): ReturnType<typeof baseSkipIf<TContext>> {
  return baseSkipIf<TContext>(
    predicate,
    wrapWithStepLogging(handler.name, handler),
  );
}

export function skipUnless<TContext>(
  predicate: (context: TContext) => boolean,
  handler: StepFn<TContext>,
): ReturnType<typeof baseSkipUnless<TContext>> {
  return baseSkipUnless<TContext>(
    predicate,
    wrapWithStepLogging(handler.name, handler),
  );
}

function wrapWithStepLogging<TContext>(
  fallbackName: string,
  handler: StepFn<TContext>,
): (context: TContext) => Promise<TContext> {
  const stepName: string = fallbackName || 'anonymousStep';

  return async (context: TContext): Promise<TContext> => {
    const appLogger: StepLogger | undefined = getStepLogger(context);

    appLogger?.info(`Starting ${stepName}`, {
      event: LogContextEvent.THIRD_PARTY_CALL_STARTED,
      operation: stepName,
    });

    try {
      const result: TContext = await handler(context);

      appLogger?.info(`Completed ${stepName}`, {
        event: LogContextEvent.THIRD_PARTY_CALL_COMPLETED,
        operation: stepName,
      });

      return result;
    } catch (error: unknown) {
      appLogger?.error(`${stepName} failed`, {
        event: LogContextEvent.UNHANDLED_EXCEPTION,
        operation: stepName,
      });
      throw error;
    }
  };
}

function getStepLogger(context: unknown): StepLogger | undefined {
  const appLogger: StepLogger | undefined = (
    context as StepContextWithLogger | undefined
  )?.appLogger;

  if (
    !appLogger ||
    typeof appLogger.info !== 'function' ||
    typeof appLogger.error !== 'function'
  ) {
    return undefined;
  }

  return appLogger;
}
