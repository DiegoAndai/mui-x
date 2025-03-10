'use client';
import * as React from 'react';
import { warnOnce } from '@mui/x-internals/warning';
import { ChartPlugin } from '../../models';
import { UseChartPolarAxisSignature } from './useChartPolarAxis.types';
import { useSelector } from '../../../store/useSelector';
import { selectorChartDrawingArea } from '../../corePlugins/useChartDimensions/useChartDimensions.selectors';
import { selectorChartSeriesState } from '../../corePlugins/useChartSeries/useChartSeries.selectors';
import { defaultizeAxis } from './defaultizeAxis';

export const useChartPolarAxis: ChartPlugin<UseChartPolarAxisSignature<any>> = ({
  params,
  store,
  seriesConfig,
}) => {
  const { rotationAxis, radiusAxis, dataset } = params;

  if (process.env.NODE_ENV !== 'production') {
    const ids = [...(rotationAxis ?? []), ...(radiusAxis ?? [])]
      .filter((axis) => axis.id)
      .map((axis) => axis.id);
    const duplicates = new Set(ids.filter((id, index) => ids.indexOf(id) !== index));
    if (duplicates.size > 0) {
      warnOnce(
        [
          `MUI X: The following axis ids are duplicated: ${Array.from(duplicates).join(', ')}.`,
          `Please make sure that each axis has a unique id.`,
        ].join('\n'),
        'error',
      );
    }
  }

  const drawingArea = useSelector(store, selectorChartDrawingArea);
  const formattedSeries = useSelector(store, selectorChartSeriesState);

  // The effect do not track any value defined synchronously during the 1st render by hooks called after `useChartPolarAxis`
  // As a consequence, the state generated by the 1st run of this useEffect will always be equal to the initialization one
  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    store.update((prev) => ({
      ...prev,
      polarAxis: {
        ...prev.polarAxis,
        rotation: defaultizeAxis(rotationAxis, dataset, 'rotation'),
        radius: defaultizeAxis(radiusAxis, dataset, 'radius'),
      },
    }));
  }, [seriesConfig, drawingArea, formattedSeries, rotationAxis, radiusAxis, dataset, store]);

  return {};
};

useChartPolarAxis.params = {
  rotationAxis: true,
  radiusAxis: true,
  dataset: true,
};

useChartPolarAxis.getInitialState = (params) => ({
  polarAxis: {
    rotation: defaultizeAxis(params.rotationAxis, params.dataset, 'rotation'),
    radius: defaultizeAxis(params.radiusAxis, params.dataset, 'radius'),
  },
});
