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

interface Filters {
    level: string[];
    kind: string[];
    priceRange: [number, number];
}

interface OffersContextType {
    allOffers: Offer[];
    filteredOffers: Offer[];
    searchTerm: string;
    sortBy: string;
    filters: Filters;
    setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
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
    const [filters, setFilters] = useState<Filters>({
        level: [],
        kind: [],
        priceRange: [0, 1000]
    });

    useEffect(() => {
        handleSearch();
    }, [allOffers, sortBy, filters]);

    const handleSearch = () => {
        let result = allOffers;

        if (searchTerm.trim()) {
            result = allOffers.filter((offer) =>
                offer.courseName.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (filters.level.length > 0) {
            result = result.filter(offer => filters.level.includes(offer.level));
        }
        if (filters.kind.length > 0) {
            result = result.filter(offer => filters.kind.includes(offer.kind));
        }
        result = result.filter(offer =>
            offer.offeredPrice >= filters.priceRange[0] &&
            offer.offeredPrice <= filters.priceRange[1]
        );

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
        filters,
        setFilters,
        setSortBy,
        setAllOffers,
        setSearchTerm,
        handleSearch
    };

    return <OffersContext.Provider value={value}>{children}</OffersContext.Provider>;
};