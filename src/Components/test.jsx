// src/components/TourPriceCalculator/TourPriceCalculator.jsx

import React, { useState, useEffect } from 'react';
import styles from './style.module.css';

function Test() {
  // State for login
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Predefined credentials
  const predefinedUsername = 'VAtravel';
  const predefinedPassword = 'VAtravel0552775017';

  // State for calculator
  const initialCalculatorState = {
    paxFrom: 1,
    paxTo: 10,
    guidePerDay: 0,
    guideDays: 0,
    transferRate: 0,
    numberOfTransfers: 0,
    mealQuantity: 0,
    mealPrice: 0,
    galaDinner: 1,
    galaDinnerPrice: 0,
    guideDriverHotel: 0,
    guideDriverMeal: 0,
    profit: 0,
    // Hotels
    bakuSingle: 0,
    bakuDouble: 0,
    bakuNights: 0,
    shakiSingle: 0,
    shakiDouble: 0,
    shakiNights: 0,
    ganjaSingle: 0,
    ganjaDouble: 0,
    ganjaNights: 0,
    otherSingle: 0,
    otherDouble: 0,
    otherNights: 0,
    // Transportation
    sedan: 0,
    minivan: 0,
    sprinter: 0,
    bus: 0,
    // Museums
    museums: [],
  };

  const [calculatorData, setCalculatorData] = useState(initialCalculatorState);
  const [calculatorResult, setCalculatorResult] = useState(null);

useEffect(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn');
    const savedCalculatorData = localStorage.getItem('calculatorData');
    const savedCalculatorResult = localStorage.getItem('calculatorResult');

    if (savedLoginState === 'true') setLoggedIn(true);
    if (savedCalculatorData) setCalculatorData(JSON.parse(savedCalculatorData));
    if (savedCalculatorResult) setCalculatorResult(JSON.parse(savedCalculatorResult));
  }, []);
  // Handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginUsername === predefinedUsername && loginPassword === predefinedPassword) {
      setLoggedIn(true);
      setLoginError('');
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      setLoginError('Invalid username or password!');
    }
  };
  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('calculatorData');
    localStorage.removeItem('calculatorResult');
  };


  // Handle calculator input changes
  const handleCalculatorChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updatedMuseums = checked
        ? [...calculatorData.museums, parseFloat(value)]
        : calculatorData.museums.filter((v) => v !== parseFloat(value));
      setCalculatorData({ ...calculatorData, museums: updatedMuseums });
      localStorage.setItem(
        'calculatorData',
        JSON.stringify({ ...calculatorData, museums: updatedMuseums })
      );
    } else {
      const updatedData = { ...calculatorData, [id]: value === '' ? 0 : parseFloat(value) };
      setCalculatorData(updatedData);
      localStorage.setItem('calculatorData', JSON.stringify(updatedData));
    }
  };

  // Handle calculator form submission
  const handleCalculatorSubmit = (e) => {
    e.preventDefault();

    const {
      paxFrom,
      paxTo,
      guidePerDay,
      guideDays,
      transferRate,
      numberOfTransfers,
      mealQuantity,
      mealPrice,
      galaDinner,
      galaDinnerPrice,
      guideDriverHotel,
      guideDriverMeal,
      profit,
      bakuSingle,
      bakuDouble,
      bakuNights,
      shakiSingle,
      shakiDouble,
      shakiNights,
      ganjaSingle,
      ganjaDouble,
      ganjaNights,
      otherSingle,
      otherDouble,
      otherNights,
      sedan,
      minivan,
      sprinter,
      bus,
      museums,
    } = calculatorData;
    const calculateHotelSS = (single, double, nights) =>
        (single - double / 2) * nights;
  
      const bakuHotelSs = calculateHotelSS(bakuSingle, bakuDouble, bakuNights);
      const shakiHotelSs = calculateHotelSS(shakiSingle, shakiDouble, shakiNights);
      const ganjaHotelSs = calculateHotelSS(ganjaSingle, ganjaDouble, ganjaNights);
      const otherHotelSs = calculateHotelSS(otherSingle, otherDouble, otherNights);
      const totalSS = bakuHotelSs + shakiHotelSs + ganjaHotelSs + otherHotelSs;
  
      const hotelPriceSingle =
        bakuSingle * bakuNights +
        shakiSingle * shakiNights +
        ganjaSingle * ganjaNights +
        otherSingle * otherNights;
  
      const hotelPriceDouble =
        bakuDouble * bakuNights +
        shakiDouble * shakiNights +
        ganjaDouble * ganjaNights +
        otherDouble * otherNights;
  
    // Calculate transportation price based on pax
    const getTransportationPrice = (pax) => {
      if (pax < 3) return sedan;
      if (pax > 2 && pax < 5) return minivan;
      if (pax > 4 && pax < 13) return sprinter;
      return bus;
    };

    let results = [];

    for (let i = paxFrom; i <= paxTo; i++) {
        const transportationPrice = getTransportationPrice(i);
        const totalCost =
          (i === 1 ? hotelPriceSingle : hotelPriceDouble * (i / 2)) +
          guidePerDay * guideDays +
          transferRate * numberOfTransfers +
          transportationPrice +
          mealQuantity * mealPrice * i +
          galaDinnerPrice * galaDinner * i +
          guideDriverHotel +
          guideDriverMeal +
          museums.reduce((acc, val) => acc + val * i, 0);
  
        const totalProfit = profit * i;
        const taxAndRisk = (totalCost + totalProfit) * 0.12;
        const totalPrice = totalCost + totalProfit + taxAndRisk;
        const pricePerPerson = totalPrice / i;
  
        results.push({
          pax: i,
          totalCost: totalCost.toFixed(2),
          totalProfit: totalProfit.toFixed(2),
          taxAndRisk: taxAndRisk.toFixed(2),
          totalPrice: totalPrice.toFixed(2),
          pricePerPerson: pricePerPerson.toFixed(2),
        });
      }
  
      results.push({
        pax: 'SS',
        totalCost: totalSS.toFixed(2),
        totalProfit: '---',
        taxAndRisk: '---',
        totalPrice: '---',
        pricePerPerson: '---',
      });
  
      setCalculatorResult(results);
      localStorage.setItem('calculatorResult', JSON.stringify(results));
    };
      return (
        <div className={styles.container}>
        {!loggedIn ? (
          <div className={styles.loginContainer}>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <label>Username:</label>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
              />
              <label>Password:</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <button type="submit">Login</button>
              {loginError && <p className={styles.error}>{loginError}</p>}
            </form>
          </div>
        ): (
        // Calculator Form
        <div>
          <h1 className={styles.pageHead}>VATRAVEL CALCULATOR</h1>
          <button onClick={handleLogout}>Logout</button>
          <form onSubmit={handleCalculatorSubmit} id="tourForm">
            <div className={styles.formContainer}>
              <div className={styles.firstPart}>
                {/* Pax Section */}
                <div className={styles.pax}>
                  <label htmlFor="paxFrom">Pax From</label>
                  <input
                    type="number"
                    id="paxFrom"
                    value={calculatorData.paxFrom}
                    onChange={handleCalculatorChange}
                    min="1"
                    required
                  />
                  <label htmlFor="paxTo">Pax To</label>
                  <input
                    type="number"
                    id="paxTo"
                    value={calculatorData.paxTo}
                    onChange={handleCalculatorChange}
                    min="1"
                    required
                  />
                </div>

                {/* Guide Section */}
                <div className={styles.guide}>
                  <label htmlFor="guidePerDay">Guide price per day</label>
                  <input
                    type="number"
                    id="guidePerDay"
                    value={calculatorData.guidePerDay}
                    onChange={handleCalculatorChange}
                    min="0"
                  />
                  <label htmlFor="guideDays">Guide Service Days</label>
                  <input
                    type="number"
                    id="guideDays"
                    value={calculatorData.guideDays}
                    onChange={handleCalculatorChange}
                    min="0"
                  />
                </div>

                {/* Guide Transfer Section */}
                <div className={styles.guideTransfer}>
                  <label htmlFor="transferRate">Guide transfer rate</label>
                  <input
                    type="number"
                    id="transferRate"
                    value={calculatorData.transferRate}
                    onChange={handleCalculatorChange}
                    min="0"
                  />
                  <label htmlFor="numberOfTransfers">Number of transfers</label>
                  <input
                    type="number"
                    id="numberOfTransfers"
                    value={calculatorData.numberOfTransfers}
                    onChange={handleCalculatorChange}
                    min="0"
                  />
                </div>

                {/* Meals Section */}
                <div className={styles.meals}>
                  <label htmlFor="mealQuantity">Number of Meals</label>
                  <input
                    type="number"
                    id="mealQuantity"
                    value={calculatorData.mealQuantity}
                    onChange={handleCalculatorChange}
                    min="0"
                  />
                  <label htmlFor="mealPrice">Meal price</label>
                  <input
                    type="number"
                    id="mealPrice"
                    value={calculatorData.mealPrice}
                    onChange={handleCalculatorChange}
                    min="0"
                  />
                </div>

                {/* Gala Dinner Section */}
                <div className={styles.galaDinner}>
                  <label htmlFor="galaDinner">No of Gala dinners</label>
                  <input
                    type="number"
                    id="galaDinner"
                    value={calculatorData.galaDinner}
                    onChange={handleCalculatorChange}
                    min="0"
                  />
                  <label htmlFor="galaDinnerPrice">Price of Gala dinner</label>
                  <input
                    type="number"
                    id="galaDinnerPrice"
                    value={calculatorData.galaDinnerPrice}
                    onChange={handleCalculatorChange}
                    min="0"
                  />
                </div>

                {/* Guide & Driver Expenses */}
                <div className={styles.guideDriverExpenses}>
                  <label htmlFor="guideDriverHotel">Guide+Driver Hotel</label>
                  <input
                    type="number"
                    id="guideDriverHotel"
                    value={calculatorData.guideDriverHotel}
                    onChange={handleCalculatorChange}
                    min="0"
                  />
                  <label htmlFor="guideDriverMeal">Guide+Driver Meal</label>
                  <input
                    type="number"
                    id="guideDriverMeal"
                    value={calculatorData.guideDriverMeal}
                    onChange={handleCalculatorChange}
                    min="0"
                  />
                </div>

                {/* Profit Section */}
                <div className={styles.profit}>
                  <label htmlFor="profit">Profit per person</label>
                  <input
                    type="number"
                    id="profit"
                    value={calculatorData.profit}
                    onChange={handleCalculatorChange}
                    min="0"
                  />
                  <label htmlFor="taxAndRisk">Taxes&Risk(12%)</label>
                  <input
                    type="number"
                    id="taxAndRisk"
                    value="12"
                    readOnly
                  />
                </div>
              </div>

              {/* Hotels Section */}
              <div className={styles.hotels}>
                {/* Baku Hotel */}
                <div className={styles.hotelSection}>
                  <h3>Baku Hotel</h3>
                  <div className={styles.hotelDetails}>
                    <div className={styles.single}>
                      <label htmlFor="bakuSingle">Single</label>
                      <input
                        type="number"
                        id="bakuSingle"
                        value={calculatorData.bakuSingle}
                        onChange={handleCalculatorChange}
                        min="0"
                      />
                    </div>
                    <div className={styles.double}>
                      <label htmlFor="bakuDouble">Double</label>
                      <input
                        type="number"
                        id="bakuDouble"
                        value={calculatorData.bakuDouble}
                        onChange={handleCalculatorChange}
                        min="0"
                      />
                    </div>
                    <div className={styles.nights}>
                      <label htmlFor="bakuNights">Nights</label>
                      <input
                        type="number"
                        id="bakuNights"
                        value={calculatorData.bakuNights}
                        onChange={handleCalculatorChange}
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Shaki Hotel */}
                <div className={styles.hotelSection}>
                  <h3>Shaki Hotel</h3>
                  <div className={styles.hotelDetails}>
                    <div className={styles.single}>
                      <label htmlFor="shakiSingle">Single</label>
                      <input
                        type="number"
                        id="shakiSingle"
                        value={calculatorData.shakiSingle}
                        onChange={handleCalculatorChange}
                        min="0"
                      />
                    </div>
                    <div className={styles.double}>
                      <label htmlFor="shakiDouble">Double</label>
                      <input
                        type="number"
                        id="shakiDouble"
                        value={calculatorData.shakiDouble}
                        onChange={handleCalculatorChange}
                        min="0"
                      />
                    </div>
                    <div className={styles.nights}>
                      <label htmlFor="shakiNights">Nights</label>
                      <input
                        type="number"
                        id="shakiNights"
                        value={calculatorData.shakiNights}
                        onChange={handleCalculatorChange}
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Ganja Hotel */}
                <div className={styles.hotelSection}>
                  <h3>Ganja Hotel</h3>
                  <div className={styles.hotelDetails}>
                    <div className={styles.single}>
                      <label htmlFor="ganjaSingle">Single</label>
                      <input
                        type="number"
                        id="ganjaSingle"
                        value={calculatorData.ganjaSingle}
                        onChange={handleCalculatorChange}
                        min="0"
                      />
                    </div>
                    <div className={styles.double}>
                      <label htmlFor="ganjaDouble">Double</label>
                      <input
                        type="number"
                        id="ganjaDouble"
                        value={calculatorData.ganjaDouble}
                        onChange={handleCalculatorChange}
                        min="0"
                      />
                    </div>
                    <div className={styles.nights}>
                      <label htmlFor="ganjaNights">Nights</label>
                      <input
                        type="number"
                        id="ganjaNights"
                        value={calculatorData.ganjaNights}
                        onChange={handleCalculatorChange}
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Other Hotel */}
                <div className={styles.hotelSection}>
                  <h3>Other Hotel</h3>
                  <div className={styles.hotelDetails}>
                    <div className={styles.single}>
                      <label htmlFor="otherSingle">Single</label>
                      <input
                        type="number"
                        id="otherSingle"
                        value={calculatorData.otherSingle}
                        onChange={handleCalculatorChange}
                        min="0"
                      />
                    </div>
                    <div className={styles.double}>
                      <label htmlFor="otherDouble">Double</label>
                      <input
                        type="number"
                        id="otherDouble"
                        value={calculatorData.otherDouble}
                        onChange={handleCalculatorChange}
                        min="0"
                      />
                    </div>
                    <div className={styles.nights}>
                      <label htmlFor="otherNights">Nights</label>
                      <input
                        type="number"
                        id="otherNights"
                        value={calculatorData.otherNights}
                        onChange={handleCalculatorChange}
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Transportation Section */}
              <div className={styles.transportation}>
                <h3>Transportation</h3>
                <div className={styles.cars}>
                  <div className={styles.sedan}>
                    <label htmlFor="sedan">Sedan (1-2)</label>
                    <input
                      type="number"
                      id="sedan"
                      value={calculatorData.sedan}
                      onChange={handleCalculatorChange}
                      min="0"
                    />
                  </div>
                  <div className={styles.minivan}>
                    <label htmlFor="minivan">Minivan (3-4)</label>
                    <input
                      type="number"
                      id="minivan"
                      value={calculatorData.minivan}
                      onChange={handleCalculatorChange}
                      min="0"
                    />
                  </div>
                  <div className={styles.sprinter}>
                    <label htmlFor="sprinter">Sprinter (5-12)</label>
                    <input
                      type="number"
                      id="sprinter"
                      value={calculatorData.sprinter}
                      onChange={handleCalculatorChange}
                      min="0"
                    />
                  </div>
                  <div className={styles.bus}>
                    <label htmlFor="bus">Bus (12+)</label>
                    <input
                      type="number"
                      id="bus"
                      value={calculatorData.bus}
                      onChange={handleCalculatorChange}
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Museums Section */}
              <div className={styles.museums}>
                <input
                  type="checkbox"
                  id="maidenTower"
                  name="museums"
                  value="15"
                  onChange={handleCalculatorChange}
                />
                <label htmlFor="maidenTower">Giz Gala(15)</label>

                <input
                  type="checkbox"
                  id="shirvanshahPalace"
                  name="museums"
                  value="15"
                  onChange={handleCalculatorChange}
                />
                <label htmlFor="shirvanshahPalace">Shirvans(15)</label>

                <input
                  type="checkbox"
                  id="carpetMuseum"
                  name="museums"
                  value="10"
                  onChange={handleCalculatorChange}
                />
                <label htmlFor="carpetMuseum">Carpet (10)</label>

                <input
                  type="checkbox"
                  id="heydarAliyevCenter"
                  name="museums"
                  value="15"
                  onChange={handleCalculatorChange}
                />
                <label htmlFor="heydarAliyevCenter">H.Aliyev C(15)</label>

                <input
                  type="checkbox"
                  id="nationalMuseumHistory"
                  name="museums"
                  value="10"
                  onChange={handleCalculatorChange}
                />
                <label htmlFor="nationalMuseumHistory">Tarix (10)</label>

                <input
                  type="checkbox"
                  id="gobustanRockArt"
                  name="museums"
                  value="10"
                  onChange={handleCalculatorChange}
                />
                <label htmlFor="gobustanRockArt">Qobustan(10)</label>

                <input
                  type="checkbox"
                  id="mudVolcanos"
                  name="museums"
                  value="5"
                  onChange={handleCalculatorChange}
                />
                <label htmlFor="mudVolcanos">Palçıq(5)</label>

                <input
                  type="checkbox"
                  id="atashgah"
                  name="museums"
                  value="9"
                  onChange={handleCalculatorChange}
                />
                <label htmlFor="atashgah">Atəşgah(9)</label>

                <input
                  type="checkbox"
                  id="nobel"
                  name="museums"
                  value="5"
                  onChange={handleCalculatorChange}
                />
                <label htmlFor="nobel">Nobel (5)</label>

                <input
                  type="checkbox"
                  id="yanardagh"
                  name="museums"
                  value="9"
                  onChange={handleCalculatorChange}
                />
                <label htmlFor="yanardagh">Yanardağ(9 AZN)</label>

                <input
                  type="checkbox"
                  id="galaReserve"
                  name="museums"
                  value="10"
                  onChange={handleCalculatorChange}
                />
                <label htmlFor="galaReserve">Qala (10 AZN)</label>

                <input
                  type="checkbox"
                  id="mardakanCastle"
                  name="museums"
                  value="5"
                  onChange={handleCalculatorChange}
                />
                <label htmlFor="mardakanCastle">Mərdəkan (5 AZN)</label>

                <input
                  type="checkbox"
                  id="diriBaba"
                  name="museums"
                  value="10"
                  onChange={handleCalculatorChange}
                />
                <label htmlFor="diriBaba">Diri Baba (10)</label>

                <input
                  type="checkbox"
                  id="chuxurGabala"
                  name="museums"
                  value="10"
                  onChange={handleCalculatorChange}
                />
                <label htmlFor="chuxurGabala">Çuxur Qəbələ(10)</label>

                <input
                  type="checkbox"
                  id="fazil"
                  name="museums"
                  value="5"
                  onChange={handleCalculatorChange}
                />
                <label htmlFor="fazil">Fazıl (5)</label>

                <input
                  type="checkbox"
                  id="shakiKhansPalace"
                  name="museums"
                  value="10"
                  onChange={handleCalculatorChange}
                />
                <label htmlFor="shakiKhansPalace">Xan Sarayı(10)</label>

                <input
                  type="checkbox"
                  id="kish"
                  name="museums"
                  value="10"
                  onChange={handleCalculatorChange}
                />
                <label htmlFor="kish">Kiş (10 AZN)</label>

                <input
                  type="checkbox"
                  id="eVisa"
                  name="museums"
                  value="50"
                  onChange={handleCalculatorChange}
                />
                <label htmlFor="eVisa">E-Visa (50 AZN)</label>
              </div>
            </div>

            <button type="submit" className={styles.calculateBtn}>
              CALCULATE
            </button>
          </form>

          {/* Result Section */}
          {calculatorResult && (
            <div className={styles.result}>
              <table>
                <thead>
                  <tr>
                    <th>Pax</th>
                    <th>Total Cost</th>
                    <th>Total Profit</th>
                    <th>Total Taxes</th>
                    <th>Total Price</th>
                    <th>Price per Person</th>
                  </tr>
                </thead>
                <tbody>
                {calculatorResult.map((res, index) => (
                    <tr key={index}>
                      <td>{res.pax}</td>
                      <td>₼ {res.totalCost}</td>
                      <td>{res.totalProfit}</td>
                      <td>{res.taxAndRisk}</td>
                      <td>{res.totalPrice}</td>
                      <td>{res.pricePerPerson}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Test;
