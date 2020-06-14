export const state = () => ({
    authority: "000",
    isLogin: false,
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