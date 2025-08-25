import { FC } from "react";
import QHeading from "./QHeading";
import QInputRadio from "./QInputRadio";
import { useOffers } from "../context/OffersContext";

const QFormOrderByOffer: FC = () => {
  const {
    sortBy,
    setSortBy
  } = useOffers();

  return (
    <form action="#">
      <QHeading
        tag="h2"
        size="sm"
        className="mb-2"
      >
        Ordenar
      </QHeading>

      <QInputRadio
        label="Cursos de A-Z"
        name="order-by"
        value="name"
        checked= {sortBy === 'name'}
        onChange={() => setSortBy('name')}
      />

      <QInputRadio
        label="Menor preço"
        name="order-by"
        value="price"
        checked= {sortBy === 'price'}
        onChange={() => setSortBy('price')}
      />

      <QInputRadio
        label="Melhor avaliados"
        name="order-by"
        value="rating"
        checked= {sortBy === 'rating'}
        onChange={() => setSortBy('rating')}
      />
    </form>
  );
};

export default QFormOrderByOffer;
