import { OverlayTrigger, Tooltip as BsTooltip } from 'react-bootstrap';
import { OverlayDelay } from 'react-bootstrap/esm/OverlayTrigger';

type propTypes = {
  tooltip: string,
  subTooltip?: string,
  placement?: 'auto-start' | 'auto' | 'auto-end' | 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'left-end' | 'left' | 'left-start',
  delay?: OverlayDelay,
  children: JSX.Element,
};

const Tooltip = (props: propTypes) => {
  const {
    tooltip,
    subTooltip,
    placement = 'bottom',
    delay = { show: 200, hide: 300 },
    children
  } = props;

  const Overlay = () => (
    <BsTooltip>
      <div>{tooltip}</div>
      <div style={{ fontSize: '0.6rem' }}>{subTooltip}</div>
    </BsTooltip>
  );

  return (
    <OverlayTrigger
      placement={placement}
      delay={delay}
      overlay={Overlay()}
    >
      {children}
    </OverlayTrigger>
  );
};

export default Tooltip;
