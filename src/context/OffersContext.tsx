import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

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
    filteredOffers: Offer[];
    searchTerm: string;
    setAllOffers: (offers: Offer[]) => void;
    setSearchTerm: (term: string) => void;
    handleSearch: () => void;
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
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);

    useEffect(() => {
        handleSearch();
    }, [allOffers, searchTerm]);

    const handleSearch = () => {
        const term = searchTerm.trim().toLowerCase();
        const result = term
            ? allOffers.filter((offer) =>
                offer.courseName.toLowerCase().includes(term)
            )
            : allOffers;

        setFilteredOffers(result);
    };

    const value: OffersContextType = {
        allOffers,
        filteredOffers,
        searchTerm,
        setAllOffers,
        setSearchTerm,
        handleSearch
    };

    return <OffersContext.Provider value={value}>{children}</OffersContext.Provider>;
};