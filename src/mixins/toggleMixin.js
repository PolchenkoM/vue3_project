export default {
   props:{
    show:{
        type:Boolean,
        default:false
    }
    },
    methods: {
        hideWindow() {
            this.$emit('update:show', false)
        }
    },
}