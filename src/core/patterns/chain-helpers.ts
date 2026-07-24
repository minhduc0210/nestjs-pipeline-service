import { FunctionHandler, type StepFn } from './step-wrapper';

export const skipIf = <TContext>(
  condition: (request: TContext) => boolean,
  handler: StepFn<TContext>,
): FunctionHandler<TContext> => {
  return new FunctionHandler<TContext>(
    async (request: TContext): Promise<TContext> => {
      if (condition(request)) return request;
      return handler(request);
    },
  );
};

export const skipUnless = <TContext>(
  condition: (request: TContext) => boolean,
  handler: StepFn<TContext>,
): FunctionHandler<TContext> => {
  return new FunctionHandler<TContext>(
    async (request: TContext): Promise<TContext> => {
      if (!condition(request)) return request;
      return handler(request);
    },
  );
};
