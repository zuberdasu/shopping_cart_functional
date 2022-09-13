import { React, useState } from "react";
import Product from "./Product";
import ShoppingCart from "./ShoppingCart";

const Interface = (props) => {
  const [screen, setScreen] = useState(0); //screen 0 will be products and 1 will be shopping cart
  const [searchTerm, setSearchTerm] = useState("");

  const { products, onBuyNow, shoppingCartItems, onDeleteCartItem } = props;

  //what products do I want to keep?
  const filtered = [...products].filter((product) => {
    //work out if the product matches the search term
    return product.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  //check if search term has produced results, else show all products
  const results = filtered.length > 0 ? filtered : products;

  //decide whether to show products or shopping cart
  if (screen === 0) {
    return (
      <>
        <button onClick={() => setScreen(1)}>View shopping cart</button>
        <input
          type="text"
          onInput={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        {results.map((product) => (
          <Product key={product.id} product={product} onBuyNow={onBuyNow} />
        ))}
        ;
      </>
    );
  } else {
    return (
      <ShoppingCart
        setScreen={setScreen}
        products={products}
        shoppingCartItems={shoppingCartItems}
        onDeleteCartItem={onDeleteCartItem}
      />
    );
  }
};

export default Interface;
