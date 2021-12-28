const searchtoilet = new Vue({
    el: "#searchtoilet",
    data: {
        member_id: -1,
        is_admin: false,
        countries: [],
        cities: [],
        districts: [],
        selected: {
            longitude: 0.0,
            latitude: 0.0,
            country_id: "-1",
            city_id: "-1",
            district_id: "-1",
        },
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
    },
    created: () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                //成功後回傳resolve
                console.log(position.coords.longitude)
                console.log(position.coords.latitude)
                searchtoilet.selected.longitude = position.coords.longitude;
                searchtoilet.selected.latitude = position.coords.latitude;
                //                document.getElementById('log').readOnly = true
                //                document.getElementById('lat').readOnly = true 
                //                document.getElementById("log").value = position.coords.longitude
                //                document.getElementById("lat").value = position.coords.latitude
            },
            (err) => {
                //失敗後回傳reject
                document.getElementById("log").value = "0"
                document.getElementById("lat").value = "0"
            }
        );
        //初始化資料
        axios
            .get("https://etoilet.ddns.net:8090/getAllLoc")
            .then((response) => {
                searchtoilet.countries = JSON.parse(response.data.CountryInfo);
                searchtoilet.cities = JSON.parse(response.data.CityInfo);
                searchtoilet.districts = JSON.parse(response.data.DistrictInfo);
            })
            .catch(() => {
                console.log("Encounter error");
            });
    },
    methods: {
        createto: function (e) {
            //新增廁所
            let checkIsInputedAndLegal =
                searchtoilet.create_toilet.name &&
                searchtoilet.create_toilet.address &&
                searchtoilet.create_toilet.longitude &&
                searchtoilet.create_toilet.latitude &&
                searchtoilet.create_toilet.country_id &&
                searchtoilet.create_toilet.city_id &&
                searchtoilet.create_toilet.district_id;
            if (checkIsInputedAndLegal) {
                axios
                    .post(
                        "https://etoilet.ddns.net:8090/createNewToilet",
                        searchtoilet.create_toilet
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
            for (let key in searchtoilet.create_toilet) {
                let value = searchtoilet.create_toilet[key];
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
        JumpToSearch: (district_id) => {
            //使用區域搜尋
            if (
                !searchtoilet.selected.country_id ||
                searchtoilet.selected.country_id == "-1"
            ) {
                alert("國家欄位為必選.");
            } else if (
                !searchtoilet.selected.city_id ||
                searchtoilet.selected.city_id == "-1"
            ) {
                alert("城市欄位為必選.");
            } else if (
                !searchtoilet.selected.district_id ||
                searchtoilet.selected.district_id == "-1"
            ) {
                alert("地區欄位為必選.");
            } else {
                location.href = `toilet.html?district_id=${district_id}&longitude=${searchtoilet.selected.longitude}&latitude=${searchtoilet.selected.latitude}`;
            }
        },
        //        getLocation: async () => {
        //            return new Promise((resolve, reject) => {
        //                if (!("geolocation" in navigator)) {
        //                    reject(new Error("Geolocation is not available."));
        //                }
        //
        //                navigator.geolocation.getCurrentPosition(
        //                    (position) => {
        //                        //成功後回傳resolve
        //                        resolve(position);
        //                    },
        //                    (err) => {
        //                        //失敗後回傳reject
        //                        reject(err);
        //                    }
        //                );
        //            });
        //        },
        create_showPosition: async () => {
            //新增廁所的經緯度
            await searchtoilet.getLocation().then((position) => {
                searchtoilet.isShow = true;
                searchtoilet.create_toilet.longitude = position.coords.longitude;
                searchtoilet.create_toilet.latitude = position.coords.latitude;
            });
        },
        PositionToSearch: async () => {
            //找附近的function
            //            await searchtoilet.getLocation().then((position) => {
            //                location.href = `toilet.html?longitude=${position.coords.longitude}&latitude=${position.coords.latitude}`;
            if (searchtoilet.selected.longitude == 0 || searchtoilet.selected.latitude == 0) {
                swal({
                    title: "請先定位再使用「找附近」功能哦!",
                    icon: "error",
                });
            } else {
                location.href = `toilet.html?longitude=${searchtoilet.selected.longitude}&latitude=${searchtoilet.selected.latitude}`;
            }
            //            });
        },
        //        JumpToLngLat: (lat, lng) => {
        //            location.href = `toilet.html?longitude=${lng}&latitude=${lat}`;
        //        },
        getMemberId: () => {
            const value = `; ${document.cookie}`
            let member_parts = value.split(`; member_id=`)
            return member_parts.pop().split(';').shift()
        },
        getStatus: () => {
            const value = `; ${document.cookie}`
            let status_parts = value.split('; isAdmin=')
            return status_parts.pop.split(';').shift()
        }
    },
});
