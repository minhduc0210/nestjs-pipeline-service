import { ChainBuilder } from 'src/core/patterns';

import type { IDemoContext } from './context';
import { formatDemoResponseStep, validateAndCalculateSumStep } from './steps';

export const demoPipelineChain = new ChainBuilder<IDemoContext>()
  .add(validateAndCalculateSumStep)
  .add(formatDemoResponseStep)
  .build();
