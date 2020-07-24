<template>
    <div class="container">
        <h1>{{this.title}}</h1>

        
    </div>
</template>
<script>
import { mapState, mapMutaitions, mapGetters } from "vuex";

export default {
    data(){
        return {
            title: "plansのサービスを盛り上げる。",
            planer: [
                { 
                    id: "kotaMina",
                    name: "Koatro Minamiyama",
                    avaterImg:"test_baner.jpg"
                }
            ],
            executor: [
                { 
                    id: "kotaMina",
                    name: "Koatro Minamiyama",
                    avaterImg:"test_baner.jpg"
                }
            ],
            activity: 30
        }
    }
}
</script>