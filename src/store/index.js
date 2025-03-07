import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    todos: [],
  },
  getters: {},
  mutations: {
    storeTodos(state, payload) {
      state.todos = payload;
    },
    storeTodo(state, payload) {
      const index = state.todos.findIndex((todo) => todo.id === payload.id);
      if (index >= 0) state.todos.splice(index, 1, payload);
      else state.todos.unshift(payload);
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex((todo) => todo.id === id.id);
      if (index >= 0) state.todos.splice(index, 1);
    },
  },
  actions: {
    getTodos({ commit }) {
      return new Promise((resolve) => {
        setTimeout(async () => {
          const response = await axios.get("http://localhost:3000/todos");
          commit("storeTodos", response.data);
          resolve();
        }, 1000);
      });
    },

    addTodo({ commit }, data) {
      axios.post("http://localhost:3000/todos", data).then((response) => {
        commit("storeTodo", response.data);
      });
    },

    updateTodo({ commit }, { id, data }) {
      axios.put(`http://localhost:3000/todos/${id}`, data).then((response) => {
        commit("storeTodo", response.data);
      });
    },

    deleteTodo({ commit }, id) {
      axios.delete(`http://localhost:3000/todos/${id}`).then((response) => {
        commit("deleteTodo", response.data);
      });
    },
  },
  modules: {},
});
