import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoImageLabelingViewProps } from './ExpoImageLabeling.types';

const NativeView: React.ComponentType<ExpoImageLabelingViewProps> =
  requireNativeViewManager('ExpoImageLabeling');

export default function ExpoImageLabelingView(props: ExpoImageLabelingViewProps) {
  return <NativeView {...props} />;
}
