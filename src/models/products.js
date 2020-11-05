import * as productsService from '../services/products';

const STORAGE_NAME = 'dva-cart';

export default {
  namespace: 'products',
  state: {
    list: [],  // 商品列表
    cart: [],  // 购物车列表
    counts: 0, // 购物车商品数量
  },
  reducers: {
    save(state, { payload: { data: list } }) {
      return { ...state, list };
    },
    getCart(state){
      let cart = JSON.parse(window.localStorage.getItem(STORAGE_NAME)) || [];
      let counts = 0;
      if(Array.isArray(cart) && cart.length){
        cart.forEach((item) => {
          counts += item.counts;
        });
      }
      return { ...state, cart, counts };
    },
    addToCart(state, { payload: { data } }) {
      let newId = data.id;
      let cart = [...state.cart];
      let flag = false;
      cart.forEach((item) => {
        if(item.id === newId){
          item.counts++;
          flag = true;
        }
      });
      if(!flag){
        data.counts = 1;
        cart.push(data);
      }
      window.localStorage.setItem(STORAGE_NAME, JSON.stringify(cart));
      return { ...state, cart:JSON.parse(JSON.stringify(cart)), counts: state.counts + 1 };
    },
    updateCart(state, { payload: { id, counts }}){
      let cart = [...state.cart];
      let step;
      cart.forEach((item) => {
        if(item.id === id){
          step = counts - item.counts;
          item.counts = counts;
        }
      });
      console.log();
      window.localStorage.setItem(STORAGE_NAME, JSON.stringify(cart));
      return { ...state, cart:JSON.parse(JSON.stringify(cart)), counts: state.counts + step };
    },
    removeCart(state, { payload: { id } }) {
      let cart = [...state.cart];
      let key;
      let counts = state.counts;
      cart.forEach((item, index) => {
        if(item.id === id){
          key = index;
          item.checked = false;
          counts -= item.counts;
        }
      });
      cart.splice(key, 1);
      window.localStorage.setItem(STORAGE_NAME, JSON.stringify(cart));
      return { ...state, cart:JSON.parse(JSON.stringify(cart)), counts };
    },
    removeAll(state) {
      window.localStorage.removeItem(STORAGE_NAME);
      return { ...state, cart: [], counts: 0 };
    },
    isSelectCart(state, { payload: { id } }){
      let cart = [...state.cart];
      cart.forEach((item) => {
        if(item.id === id){
          if(item.hasOwnProperty('checked')){
            item.checked = !item.checked;
          }else{
            item.checked = true;
          }
        }
      });
      window.localStorage.setItem(STORAGE_NAME, JSON.stringify(cart));
      return { ...state, cart:JSON.parse(JSON.stringify(cart)) };
    }
  },
  effects: {
    *fetch({}, { call, put }) {
      const { data } = yield call(productsService.fetch);
      yield put({
        type: 'save',
        payload: { data: data.products },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/products') {
          dispatch({ type: 'fetch' });
          dispatch({ type: 'getCart' });
        }
      });
    },
  },
};
