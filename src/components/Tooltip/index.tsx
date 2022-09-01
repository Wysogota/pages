import { OverlayTrigger, Tooltip as BsTooltip } from 'react-bootstrap';
import { OverlayDelay } from 'react-bootstrap/esm/OverlayTrigger';

type TooltipProps = {
  tooltip: string,
  placement?: 'auto-start' | 'auto' | 'auto-end' | 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'left-end' | 'left' | 'left-start',
  delay?: OverlayDelay,
  children: JSX.Element,
};

const Tooltip = (props: TooltipProps) => {
  const {
    tooltip,
    placement = 'bottom',
    delay = { show: 200, hide: 300 },
    children
  } = props;

  return (
    <OverlayTrigger
      placement={placement}
      delay={delay}
      overlay={<BsTooltip>{tooltip}</BsTooltip>}
    >
      {children}
    </OverlayTrigger>
  );
};

export default Tooltip;
