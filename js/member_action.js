const app = new Vue({
    el: '#app',
    data: {
        email: "",
        password: "",
        name: ""
    },
    methods: {
        checkForm: function (e) {
            if (this.email && this.validEmail(this.email) && this.password && this.validPassword(this.password) && this.name) {
                axios.post('http://140.115.87.117:8090/Register', {
                        email: app.email,
                        password: app.password,
                        name: app.name
                    })
                    .then((response) => {
                        result = response.data
                        alert("註冊成功")
                        //                        props.history.push("/Login")
                        //                        this.$router.push({path:"/Login"})
                        console.log(result)
                    })
                    .catch((error) => {
                        alert("註冊失敗！此信箱已存在，請嘗試新的信箱！")
                    })
            }
            if (!this.name) {
                alert('Name欄位為必填.');
            }
            if (!this.password) {
                alert('Password欄位為必填.');
            } else if (!this.validPassword(this.password)) {
                alert('Password格式不符合');
            }
            if (!this.email) {
                alert('Email欄位為必填.');
            } else if (!this.validEmail(this.email)) {
                alert('請輸入有效的Email.');
            }
            e.preventDefault();
        },
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        validPassword: function (password) {
            var re = /[A-Za-z0-9]{6,}/;
            return re.test(password);
        }
    }
})
