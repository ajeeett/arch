import React from 'react';
import { SwipeablePanel } from 'rn-swipeable-panel';

export default function SwipeMenu(props) {
  return (
    <SwipeablePanel {...props.panelProps} isActive={props.isActive}>
      {props.content}
    </SwipeablePanel>
  );
}

/*
? **** panelProps ****
const [panelProps, setPanelProps] = useState({
  fullWidth: true, //* Set true if you want to make full with panel
  openLarge: true, //* Set true if you want to open panel large by default
  showCloseButton: true, //* Set true if you want to show close button
  noBackgroundOpacity: false, //* Set true if you want to disable black background opacity
  style: {}, //* Use this prop to override panel style
  closeRootStyle: {},
  closeIconStyle: {},
  barStyle: {}, //* Use this prop to override bar style
  onClose: () => closePanel(), //* Fired when the panel is closed
  onPressCloseButton: () => closePanel(),
  closeOnTouchOutside: false //* Set true if you want to close panel by touching outside
  allowTouchOutside: false //* Set true if you want to make toucable outside of panel
  noBar: false //* Set true if you want to remove gray bar
});
? **** isActive ****
const [isPanelActive, setIsPanelActive] = useState(false);

? **** Open and Close functions (optional) ****
const openPanel = () => {
    setIsPanelActive(true);
};

const closePanel = () => {
    setIsPanelActive(false);
};

? **** Component ****
<SwipeMenu
  isActive={isPanelActive}
  panelProps={panelProps}
  content={SwipeableContent}
/>
*/
