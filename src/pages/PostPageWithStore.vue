<template>
    <div >
        <h1>Страница с постами</h1>
        <default-input
        placeholder="Найти пост"
        :model-value="searchPost"
        @update:model-value="setSearchPost"
        v-focus
        />
        <div class="app__btns">
            <default-button @click="showWindow">
                Добавить пост
            </default-button>
            <default-select
             :model-value="selectedSort"
             @update:model-value= "setSelectedSort"
             :options="sortOptions"
            >
            </default-select>
        </div>

        <modal-window
         v-model:show="windowWisible"
        >
            <post-form
             @add="createPost" 
            />
        </modal-window>

        <post-list 
        :posts="sortedAndSearchedPost" 
        @remove="removePost" 
        />
        <pagination-block
        :pages="totalPages"
        :page="page"
        @change="changePage"        
        ></pagination-block>
        <div v-intersection="loadMorePosts" class="observer"></div>
    
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import DefaultInput from '@/components/UI/DefaultInput.vue'
import PaginationBlock from '@/components/UI/PaginationBlock.vue'
import axios from 'axios'
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

export default {
    components: {
    PostForm,
    PostList,
    DefaultInput,
    PaginationBlock
},

    data() {
        return {
        windowWisible: false
        }

    },

    methods: {

        ...mapMutations({
            setPage: 'post/setPage',
            setSearchPost: 'post/setSearchPost',
            setSelectedSort: 'post/setSelectedSort'
        }),

        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            getPosts: 'post/getPosts',
        }),

        createPost(post) {
            const newPost = {
                id: post.id,
                title: post.newPostTitle,
                body: post.newPostDescription
            }
            this.posts.push(newPost)
            this.windowWisible = false
        },

        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },

        showWindow() {
            return this.windowWisible = true
        },

        
        changePage(pageNumber){
            this.page = pageNumber
        }
    },

    mounted() {
        this.getPosts()
    },

    computed: {
     ...mapState({
        posts: state => state.post.posts,
        selectedSort: state => state.post.selectedSort,
        searchPost: state => state.post.searchPost,
        page: state => state.post.page,
        limitPage: state => state.post.limitPage,
        totalPages: state => state.post.totalPages,
        sortOptions: state => state.post.sortOptions,
       
     }),

     ...mapGetters({
        sortedPosts: 'post/sortedPosts',
        sortedAndSearchedPost: 'post/sortedAndSearchedPost'
     })
    },
}
</script>

<style>

.app__btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0
}


form {
    display: flex;
    flex-direction: column;
}

.observer{
    height: 15px;
    background: purple;
}
</style>