export function updatePage() {
    console.log("call from header")
    var arr = JSON.parse(localStorage.getItem("title") || "[]");
    if (arr) {
      console.log(arr.length);
      if (arr.length > 0) {
        try {
          this.listArray = JSON.parse(localStorage.getItem("title"));
          console.log(this.listArray);
          if (this.listArray.length > 0) {
            console.log(this.listArray.length);
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
  }