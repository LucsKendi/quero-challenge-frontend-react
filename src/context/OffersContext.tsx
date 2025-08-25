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
    sortBy: string;
    setSortBy: (sort: string) => void;
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
    const [sortBy, setSortBy] = useState<string>("");

    useEffect(() => {
        handleSearch();
    }, [allOffers, sortBy]);

    const handleSearch = () => {
        let result = allOffers;

        if (searchTerm.trim()) {
            result = allOffers.filter((offer) =>
                offer.courseName.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (sortBy === 'name') {
            result.sort((a, b) => a.courseName.localeCompare(b.courseName));
        } else if (sortBy === 'price') {
            result.sort((a, b) => a.offeredPrice - b.offeredPrice);
        } else if (sortBy === 'rating') {
            result.sort((a, b) => b.rating - a.rating);
        }

        setFilteredOffers(result);
    };

    const value: OffersContextType = {
        allOffers,
        filteredOffers,
        searchTerm,
        sortBy,
        setSortBy,
        setAllOffers,
        setSearchTerm,
        handleSearch
    };

    return <OffersContext.Provider value={value}>{children}</OffersContext.Provider>;
};