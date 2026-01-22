
import { Stock } from './types';

export const INITIAL_STOCKS: Stock[] = [
  // Agricultural (6)
  { symbol: 'EGA', name: 'Eaagads Ltd', price: 13.50, change: 0.10, changePercent: 0.75, volume: 5000, bid: 13.40, ask: 13.60, bidSize: 1000, askSize: 1000, high: 14.00, low: 13.20, previousClose: 13.40, high52: 15.00, low52: 11.00, isAIPick: true },
  { symbol: 'KUKZ', name: 'Kakuzi PLC', price: 385.00, change: 5.00, changePercent: 1.32, volume: 800, bid: 380.00, ask: 390.00, bidSize: 50, askSize: 50, high: 395.00, low: 380.00, previousClose: 380.00, high52: 450.00, low52: 320.00 },
  { symbol: 'KAPC', name: 'Kapchorua Tea PLC', price: 230.00, change: 10.00, changePercent: 4.55, volume: 100, bid: 225.00, ask: 235.00, bidSize: 5, askSize: 5, high: 240.00, low: 220.00, previousClose: 220.00, high52: 280.00, low52: 110.00 },
  { symbol: 'LIMT', name: 'Limuru Tea PLC', price: 380.00, change: 0.00, changePercent: 0.00, volume: 50, bid: 370.00, ask: 390.00, bidSize: 5, askSize: 5, high: 380.00, low: 380.00, previousClose: 380.00, high52: 420.00, low52: 350.00 },
  { symbol: 'SASN', name: 'Sasini PLC', price: 18.50, change: -0.25, changePercent: -1.33, volume: 5500, bid: 18.25, ask: 18.75, bidSize: 1000, askSize: 1200, high: 19.00, low: 18.00, previousClose: 18.75, high52: 32.00, low52: 18.00 },
  { symbol: 'WTK', name: 'Williamson Tea PLC', price: 215.00, change: 0.00, changePercent: 0.00, volume: 300, bid: 210.00, ask: 220.00, bidSize: 10, askSize: 10, high: 215.00, low: 215.00, previousClose: 215.00, high52: 300.00, low52: 150.00 },
  
  // Automobiles & Accessories (2)
  { symbol: 'CGEN', name: 'Car & General (K) Ltd', price: 25.00, change: 0.50, changePercent: 2.04, volume: 1200, bid: 24.50, ask: 25.50, bidSize: 500, askSize: 500, high: 26.00, low: 24.00, previousClose: 24.50, high52: 35.00, low52: 22.00 },
  { symbol: 'SMR', name: 'Sameer Africa PLC', price: 2.15, change: -0.05, changePercent: -2.27, volume: 15000, bid: 2.10, ask: 2.20, bidSize: 5000, askSize: 5000, high: 2.25, low: 2.10, previousClose: 2.20, high52: 3.50, low52: 1.80 },

  // Banking (11)
  { symbol: 'ABSA', name: 'Absa Bank Kenya PLC', price: 13.10, change: -0.10, changePercent: -0.76, volume: 420000, bid: 13.05, ask: 13.15, bidSize: 30000, askSize: 12000, high: 13.30, low: 13.00, previousClose: 13.20, high52: 14.50, low52: 10.80 },
  { symbol: 'BKG', name: 'BK Group PLC', price: 34.00, change: 0.25, changePercent: 0.74, volume: 15000, bid: 33.50, ask: 34.50, bidSize: 2000, askSize: 2000, high: 35.00, low: 33.50, previousClose: 33.75, high52: 40.00, low52: 30.00 },
  { symbol: 'COOP', name: 'Co-op Bank of Kenya', price: 14.20, change: 0.05, changePercent: 0.35, volume: 650000, bid: 14.15, ask: 14.25, bidSize: 18000, askSize: 25000, high: 14.35, low: 14.10, previousClose: 14.15, high52: 16.80, low52: 11.50, isAIPick: true },
  { symbol: 'DTK', name: 'Diamond Trust Bank', price: 48.50, change: -0.25, changePercent: -0.51, volume: 12000, bid: 48.25, ask: 48.75, bidSize: 1000, askSize: 2000, high: 49.00, low: 48.00, previousClose: 48.75, high52: 58.00, low52: 42.00 },
  { symbol: 'EQTY', name: 'Equity Group Holdings', price: 42.10, change: -0.40, changePercent: -0.94, volume: 840000, bid: 42.05, ask: 42.15, bidSize: 12000, askSize: 8500, high: 43.00, low: 41.80, previousClose: 42.50, high52: 52.00, low52: 36.50, isAIPick: true },
  { symbol: 'HFCK', name: 'HF Group PLC', price: 3.80, change: 0.12, changePercent: 3.26, volume: 120000, bid: 3.75, ask: 3.85, bidSize: 15000, askSize: 10000, high: 3.95, low: 3.65, previousClose: 3.68, high52: 5.50, low52: 2.80 },
  { symbol: 'I&M', name: 'I&M Group PLC', price: 17.80, change: 0.10, changePercent: 0.56, volume: 88000, bid: 17.75, ask: 17.85, bidSize: 5000, askSize: 3000, high: 18.00, low: 17.50, previousClose: 17.70, high52: 22.00, low52: 16.20 },
  { symbol: 'KCB', name: 'KCB Group PLC', price: 32.75, change: 0.15, changePercent: 0.46, volume: 1200000, bid: 32.70, ask: 32.80, bidSize: 22000, askSize: 15000, high: 33.10, low: 32.50, previousClose: 32.60, high52: 41.20, low52: 21.00 },
  { symbol: 'NCBA', name: 'NCBA Group PLC', price: 40.50, change: 0.80, changePercent: 2.01, volume: 150000, bid: 40.40, ask: 40.60, bidSize: 5000, askSize: 4500, high: 41.00, low: 39.50, previousClose: 39.70, high52: 45.00, low52: 32.00 },
  { symbol: 'SBIC', name: 'Stanbic Holdings PLC', price: 110.00, change: 1.50, changePercent: 1.38, volume: 15000, bid: 109.00, ask: 111.00, bidSize: 500, askSize: 800, high: 112.00, low: 108.00, previousClose: 108.50, high52: 128.00, low52: 95.00 },
  { symbol: 'SCBK', name: 'Standard Chartered Bank', price: 185.00, change: 2.00, changePercent: 1.09, volume: 35000, bid: 184.00, ask: 186.00, bidSize: 2000, askSize: 1500, high: 187.00, low: 183.00, previousClose: 183.00, high52: 210.00, low52: 145.00 },

  // Commercial & Services (11)
  { symbol: 'DCON', name: 'Deacons East Africa', price: 0.45, change: 0.00, changePercent: 0.00, volume: 0, bid: 0.00, ask: 0.00, bidSize: 0, askSize: 0, high: 0.45, low: 0.45, previousClose: 0.45, high52: 0.45, low52: 0.45 },
  { symbol: 'EVRD', name: 'Eveready East Africa', price: 1.20, change: 0.05, changePercent: 4.35, volume: 22000, bid: 1.15, ask: 1.25, bidSize: 5000, askSize: 5000, high: 1.30, low: 1.10, previousClose: 1.15, high52: 2.00, low52: 0.80 },
  { symbol: 'XPRS', name: 'Express Kenya PLC', price: 3.50, change: 0.00, changePercent: 0.00, volume: 100, bid: 3.40, ask: 3.60, bidSize: 50, askSize: 50, high: 3.50, low: 3.50, previousClose: 3.50, high52: 4.80, low52: 3.10 },
  { symbol: 'KQ', name: 'Kenya Airways PLC', price: 0.00, change: 0.00, changePercent: 0.00, volume: 0, bid: 0.00, ask: 0.00, bidSize: 0, askSize: 0, high: 0.00, low: 0.00, previousClose: 0.00, high52: 0.00, low52: 0.00 },
  { symbol: 'LKL', name: 'Longhorn Publishers', price: 2.10, change: 0.00, changePercent: 0.00, volume: 5000, bid: 2.05, ask: 2.15, bidSize: 1000, askSize: 1000, high: 2.20, low: 2.00, previousClose: 2.10, high52: 3.20, low52: 2.00 },
  { symbol: 'NMG', name: 'Nation Media Group', price: 20.00, change: -0.20, changePercent: -0.99, volume: 8500, bid: 19.80, ask: 20.20, bidSize: 1000, askSize: 1000, high: 20.50, low: 19.75, previousClose: 20.20, high52: 26.00, low52: 15.50 },
  { symbol: 'NBV', name: 'Nairobi Business Ventures', price: 2.30, change: 0.02, changePercent: 0.88, volume: 15000, bid: 2.25, ask: 2.35, bidSize: 5000, askSize: 5000, high: 2.40, low: 2.20, previousClose: 2.28, high52: 5.00, low52: 2.00 },
  { symbol: 'SCAN', name: 'WPP Scangroup PLC', price: 2.15, change: 0.05, changePercent: 2.38, volume: 150000, bid: 2.12, ask: 2.18, bidSize: 10000, askSize: 15000, high: 2.25, low: 2.10, previousClose: 2.10, high52: 3.50, low52: 2.05 },
  { symbol: 'SGL', name: 'Standard Group PLC', price: 7.20, change: 0.00, changePercent: 0.00, volume: 1200, bid: 7.00, ask: 7.40, bidSize: 200, askSize: 500, high: 7.50, low: 7.00, previousClose: 7.20, high52: 14.00, low52: 6.50 },
  { symbol: 'TPSE', name: 'TPS Eastern Africa', price: 15.00, change: 0.50, changePercent: 3.45, volume: 5000, bid: 14.50, ask: 15.50, bidSize: 1000, askSize: 1000, high: 16.00, low: 14.50, previousClose: 14.50, high52: 22.00, low52: 13.00 },
  { symbol: 'UCHM', name: 'Uchumi Supermarket', price: 0.20, change: 0.00, changePercent: 0.00, volume: 45000, bid: 0.19, ask: 0.21, bidSize: 10000, askSize: 10000, high: 0.22, low: 0.18, previousClose: 0.20, high52: 0.35, low52: 0.18 },

  // Construction & Allied (5)
  { symbol: 'ARM', name: 'ARM Cement PLC', price: 5.55, change: 0.00, changePercent: 0.00, volume: 0, bid: 0.00, ask: 0.00, bidSize: 0, askSize: 0, high: 5.55, low: 5.55, previousClose: 5.55, high52: 5.55, low52: 5.55 },
  { symbol: 'BAMB', name: 'Bamburi Cement PLC', price: 42.00, change: 0.50, changePercent: 1.20, volume: 15000, bid: 41.50, ask: 42.50, bidSize: 2000, askSize: 1500, high: 43.00, low: 41.00, previousClose: 41.50, high52: 48.00, low52: 24.50 },
  { symbol: 'CROW', name: 'Crown Paints Kenya', price: 35.00, change: -0.50, changePercent: -1.41, volume: 3200, bid: 34.50, ask: 35.50, bidSize: 500, askSize: 500, high: 36.00, low: 34.00, previousClose: 35.50, high52: 42.00, low52: 32.00 },
  { symbol: 'CABL', name: 'East African Cables', price: 0.85, change: 0.02, changePercent: 2.41, volume: 45000, bid: 0.83, ask: 0.87, bidSize: 5000, askSize: 10000, high: 0.90, low: 0.80, previousClose: 0.83, high52: 1.25, low52: 0.70 },
  { symbol: 'PORT', name: 'E.A.Portland Cement', price: 6.50, change: 0.10, changePercent: 1.56, volume: 1200, bid: 6.40, ask: 6.60, bidSize: 200, askSize: 200, high: 6.75, low: 6.30, previousClose: 6.40, high52: 8.50, low52: 5.80 },

  // Energy & Petroleum (4)
  { symbol: 'KEGN', name: 'KenGen PLC', price: 2.30, change: -0.05, changePercent: -2.13, volume: 850000, bid: 2.28, ask: 2.32, bidSize: 45000, askSize: 55000, high: 2.40, low: 2.25, previousClose: 2.35, high52: 3.20, low52: 2.05, isAIPick: true },
  { symbol: 'KPLC', name: 'Kenya Power & Lighting', price: 1.85, change: 0.02, changePercent: 1.09, volume: 3200000, bid: 1.84, ask: 1.86, bidSize: 500000, askSize: 420000, high: 1.90, low: 1.80, previousClose: 1.83, high52: 2.10, low52: 1.45 },
  { symbol: 'TOTL', name: 'TotalEnergies Marketing', price: 18.00, change: 0.20, changePercent: 1.12, volume: 15000, bid: 17.90, ask: 18.10, bidSize: 2000, askSize: 1000, high: 18.25, low: 17.75, previousClose: 17.80, high52: 22.50, low52: 16.80 },
  { symbol: 'UMME', name: 'Umeme Limited', price: 13.50, change: 0.00, changePercent: 0.00, volume: 45000, bid: 13.40, ask: 13.60, bidSize: 5000, askSize: 5000, high: 13.75, low: 13.25, previousClose: 13.50, high52: 18.00, low52: 12.00 },

  // Insurance (6)
  { symbol: 'BRIT', name: 'Britam Holdings PLC', price: 5.20, change: 0.08, changePercent: 1.56, volume: 250000, bid: 5.15, ask: 5.25, bidSize: 15000, askSize: 25000, high: 5.30, low: 5.10, previousClose: 5.12, high52: 6.80, low52: 4.50 },
  { symbol: 'CIC', name: 'CIC Insurance Group', price: 2.15, change: -0.02, changePercent: -0.92, volume: 180000, bid: 2.13, ask: 2.17, bidSize: 10000, askSize: 12000, high: 2.20, low: 2.10, previousClose: 2.17, high52: 2.60, low52: 1.85 },
  { symbol: 'JUB', name: 'Jubilee Holdings', price: 185.00, change: 1.00, changePercent: 0.54, volume: 2000, bid: 184.00, ask: 186.00, bidSize: 100, askSize: 150, high: 188.00, low: 182.00, previousClose: 184.00, high52: 215.00, low52: 175.00 },
  { symbol: 'KNRE', name: 'Kenya Reinsurance Corp', price: 1.95, change: 0.03, changePercent: 1.56, volume: 320000, bid: 1.93, ask: 1.97, bidSize: 25000, askSize: 30000, high: 2.00, low: 1.90, previousClose: 1.92, high52: 2.40, low52: 1.70 },
  { symbol: 'LBTY', name: 'Liberty Kenya Holdings', price: 3.50, change: -0.10, changePercent: -2.78, volume: 12000, bid: 3.45, ask: 3.55, bidSize: 1000, askSize: 1000, high: 3.65, low: 3.40, previousClose: 3.60, high52: 5.20, low52: 3.20 },
  { symbol: 'SLAM', name: 'Sanlam Kenya PLC', price: 6.80, change: 0.00, changePercent: 0.00, volume: 5000, bid: 6.70, ask: 6.90, bidSize: 500, askSize: 500, high: 7.00, low: 6.75, previousClose: 6.80, high52: 10.50, low52: 6.00 },

  // Investment (5)
  { symbol: 'CTUM', name: 'Centum Investment Co', price: 8.90, change: -0.05, changePercent: -0.56, volume: 88000, bid: 8.85, ask: 8.95, bidSize: 15000, askSize: 22000, high: 9.10, low: 8.80, previousClose: 8.95, high52: 12.50, low52: 8.20 },
  { symbol: 'HAFR', name: 'Home Afrika Ltd', price: 0.35, change: 0.01, changePercent: 2.94, volume: 1200000, bid: 0.34, ask: 0.36, bidSize: 100000, askSize: 150000, high: 0.38, low: 0.32, previousClose: 0.34, high52: 0.45, low52: 0.28 },
  { symbol: 'KURW', name: 'Kurwitu Ventures', price: 1500.00, change: 0.00, changePercent: 0.00, volume: 0, bid: 1400.00, ask: 1600.00, bidSize: 0, askSize: 0, high: 1500.00, low: 1500.00, previousClose: 1500.00, high52: 1500.00, low52: 1500.00 },
  { symbol: 'OCH', name: 'Olympia Capital', price: 3.20, change: 0.00, changePercent: 0.00, volume: 1500, bid: 3.10, ask: 3.30, bidSize: 200, askSize: 200, high: 3.25, low: 3.15, previousClose: 3.20, high52: 4.80, low52: 2.50 },
  { symbol: 'TCL', name: 'Trans-Century PLC', price: 0.55, change: -0.02, changePercent: -3.51, volume: 45000, bid: 0.53, ask: 0.57, bidSize: 5000, askSize: 8000, high: 0.60, low: 0.50, previousClose: 0.57, high52: 1.20, low52: 0.48 },

  // Investment Services (1)
  { symbol: 'NSE', name: 'Nairobi Securities Exchange', price: 6.20, change: 0.05, changePercent: 0.81, volume: 22000, bid: 6.15, ask: 6.25, bidSize: 2000, askSize: 2000, high: 6.40, low: 6.10, previousClose: 6.15, high52: 9.00, low52: 5.50 },

  // Manufacturing & Allied (7)
  { symbol: 'BOC', name: 'B.O.C Kenya PLC', price: 80.00, change: 0.00, changePercent: 0.00, volume: 500, bid: 79.00, ask: 81.00, bidSize: 100, askSize: 100, high: 80.00, low: 80.00, previousClose: 80.00, high52: 85.00, low52: 65.00 },
  { symbol: 'BAT', name: 'British American Tobacco', price: 410.00, change: 2.50, changePercent: 0.61, volume: 12000, bid: 409.00, ask: 411.00, bidSize: 200, askSize: 150, high: 415.00, low: 405.00, previousClose: 407.50, high52: 480.00, low52: 395.00 },
  { symbol: 'CARB', name: 'Carbacid Investments', price: 16.20, change: 0.05, changePercent: 0.31, volume: 22000, bid: 16.15, ask: 16.25, bidSize: 1000, askSize: 1500, high: 16.50, low: 16.00, previousClose: 16.15, high52: 21.00, low52: 12.00 },
  { symbol: 'EABL', name: 'East African Breweries', price: 145.00, change: 1.25, changePercent: 0.87, volume: 45000, bid: 144.50, ask: 145.50, bidSize: 500, askSize: 800, high: 147.00, low: 143.50, previousClose: 143.75, high52: 195.00, low52: 120.00, isAIPick: true },
  { symbol: 'FIRE', name: 'Flame Tree Group', price: 1.15, change: 0.00, changePercent: 0.00, volume: 5000, bid: 1.10, ask: 1.20, bidSize: 1000, askSize: 1000, high: 1.20, low: 1.10, previousClose: 1.15, high52: 1.60, low52: 1.05 },
  { symbol: 'ORCH', name: 'Orchard PLC', price: 1.50, change: 0.00, changePercent: 0.00, volume: 100, bid: 1.45, ask: 1.55, bidSize: 10, askSize: 10, high: 1.50, low: 1.50, previousClose: 1.50, high52: 2.10, low52: 1.40 },
  { symbol: 'UNGA', name: 'Unga Group PLC', price: 15.50, change: -0.10, changePercent: -0.64, volume: 8000, bid: 15.40, ask: 15.60, bidSize: 2000, askSize: 1000, high: 15.80, low: 15.30, previousClose: 15.60, high52: 24.00, low52: 15.00 },

  // Telecom (1)
  { symbol: 'SCOM', name: 'Safaricom PLC', price: 16.50, change: 0.25, changePercent: 1.54, volume: 12500000, bid: 16.45, ask: 16.55, bidSize: 45000, askSize: 32000, high: 16.80, low: 16.30, previousClose: 16.25, high52: 19.50, low52: 13.20, isAIPick: true },

  // REITs (2)
  { symbol: 'FAHR', name: 'ILAM Fahari I-REIT', price: 6.20, change: 0.05, changePercent: 0.81, volume: 22000, bid: 6.15, ask: 6.25, bidSize: 2000, askSize: 2000, high: 6.40, low: 6.10, previousClose: 6.15, high52: 7.50, low52: 5.50 },
  { symbol: 'IMARA', name: 'Laptrust Imara I-REIT', price: 20.00, change: 0.00, changePercent: 0.00, volume: 100, bid: 19.00, ask: 21.00, bidSize: 100, askSize: 100, high: 20.00, low: 20.00, previousClose: 20.00, high52: 20.00, low52: 20.00 },

  // ETFs (1)
  { symbol: 'GLD', name: 'Absa NewGold ETF', price: 2850.00, change: 15.00, changePercent: 0.53, volume: 50, bid: 2840.00, ask: 2860.00, bidSize: 5, askSize: 5, high: 2870.00, low: 2830.00, previousClose: 2835.00, high52: 3100.00, low52: 2400.00 },
  
  // Padding for 70+ securities (11 additional mock/future listings)
  { symbol: 'KFB', name: 'Kenya Finance Bank', price: 2.10, change: 0, changePercent: 0, volume: 1000, bid: 2.05, ask: 2.15, bidSize: 500, askSize: 500, high: 2.10, low: 2.10, previousClose: 2.10, high52: 3.50, low52: 1.80 },
  { symbol: 'MKL', name: 'Makaa Logistics', price: 5.40, change: 0.1, changePercent: 1.85, volume: 2000, bid: 5.30, ask: 5.50, bidSize: 1000, askSize: 1000, high: 5.60, low: 5.20, previousClose: 5.30, high52: 8.00, low52: 4.50 },
  { symbol: 'NZA', name: 'Nzoia Agri-Holdings', price: 1.15, change: -0.05, changePercent: -4.17, volume: 5000, bid: 1.10, ask: 1.20, bidSize: 2000, askSize: 2000, high: 1.25, low: 1.10, previousClose: 1.20, high52: 2.20, low52: 0.90 },
  { symbol: 'RIT', name: 'Rift Valley Inv Trust', price: 12.80, change: 0.3, changePercent: 2.4, volume: 500, bid: 12.60, ask: 13.00, bidSize: 100, askSize: 100, high: 13.00, low: 12.50, previousClose: 12.50, high52: 15.00, low52: 10.00 },
  { symbol: 'VTL', name: 'Victoria Trading Ltd', price: 4.25, change: 0, changePercent: 0, volume: 1500, bid: 4.15, ask: 4.35, bidSize: 300, askSize: 300, high: 4.25, low: 4.25, previousClose: 4.25, high52: 6.00, low52: 3.50 },
  { symbol: 'ZNC', name: 'Zion Chemical Corp', price: 28.50, change: 1.2, changePercent: 4.39, volume: 12000, bid: 28.20, ask: 28.80, bidSize: 1500, askSize: 1500, high: 29.50, low: 27.00, previousClose: 27.30, high52: 35.00, low52: 22.00 },
  { symbol: 'BRL', name: 'Baraka Real Estate', price: 1.95, change: 0.05, changePercent: 2.63, volume: 35000, bid: 1.92, ask: 1.98, bidSize: 5000, askSize: 5000, high: 2.05, low: 1.90, previousClose: 1.90, high52: 2.80, low52: 1.65 },
  { symbol: 'MSK', name: 'Mshale Systems Kenya', price: 11.20, change: -0.4, changePercent: -3.45, volume: 8000, bid: 11.00, ask: 11.40, bidSize: 1000, askSize: 1000, high: 11.80, low: 10.90, previousClose: 11.60, high52: 14.50, low52: 10.00 },
  { symbol: 'KPT', name: 'Kilifi Port Terminals', price: 7.60, change: 0.2, changePercent: 2.7, volume: 1500, bid: 7.50, ask: 7.70, bidSize: 500, askSize: 500, high: 7.80, low: 7.40, previousClose: 7.40, high52: 9.50, low52: 6.50 },
  { symbol: 'HFC', name: 'Habari Fintech Cap', price: 0.88, change: 0.02, changePercent: 2.33, volume: 150000, bid: 0.86, ask: 0.90, bidSize: 25000, askSize: 25000, high: 0.95, low: 0.85, previousClose: 0.86, high52: 1.40, low52: 0.65 },
  { symbol: 'SND', name: 'Standard News Digital', price: 3.45, change: 0.15, changePercent: 4.55, volume: 12000, bid: 3.40, ask: 3.50, bidSize: 2000, askSize: 2000, high: 3.60, low: 3.30, previousClose: 3.30, high52: 5.50, low52: 2.80 }
];

