<template>
  <div>
    <div class="card">
      <div class="searchbar">
        <input type="text" class="form-control" placeholder=" &#128269;   Encuentra tu flit " v-model="title" />
        <button class="form-example" type="button" id="button-addon2" @click="onSearch()">
          <!-- <i class="fa-solid fa-magnifying-glass"></i> -->
          Search
        </button>
      </div>
    </div>
    <div class="div-btn">
      <button class="btn-page" id="btn_previous" @click="previousPage(title)">
        &laquo;
      </button>
      <p>Page</p>
      <button class="btn-page" id="btn_next" @click="nextPage(title)">
        &raquo;
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import useFlits from "@/composables/useFlits";
import { ref } from "@vue/reactivity";
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    following: {
      type: Array,
      required: true,
    }
  },
  setup(props, ctx) {
    const { getFlits } = useFlits();
    const title = ref<string>("");
    let inSearchProduct = "";
    let {
      fetchFlitsPage,
      limitReached
    } = useFlits();
    let offset = 0;
    let btn_next = document.getElementById("btn_next") as HTMLButtonElement;
    let btn_previous = document.getElementById(
      "btn_previous"
    ) as HTMLButtonElement;

    return {
      title,
      onSearch: () => {
        console.log(title.value);
        //TODO: look into following users flits

        let url = `/flits/?message=${title.value}&skip=${offset}&limit=5`
        let filter = {
          "message": url,
          "offset": offset
        }
        fetchFlitsPage(filter);
      },
      inSearchProduct,
      btn_next,
      btn_previous,

      //TODO: check not outside limits
      nextPage: (title: string) => {
        if (!limitReached.value) {
          (offset += 5);
          console.log(offset);
          let url = '';
          if (props.following.length > 0) {
            if (title != '') {
              url = `/flits/private/?author=${props.following.toString()}&message=${title}&skip=${offset}&limit=5`;
            } else {
              url = `/flits/private/?author=${props.following.toString()}&skip=${offset}&limit=5`;
            }

          } else {
            if (title != '') {
              url = `/flits/?message=${title}&skip=${offset}&limit=5`;
            } else {
              url = `/flits/?skip=${offset}&limit=5`;
            }
          }
          let filter = {
            "message": url,
            "offset": offset
          }
          fetchFlitsPage(filter);
        }

        //TODO: disable button if no more products are found
      },
      previousPage: (title: string) => {
        if (offset > 0) {
          console.log(offset);
          offset > 0 ? (offset -= 5) : (offset = 0);
          console.log('offset ' + offset);
          let url = '';
          if (props.following != null) {
            if (props.following.length > 0) {
              if (title != '') {
                url = `/flits/private/?author=${props.following.toString()}&message=${title}&skip=${offset}&limit=5`;
              } else {
                url = `/flits/private/?author=${props.following.toString()}&skip=${offset}&limit=5`;
              }

            } else {
              if (title != '') {
                url = `/flits/?message=${title}&skip=${offset}&limit=5`;
              } else {
                url = `/flits/?skip=${offset}&limit=5`;
              }

            }
          } else {
            url = `/flits/?skip=${offset}&limit=5`;
          }

          let filter = {
            "message": url,
            "offset": offset
          }
          fetchFlitsPage(filter);
        }
      },
    };
  },
});
</script>

<style scoped>
.card {
  width: 90%;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: auto;
  margin-left: auto;

}

.div-btn {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}
.form-example {
  float: left;
  width: 20%;
  padding: 10px;
  background: black;
  color: white;
  border: 1px solid white;
  border-left: none;
  cursor: pointer;
 
}

.form-example:hover {
  border-color: pink;
  color: pink;
}

.form-example::after {
  content: "";
  clear: both;
  display: table;
}
.searchbar{
  display: flex;
}
.btn-page{
  border-color: white;
  border-style: solid;
  border-radius: 10px;
  background-color:black;
  width: 40px;
  color: white;
}
</style>