const showtoilet = new Vue({
    el: "#showtoilet",
    data: {
        countries: [],
        cities: [],
        districts: [],
        create_toilet: {
            name: "",
            address: "",
            longitude: "",
            latitude: "",
            country_id: "-1",
            city_id: "-1",
            district_id: "-1",
        },
        isShow: false,
        images: [
            "toilet0.jpg",
            "toilet1.jpg",
            "toilet2.jpg",
            "toilet3.jpg",
            "toilet4.jpg",
            "toilet5.jpg",
            "toilet6.jpg",
            "toilet7.jpg",
            "toilet8.jpeg",
            "toilet9.jpg",
            "toilet10.jpg",
            "toilet11.jpg",
            "toilet12.jpg",
            "toilet13.jpg",
            "toilet14.jpg",
            "toilet15.jpg",
            "toilet16.jpg",
            "toilet17.jpg",
            "toilet18.jpg",
            "toilet19.jpg",
            "toilet20.jpg",
        ],
        toiletInfo: {},
        reviews: [],
        allreviews: [],
        myReview:{
            member_name: "",
            rating: 0,
            content: "",
        },
        /* 登入的會員的資料:
         * account: {
         *      name, email, status, password, member_id, last_login_time
         *  }
         */
        account: {
            member_id: 0,
        },
        imgNum: 0,
        content: "",
        selected_rating: 0,
        imgNum: 0,
        srcStar: 'images/star2.png',
        srcNoStar: 'images/star.png'
    },
    created: () => {
        //這個只是在抓cookie資訊而已，是一個function
        const getCookie = (name) => {
            try {
              const value = `; ${document.cookie}`;
              const parts = value.split(`; ${name}=`);
              if (parts.length === 2) return parts.pop().split(";").shift();
            } catch {
              return "";
            }
          };

        const member_id = getCookie("member_id")

        //取得所有關於country, city and district的資訊
        axios.get("https://etoilet.ddns.net:8090/getAllLoc").then((response) => {
            showtoilet.countries = JSON.parse(response.data.CountryInfo);
            showtoilet.cities = JSON.parse(response.data.CityInfo);
            showtoilet.districts = JSON.parse(response.data.DistrictInfo);

            //從cookie中抓資料，並且存到account.member_id中
            //放這邊是因為他是promise物件，放外面可能會導致initial衝突
            if(member_id != undefined){
                showtoilet.account.member_id = member_id
            }
        });

        //抓取網頁的parameter
        let url = location.href;
        let param_obj = {};
        if (url.split("?").length > 1) {
            //將?後面的所有參數都分割
            let params = url.split("?")[1].split("&");
            //將參數分割後，分割'='符號的前後文並且將'='前面設定為param_obj的key，後面設定為value
            params.forEach((param) => {
                let temp = param.split("=");
                param_obj[temp[0]] = temp[1];
            });
        }

        if (param_obj.hasOwnProperty("toilet_id")) {
            axios
                .get(
                    `https://etoilet.ddns.net:8090/getToiletByID?toilet_id=${param_obj["toilet_id"]}`
                )
                .then((response) => {
                    result = JSON.parse(response.data.Toiletinfo);
                    //廁所只會有一個，所以直接拿result[0]即可
                    showtoilet.toiletInfo = result[0];
                });
            axios
                .get(
                    `https://etoilet.ddns.net:8090/getReview?toilet_id=${param_obj["toilet_id"]}`
                )
                .then((response) => {
                    if (response.data.hasOwnProperty("Reviewinfo")) {
                        allresult = JSON.parse(response.data.Reviewinfo);
                        showtoilet.allreviews=allresult
                        result = JSON.parse(response.data.Reviewinfo);
                        //先找出member本人的評論，再把其他人的評論放到reviews
                        for(let i = 0; i < result.length; i++){
                            if(result[i].member_id == member_id){
                                showtoilet.myReview = result[i]
                                //把資料放進createImgNum 跟 content, 把新增跟真實評論了的數值分開
                                showtoilet.imgNum = result[i].rating
                                showtoilet.content = result[i].content
                                result.splice(i, 1)
                                break
                            }
                        }
                        showtoilet.reviews = result
                    }
                });
        }
        else{
            self.location = ".../index.html"
        }
        if(member_id != undefined){
            axios
                .get(`https://etoilet.ddns.net:8090/getMemberInfo?member_id=${member_id}`)
                .then((response) => {
                    result = JSON.parse(response.data.Memberinfo);
                    //登入中的會員也只會有一個，所以直接拿一個就好
                    showtoilet.account = result[0];
                });
        }
    },
    methods: {
        createto: function (e) {
            //新增廁所
            let checkIsInputedAndLegal =
                showtoilet.create_toilet.name &&
                showtoilet.create_toilet.address &&
                showtoilet.create_toilet.longitude &&
                showtoilet.create_toilet.latitude &&
                showtoilet.create_toilet.country_id &&
                showtoilet.create_toilet.city_id &&
                showtoilet.create_toilet.district_id;

            if (checkIsInputedAndLegal) {
                axios
                    .post(
                        "https://etoilet.ddns.net:8090/createNewToilet",
                        showtoilet.create_toilet
                    )
                    .then((response) => {
                        swal({
                            title: "新增成功",
                            icon: "success",
                        }).then(function () {
                            self.location.reload();
                        })
                    })
                    .catch(() => {
                        swal({
                            title: "新增失敗",
                            icon: "error",
                        });
                    });
            }

            //檢查所有新增欄位有沒有填寫
            for (let key in showtoilet.create_toilet) {
                let value = showtoilet.create_toilet[key];
                switch (key) {
                    case "country_id":
                        if (!value || value == "-1") alert("國家欄位為必選.");
                        break;
                    case "city_id":
                        if (!value || value == "-1") alert("城市欄位為必選.");
                        break;
                    case "district_id":
                        if (!value || value == "-1") alert("地區欄位為必選.");
                        break;
                    default:
                        if (!value) alert(key + " 為必填寫！");
                }
            }
            e.preventDefault();
        },
        create_showPosition: async () => {
            //新增廁所的經緯度
            await showtoilet.getLocation().then((position) => {
                showtoilet.isShow = true;
                showtoilet.create_toilet.longitude = position.coords.longitude;
                showtoilet.create_toilet.latitude = position.coords.latitude;
            });
        },
        getLocation: async () => {
            //取得經緯度位置
            return new Promise((resolve, reject) => {
                if (!("geolocation" in navigator)) {
                    reject(new Error("Geolocation is not available."));
                }

                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        //成功後回傳resolve
                        resolve(position);
                    },
                    (err) => {
                        //失敗後回傳reject
                        reject(err);
                    }
                );
            });
        },
        createComment: function (e) {
            let check = showtoilet.imgNum && showtoilet.content.length < 46;
            console.log(showtoilet.imgNum);
            console.log(showtoilet.content);
            console.log(showtoilet.toiletInfo.toilet_id);
            if (check) {
                //將createimgNum的數字與content放到myReview中
                showtoilet.myReview.rating = showtoilet.imgNum
                showtoilet.myReview.content = showtoilet.content

                axios
                    .post("https://etoilet.ddns.net:8090/createNewReview", {
                        rating: showtoilet.myReview.rating,
                        member_id: showtoilet.account.member_id,
                        toilet_id: showtoilet.toiletInfo.toilet_id,
                        content: showtoilet.myReview.content,
                    })
                    .then((response) => {
                        swal({
                            title: "新增評論成功",
                            icon: "success",
                        }).then(function () {
                            self.location.reload();
                        })
                    })
                    .catch((error) => {
                        alert("新增失敗！");
                    });
            }
            if (!this.imgNum) {
                alert("星等必選.");
            }
            if (this.content.length > 45) {
                alert("評論內容不可超過45字.");
                alert(this.content.length)
            }
            e.preventDefault();
        },
        delete_myreview: () => {
            swal({
                title: `確認刪除你的評論嗎?`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((response) => {
                if (response) {
                    axios
                        .post("https://etoilet.ddns.net:8090/deleteReview", {
                            review_id: showtoilet.myReview.review_id,
                        })
                        .then(() => {
                            swal({
                                title: `刪除成功`,
                                icon: "success",
                            }).then(function () {
                                self.location.reload();
                            })
                        })
                        .catch((error) => {
                            swal({
                                title: `刪除失敗`,
                                text: error,
                                icon: "error",
                            });
                        });
                } else {
                    swal({
                        title: "取消",
                        icon: "error",
                    });
                }
            });
        },
        delete_review: (reviewobj) => {
            let review_id = reviewobj.review_id;
            let reviewsArray = showtoilet.reviews;

            swal({
                title: `確認刪除此評論嗎?`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((response) => {
                if (response) {
                    axios
                        .post("https://etoilet.ddns.net:8090/deleteReview", {
                            review_id: review_id,
                        })
                        .then(() => {
                            let deleted_obj_index = reviewsArray.indexOf(reviewobj);
                            console.log(deleted_obj_index);
                            if (deleted_obj_index > -1)
                                reviewsArray.splice(deleted_obj_index, 1);
                            swal({
                                title: `刪除成功`,
                                icon: "success",
                            }).then(function () {
                                self.location.reload();
                            })
                        })
                        .catch((error) => {
                            swal({
                                title: `刪除失敗`,
                                text: error,
                                icon: "error",
                            });
                        });
                } else {
                    swal({
                        title: "取消",
                        icon: "error",
                    });
                }
            });
        },
        update_review: () => {
            //將createimgNum 與 content放到myReview中
            showtoilet.myReview.rating = showtoilet.imgNum
            showtoilet.myReview.content = showtoilet.content


            let checkcommet = showtoilet.imgNum > 0;
            if (checkcommet) {
                axios
                    .post(
                        "https://etoilet.ddns.net:8090/updateReview",
                        {
                            review_id: showtoilet.myReview.review_id,
                            content: showtoilet.myReview.content,
                            rating: showtoilet.myReview.rating,
                        }
                    )
                    .then(() => {
                        swal({
                            title: "修改成功",
                            icon: "success",
                        }).then(function () {
                            self.location.reload();
                        })
                        //  showtoilet.review_info
                        // showtoilet.review_info[showtoilet.review_info.review_id - 1] = showtoilet.review_info;
                    })
                    .catch((error) => {
                        swal({
                            title: "修改失敗",
                            text: error.data,
                            icon: "error",
                        });
                    });
            }
            if (showtoilet.imgNum == 0) {
                alert("星等必選.");
            }
        },
        SendReviewInfo: (reviewobj) => {
            showtoilet.review_info = reviewobj;
        },
        imgItem: function (num) {
            showtoilet.imgNum = num;
            showtoilet.rating = num;
        },
        longitudelength: (longitude) => {
            return Math.round(longitude * 10000) / 10000;
        },
        latitudelength: (latitude) => {
            return Math.round(latitude * 10000) / 10000;
        },
        ratinglength: (rating) => {
            return Math.round(rating * 10) /10;
        },
    },
});
