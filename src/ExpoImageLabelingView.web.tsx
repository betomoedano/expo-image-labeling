import * as React from 'react';

import { ExpoImageLabelingViewProps } from './ExpoImageLabeling.types';

export default function ExpoImageLabelingView(props: ExpoImageLabelingViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
