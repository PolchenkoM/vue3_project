<template>
 <div class="app">
        <form @submit.prevent>
            <h4>Создание поста</h4>
            <default-input
             v-model="post.newPostTitle"
             type="text"
             placeholder="Название"
            />
            <default-input
             v-model="post.newPostDescription"
             type="text"
             placeholder="Описание"
            />
            <default-button
            class="btn" 
            @click="addPost"
            style="align-self: flex-end; margin-top: 15px;"
            >Добавить пост</default-button >
        </form>
        
    </div>
</template>

<script>

    export default {
    data() {
        return {
            post: {
                newPostTitle: "",
                newPostDescription: ""
            }
        };
    },
    methods: {
        addPost() {
            this.post.id = Date.now();
            this.$emit("add", this.post);
            this.post = {
                newPostTitle: "",
                newPostDescription: ""
            };
        },
    },
}
</script>

<style scoped>
.app {
    padding: 20px;
}



form {
    display: flex;
    flex-direction: column;
}
</style>