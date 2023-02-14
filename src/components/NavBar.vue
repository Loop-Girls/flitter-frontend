<template>
    <div class = "nav">
        <a class="name" href = "#"> Home</a>
        <a class="name" href = "#">Login</a>
        <a class="name" href = "#">Logout</a>
        <a v-on:click=" logout" href="#">Logout</a>
    </div>
</template>

<script>
export default{
    name:'NavBar'
    methods;{
        logout()
    }
    localStores.clear();
    this.$router.push{(name:'Login')}
}


</script>

<style scoped>
.name{
    font-size: 30px;
}
</style>