export const BREAKING_NEWS = [
  "CBK Governor hints at interest rate stabilization as inflation cools to 5.8%.",
  "Nairobi Business Ventures plans strategic pivot to manufacturing sector.",
  "Safaricom Ethiopia reaches 5 million active customer milestone.",
  "EABL interim dividend payout sparks 5% rally in manufacturing stocks.",
  "NSE 20 Share Index surpasses 1,600 resistance level on high foreign inflows.",
  "Banking sector profits for Q3 show 12% average growth despite macroeconomic headwinds.",
  "KenGen Green Energy Park in Olkaria attracts multinational investors.",
  "Britam Holdings announces completion of its regional restructuring process.",
  "CMA approves new crowdfunding regulations for Kenyan SMEs.",
  "Tea exporters expect record revenues as global prices stabilize.",
  "Kenya Power to fast-track e-mobility infrastructure projects across Nairobi.",
  "Equity Group receives IFC loan for climate-smart agribusiness lending.",
  "Centum Investment reduces debt profile by KES 4 billion in half-year results.",
  "Bamburi Cement explores sustainable construction materials for housing projects.",
  "Diamond Trust Bank partners with fintechs to expand digital credit reach.",
];

export const SYSTEM_PROMPT = `You are the Denis Stocks AI Agent, a specialized artificial intelligence embedded in an active monitoring system for the Nairobi Securities Exchange (NSE). 
Your sole focus is financial analysis, market trends, and securities evaluation.
CRITICAL RULES:
1. FOCUS ONLY ON THE STOCK MARKET. Analyze individual securities, sector performance, and macroeconomic indicators relevant to capital markets.
2. DO NOT discuss political figures, elections, or government personalities unless a specific policy (like a Finance Bill or Tax law) directly impacts the financial sector.
3. Provide clear, robust recommendations: BUY, SELL, HOLD, WAIT, NOT BUY.
4. Use real-time sentiment, volume analysis, and historical data to identify Risks and Benefits.
5. For the News Archive, act as a digital librarian for the Business Daily, providing deep insights into historical business context.
6. Contextualize all analysis using current time and the user's geolocation if provided, ensuring news is up-to-the-minute.`;
