import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoImageLabeling.web.ts
// and on native platforms to ExpoImageLabeling.ts
import ExpoImageLabelingModule from './ExpoImageLabelingModule';
import ExpoImageLabelingView from './ExpoImageLabelingView';
import { ChangeEventPayload, ExpoImageLabelingViewProps } from './ExpoImageLabeling.types';

// Get the native constant value.
export const PI = ExpoImageLabelingModule.PI;

export function hello(): string {
  return ExpoImageLabelingModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoImageLabelingModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoImageLabelingModule ?? NativeModulesProxy.ExpoImageLabeling);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoImageLabelingView, ExpoImageLabelingViewProps, ChangeEventPayload };
