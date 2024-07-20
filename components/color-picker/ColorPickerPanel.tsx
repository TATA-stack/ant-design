import type { FC } from 'react';
import React from 'react';
import type { HsbaColorType } from '@rc-component/color-picker';

import Divider from '../divider';
import type { AggregationColor } from './color';
import PanelPicker from './components/PanelPicker';
import PanelPresets from './components/PanelPresets';
import { PanelPickerProvider, PanelPresetsProvider } from './context';
import type { ColorPickerBaseProps } from './interface';

export interface ColorPickerPanelProps extends ColorPickerBaseProps {
  onChange?: (value?: AggregationColor, type?: HsbaColorType, pickColor?: boolean) => void;
  onClear?: () => void;
}

const ColorPickerPanel: FC<ColorPickerPanelProps> = (props) => {
  const { prefixCls, presets, panelRender, color, onChange, onClear, ...injectProps } = props;
  const colorPickerPanelPrefixCls = `${prefixCls}-inner`;

  // ==== Inject props ===
  const panelContext = {
    prefixCls,
    value: color,
    onChange,
    onClear,
    ...injectProps,
  };

  const presetContext = React.useMemo(
    () => ({
      prefixCls,
      value: color,
      presets,
      onChange,
    }),
    [prefixCls, color, presets, onChange],
  );

  // ====================== Render ======================
  const innerPanel = (
    <div className={`${colorPickerPanelPrefixCls}-content`}>
      <PanelPicker />
      {Array.isArray(presets) && <Divider />}
      <PanelPresets />
    </div>
  );

  return (
    <PanelPickerProvider value={panelContext}>
      <PanelPresetsProvider value={presetContext}>
        <div className={colorPickerPanelPrefixCls}>
          {typeof panelRender === 'function'
            ? panelRender(innerPanel, {
                components: {
                  Picker: PanelPicker,
                  Presets: PanelPresets,
                },
              })
            : innerPanel}
        </div>
      </PanelPresetsProvider>
    </PanelPickerProvider>
  );
};

if (process.env.NODE_ENV !== 'production') {
  ColorPickerPanel.displayName = 'ColorPickerPanel';
}

export default ColorPickerPanel;
