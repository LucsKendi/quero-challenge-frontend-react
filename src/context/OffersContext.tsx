import React, { createContext, useContext, useState, ReactNode } from "react";

interface Offer {
    id: string;
    courseName: string;
    rating: number;
    fullPrice: number;
    offeredPrice: number;
    kind: string;
    level: string;
    iesLogo: string;
    iesName: string;
}

interface OffersContextType {
    allOffers: Offer[];
    setAllOffers: (offers: Offer[]) => void;
}

const OffersContext = createContext<OffersContextType | undefined>(undefined);

export const useOffers = () => {
    const ctx = useContext(OffersContext);
    if (!ctx) throw new Error("useOffers deve ser usado dentro de OffersProvider");
    return ctx;
};

interface OffersProviderProps {
    children: ReactNode;
}

export const OffersProvider: React.FC<OffersProviderProps> = ({ children }) => {
    const [allOffers, setAllOffers] = useState<Offer[]>([]);

    const value: OffersContextType = {
        allOffers,
        setAllOffers,
    };

    return <OffersContext.Provider value={value}>{children}</OffersContext.Provider>;
};