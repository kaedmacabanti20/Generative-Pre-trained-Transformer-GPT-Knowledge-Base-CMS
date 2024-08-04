import { createStore } from 'vuex';

const store = createStore({
  modules: {
    auth: {
      state: {
        isAuthenticated: false,
      },
      mutations: {
        SET_AUTHENTICATED(state, isAuthenticated) {
          state.isAuthenticated = isAuthenticated;
        },
      },
      actions: {
        async checkAuthentication({ commit, state }) {
          const isAuthenticated = state.isAuthenticated;
          commit('SET_AUTHENTICATED', isAuthenticated);
        },
        login({ commit }) {
          commit('SET_AUTHENTICATED', true);
        },
        logout({ commit }) {
          commit('SET_AUTHENTICATED', false);
        },
      },
      getters: {
        isAuthenticated: (state) => state.isAuthenticated,
      },
    },
  },
});

export default store;
