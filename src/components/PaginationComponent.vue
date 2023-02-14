<template>
    <div class="div-btn">
        <button class="btn-page" id="btn_previous" @click="previousPage()">
            &laquo;
        </button>
        <p class="page">Page</p>
        <button class="btn-page" id="btn_next" @click="nextPage()">
            &raquo;
        </button>
    </div>
</template>


<script lang="ts">
import useFlits from '@/composables/useFlits';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "PaginationComponent",
    setup() {
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
            inSearchProduct,
            btn_next,
            btn_previous,

            //TODO: check not outside limits
            nextPage: () => {
                if (!limitReached.value) {
                    (offset += 5), console.log(offset), fetchFlitsPage(offset);
                }
            
 //TODO: disable button if no more products are found
            },
            previousPage: () => {
            if(offset>0){
                console.log(offset);
                offset > 0 ? (offset -= 5) : (offset = 0);
                console.log('offset ' + offset)
                fetchFlitsPage(offset);
            }
            },
        };
    },
});
</script>
<style scoped>
.div-btn{
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-items:baseline;
    margin-left: auto;
    margin-right: auto;
    
}
p{
    margin: 3px;
    font-size: 50px;
}
button{
    background-color:rgb(37, 207, 215)
}
.div-btn{
    width: 200px;
}
.page{
    font-size: 30px;
}
</style>