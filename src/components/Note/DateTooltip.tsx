import { formatDistanceToNow } from 'date-fns';
import Tooltip from '../Tooltip';

type propTypes = {
  date: Date,
  subDate?: Date,
};

const DateTooltip = (props: propTypes) => {
  const { date, subDate } = props;

  return (
    <Tooltip
      tooltip={date.toLocaleString()}
      subTooltip={subDate && `Created ${subDate.toLocaleString()}`}
    >
      <time dateTime={date.toLocaleString()}>
        {subDate ? 'Updated' : 'Created'} {formatDistanceToNow(date)} ago
      </time>
    </Tooltip>
  );
};

export default DateTooltip;