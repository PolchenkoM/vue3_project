<template>
    <div class="posts">
        <div>
            <div><strong>Id:</strong>{{ post.id }}</div>
            <div><strong>Название:</strong>{{ post.title }}</div>
            <div><strong>Описание:</strong> {{ post.body }} </div>
        </div>
        <div class="post__btns">
             <default-button
            @click="$router.push(`/posts/${post.id}`)"
            >Открыть
            </default-button >
            <default-button
             style="margin-left:5px"
            @click="$emit('remove', post)"
            >Удалить
            </default-button >
        </div>
    </div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            default: {},
            required: true
        }
    },
}
</script>

<style  scoped>
.posts {
    background-color: salmon;
    padding: 15px;
    border: 2px solid seagreen;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.post__btns{
    display: flex;
}

</style>