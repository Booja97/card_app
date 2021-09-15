<template>
  <div>
    <model
      v-if="showModel"
      :showAlertmsg="showAlert"
      :showList="false"
      :showCard="true"
      @close="showModel = false"
      @add="addNewTodo"
    ></model>
    <div v-if="!showCards" style="padding-top: 200px; text-align: center">
      No card available
    </div>
    <div v-else>
      <div class="list-contain">
        <div v-for="titl in listArray" :key="titl.title">
          <div class="lists">
            <div style="display: flex">
              <h2 style="">{{ titl.title }}</h2>
              <span class="tag-count" v-on:click="removeTask(titl)">x</span>
            </div>
            <div v-if="getCurrentList(titl.title)"><hr>
              <div
                class="card-list"
                v-for="todo in localArray"
                :key="todo.title"
              >
                <div style="display: flex">
                  <h3>{{ todo.title }}</h3>
                  <span
                    class="tag-count"
                    v-on:click="removeCard(titl.title, todo.title)"
                    >x</span
                  >
                </div>
                <p class="desc-display">{{ todo.description }}</p>
              </div>
            </div>
            <div v-else>
              <div class="card-list">
                <p class="desc-display">No cards available</p>
              </div>
            </div>
            <button
              class="modal-default-button rounded"
              style="
                height: 30px;
                width: auto;
                background: #d3d3d3;
                color: Blue;
                font-size: 15px;
                font-weight: bold;
              "
              v-on:click="openPopup(titl.title)"
            >
              + Add Card
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import popup from "./Model.vue";
export default {
  components: {
    model: popup,
  },
  data: function () {
    return {
      listArray: JSON.parse(localStorage.getItem("title") || "[]"),
      localArray: [],
      Title: "",
      Description: "",
      showModel: false,
      showAlert: false,
      listName: "",
      showCards: false,
    };
  },
  mounted() {
    this.updatePage();
  },
  methods: {
    updatePage() {
      var arr = JSON.parse(localStorage.getItem("title") || "[]");
      if (arr) {
        console.log(arr.length);
        if (arr.length > 0) {
          try {
            this.listArray = JSON.parse(localStorage.getItem("title"));
            if (this.listArray.length > 0) {
              this.showCards = true;
            }
          } catch (e) {
            localStorage.removeItem("title");
          }
          for (var i; i < this.listArray.length; i++) {
            this.getCurrentList(i.title);
          }
        }
        else{
          this.showCards = false;
        }
      } else {
        this.showCards = false;
      }
    },
    removeTask(title) {
      var arr = JSON.parse(localStorage.getItem("title"));
      arr.splice(arr.indexOf(title), 1);
      this.updateListLocal(arr, title.title);
      this.updatePage();
    },
    removeCard(title, cardTitle) {
      var arr = JSON.parse(localStorage.getItem(title));
      arr.splice(arr.indexOf(cardTitle), 1);
      this.updateCardLocal(arr, title);
      this.getCurrentList(title);
    },
    getCurrentList(titl) {
      this.localArray = JSON.parse(localStorage.getItem(titl));
      if (this.localArray) {
        if (this.localArray.length > 0) {
          return true;
        }
      } else {
        return false;
      }
    },
    openPopup(value) {
      this.listName = value;
      this.showModel = true;
    },

    addNewTodo(cardTitle, cardDescription) {
      if (cardTitle.length > 0) {
        var currentDate = new Date();
        var newTodo = [];
        newTodo = JSON.parse(localStorage.getItem(this.listName) || "[]");
        let todo = {
          title: cardTitle,
          description: cardDescription,
          time: currentDate,
          listHead: this.listName,
        };
        newTodo.push(todo);
        var sortedTodo = this.sortCard(newTodo);
        this.saveListLocal(sortedTodo);
        this.showModel = false;
      } else {
        this.showModel = false;
      }
    },
    sortCard(newTodo) {
      newTodo.sort((a, b) => {
        return new Date(b.time) - new Date(a.time);
      });
      return newTodo;
    },
    saveListLocal(sortedTodo) {
      let parsed = JSON.stringify(sortedTodo);
      localStorage.setItem(this.listName, parsed);
    },
    updateListLocal(removedTodo, title) {
      console.log();
      let parsed = JSON.stringify(removedTodo);
      localStorage.setItem("title", parsed);
      localStorage.removeItem(title);
    },
    updateCardLocal(updatedArr, title) {
      let parsed = JSON.stringify(updatedArr);
      localStorage.setItem(title, parsed);
    },
  },
};
</script>
<style scoped>
.list-contain {
  display: flex;
  justify-content: center;
}

.lists {
  display: flex;
  flex-direction: column;
  width: 280px;
  height: auto;
  justify-content: start;
  background: #f5f5f5;
  border: 1px solid #ddd;
  padding: 20px 20px;
  margin: 10px;
  border-top: 5px solid blue;
  border-radius: 6px;
}

.card-list {
  display: block;
  width: 250px;
  height: auto;
  justify-content: start;
  background: white;
  border: 1px solid #ddd;
  padding: 10px 10px;
  margin: 5px;
  text-align: left;
  border-radius: 6px;
}

.desc-display {
  margin: 0 0 10px;
}

.tag-count {
  justify-content: center;
  min-width: 12px;
  height: 12px;
  color: black;
  font-size: 15px;
  margin-left: auto;
  background-color: #dcdcdc;
  border-radius: 50%;
  padding: 8px 8px;
  cursor: pointer;
}

.card-header {
  white-space: nowrap;
  position: relative;
  display: flex;
  align-items: center;
}
</style>
