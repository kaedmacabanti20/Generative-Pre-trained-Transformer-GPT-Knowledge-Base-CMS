<template>
    <nav class="navbar">
        <ul>
            <img src="../assets/UA-Logo.png" alt="">
            <li><b>AI Virtual Assistant</b></li>
        </ul>
        <ul>
            <li><router-link to="/account" class="primary-button"><b>Account</b></router-link></li>
        </ul>
     </nav> 
</template>

<style scoped>
.navbar {
    background-color: #002366; color: white;
    position: fixed; top: 0; z-index: 100;
    height: 4.5rem; width: 100vw;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem 0 2rem;
}
.navbar ul{
    display: flex; align-items: center;
 }
.navbar ul li{
    padding: 0 .6rem 0 .6rem;
} 
img{
    height: 3rem;
}

</style>

 
