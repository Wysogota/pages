import { formatDistanceToNow } from 'date-fns';
import Tooltip from '../Tooltip';
import styles from './Note.module.scss';

type propTypes = {
  createdAt: Date,
  updatedAt: Date,
};

const DateTooltip = (props: propTypes) => {
  const { createdAt, updatedAt } = props;

  if (updatedAt > createdAt) {

    const updatedDate: string = updatedAt.toLocaleString();
    const createdDate: string = createdAt.toLocaleString();
    const distanceToNow = formatDistanceToNow(updatedAt);

    return (
      <Tooltip
        tooltip={updatedDate}
        subTooltip={`Created ${createdDate}`}
      >
        <time dateTime={updatedDate} className={styles.time}>
          Updated {distanceToNow} ago
        </time>
      </Tooltip>
    );
  } else {

    const createdDate = createdAt.toLocaleString();
    const distanceToNow = formatDistanceToNow(createdAt);

    return (
      <Tooltip tooltip={createdDate}>
        <time dateTime={createdDate} className={styles.time}>
          Created {distanceToNow} ago
        </time>
      </Tooltip>
    );
  }
};

export default DateTooltip;