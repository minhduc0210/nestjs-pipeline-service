import { LogContextEvent } from 'src/core/logging/core/interfaces';
import { asStep } from 'src/shared/utils/chain-step-logger';

import type { IDemoContext } from '../context';

export const validateAndCalculateSumStep = asStep<IDemoContext>(
  function validateAndCalculateSum(context: IDemoContext): IDemoContext {
    const { title, items } = context.requestParams;

    if (!title || !Array.isArray(items) || items.length === 0) {
      context.appLogger.error(
        'Validation failed: Missing title or empty items',
        {
          event: LogContextEvent.VALIDATION_FAILED,
          operation: 'validateAndCalculateSumStep',
        },
      );
      throw new Error('Title and a non-empty items array are required.');
    }

    const sum: number = items.reduce(
      (acc: number, val: number): number => acc + val,
      0,
    );
    const average: number = sum / items.length;

    context.computedSum = sum;
    context.computedAverage = average;

    context.appLogger.info('Validation and calculation step successful', {
      event: LogContextEvent.BUSINESS_RULE_FAILED,
      operation: 'validateAndCalculateSumStep',
      sum,
      average,
    });

    return context;
  },
);
