<template>
    <div class="navbar">
        <div>Тестовый проект</div>
        <div class="navbar__btns">
            <default-button 
            @click="$router.push('/posts')">
                Посты
            </default-button>
             <default-button 
             style="margin-left:5px; margin-right:5px;" 
             @click="$router.push('/info')">
                О сайте
            </default-button>
             <default-button
             @click="$router.push('/store')"
             style="margin-right:5px;" 
             >
                store
            </default-button> 
            <default-button
             @click="$router.push('/')">
                Главная
            </default-button>
            
        </div>
        <!-- <router-link to="/">Главная</router-link>
        <router-link to="/posts">Страница с постами</router-link>
        <router-link to="/info">О сайте</router-link> -->
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.navbar {
    height: 50px;
    background-color: salmon;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
}

.navbar__btns{
margin-left: auto;
}
</style>