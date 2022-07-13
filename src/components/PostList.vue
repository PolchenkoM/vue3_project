<template>
    <div v-if="posts.length > 0">
        <h3>Список постов</h3>
        <transition-group name="post-list">
            <post-item
              v-for="post in posts"
             :post="post"
             :key="post.id"
             @remove="$emit('remove', post)"
             />
        </transition-group>
    </div>
    <h2 v-else style="color: red">
        Постов пока не завезли (
    </h2>
</template>

<script >
import PostItem from './PostItem.vue';
export default {
    props: {
        posts: {
            type: Array,
            default: [],
            required: true
        }
    },
    components: { PostItem }
}
</script>

<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active, .post-list-leave-active {
  transition: all 0.5s;
}

.post-list-enter, .post-list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateX(130px);
}

.post-list-move {
  transition: transform 0.5s ease;
}
</style>