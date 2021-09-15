<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div v-if="showList" class="modal-container">
        <h3>Add List</h3>
        <hr />
        <div class="model-body">
          <div>Title</div>
          <input
            class="title-input"
            type="text"
            v-model="Title"
            placeholder="List title"
            required
          />
          <h6 style="color: red;" v-if="showAlertmsg">Please enter valid title</h6>
          <button
            type="button"
            class="modal-default-button rounded"
            style="height: 30px; width: 80px; background: #ffffff"
            @click="$emit(close)"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="modal-default-button rounded"
            style="height: 30px; width: 80px; background: #5850ec"
            @click="$emit(add, Title)"
          >
            Add
          </button>
        </div>
      </div>
	  <div v-if="showCard" class="modal-container">
        <h3>Add List</h3>
        <hr />
        <div class="model-body">
          <div>Title</div>
          <input
            class="title-input"
            type="text"
            v-model="cardTitle"
            placeholder="card title"
          />
          <h6 style="color: red;" v-if="showAlertmsg">Please enter title</h6>
		  <div>Description</div>
          <input
            class="title-input"
            type="text"
            v-model="cardDescription"
            placeholder="Card Desc"
          />
          <button
            type="button"
            class="modal-default-button rounded"
            style="height: 30px; width: 80px; background: #ffffff"
            @click="$emit(close)"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="modal-default-button rounded"
            style="height: 30px; width: 80px; background: #5850ec"
            @click="$emit(add, cardTitle, cardDescription)"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showAlertmsg: {
      type: Boolean,
    },
	showList: {
	  type: Boolean,
	},
	showCard: {
      type: Boolean,
    }
  },
  data() {
    return {
      close: "close",
      add: "add",
      Title: "",
      cardTitle: "",
      cardDescription: ""
    };
  },
};
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 5px 0px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.model-body {
  margin: 20px 30px;
  text-align: left;
  font-weight: 30px;
}

.title-input {
  width: 85%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 3px solid #ccc;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
  border-radius: 8px;
}
.desc-input {
  width: 85%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 3px solid #ccc;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
  border-radius: 8px;
}

input[type="text"]:focus {
  border: 3px solid rgb(123, 179, 231);
}
</style>