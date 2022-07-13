import axios from 'axios'


export const postModule = {
    state: () => ({
        posts: [],
        selectedSort: '',
        searchPost: '',
        page: 1,
        limitPage: 10,
        totalPages: 0,
        sortOptions: [
            { value: 'title', name: "По названию" },
            { value: 'body', name: "По описанию" },
        ]
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) =>
                post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            )
        },

        sortedAndSearchedPost(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchPost.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setSearchPost(state, searchPost) {
            state.searchPost = searchPost
        },
        setPage(state, page) {
            state.page = page
        },
        setTotalPages(store, totalPages) {
            store.totalPages = totalPages
        },
        setLimitPage(store, limitPage) {
            store.limitPage = limitPage
        }
    },
    actions: {
        async getPosts({ commit, state }) {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
                    {
                        params: {
                            _page: state.page,
                            _limit: state.limitPage
                        }
                    }
                )
                commit('setTotalPages', Math.ceil(response.headers["x-total-count"] / state.limitPage))
                commit('setPosts', response.data)
            } catch (error) {
                console.log(error);
            }
        },

        async loadMorePosts({ commit, state }) {
            try {
                commit('setPage', state.page += 1)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
                    {
                        params: {
                            _page: state.page,
                            _limit: state.limitPage
                        }
                    }
                )
                commit('setTotalPages', Math.ceil(response.headers["x-total-count"] / state.limitPage))
                commit('setPosts', [...state.posts, ...response.data])
            } catch (error) {
                console.log(error);
            }
        },
    },
    namespaced: true
}   