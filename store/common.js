export const state = () => ({
    authority: "000",
    isLogin: false,
    menuList: [],
    errorList: [],
    user: {},
})

export const mutations = {
    logined(state){
        state.isLogin = true;
    },
    logout(state){
        state.isLogin = false;
    }
}