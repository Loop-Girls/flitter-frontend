<template>
  <div>
    <div class="search-bar">
      <div class="searchbar">
        <input type="text" class="form-control" placeholder=" &#128269;   Find your flip" v-model="title" />
        <button class="search-btn" type="button" id="button-addon2" @click="onSearch()">
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
.search-bar {
  width: 90%;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: auto;
  margin-left: auto;
  border-radius: 10px;
  border-width: 3px;
  border: 3px solid rgb(37, 207, 215);
}


</style>