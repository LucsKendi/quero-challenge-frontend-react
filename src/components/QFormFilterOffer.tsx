import { FC } from "react";
import QHeading from "./QHeading";
import QFieldset from "./QFieldset";
import QInputCheckbox from "./QInputCheckbox";
import QInputRange from "./QInputRange";
import { useOffers } from "../context/OffersContext";

const QFormFilterOffer: FC = () => {
  const { filters, setFilters } = useOffers();

  function handleLevelChange(level: string, checked: boolean) {
    const newFilters = { ...filters };

    if (checked) {
      if (!newFilters.level.includes(level)) {
        newFilters.level = [...newFilters.level, level];
      }
    } else {
      newFilters.level = newFilters.level.filter((l) => l !== level);
    }

    setFilters(newFilters);
  }

  function handleKindChange(kind: string, checked: boolean) {
    const newFilters = { ...filters };

    if (checked) {
      if (!newFilters.kind.includes(kind)) {
        newFilters.kind = [...newFilters.kind, kind];
      }
    } else {
      newFilters.kind = newFilters.kind.filter((k) => k !== kind);
    }

    setFilters(newFilters);
  }

  function handlePriceRangeChange(range: [number, number]) {
    const newFilters = { ...filters };
    newFilters.priceRange = range;
    setFilters(newFilters);
  }

  return (
    <form action="#">
      <QHeading tag="h1">Filtros</QHeading>

      <hr className="my-5" />

      <QFieldset legend="Graduação">
        <QInputCheckbox
          label="Bacharelado"
          name="graduation"
          value="bacharelado"
          checked={filters.level.includes('bacharelado')}
          onChange={(e) => handleLevelChange('bacharelado', e.target.checked)}
        />

        <QInputCheckbox
          label="Licenciatura"
          name="graduation"
          value="licenciatura"
          checked={filters.level.includes('licenciatura')}
          onChange={(e) => handleLevelChange('licenciatura', e.target.checked)}
        />

        <QInputCheckbox
          label="Tecnólogo"
          name="graduation"
          value="tecnologo"
          checked={filters.level.includes('tecnologo')}
          onChange={(e) => handleLevelChange('tecnologo', e.target.checked)}
        />
      </QFieldset>

      <hr className="my-5" />

      <QFieldset legend="Modalidade do curso">
        <QInputCheckbox
          label="Presencial"
          name="course-modality"
          value="presencial"
          checked={filters.kind.includes('presencial')}
          onChange={(e) => handleKindChange('presencial', e.target.checked)}
        />

        <QInputCheckbox
          label="A distância - EaD"
          name="course-modality"
          value="ead"
          checked={filters.kind.includes('ead')}
          onChange={(e) => handleKindChange('ead', e.target.checked)}
        />
      </QFieldset>

      <hr className="my-5" />

      <QFieldset legend="Preço da mensalidade">
        <QInputRange
          label={`Até R$ ${filters.priceRange[1].toFixed(2).replace(".", ",")}`}
          min={0}
          max={1000}
          value={filters.priceRange[1]}
          onChange={(value) =>
            handlePriceRangeChange([filters.priceRange[0], value])
          }
        />
      </QFieldset>

      <hr className="mt-5" />
    </form>
  );
};

export default QFormFilterOffer;