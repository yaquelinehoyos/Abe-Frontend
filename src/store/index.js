import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    flag: 0
  },
  mutations: {
    setFlag(state) {
      state.flag += 1
    }
  },
  actions: {
    async sendUrl({
      commit
    }, data) {
      // try {
      //   let response = await axios.post(
      //     `https://post-abe.martinquintero.com/`,
      //     data
      //   );
      //   if (response.status == 200) {
      //     commit("setFlag");
      //   }
      //   return response;
      // } catch (err) {
      //   console.log(err)
      //   return err.response;
      // }

      // await fetch('https://post-abe.martinquintero.com/', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(data),
      //   })
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log('Success:', data);
      //   })
      //   .catch((error) => {
      //     console.error('Error:', error);
      //   });
      // commit("setFlag");

      console.log(data)
      const rawResponse = await fetch('https://post-abe.martinquintero.com/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          "url": "https://storage.googleapis.com/abe-cactusai.appspot.com/pSrKBFucSeqjHXa.jpg",
          "plan": "premium"
        })
      });
      const content = await rawResponse.json();

      console.log(content);
      commit("setFlag");
    },
    async getAll({
      commit
    }) {
      let data = {
        "key": "all",
        "value": "all"
      }
      await fetch('https://search-by.martinquintero.com', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      commit("setFlag");
    }
  },
  modules: {},
});