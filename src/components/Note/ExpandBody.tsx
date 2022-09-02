import cx from 'classnames';
import { BsArrowsAngleContract as CloseIcon, BsArrowsAngleExpand as OpenIcon } from 'react-icons/bs';
import styles from './Note.module.scss';

type propTypes = {
  isExpanded: boolean,
  setIsExpanded: Function,
};

const ExpandBody = (props: propTypes) => {
  const { isExpanded, setIsExpanded } = props;

  const handleExpanded = () => setIsExpanded((current: boolean) => !current);

  const classes: string = cx(styles.expanded_btn, 'p-2');

  return (
    <div onClick={handleExpanded} className={classes}>
      {isExpanded ? <CloseIcon /> : <OpenIcon />}
    </div>
  );
};

export default ExpandBody;