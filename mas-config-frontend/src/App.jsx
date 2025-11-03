import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [negotiationMaxRounds, setNegotiationMaxRounds] = useState(10);
  const [discountRate, setDiscountRate] = useState(0.1);

  const [buyerThreshold, setBuyerThreshold] = useState(0.5);
  const [buyerBeta, setBuyerBeta] = useState(1.0);
  const [buyerGamma, setBuyerGamma] = useState(0.5);

  const [wPrice, setWPrice] = useState(0.4);
  const [wQuality, setWQuality] = useState(0.3);
  const [wDelivery, setWDelivery] = useState(0.15);
  const [wService, setWService] = useState(0.15);

  const [sellerThreshold, setSellerThreshold] = useState(0.45);
  const [sellerBeta, setSellerBeta] = useState(1.0);
  const [sellerGamma, setSellerGamma] = useState(5.0);

  const [status, setStatus] = useState("");

  const API_BASE = "http://localhost:8080";

  async function sendConfig() {
    setStatus("Enviando configuração...");
    const payload = {
      negotiation: {
        maxRounds: Number(negotiationMaxRounds),
        discountRate: Number(discountRate),
      },
      buyer: {
        acceptanceThreshold: Number(buyerThreshold),
        riskBeta: Number(buyerBeta),
        gamma: Number(buyerGamma),
      },
      weights: {
        price: Number(wPrice),
        quality: Number(wQuality),
        delivery: Number(wDelivery),
        service: Number(wService),
      },
      seller: {
        acceptanceThreshold: Number(sellerThreshold),
        riskBeta: Number(sellerBeta),
        gamma: Number(sellerGamma),
      },
    };

    try {
      const res = await fetch(`${API_BASE}/api/config`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Erro ao enviar config");
      }
      setStatus("Config enviada. O sistema iniciará a partir dessa configuração.");
    } catch (err) {
      console.error(err);
      setStatus("Erro ao enviar config. Veja console.");
    }
  }

  return (
    <div className="App" style={{ maxWidth: 900, margin: "2rem auto", padding: 20 }}>
      <h1>Painel MAS - Configuração</h1>

      <section>
        <h2>Negociação</h2>
        <label>
          Máx. Rodadas:
          <input type="number" value={negotiationMaxRounds} onChange={(e) => setNegotiationMaxRounds(e.target.value)} />
        </label>
        <label>
          Taxa de desconto:
          <input type="number" step="0.01" value={discountRate} onChange={(e) => setDiscountRate(e.target.value)} />
        </label>
      </section>

      <section>
        <h2>Buyer (Comprador)</h2>
        <label>Acceptance Threshold:
          <input type="number" step="0.01" value={buyerThreshold} onChange={(e) => setBuyerThreshold(e.target.value)} />
        </label>
        <label>Risk Beta:
          <input type="number" step="0.1" value={buyerBeta} onChange={(e) => setBuyerBeta(e.target.value)} />
        </label>
        <label>Gamma:
          <input type="number" step="0.1" value={buyerGamma} onChange={(e) => setBuyerGamma(e.target.value)} />
        </label>
      </section>

      <section>
        <h2>Pesos do Comprador</h2>
        <label>Preço:
          <input type="number" step="0.01" value={wPrice} onChange={(e) => setWPrice(e.target.value)} />
        </label>
        <label>Qualidade:
          <input type="number" step="0.01" value={wQuality} onChange={(e) => setWQuality(e.target.value)} />
        </label>
        <label>Entrega:
          <input type="number" step="0.01" value={wDelivery} onChange={(e) => setWDelivery(e.target.value)} />
        </label>
        <label>Serviço:
          <input type="number" step="0.01" value={wService} onChange={(e) => setWService(e.target.value)} />
        </label>
      </section>

      <section>
        <h2>Seller (Vendedor)</h2>
        <label>Acceptance Threshold:
          <input type="number" step="0.01" value={sellerThreshold} onChange={(e) => setSellerThreshold(e.target.value)} />
        </label>
        <label>Risk Beta:
          <input type="number" step="0.1" value={sellerBeta} onChange={(e) => setSellerBeta(e.target.value)} />
        </label>
        <label>Gamma:
          <input type="number" step="0.1" value={sellerGamma} onChange={(e) => setSellerGamma(e.target.value)} />
        </label>
      </section>

      <div style={{ marginTop: 16 }}>
        <button onClick={sendConfig} style={{ padding: "10px 16px", background: "#10b981", color: "#fff", border: "none", borderRadius: 8 }}>
          Enviar Configuração
        </button>
      </div>

      <p style={{ marginTop: 16 }}>{status}</p>
    </div>
  );
}

