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
import { OffersProvider, useOffers } from "./context/OffersContext";

const AppContent: React.FC = () => {
  const {
    allOffers,
    filteredOffers,
    searchTerm,
    setAllOffers,
    setSearchTerm,
    handleSearch
  } = useOffers();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:3000/offers');
        const data = await response.json();
        setAllOffers(data);
      } catch (err) {
        console.error('Erro ao carregar as ofertas.', err);
      }
    };
    fetchOffers();
  }, [setAllOffers]);

  function calculateDiscount(fullPrice: number, offeredPrice: number): number {
    if (fullPrice <= 0) return 0;
    const discount = ((fullPrice - offeredPrice) / fullPrice) * 100;
    return Math.round(discount);
  }

  function formatKind(kind: string): string {
    return kind.charAt(0).toUpperCase() + kind.slice(1);
  }

  function formatLevel(level: string): string {
    let formatted = level;
    if (level == 'tecnologo') {
      formatted = 'tecnólogo';
    }
    return `Graduação (${formatted})`;
  }

  function formatPrice(price: number): string {
    const formattedPrice = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
    return formattedPrice;
  }

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <QButton type="button" onClick={handleSearch}>Buscar</QButton>
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
        <QListCard cards={filteredOffers}
        >
          {(card) => (
            <QCardOffer
              key={card.id}
              courseName={card.courseName}
              rating={card.rating}
              fullPrice={formatPrice(card.fullPrice)}
              offeredPrice={formatPrice(card.offeredPrice)}
              discount={`${calculateDiscount(card.fullPrice, card.offeredPrice)}%`}
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

const App: React.FC = () => {
  return (
    <OffersProvider>
      <AppContent />
    </OffersProvider>
  );
};

export default App;
