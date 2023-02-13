<template>
    <div class = "nav">
        <a href = "#"> Home</a>
        <a href = "#">Login</a>
        <a href = "#">Logout</a>
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