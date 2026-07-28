import { asStep } from 'src/shared/utils/chain-step-logger';

import type { IDemoContext } from '../context';

export const formatDemoResponseStep = asStep<IDemoContext>(
  function formatDemoResponse(context: IDemoContext): IDemoContext {
    const { title } = context.requestParams;
    const sum: number = context.computedSum ?? 0;
    const average: number = context.computedAverage ?? 0;

    context.finalResponse = {
      processedTitle: `Processed: ${title.toUpperCase()}`,
      sum,
      average,
      timestamp: new Date().toISOString(),
    };

    return context;
  },
);
