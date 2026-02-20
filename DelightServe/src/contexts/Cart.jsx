import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  const [cateringCurrentItem, setCateringCurrentItem] = useState(
    localStorage.getItem("cateringCurrentItem")
      ? JSON.parse(localStorage.getItem("cateringCurrentItem"))
      : []
  );

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    localStorage.getItem("selectedCategoryId") !== undefined
      ? parseInt(localStorage.getItem("selectedCategoryId"))
      : 2
  );

  const addSelectedCategoryToCart = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const addToCart = (item) => {
    const isCartItem = cartItems.find((cartItem) => cartItem.categoryId === item.categoryId);

    if (isCartItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.categoryId === item.categoryId
            ? { ...item, quantity: cartItem.quantity }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const udateCartVenuInfo = (item, venuInfo) => {
    const isCartItem = cartItems.find((cartItem) => cartItem.categoryId === item.categoryId);
    const copyVenuInfo = { ...venuInfo, status: 'Pending' };
    if (!isCartItem) {
      return;
    }
    if (item?.cateringListItemTypeId) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.foodId === item.foodId
            ? { ...item, venuInfo: copyVenuInfo }
            : cartItem
        )
      );
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.categoryListItemId === item.categoryListItemId
            ? { ...item, venuInfo: copyVenuInfo }
            : cartItem
        )
      );
    }
  };

  const addToCartCurrentCatering = (item) => {
    setCateringCurrentItem(item);
  };

  const addToCartCatering = (item) => {
    const isCartItem1 = cartItems.find((cartItem) => cartItem.categoryId === item.categoryId);

    if (isCartItem1) {
      const isCartItem2 = cartItems.find((cartItem) => cartItem.cateringListItemId === item.cateringListItemId);
      if (isCartItem2) {
        const isCartItem3 = cartItems.find((cartItem) => cartItem.foodId === item.foodId);
        if (!isCartItem3) {
          setCartItems([...cartItems, { ...item, quantity: 1 }]);
          // setCartItems(
          //   cartItems.map((cartItem) =>
          //     (cartItem.categoryId === item.categoryId
          //       && cartItem.cateringListItemId === item.cateringListItemId
          //       && (!cartItem?.foodId || cartItem?.foodId === item?.foodId)
          //     ) ? { ...item, quantity: cartItem.quantity }
          //       : cartItem
          //   )
          // );
        }
        //  else {
        //   setCartItems([...cartItems, { ...item, quantity: 1 }]);
        // }

      } else {
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
      }

    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    let isItemInCart = null;
    if (item?.cateringListItemTypeId) {
      isItemInCart = cartItems.find((cartItem) => cartItem.categoryId === item.categoryId
        && cartItem.categoryListId === item.categoryListId
        && cartItem.cateringListItemId === item.cateringListItemId
        && cartItem.cateringListItemTypeId === item.cateringListItemTypeId
        && cartItem.foodId === item.foodId);
      if (isItemInCart) {
        setCartItems(cartItems.filter((cartItem) => cartItem.foodId !== item.foodId));
      }
    } else {
      isItemInCart = cartItems.find((cartItem) => cartItem.categoryId === item.categoryId
        && cartItem.categoryListId === item.categoryListId
        && cartItem.categoryListItemId === item.categoryListItemId);
      if (isItemInCart) {
        setCartItems(cartItems.filter((cartItem) => cartItem.categoryListItemId !== item.categoryListItemId));
      }
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const addCartQuantityCount = (item, qty) => {
    const isCartItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isCartItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: qty }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const totalCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("selectedCategoryId", selectedCategoryId);
  }, [selectedCategoryId]);

  // useEffect(() => {
  //   const cartItemString = localStorage.getItem("cartItems");

  //   if (cartItemString) {
  //     const parsedCartItem = JSON.parse(cartItemString);

  //     setCartItems(parsedCartItem);
  //   }
  // }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cateringCurrentItem,
        addToCart,
        addToCartCurrentCatering,
        addToCartCatering,
        removeFromCart,
        clearCart,
        getCartTotal,
        addCartQuantityCount,
        totalCartCount,
        selectedCategoryId,
        addSelectedCategoryToCart,
        udateCartVenuInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node, // Define PropTypes for children prop
};