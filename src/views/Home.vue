<template>
  <div class="home">
    <div class="abe-left">
      <div class="url-input">
        <div>
          <label class="url-input__label">Url image: </label>
        </div>
        <div>
          <input class="url-input__tag" type="text" id="url" v-model="imageUrl" >
        </div>
      </div>
      <div class="checkboxes-content">
        <div class="checkboxes-content__checkbox">
          <input class="input-checkbox" type="checkbox" id="premium" name="premium" v-model="premium">
          <label class="checkbox-label" for="premium"> Premium</label>
        </div>
        <div class="checkboxes-content__checkbox">
          <input class="input-checkbox" type="checkbox" id="free" name="free" v-model="free">
          <label class="checkbox-label" for="free"> Free</label>
        </div>
      </div>
      <hr>
      <div class="buttons">
        <button class="buttons__queue-button" type="button" id="show-btn" @click="showModal">Queue</button>
        <b-modal ref="my-modal" hide-footer title="Abe Queue">
          <div class="d-block text-center">
            <h4>Process queue</h4>
          </div>
          <hr>
          <div class="button-modal">
            <b-button class="mt-3" variant="info" @click="hideModal">Close Me</b-button>
          </div>
        </b-modal>
        <button class="buttons__send-button" type="button" @click="sendUrl">Send</button>
      </div>
    </div>
    <div class="abe-right" v-show="imageUrl != null && imageUrl != ''">
      <div class="image">
        <img class="image__tag" :src="imageUrl" width="100%" />
      </div>
      <div class="description">
        <p><strong>Description:</strong> <br><br> Acá va la descripción</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      imageUrl: null,
      premium: false,
      free: false
    }
  },
  watch: {
    premium() {
      if(this.premium) {
        this.free = false
      } else {
        this.free = true
      }
    },
    free() {
      if(this.free) {
        this.premium = false
      } else {
        this.premium = true
      }
    }
  },
  methods: {
    async showModal() {
      let response = await this.$store.dispatch("getAll")
      console.log(response)
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    sendUrl() {
      let data = {}
      if(this.premium) {
        data.plan = "premium"
      } else if(this.free) {
        data.plan = "free"
      }
      data.url = this.imageUrl
      this.$store.dispatch("sendUrl", data)
    }
  }
};
</script>

<style scoped>
.home {
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  padding: 0px 50px;
}

.abe-left {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 100px 30px;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.url-input__label {
  font-size: 30px;
}

.url-input__tag {
  margin: 10px 0px;
  outline: none;
  width: 400px;
  padding: 20px 30px;
  background-color: #eff7e1;
  border: none;
  border-radius: 20px;
  font-size: 15px;
  color: inherit;
}

.url-input__tag:hover {
  /* border: 1px solid #a2d0c1; */
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
}

.checkboxes-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 30px 0px;
}

.checkboxes-content__checkbox {
  margin: 0px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-checkbox {
  -webkit-appearance: none;
  outline: none;
  background-color: #fafafa;
	border: 1px solid #cacece;
	box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
	padding: 9px;
	border-radius: 3px;
	display: inline-block;
	position: relative;
  cursor: pointer;
}

.input-checkbox:checked {
	background-color: #f8dc81;
	border: 1px solid #adb8c0;
}

.input-checkbox:checked:after {
	content: '\2714';
	font-size: 14px;
	position: absolute;
	top: 0px;
	left: 3px;
	color: #214151;
}

.checkbox-label {
  font-size: 20px;
  margin: 0px 0px 0px 10px;
}

.buttons {
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.buttons__queue-button {
  cursor: pointer;
  outline: none;
  padding: 14px 40px;
  border-radius: 20px;
  border: none;
  background-color: #a2d0c1;
  font-size: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
}

.buttons__queue-button:hover {
  background-color: #55b3b1;
}

.buttons__send-button {
  cursor: pointer;
  outline: none;
  padding: 14px 40px;
  border-radius: 20px;
  border: none;
  background-color: #f8dc81;
  font-size: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
}

.buttons__send-button:hover {
  background-color: #ffc764;
}

.button-modal {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.abe-right {
  width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.image {
  margin-left: 30px;
}

.image__tag {
  border-radius: 30px;
}

.description {
  margin: 30px 0px 0px 30px;
  width: auto;
  border: 1px solid #214151;
  border-radius: 20px;
  padding: 20px;
  background-color: #ffffff;
}
</style>
