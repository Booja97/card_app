<template>
  <div>
    <model
      v-if="showModel"
      :showAlertmsg="showAlert"
      :showList="true"
      :showCard="false"
      @close="closePopup"
      @add="addListTitle"
    ></model>
    <div style="display: flex">
      <div class="header">To-Do List</div>
      <div class="y bp"></div>
      <button
        class="modal-default-button rounded"
        style="
          height: 30px;
          width: 80px;
          background: blue;
          color: white;
          border-radius: 4px;
        "
        v-on:click="openPopup"
      >
        ADD LIST
      </button>
    </div>
  </div>
</template>

<script>
import popup from "./Model.vue";
import * as myCommon from "../assets/common.js"
export default {
  components: {
    model: popup,
  },
  data: function () {
    return {
      showModel: false,
      showAlert: false,
    };
  },
  methods: {
    openPopup() {
      this.showModel = true;
    },
    closePopup()  {
      this.showModel = false
      this.showAlert = false;
    },
    addListTitle(Title) {
      if (this.checkTitle(Title) && Title.length > 0) {
        var currentDate = new Date();
        var newTodo= []
        newTodo =JSON.parse(localStorage.getItem("title")|| "[]");
        let todo = {
          title: Title,
          time: currentDate,
        };
        newTodo.push(todo)
        this.saveListLocal(newTodo);
        this.showModel = false;
        this.showAlert = false;
        
      } else {
        this.showModel = true;
        this.showAlert = true;
      }
    },
    checkTitle(Title){
      var arr= JSON.parse(localStorage.getItem("title")|| "[]");
      for (var i = 0 ; i < arr.length ;i++){
        if(Title == arr[i]["title"]){
          return false
        }
      }
      return true
    },
    saveListLocal(newTodo) {
      let parsed = JSON.stringify(newTodo);
      localStorage.setItem("title", parsed);
    },
  },
};
</script>
<style scoped>
.bp {
  flex: 1 0 auto;
}
.y {
  display: block;
}
.head {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
div.header {
  color: #000000;
  margin: 4px 40px;
  font-weight: bolder;
  display: inline-block;
  border-right-width: 10px;
}
.addlist {
  background-color: #2b7df8;
  border-radius: 4px;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin: 4px 2px;
}
</style>