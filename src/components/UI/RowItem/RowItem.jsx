import  styles  from './styles.module.css'
import { getPercentage } from "../../../helpers/lib";

export const RowItem = ({children, ...props}) => {
  // console.log(props);
  return (
    <div>
      {children}
    </div>
  );
};

