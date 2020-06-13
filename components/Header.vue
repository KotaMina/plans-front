<template>
    <header>
            <div id="header-left">
                <h1>{{this.title}}</h1>
            </div>
            <div id="header-right">
                <ul>
                    <li v-for="(menu,index) in menuList" :key="index">
                        <nuxt-link :to="menu.path">{{menu.jpName}}</nuxt-link>
                    </li>
                </ul>
            </div>
    </header>
</template>
<script>
import {mapState, mapMutations, mapGetters} from "vuex"

export default {
    data(){
        return{
            title: "plans",
            menuList: [],
            errorList: [],
            authority: "000"
        }
    },
    created(){
        this.setMenuList();
    },
    methods:{
        //store
        ...mapState("common", ["userId","authority"]),

        //メニュー情報取得する。
        async setMenuList() {
            const query = { authorityList: [this.authority]};
            const res = await this.$axios.$post("http://localhost:8080/request/menu/", {data: query})
            if(res.result == 0){
                this.menuList = res.menuList;
            } else if(res.result == 1){
                this.errorList = res.errorList;
            }
        }
    }
}
</script>