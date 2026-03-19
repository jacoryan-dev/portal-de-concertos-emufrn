import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  Concert,
  Reservation,
  initialConcerts,
  initialReservations,
} from "@/data/mockData";

interface AppContextType {
  concerts: Concert[];
  reservations: Reservation[];
  addReservation: (reservation: Omit<Reservation, "id" | "createdAt">) => void;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [concerts, setConcerts] = useState<Concert[]>(initialConcerts);
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [isAdmin, setIsAdmin] = useState(false);

  const addReservation = (reservation: Omit<Reservation, "id" | "createdAt">) => {
    const newReservation: Reservation = {
      ...reservation,
      id: `r${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setReservations((prev) => [...prev, newReservation]);

    setConcerts((prev) =>
      prev.map((c) => {
        if (c.id !== reservation.concertId) return c;
        if (reservation.isWaitlist) {
          return { ...c, waitlistCount: c.waitlistCount + 1 };
        }
        return { ...c, reservedTickets: c.reservedTickets + reservation.quantity };
      })
    );
  };

  const login = (password: string) => {
    if (password === "admin123") {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  return (
    <AppContext.Provider value={{ concerts, reservations, addReservation, isAdmin, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
