<template>
    <div class="page__wrapper" >
        <div
        class="page"
        :class="{
            'current_page': pageNumber === page
        }"
        v-for="pageNumber in pages"
        :key="pageNumber"
        @click="changePage(pageNumber)"
        >{{pageNumber}}</div>
    </div>
</template>

<script>
    export default {
        name:"pagination-block",
        props: {
            pages: {
                type:Number,
            },
            page:{
                type:Number
            }
        },
        methods:{
            changePage(pageNumber){
               this.$emit('change', pageNumber)
            }
        }
    }
</script>

<style  scoped>
.page__wrapper {
    display: flex;
    margin-top: 15px;
}

.page{
    border: 2px solid seagreen;
    padding: 10px;
}

.current_page{
    background-color: salmon;
}
</style>