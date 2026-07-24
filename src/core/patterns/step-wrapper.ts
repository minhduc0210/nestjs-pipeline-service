import { AbstractHandler } from './handler.interface';

export type StepFn<TContext> = (
  context: TContext,
) => Promise<TContext> | TContext;

export class FunctionHandler<TContext> extends AbstractHandler<TContext> {
  private readonly fn: StepFn<TContext>;

  constructor(fn: StepFn<TContext>) {
    super();
    this.fn = fn;
  }

  public override async handle(request: TContext): Promise<TContext> {
    const result: TContext = await this.fn(request);
    return super.handle(result);
  }
}

export function asStep<TContext>(
  fn: StepFn<TContext>,
): FunctionHandler<TContext> {
  return new FunctionHandler<TContext>(fn);
}
