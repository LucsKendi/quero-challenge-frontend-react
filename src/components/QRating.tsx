import { FC } from "react";
import QText from "./QText";
import QIconStar from "./QIconStar";

interface QBadgeProps {
  rating: number;
}
const stars = Array(5).fill(0);

const QRating: FC<QBadgeProps> = ({ rating }) => {
  return (
    <div className="flex items-center gap-2">
      <QText tag="span">{rating}</QText>
      <div className="flex items-center space-x-1 text-yellow-500">
        {stars.map((_, i) => {
          if (i < Math.floor(rating)) {
            return <QIconStar key={i} />;
          } else if (i === Math.floor(rating) && rating % 1 !== 0) {
            return <QIconStar key={i} half />;
          } else {
            return <QIconStar key={i} empty />;
          }
        })}
      </div>
    </div>
  );
};

export default QRating;
