import type { CSSProperties, FC } from 'react';

import './index.less';

interface IconComponentProps {
  icon: string;
  color?: string;
  style?: CSSProperties;
  txt?: string;
}

const IconComponent: FC<IconComponentProps> = (props) => {
  const { icon, color, style, txt } = props;

  return (
    <div className="icon-component-wrapper">
      <svg className="icon-main" aria-hidden="true" style={{ color, ...style }}>
        <use xlinkHref={icon}></use>
      </svg>

      {txt && <span style={{ color }}>{txt}</span>}
    </div>
  );
};

export default IconComponent;
