import { LogContextEvent } from 'src/core/logging/core/interfaces';
import { asStep } from 'src/shared/utils/chain-step-logger';

import type { IDemoContext } from '../context';

export const validateAndCalculateSumStep = asStep<IDemoContext>(
  function validateAndCalculateSum(context: IDemoContext): IDemoContext {
    const { title, items } = context.requestParams;

    if (!title || typeof title !== 'string') {
      context.appLogger.error('Validation failed: Missing title in request!', {
        event: LogContextEvent.VALIDATION_FAILED,
        operation: 'validateAndCalculateSumStep',
      });
      throw context.errorFactory
        .createDefaultError('MISSING_REQUIRED_FIELD')
        .withRawErrorMessage('Title is required and must be a string!');
    }

    if (!items.every((item) => typeof item === 'number')) {
      context.appLogger.error(
        'Validation failed: Items array has invalid numbers',
        {
          event: LogContextEvent.VALIDATION_FAILED,
          operation: 'validateAndCalculateSumStep',
        },
      );
      throw context.errorFactory
        .createDefaultError('BAD_REQUEST')
        .withRawErrorMessage('Items must be a number array!');
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
