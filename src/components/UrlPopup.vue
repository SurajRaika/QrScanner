<script setup>


const props=defineProps(["data"])

</script>
<template>
    <div class="wrapper">
        <div class="popup">
            <input type="text" :value="data" >
            <button @click="$emit('copy_text_event')" class="clicked">Copy Text</button>
        </div>
    </div>
</template>
<style scoped>

.wrapper{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0000008b;

}
.popup{
    min-width: 300px;
    background-color: wheat;
    padding: 1rem;
    border-radius: 0.2rem;
}
.popup > input{
     display: block;
     margin-bottom: 0.6rem;
     width: 100%;
     border: none;
    outline: none;
     padding: 0.1rem 0.1rem;

}
.popup > button{
     display: block;
     width: 100%;
     background-color: green;
     padding: 0.4rem 0rem;
     border: none;
     color: white;
    font-size:larger;
}

</style>