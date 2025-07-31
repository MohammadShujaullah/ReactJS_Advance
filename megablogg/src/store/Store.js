import{configureStore} from '@reduxjs/toolkit';

import authSlice from './authSlice.js'   //But since you're already doing export default authSlice.reducer, you should import the reducer directly like this:

 const Store=configureStore({
    reducer:{
           auth : authSlice,
    }
})

export default Store;