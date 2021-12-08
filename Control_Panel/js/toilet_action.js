const app = new Vue({
    el: '#app',
    data: {
        toilets: [
            {toilet_id:"1", toilet_name:"第一廁所"},
            {toilet_id:"2", toilet_name:"第二廁所"},
            {toilet_id:"4", toilet_name:"第四廁所"},
            {toilet_id:"4", toilet_name:"第四廁所"},
            {toilet_id:"4", toilet_name:"第四廁所"},
            {toilet_id:"4", toilet_name:"第四廁所"},
            {toilet_id:"4", toilet_name:"第四廁所"},
            {toilet_id:"4", toilet_name:"第四廁所"}
        ]
    },
    methods: {
        test: (id) => {
            alert(`Hello, ${id}`)
        }
    }
})