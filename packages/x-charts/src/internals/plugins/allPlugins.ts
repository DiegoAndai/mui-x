// This file should be removed after creating all plugins in favor of a file per chart type.
import { ChartSeriesType } from '../../models/seriesType/config';
import {
  useChartCartesianAxis,
  UseChartCartesianAxisSignature,
} from './featurePlugins/useChartCartesianAxis';
import { useChartHighlight, UseChartHighlightSignature } from './featurePlugins/useChartHighlight';
import {
  useChartInteraction,
  UseChartInteractionSignature,
} from './featurePlugins/useChartInteraction';
import { useChartPolarAxis, UseChartPolarAxisSignature } from './featurePlugins/useChartPolarAxis';
import { useChartVoronoi, UseChartVoronoiSignature } from './featurePlugins/useChartVoronoi';
import { useChartZAxis, UseChartZAxisSignature } from './featurePlugins/useChartZAxis';
import { ConvertSignaturesIntoPlugins } from './models/helpers';

export type AllPluginSignatures<TSeries extends ChartSeriesType = ChartSeriesType> = [
  UseChartZAxisSignature,
  UseChartCartesianAxisSignature<TSeries>,
  UseChartPolarAxisSignature,
  UseChartInteractionSignature,
  UseChartHighlightSignature,
  UseChartVoronoiSignature,
];

export type AllPluginsType<TSeries extends ChartSeriesType = ChartSeriesType> =
  ConvertSignaturesIntoPlugins<AllPluginSignatures<TSeries>>;

export const ALL_PLUGINS = [
  useChartZAxis,
  useChartCartesianAxis,
  useChartPolarAxis,
  useChartInteraction,
  useChartHighlight,
  useChartVoronoi,
];

export type DefaultPluginSignatures<TSeries extends ChartSeriesType = ChartSeriesType> = [
  UseChartZAxisSignature,
  UseChartCartesianAxisSignature<TSeries>,
  UseChartPolarAxisSignature,
  UseChartInteractionSignature,
  UseChartHighlightSignature,
  UseChartVoronoiSignature,
];

export type DefaultPluginsType<TSeries extends ChartSeriesType = ChartSeriesType> =
  ConvertSignaturesIntoPlugins<DefaultPluginSignatures<TSeries>>;

export const DEFAULT_PLUGINS = [
  useChartZAxis,
  useChartCartesianAxis,
  useChartInteraction,
  useChartHighlight,
  useChartVoronoi,
];
