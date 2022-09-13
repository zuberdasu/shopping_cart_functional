import { React, useState, useEffect, useCallback } from "react";
import axios from "axios";
import Interface from "./components/Interface";
import "./App.css";

const App = () => {
  const [apiData, setApiData] = useState([]);
  const [shoppingCartItems, setShoppingCartItems] = useState([]);

  const url = "https://fakestoreapi.com/products";
  const getApiData = async () => {
    try {
      const result = await axios.get(url);
      setApiData(result.data);
    } catch (error) {
      console.log("Error from API");
    }
  };

  //callback needed to avoid missing dependency warning
  const cb = useCallback(getApiData, [url]);

  useEffect(() => {
    cb();
  }, [cb]);

  const onBuyNow = (id) => {
    const copyShoppingCartItems = [...shoppingCartItems];

    const indexOfCartItem = copyShoppingCartItems.findIndex(
      (item) => item.id === id
    );

    if (indexOfCartItem > -1) {
      copyShoppingCartItems[indexOfCartItem].quantity += 1;
    } else {
      copyShoppingCartItems.push({ quantity: 1, id });
    }

    setShoppingCartItems(copyShoppingCartItems);
  };

  const onDeleteCartItem = (id) => {
    const copyShoppingCartItems = [...shoppingCartItems];

    const indexOfCartItem = copyShoppingCartItems.findIndex(
      (item) => item.id === id
    );

    copyShoppingCartItems.splice(indexOfCartItem, 1);

    setShoppingCartItems(copyShoppingCartItems);
  };

  if (apiData) {
    return (
      <Interface
        onBuyNow={onBuyNow}
        products={apiData}
        shoppingCartItems={shoppingCartItems}
        onDeleteCartItem={onDeleteCartItem}
      />
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default App;
