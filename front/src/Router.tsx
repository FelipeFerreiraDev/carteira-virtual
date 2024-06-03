import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Wallets from "./pages/Wallets";
import WalletDetails from "./pages/WalletDetails";
import WalletGraphicsDetails from "./pages/WalletGraphicsDetails";
import RecurrentTransactions from "./pages/RecurrentTransactions";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Dashboards */}
      <Route path="/wallets" element={<Wallets />} />
      <Route path="/wallet/:id" element={<WalletDetails />} />
      <Route path="/wallet/:id/graphics" element={<WalletGraphicsDetails />} />
      <Route path="/wallet/:id/recurrent-tasks" element={<RecurrentTransactions />} />
    </Routes>
  );
}
