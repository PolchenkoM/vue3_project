<template>
    <div >
        <h1>Страница с постами</h1>
        <default-input
        placeholder="Найти пост"
        v-model="searchPost"
        v-focus
        />
        <div class="app__btns">
            <default-button @click="showWindow">
                Добавить пост
            </default-button>
            <default-select
             v-model="selectedSort"
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
        <!-- <pagination-block
        :pages="totalPages"
        :page="page"
        @change="changePage"        
        ></pagination-block> -->
        <div v-intersection="loadMorePosts" class="observer"></div>


    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import DefaultInput from '@/components/UI/DefaultInput.vue'
import PaginationBlock from '@/components/UI/PaginationBlock.vue'
import axios from 'axios'

export default {
    components: {
    PostForm,
    PostList,
    DefaultInput,
    PaginationBlock
},

    data() {
        return {
            windowWisible: false,
            posts: [],
            selectedSort: '',
            searchPost:'',
            page:1,
            limitPage:10,
            totalPages:0,
            sortOptions: [
                { value: 'title', name: "По названию" },
                { value: 'body', name: "По описанию" },
            ]
        }

    },

    methods: {

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

        async getPosts() {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
                {
                    params:{
                        _page:this.page,
                        _limit:this.limitPage
                }
                }
                )
                this.totalPages = Math.ceil(response.headers["x-total-count"] / this.limitPage)
                this.posts = response.data
            } catch (error) {
                console.log('Ошибка');
            }
        },

        async loadMorePosts() {
            try {
                this.page +=1
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
                {
                    params:{
                        _page:this.page,
                        _limit:this.limitPage
                }
                }
                )
                this.totalPages = Math.ceil(response.headers["x-total-count"] / this.limitPage)
                this.posts = [...this.posts,...response.data]
            } catch (error) {
                console.log('Ошибка');
            }
        },
        // changePage(pageNumber){
        //     this.page = pageNumber
        // }
    },

    mounted() {
    this.getPosts()

    
    },

    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) =>
                post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
            )
        },
        
        sortedAndSearchedPost(){
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchPost.toLowerCase()))
        }
    },

    watch:{
        // page(){
        //     this.getPosts()
        // }
    }



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