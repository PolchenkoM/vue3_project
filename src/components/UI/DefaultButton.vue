<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
name: "default-button"
}
</script>


<style  scoped>
.btn {
    padding: 10px 15px;
    background: none;
    color: seagreen;
    border: 1px solid seagreen;
    background-color: aliceblue;
}
</style>