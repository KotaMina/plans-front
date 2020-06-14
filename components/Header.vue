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
            <Login />
    </header>
</template>
<script>
import Login from '~/components/Login.vue'
import {mapState, mapMutations, mapGetters} from "vuex"

export default {
    components: {
        Login
    },
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
        if(this.$cookies.get('user') != null){
            this.$store.commit('common/logined');
            this.$store.state.common.user = this.$cookies.get('user');
        }else{
            this.$store.commit('common/logout');
            this.$store.state.common.user = {};
        }
    },
    computed:{
        ...mapState("common", ["user","authority", "isLogin"])
    },
    methods:{
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