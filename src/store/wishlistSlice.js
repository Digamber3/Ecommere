import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    favorites: [],
  },
  reducers: {
    addToWishlist(state, action) {
      state.favorites.push(action.payload);
    },
    removeFromWishlist(state, action) {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState: {
//     favorites: [],
//     products: {},
//   },
//   reducers: {
//     addToWishlist(state, action) {
//       const productId = action.payload.id;
//       state.favorites.push(productId);
//       state.products[productId] = action.payload; // Store product details using ID
//     },
//     removeFromWishlist(state, action) {
//       const productId = action.payload;
//       state.favorites = state.favorites.filter((id) => id !== productId);
//       delete state.products[productId]; // Remove product details when removing from wishlist
//     },
//     updateWishlistProducts(state, action) {
//       const updatedProducts = action.payload;
//       state.products = updatedProducts;
//     },
//   },
// });

// export const { addToWishlist, removeFromWishlist, updateWishlistProducts } =
//   wishlistSlice.actions;

// export default wishlistSlice.reducer;
