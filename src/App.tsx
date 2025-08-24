import { useEffect, useState } from "react";

import QHeader from "./components/QHeader";
import QInput from "./components/QInput";
import QButton from "./components/QButton";
import QCardOffer from "./components/QCardOffer";
import QFooter from "./components/QFooter";
import QLayout from "./components/QLayout";
import QListCard from "./components/QListCard";
import QFormOrderByOffer from "./components/QFormOrderByOffer";
import QFormFilterOffer from "./components/QFormFilterOffer";
import QSectionForm from "./components/QSectionForm";

interface Offer {
  id: string;
  courseName: string;
  rating: number;
  fullPrice: number;
  offeredPrice: number;
  kind: 'presencial' | 'ead';
  level: 'bacharelado' | 'licenciatura' | 'tecnologo';
  iesLogo: string;
  iesName: string;
}

function formatKind(kind: string): string {
    return kind.charAt(0).toUpperCase() + kind.slice(1);
}

function formatLevel(level: string): string {
  let formatted = level;
  if(level == 'tecnologo'){
    formatted = 'tecnólogo';  
  }
  return `Graduação (${formatted})`;
}


const App: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:3000/offers');
        const data = await response.json();
        setOffers(data);
      } catch (err) {
        console.error('Erro ao carregar as ofertas.', err);
      }
    };
    fetchOffers();
  }, []);

  return (
    <QLayout
      header={
        <QHeader>
          <QInput
            type="search"
            id="site-search"
            name="q"
            placeholder="Busque o curso ideal para você"
            aria-label="Buscar cursos e bolsas"
          />
          <QButton type="submit">Buscar</QButton>
        </QHeader>
      }
      sidebar={<QFormFilterOffer />}
      footer={<QFooter />}
    >
      <QSectionForm
        title="Veja as opções que encontramos"
        orderBy={<QFormOrderByOffer />}
        filter={<QFormFilterOffer />}
      />

      <div className="mt-6">
        <QListCard cards={offers}
        >
          {(card) => (
            <QCardOffer
              key={card.id}
              courseName={card.courseName}
              rating={card.rating}
              fullPrice={String(card.fullPrice)}
              offeredPrice={String(card.offeredPrice)}
              discount={String(card.discount)}
              kind={formatKind(card.kind)}
              level={formatLevel(card.level)}
              iesLogo={card.iesLogo}
              iesName={card.iesName}
            />
          )}
        </QListCard>
      </div>
    </QLayout>
  );
};

export default App;
